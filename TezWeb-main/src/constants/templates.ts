import { BusinessCategory, Product } from '@/types/website';

interface CategoryTemplate {
  tagline: string;
  bannerImage: string;
  products: Omit<Product, 'id'>[];
  primaryColor: string;
}

export const CATEGORY_TEMPLATES: Record<BusinessCategory, CategoryTemplate> = {
  shop: {
    tagline: 'Your Trusted Neighborhood Store',
    bannerImage: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&h=400&fit=crop&q=80',
    primaryColor: '#059669',
    products: [
      {
        name: 'Fresh Vegetables',
        description: 'Farm fresh vegetables delivered daily',
        price: '₹50/kg',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&q=80',
      },
      {
        name: 'Dairy Products',
        description: 'Pure milk, paneer, and dairy items',
        price: '₹60/liter',
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop&q=80',
      },
      {
        name: 'Household Essentials',
        description: 'All your daily needs under one roof',
        price: '₹100+',
        image: 'https://images.unsplash.com/photo-1584949602334-204ce8d8778a?w=400&h=300&fit=crop&q=80',
      },
    ],
  },
  bakery: {
    tagline: 'Freshly Baked Every Morning',
    bannerImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&h=400&fit=crop&q=80',
    primaryColor: '#dc2626',
    products: [
      {
        name: 'Special Cake',
        description: 'Custom cakes for all occasions',
        price: '₹500+',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&q=80',
      },
      {
        name: 'Fresh Bread',
        description: 'Soft and fluffy bread baked daily',
        price: '₹40',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&q=80',
      },
      {
        name: 'Cookies & Pastries',
        description: 'Delicious treats for tea time',
        price: '₹80',
        image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop&q=80',
      },
      {
        name: 'Birthday Special',
        description: 'Customized birthday cakes',
        price: '₹800+',
        image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop&q=80',
      },
    ],
  },
  clothing: {
    tagline: 'Style That Speaks For You',
    bannerImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop&q=80',
    primaryColor: '#9333ea',
    products: [
      {
        name: 'Ethnic Wear',
        description: 'Traditional sarees and suits',
        price: '₹1,500+',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop&q=80',
      },
      {
        name: 'Casual Collection',
        description: 'Comfortable everyday wear',
        price: '₹800+',
        image: 'https://images.unsplash.com/photo-1523359346063-d879354c0ea5?w=400&h=300&fit=crop&q=80',
      },
      {
        name: 'Kids Fashion',
        description: 'Trendy clothes for children',
        price: '₹500+',
        image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=300&fit=crop&q=80',
      },
    ],
  },
  electronics: {
    tagline: 'Latest Tech at Best Prices',
    bannerImage: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=400&fit=crop&q=80',
    primaryColor: '#2563eb',
    products: [
      {
        name: 'Mobile Phones',
        description: 'Latest smartphones and accessories',
        price: '₹10,000+',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&q=80',
      },
      {
        name: 'Laptops',
        description: 'Powerful laptops for work and gaming',
        price: '₹35,000+',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&q=80',
      },
      {
        name: 'Home Appliances',
        description: 'Smart home solutions',
        price: '₹5,000+',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80',
      },
      {
        name: 'Accessories',
        description: 'Earphones, chargers, and more',
        price: '₹500+',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop&q=80',
      },
    ],
  },
  restaurant: {
    tagline: 'Authentic Flavors, Fresh Ingredients',
    bannerImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=400&fit=crop&q=80',
    primaryColor: '#ea580c',
    products: [
      {
        name: 'Biryani Special',
        description: 'Aromatic biryani with tender meat',
        price: '₹200',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop&q=80',
      },
      {
        name: 'Thali',
        description: 'Complete meal with variety',
        price: '₹150',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&q=80',
      },
      {
        name: 'Chinese Combo',
        description: 'Delicious Indo-Chinese dishes',
        price: '₹180',
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop&q=80',
      },
    ],
  },
  salon: {
    tagline: 'Beauty & Grooming Experts',
    bannerImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=400&fit=crop&q=80',
    primaryColor: '#db2777',
    products: [
      {
        name: 'Hair Styling',
        description: 'Haircut, color, and styling',
        price: '₹300+',
        image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop&q=80',
      },
      {
        name: 'Facial Treatment',
        description: 'Glowing skin facial packages',
        price: '₹800+',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop&q=80',
      },
      {
        name: 'Bridal Makeup',
        description: 'Complete bridal makeover',
        price: '₹5,000+',
        image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop&q=80',
      },
    ],
  },
  pharmacy: {
    tagline: 'Your Health, Our Priority',
    bannerImage: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=1200&h=400&fit=crop&q=80',
    primaryColor: '#0891b2',
    products: [
      {
        name: 'Medicines',
        description: 'Prescription and OTC medicines',
        price: 'As per prescription',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop&q=80',
      },
      {
        name: 'Health Supplements',
        description: 'Vitamins and supplements',
        price: '₹300+',
        image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&h=300&fit=crop&q=80',
      },
      {
        name: 'First Aid',
        description: 'Emergency medical supplies',
        price: '₹100+',
        image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop&q=80',
      },
    ],
  },
  other: {
    tagline: 'Quality Products & Services',
    bannerImage: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&h=400&fit=crop&q=80',
    primaryColor: '#7c3aed',
    products: [
      {
        name: 'Product 1',
        description: 'High quality product for your needs',
        price: '₹500+',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&q=80',
      },
      {
        name: 'Product 2',
        description: 'Premium service with best results',
        price: '₹800+',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&q=80',
      },
      {
        name: 'Product 3',
        description: 'Special offer for limited time',
        price: '₹1,000+',
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop&q=80',
      },
    ],
  },
};
