import { WebsiteData } from '@/types/website';
import { getCurrentUser } from './auth';

export const generateWebsiteSlug = (businessName: string, _category: string): string => {
  const slug = businessName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .substring(0, 50);

  const timestamp = Date.now().toString().slice(-6);
  return `${slug}-${timestamp}`;
};

export const publishWebsite = (website: WebsiteData): { slug: string; url: string } => {
  const slug = generateWebsiteSlug(website.businessName, website.category);
  const currentUser = getCurrentUser();

  const websiteToPublish = {
    ...website,
    userId: website.userId || currentUser?.uid || '',
    isPublished: true,
    publishedAt: new Date().toISOString(),
    slug,
  };

  const publishedWebsites = getPublishedWebsites();
  publishedWebsites[slug] = websiteToPublish;
  localStorage.setItem('publishedWebsites', JSON.stringify(publishedWebsites));

  // keep website list in sync
  const websites = JSON.parse(localStorage.getItem('websites') || '[]') as WebsiteData[];
  const updatedWebsites = websites.map((item) =>
    item.id === website.id
      ? {
          ...item,
          isPublished: true,
          updatedAt: new Date().toISOString(),
        }
      : item
  );
  localStorage.setItem('websites', JSON.stringify(updatedWebsites));

  const baseUrl = window.location.origin;
  const url = `${baseUrl}/site/${slug}`;

  return { slug, url };
};

export const getPublishedWebsites = (): Record<string, WebsiteData & { publishedAt: string; slug: string }> => {
  const data = localStorage.getItem('publishedWebsites');
  return data ? JSON.parse(data) : {};
};

export const getPublishedWebsite = (slug: string): (WebsiteData & { publishedAt: string; slug: string }) | null => {
  const websites = getPublishedWebsites();
  return websites[slug] || null;
};

export const copyLinkToClipboard = async (url: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch (error) {
    console.error('Failed to copy link:', error);
    return false;
  }
};
