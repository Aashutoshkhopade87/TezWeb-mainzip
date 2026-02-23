export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string; // Primary image (for backward compatibility)
  images?: string[]; // Multiple images gallery
  averageRating?: number;
  reviewCount?: number;
}

export interface ProductReview {
  id: string;
  productId: string;
  websiteId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  timestamp: string;
  verified?: boolean;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  twitter: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
}

export interface AnalyticsEvent {
  type: 'view' | 'whatsapp_click' | 'product_view' | 'call_click' | 'directions_click';
  timestamp: string;
  productId?: string;
  productName?: string;
}

export interface ProductAnalytics {
  productId: string;
  productName: string;
  views: number;
  whatsappClicks: number;
}

export interface WebsiteAnalytics {
  websiteId: string;
  totalViews: number;
  totalWhatsAppClicks: number;
  totalCallClicks: number;
  events: AnalyticsEvent[];
  productStats: ProductAnalytics[];
  lastUpdated: string;
}

export interface WebsiteData {
  id: string;
  userId?: string; // ID of the user who created this website
  businessName: string;
  category: string;
  whatsappNumber: string;
  bannerImage: string;
  tagline: string;
  products: Product[];
  primaryColor: string;
  templateStyle?: string;
  customPrompt?: string;
  socialLinks: SocialLinks;
  shopAddress: string;
  gallery: GalleryImage[];
  createdAt: string;
  updatedAt?: string;
}

export interface GeneratorFormData {
  businessName: string;
  category: string;
  whatsappNumber: string;
  whatsappCountryCode?: string;
  templateStyle?: string;
  customPrompt?: string;
}

export type BusinessCategory = 
  | 'shop' 
  | 'bakery' 
  | 'clothing' 
  | 'electronics' 
  | 'restaurant' 
  | 'salon' 
  | 'pharmacy' 
  | 'other';

export type TemplateStyle = 'modern' | 'traditional' | 'minimal';

export interface TemplatePreview {
  category: BusinessCategory;
  style: TemplateStyle;
  name: string;
  description: string;
  previewImage: string;
  primaryColor: string;
}
