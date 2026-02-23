import { BusinessCategory, GeneratorFormData, WebsiteData, TemplateStyle } from '@/types/website';
import { CATEGORY_TEMPLATES } from '@/constants/templates';
import { TEMPLATE_STYLES } from '@/constants/templateStyles';
import { getCurrentUser } from './auth';

export const generateWebsite = (formData: GeneratorFormData): WebsiteData => {
  const category = formData.category as BusinessCategory;
  const style = (formData.templateStyle as TemplateStyle) || 'modern';
  
  // Use new template styles if available, fallback to old templates
  const template = TEMPLATE_STYLES[category]?.[style] || 
                   CATEGORY_TEMPLATES[category] || 
                   CATEGORY_TEMPLATES.other;

  const currentUser = getCurrentUser();
  
  // Combine country code with phone number
  const fullWhatsAppNumber = `${formData.whatsappCountryCode || '+91'}${formData.whatsappNumber}`;
  
  const website: WebsiteData = {
    id: `website-${Date.now()}`,
    userId: currentUser?.uid,
    businessName: formData.businessName,
    category: formData.category,
    whatsappNumber: fullWhatsAppNumber,
    bannerImage: template.bannerImage,
    tagline: template.tagline,
    primaryColor: template.primaryColor,
    templateStyle: style,
    customPrompt: formData.customPrompt,
    socialLinks: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
    },
    shopAddress: 'Main Market, Your City, State',
    gallery: [
      {
        id: 'gallery-1',
        url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&q=80',
        caption: 'Our Store Front',
      },
      {
        id: 'gallery-2',
        url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&q=80',
        caption: 'Inside Our Shop',
      },
      {
        id: 'gallery-3',
        url: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=600&h=400&fit=crop&q=80',
        caption: 'Product Display',
      },
    ],
    products: template.products.map((product, index) => ({
      id: `product-${Date.now()}-${index}`,
      ...product,
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return website;
};

export const saveWebsiteToStorage = (website: WebsiteData): void => {
  const updatedWebsite = { ...website, updatedAt: new Date().toISOString() };
  localStorage.setItem('currentWebsite', JSON.stringify(updatedWebsite));
  
  // Save to list of websites
  const websites = getAllWebsites();
  const existingIndex = websites.findIndex(w => w.id === website.id);
  
  if (existingIndex >= 0) {
    websites[existingIndex] = updatedWebsite;
  } else {
    websites.push(updatedWebsite);
  }
  
  localStorage.setItem('websites', JSON.stringify(websites));
};

export const getWebsiteFromStorage = (): WebsiteData | null => {
  const data = localStorage.getItem('currentWebsite');
  return data ? JSON.parse(data) : null;
};

export const getAllWebsites = (): WebsiteData[] => {
  const data = localStorage.getItem('websites');
  return data ? JSON.parse(data) : [];
};

export const getUserWebsites = (userId: string): WebsiteData[] => {
  const allWebsites = getAllWebsites();
  return allWebsites.filter(w => w.userId === userId);
};

export const deleteWebsite = (websiteId: string): void => {
  const websites = getAllWebsites();
  const filteredWebsites = websites.filter(w => w.id !== websiteId);
  localStorage.setItem('websites', JSON.stringify(filteredWebsites));
  
  // If current website is being deleted, clear it
  const currentWebsite = getWebsiteFromStorage();
  if (currentWebsite?.id === websiteId) {
    localStorage.removeItem('currentWebsite');
  }
};

export const loadWebsiteById = (websiteId: string): WebsiteData | null => {
  const websites = getAllWebsites();
  return websites.find(w => w.id === websiteId) || null;
};

export const generateWhatsAppLink = (
  whatsappNumber: string,
  productName: string,
  businessName: string
): string => {
  const message = `Hello, I want to order ${productName} from ${businessName}`;
  const encodedMessage = encodeURIComponent(message);
  // Remove any spaces or special characters from phone number, keep + for country code
  let cleanNumber = whatsappNumber.replace(/[^0-9+]/g, '');
  // If number doesn't start with +, assume it needs country code
  if (!cleanNumber.startsWith('+')) {
    cleanNumber = '+' + cleanNumber;
  }
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
};
