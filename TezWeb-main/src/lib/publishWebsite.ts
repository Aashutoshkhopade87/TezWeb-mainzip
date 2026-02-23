import { WebsiteData } from '@/types/website';
import { getCurrentUser } from './auth';

// Generate unique slug from business name
export const generateWebsiteSlug = (businessName: string, category: string): string => {
  const slug = businessName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .substring(0, 50);
  
  const timestamp = Date.now().toString().slice(-6);
  return `${slug}-${timestamp}`;
};

// Publish website and return shareable link
export const publishWebsite = (website: WebsiteData): { slug: string; url: string } => {
  const slug = generateWebsiteSlug(website.businessName, website.category);
  const currentUser = getCurrentUser();
  
  // Ensure website has userId
  const websiteToPublish = {
    ...website,
    userId: website.userId || currentUser?.phoneNumber || '',
    publishedAt: new Date().toISOString(),
    slug,
  };
  
  // Save published website to localStorage
  const publishedWebsites = getPublishedWebsites();
  publishedWebsites[slug] = websiteToPublish;
  
  localStorage.setItem('publishedWebsites', JSON.stringify(publishedWebsites));
  
  console.log('Website published:', { slug, website: websiteToPublish });
  
  // Generate shareable URL
  const baseUrl = window.location.origin;
  const url = `${baseUrl}/site/${slug}`;
  
  return { slug, url };
};

// Get all published websites
export const getPublishedWebsites = (): Record<string, WebsiteData & { publishedAt: string; slug: string }> => {
  const data = localStorage.getItem('publishedWebsites');
  return data ? JSON.parse(data) : {};
};

// Get published website by slug
export const getPublishedWebsite = (slug: string): (WebsiteData & { publishedAt: string; slug: string }) | null => {
  const websites = getPublishedWebsites();
  return websites[slug] || null;
};

// Copy link to clipboard
export const copyLinkToClipboard = async (url: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch (error) {
    console.error('Failed to copy link:', error);
    return false;
  }
};
