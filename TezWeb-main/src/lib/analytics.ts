import { WebsiteAnalytics, AnalyticsEvent, ProductAnalytics } from '@/types/website';

const ANALYTICS_STORAGE_KEY = 'websiteAnalytics';

// Initialize analytics for a website
export const initializeAnalytics = (websiteId: string): void => {
  const analytics = getAnalytics(websiteId);
  if (!analytics) {
    const newAnalytics: WebsiteAnalytics = {
      websiteId,
      totalViews: 0,
      totalWhatsAppClicks: 0,
      totalCallClicks: 0,
      events: [],
      productStats: [],
      lastUpdated: new Date().toISOString(),
    };
    saveAnalytics(newAnalytics);
  }
};

// Track website view
export const trackView = (websiteId: string): void => {
  const analytics = getAnalytics(websiteId) || {
    websiteId,
    totalViews: 0,
    totalWhatsAppClicks: 0,
    totalCallClicks: 0,
    events: [],
    productStats: [],
    lastUpdated: new Date().toISOString(),
  };

  analytics.totalViews += 1;
  analytics.events.push({
    type: 'view',
    timestamp: new Date().toISOString(),
  });
  analytics.lastUpdated = new Date().toISOString();

  saveAnalytics(analytics);
};

// Track WhatsApp click
export const trackWhatsAppClick = (
  websiteId: string,
  productId: string,
  productName: string
): void => {
  const analytics = getAnalytics(websiteId);
  if (!analytics) return;

  analytics.totalWhatsAppClicks += 1;
  analytics.events.push({
    type: 'whatsapp_click',
    timestamp: new Date().toISOString(),
    productId,
    productName,
  });

  // Update product stats
  const productStat = analytics.productStats.find(p => p.productId === productId);
  if (productStat) {
    productStat.whatsappClicks += 1;
  } else {
    analytics.productStats.push({
      productId,
      productName,
      views: 0,
      whatsappClicks: 1,
    });
  }

  analytics.lastUpdated = new Date().toISOString();
  saveAnalytics(analytics);
};

// Track call click
export const trackCallClick = (websiteId: string): void => {
  const analytics = getAnalytics(websiteId);
  if (!analytics) return;

  analytics.totalCallClicks = (analytics.totalCallClicks || 0) + 1;
  analytics.events.push({
    type: 'call_click',
    timestamp: new Date().toISOString(),
  });

  analytics.lastUpdated = new Date().toISOString();
  saveAnalytics(analytics);
};

// Track directions click
export const trackDirectionsClick = (websiteId: string): void => {
  const analytics = getAnalytics(websiteId);
  if (!analytics) return;

  analytics.events.push({
    type: 'directions_click',
    timestamp: new Date().toISOString(),
  });

  analytics.lastUpdated = new Date().toISOString();
  saveAnalytics(analytics);
};

// Track product view
export const trackProductView = (
  websiteId: string,
  productId: string,
  productName: string
): void => {
  const analytics = getAnalytics(websiteId);
  if (!analytics) return;

  analytics.events.push({
    type: 'product_view',
    timestamp: new Date().toISOString(),
    productId,
    productName,
  });

  // Update product stats
  const productStat = analytics.productStats.find(p => p.productId === productId);
  if (productStat) {
    productStat.views += 1;
  } else {
    analytics.productStats.push({
      productId,
      productName,
      views: 1,
      whatsappClicks: 0,
    });
  }

  analytics.lastUpdated = new Date().toISOString();
  saveAnalytics(analytics);
};

// Get analytics for a website
export const getAnalytics = (websiteId: string): WebsiteAnalytics | null => {
  const allAnalytics = getAllAnalytics();
  return allAnalytics.find(a => a.websiteId === websiteId) || null;
};

// Get all analytics
const getAllAnalytics = (): WebsiteAnalytics[] => {
  const data = localStorage.getItem(ANALYTICS_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Save analytics
const saveAnalytics = (analytics: WebsiteAnalytics): void => {
  const allAnalytics = getAllAnalytics();
  const index = allAnalytics.findIndex(a => a.websiteId === analytics.websiteId);
  
  if (index >= 0) {
    allAnalytics[index] = analytics;
  } else {
    allAnalytics.push(analytics);
  }
  
  localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(allAnalytics));
};

// Get analytics summary
export const getAnalyticsSummary = (websiteId: string) => {
  const analytics = getAnalytics(websiteId);
  if (!analytics) {
    return {
      totalViews: 0,
      totalWhatsAppClicks: 0,
      topProducts: [],
      recentActivity: [],
    };
  }

  // Sort products by total engagement (views + clicks)
  const topProducts = [...analytics.productStats]
    .sort((a, b) => {
      const aScore = a.views + (a.whatsappClicks * 2); // Weight clicks higher
      const bScore = b.views + (b.whatsappClicks * 2);
      return bScore - aScore;
    })
    .slice(0, 5);

  // Get recent activity (last 10 events)
  const recentActivity = [...analytics.events]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10);

  return {
    totalViews: analytics.totalViews,
    totalWhatsAppClicks: analytics.totalWhatsAppClicks,
    totalCallClicks: analytics.totalCallClicks || 0,
    topProducts,
    recentActivity,
  };
};

// Get views by day for the last 7 days
export const getViewsByDay = (websiteId: string): { date: string; views: number }[] => {
  const analytics = getAnalytics(websiteId);
  if (!analytics) return [];

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const viewsByDay = last7Days.map(date => {
    const views = analytics.events.filter(event => 
      event.type === 'view' && event.timestamp.startsWith(date)
    ).length;
    return { date, views };
  });

  return viewsByDay;
};
