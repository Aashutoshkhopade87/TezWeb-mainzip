import { doc, getDoc, setDoc } from 'firebase/firestore';
import { UserSubscription, WebsiteData } from '@/types/website';
import { db } from './firebase';
import { getAllWebsites } from './websiteGenerator';

const SUBSCRIPTION_PREFIX = 'subscription:';
const TRIAL_DAYS = 7;
const PLAN_LIMITS = {
  trial: 1,
  pro: 2,
};

const nowIso = () => new Date().toISOString();

const addDays = (dateIso: string, days: number) => {
  const d = new Date(dateIso);
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

const keyForUser = (userId: string) => `${SUBSCRIPTION_PREFIX}${userId}`;

const isExpired = (subscription: UserSubscription) => {
  if (subscription.plan === 'pro' && subscription.proEndsAt) {
    return new Date(subscription.proEndsAt).getTime() < Date.now();
  }
  return new Date(subscription.trialEndsAt).getTime() < Date.now();
};

const defaultTrial = (userId: string): UserSubscription => {
  const start = nowIso();
  return {
    userId,
    plan: 'trial',
    trialStartedAt: start,
    trialEndsAt: addDays(start, TRIAL_DAYS),
    status: 'active',
    updatedAt: nowIso(),
  };
};

const getLocalSubscription = (userId: string): UserSubscription | null => {
  const raw = localStorage.getItem(keyForUser(userId));
  return raw ? JSON.parse(raw) : null;
};

const setLocalSubscription = (subscription: UserSubscription) => {
  localStorage.setItem(keyForUser(subscription.userId), JSON.stringify(subscription));
};

export const getOrCreateSubscription = async (userId: string): Promise<UserSubscription> => {
  const local = getLocalSubscription(userId);

  if (db) {
    const ref = doc(db, 'subscriptions', userId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const remote = snap.data() as UserSubscription;
      const normalized = normalizeSubscription(remote);
      setLocalSubscription(normalized);
      return normalized;
    }

    const initial = local || defaultTrial(userId);
    const normalized = normalizeSubscription(initial);
    await setDoc(ref, normalized, { merge: true });
    setLocalSubscription(normalized);
    return normalized;
  }

  const subscription = normalizeSubscription(local || defaultTrial(userId));
  setLocalSubscription(subscription);
  return subscription;
};

export const saveSubscription = async (subscription: UserSubscription): Promise<void> => {
  const normalized = normalizeSubscription(subscription);
  setLocalSubscription(normalized);

  if (db) {
    const ref = doc(db, 'subscriptions', normalized.userId);
    await setDoc(ref, normalized, { merge: true });
  }
};

export const normalizeSubscription = (subscription: UserSubscription): UserSubscription => {
  const expired = isExpired(subscription);
  return {
    ...subscription,
    status: expired ? 'expired' : 'active',
    updatedAt: nowIso(),
  };
};

export const upgradeToPro = async (userId: string): Promise<UserSubscription> => {
  const current = await getOrCreateSubscription(userId);
  const startedAt = nowIso();
  const upgraded: UserSubscription = {
    ...current,
    plan: 'pro',
    proStartedAt: startedAt,
    proEndsAt: addDays(startedAt, 30),
    status: 'active',
    updatedAt: nowIso(),
  };

  await saveSubscription(upgraded);
  return upgraded;
};

export const getPlanWebsiteLimit = (subscription: UserSubscription): number => {
  if (subscription.plan === 'pro' && subscription.status === 'active') {
    return PLAN_LIMITS.pro;
  }
  if (subscription.plan === 'trial' && subscription.status === 'active') {
    return PLAN_LIMITS.trial;
  }
  return 0;
};

export const canCreateWebsite = (subscription: UserSubscription, userWebsiteCount: number): boolean => {
  return userWebsiteCount < getPlanWebsiteLimit(subscription);
};

export const canPublishWebsite = (subscription: UserSubscription): boolean => {
  return getPlanWebsiteLimit(subscription) > 0;
};

export const enforceExpiryForUser = async (userId: string): Promise<UserSubscription> => {
  const current = await getOrCreateSubscription(userId);
  const normalized = normalizeSubscription(current);

  if (normalized.status === 'expired') {
    const publishedWebsites = JSON.parse(localStorage.getItem('publishedWebsites') || '{}') as Record<string, WebsiteData & { slug: string }>;
    const updatedPublished = Object.fromEntries(
      Object.entries(publishedWebsites).filter(([, website]) => website.userId !== userId)
    );
    localStorage.setItem('publishedWebsites', JSON.stringify(updatedPublished));

    const websites = getAllWebsites();
    const updatedWebsites = websites.map((w) =>
      w.userId === userId
        ? {
            ...w,
            isPublished: false,
            updatedAt: nowIso(),
          }
        : w
    );
    localStorage.setItem('websites', JSON.stringify(updatedWebsites));
  }

  await saveSubscription(normalized);
  return normalized;
};


export const getUserPublishedWebsiteCount = (userId: string): number => {
  const published = JSON.parse(localStorage.getItem('publishedWebsites') || '{}') as Record<string, WebsiteData>;
  return Object.values(published).filter((website) => website.userId === userId).length;
};
