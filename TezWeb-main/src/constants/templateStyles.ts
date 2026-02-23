import { BusinessCategory, TemplateStyle, TemplatePreview } from '@/types/website';

export const TEMPLATE_STYLES: Record<BusinessCategory, Record<TemplateStyle, any>> = {
  shop: {
    modern: {
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
    traditional: {
      tagline: 'Serving the Community Since Years',
      bannerImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1200&h=400&fit=crop&q=80',
      primaryColor: '#b45309',
      products: [
        {
          name: 'Fresh Vegetables',
          description: 'Hand-picked fresh produce',
          price: '₹50/kg',
          image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Dairy Products',
          description: 'Traditional dairy goodness',
          price: '₹60/liter',
          image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Household Items',
          description: 'Quality products at fair prices',
          price: '₹100+',
          image: 'https://images.unsplash.com/photo-1584949602334-204ce8d8778a?w=400&h=300&fit=crop&q=80',
        },
      ],
    },
    minimal: {
      tagline: 'Fresh. Local. Quality.',
      bannerImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop&q=80',
      primaryColor: '#171717',
      products: [
        {
          name: 'Vegetables',
          description: 'Fresh daily',
          price: '₹50/kg',
          image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Dairy',
          description: 'Pure & fresh',
          price: '₹60/liter',
          image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Essentials',
          description: 'Daily needs',
          price: '₹100+',
          image: 'https://images.unsplash.com/photo-1584949602334-204ce8d8778a?w=400&h=300&fit=crop&q=80',
        },
      ],
    },
  },
  bakery: {
    modern: {
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
      ],
    },
    traditional: {
      tagline: 'Traditional Recipes, Modern Taste',
      bannerImage: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1200&h=400&fit=crop&q=80',
      primaryColor: '#92400e',
      products: [
        {
          name: 'Special Cake',
          description: 'Homemade cakes with love',
          price: '₹500+',
          image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Fresh Bread',
          description: 'Baked in traditional ovens',
          price: '₹40',
          image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Sweet Treats',
          description: 'Traditional Indian sweets',
          price: '₹80',
          image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop&q=80',
        },
      ],
    },
    minimal: {
      tagline: 'Baked Fresh. Simply Good.',
      bannerImage: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200&h=400&fit=crop&q=80',
      primaryColor: '#422006',
      products: [
        {
          name: 'Cake',
          description: 'Fresh daily',
          price: '₹500+',
          image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Bread',
          description: 'Soft & fluffy',
          price: '₹40',
          image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Pastries',
          description: 'Handcrafted',
          price: '₹80',
          image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop&q=80',
        },
      ],
    },
  },
  clothing: {
    modern: {
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
    traditional: {
      tagline: 'Embrace Timeless Elegance',
      bannerImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&h=400&fit=crop&q=80',
      primaryColor: '#7e22ce',
      products: [
        {
          name: 'Ethnic Wear',
          description: 'Authentic traditional attire',
          price: '₹1,500+',
          image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Festive Collection',
          description: 'Perfect for celebrations',
          price: '₹800+',
          image: 'https://images.unsplash.com/photo-1523359346063-d879354c0ea5?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Kids Traditional',
          description: 'Beautiful traditional wear',
          price: '₹500+',
          image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=300&fit=crop&q=80',
        },
      ],
    },
    minimal: {
      tagline: 'Wear What Matters',
      bannerImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=400&fit=crop&q=80',
      primaryColor: '#18181b',
      products: [
        {
          name: 'Ethnic',
          description: 'Timeless style',
          price: '₹1,500+',
          image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Casual',
          description: 'Everyday comfort',
          price: '₹800+',
          image: 'https://images.unsplash.com/photo-1523359346063-d879354c0ea5?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Kids',
          description: 'Quality basics',
          price: '₹500+',
          image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=300&fit=crop&q=80',
        },
      ],
    },
  },
  electronics: {
    modern: {
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
      ],
    },
    traditional: {
      tagline: 'Trusted Electronics Since Years',
      bannerImage: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200&h=400&fit=crop&q=80',
      primaryColor: '#1e40af',
      products: [
        {
          name: 'Mobile Phones',
          description: 'Reliable smartphones with warranty',
          price: '₹10,000+',
          image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Laptops',
          description: 'Premium quality computers',
          price: '₹35,000+',
          image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Appliances',
          description: 'Durable home electronics',
          price: '₹5,000+',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80',
        },
      ],
    },
    minimal: {
      tagline: 'Tech. Simplified.',
      bannerImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=400&fit=crop&q=80',
      primaryColor: '#1e293b',
      products: [
        {
          name: 'Phones',
          description: 'Latest models',
          price: '₹10,000+',
          image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Laptops',
          description: 'High performance',
          price: '₹35,000+',
          image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Appliances',
          description: 'Smart solutions',
          price: '₹5,000+',
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&q=80',
        },
      ],
    },
  },
  restaurant: {
    modern: {
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
    traditional: {
      tagline: 'Taste of Home, Away From Home',
      bannerImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=400&fit=crop&q=80',
      primaryColor: '#c2410c',
      products: [
        {
          name: 'Biryani Special',
          description: 'Traditional recipe biryani',
          price: '₹200',
          image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Thali',
          description: 'Authentic home-style meals',
          price: '₹150',
          image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Special Combo',
          description: 'Chef special combination',
          price: '₹180',
          image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop&q=80',
        },
      ],
    },
    minimal: {
      tagline: 'Good Food. Good Vibes.',
      bannerImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=400&fit=crop&q=80',
      primaryColor: '#7c2d12',
      products: [
        {
          name: 'Biryani',
          description: 'Signature dish',
          price: '₹200',
          image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Thali',
          description: 'Complete meal',
          price: '₹150',
          image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Combo',
          description: 'Best value',
          price: '₹180',
          image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop&q=80',
        },
      ],
    },
  },
  salon: {
    modern: {
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
    traditional: {
      tagline: 'Traditional Beauty Treatments',
      bannerImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&h=400&fit=crop&q=80',
      primaryColor: '#be185d',
      products: [
        {
          name: 'Hair Care',
          description: 'Natural hair treatments',
          price: '₹300+',
          image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Facial',
          description: 'Herbal facial packages',
          price: '₹800+',
          image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Bridal Package',
          description: 'Traditional bridal services',
          price: '₹5,000+',
          image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop&q=80',
        },
      ],
    },
    minimal: {
      tagline: 'Beauty Made Simple',
      bannerImage: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1200&h=400&fit=crop&q=80',
      primaryColor: '#831843',
      products: [
        {
          name: 'Hair',
          description: 'Cut & style',
          price: '₹300+',
          image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Facial',
          description: 'Glowing skin',
          price: '₹800+',
          image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Bridal',
          description: 'Full makeover',
          price: '₹5,000+',
          image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop&q=80',
        },
      ],
    },
  },
  pharmacy: {
    modern: {
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
    traditional: {
      tagline: 'Trusted Pharmacy Since Generations',
      bannerImage: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=1200&h=400&fit=crop&q=80',
      primaryColor: '#0e7490',
      products: [
        {
          name: 'Medicines',
          description: 'Quality medicines with care',
          price: 'As per prescription',
          image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Supplements',
          description: 'Health and wellness products',
          price: '₹300+',
          image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'First Aid',
          description: 'Complete first aid kits',
          price: '₹100+',
          image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop&q=80',
        },
      ],
    },
    minimal: {
      tagline: 'Healthcare Simplified',
      bannerImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&h=400&fit=crop&q=80',
      primaryColor: '#155e75',
      products: [
        {
          name: 'Medicines',
          description: 'Prescription drugs',
          price: 'As per prescription',
          image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Supplements',
          description: 'Health essentials',
          price: '₹300+',
          image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'First Aid',
          description: 'Emergency kit',
          price: '₹100+',
          image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop&q=80',
        },
      ],
    },
  },
  other: {
    modern: {
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
    traditional: {
      tagline: 'Trusted Service, Quality Results',
      bannerImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=400&fit=crop&q=80',
      primaryColor: '#6d28d9',
      products: [
        {
          name: 'Product 1',
          description: 'Reliable quality products',
          price: '₹500+',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Product 2',
          description: 'Expert service guaranteed',
          price: '₹800+',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Product 3',
          description: 'Best value for money',
          price: '₹1,000+',
          image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop&q=80',
        },
      ],
    },
    minimal: {
      tagline: 'Simple. Quality. Service.',
      bannerImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop&q=80',
      primaryColor: '#4c1d95',
      products: [
        {
          name: 'Product 1',
          description: 'Quality first',
          price: '₹500+',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Product 2',
          description: 'Premium service',
          price: '₹800+',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&q=80',
        },
        {
          name: 'Product 3',
          description: 'Best value',
          price: '₹1,000+',
          image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop&q=80',
        },
      ],
    },
  },
};

export const TEMPLATE_PREVIEWS: TemplatePreview[] = [
  // Shop templates
  {
    category: 'shop',
    style: 'modern',
    name: 'Fresh Green',
    description: 'Clean & vibrant for modern stores',
    previewImage: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop&q=80',
    primaryColor: '#059669',
  },
  {
    category: 'shop',
    style: 'traditional',
    name: 'Classic Store',
    description: 'Warm & welcoming traditional style',
    previewImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&h=400&fit=crop&q=80',
    primaryColor: '#b45309',
  },
  {
    category: 'shop',
    style: 'minimal',
    name: 'Simple Shop',
    description: 'Minimalist & focused design',
    previewImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop&q=80',
    primaryColor: '#171717',
  },
  // Bakery templates
  {
    category: 'bakery',
    style: 'modern',
    name: 'Fresh Bakes',
    description: 'Bold & appetizing modern bakery',
    previewImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop&q=80',
    primaryColor: '#dc2626',
  },
  {
    category: 'bakery',
    style: 'traditional',
    name: 'Heritage Bakery',
    description: 'Cozy traditional bakery feel',
    previewImage: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600&h=400&fit=crop&q=80',
    primaryColor: '#92400e',
  },
  {
    category: 'bakery',
    style: 'minimal',
    name: 'Pure Bakes',
    description: 'Clean artisanal bakery aesthetic',
    previewImage: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=400&fit=crop&q=80',
    primaryColor: '#422006',
  },
  // Clothing templates
  {
    category: 'clothing',
    style: 'modern',
    name: 'Fashion Forward',
    description: 'Trendy & stylish clothing store',
    previewImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&q=80',
    primaryColor: '#9333ea',
  },
  {
    category: 'clothing',
    style: 'traditional',
    name: 'Ethnic Elegance',
    description: 'Traditional wear showcase',
    previewImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=400&fit=crop&q=80',
    primaryColor: '#7e22ce',
  },
  {
    category: 'clothing',
    style: 'minimal',
    name: 'Simple Style',
    description: 'Minimalist fashion boutique',
    previewImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop&q=80',
    primaryColor: '#18181b',
  },
  // Electronics templates
  {
    category: 'electronics',
    style: 'modern',
    name: 'Tech Blue',
    description: 'Sleek modern electronics store',
    previewImage: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop&q=80',
    primaryColor: '#2563eb',
  },
  {
    category: 'electronics',
    style: 'traditional',
    name: 'Trusted Tech',
    description: 'Reliable electronics dealer',
    previewImage: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&h=400&fit=crop&q=80',
    primaryColor: '#1e40af',
  },
  {
    category: 'electronics',
    style: 'minimal',
    name: 'Pure Tech',
    description: 'Clean tech showcase',
    previewImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&q=80',
    primaryColor: '#1e293b',
  },
  // Restaurant templates
  {
    category: 'restaurant',
    style: 'modern',
    name: 'Spice Orange',
    description: 'Vibrant modern restaurant',
    previewImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop&q=80',
    primaryColor: '#ea580c',
  },
  {
    category: 'restaurant',
    style: 'traditional',
    name: 'Home Kitchen',
    description: 'Authentic traditional dining',
    previewImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop&q=80',
    primaryColor: '#c2410c',
  },
  {
    category: 'restaurant',
    style: 'minimal',
    name: 'Simple Dining',
    description: 'Minimalist food experience',
    previewImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&q=80',
    primaryColor: '#7c2d12',
  },
  // Salon templates
  {
    category: 'salon',
    style: 'modern',
    name: 'Glam Pink',
    description: 'Modern beauty salon',
    previewImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop&q=80',
    primaryColor: '#db2777',
  },
  {
    category: 'salon',
    style: 'traditional',
    name: 'Beauty Heritage',
    description: 'Traditional beauty treatments',
    previewImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop&q=80',
    primaryColor: '#be185d',
  },
  {
    category: 'salon',
    style: 'minimal',
    name: 'Pure Beauty',
    description: 'Minimalist salon aesthetic',
    previewImage: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=400&fit=crop&q=80',
    primaryColor: '#831843',
  },
  // Pharmacy templates
  {
    category: 'pharmacy',
    style: 'modern',
    name: 'Health Blue',
    description: 'Modern healthcare pharmacy',
    previewImage: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=600&h=400&fit=crop&q=80',
    primaryColor: '#0891b2',
  },
  {
    category: 'pharmacy',
    style: 'traditional',
    name: 'Trusted Pharmacy',
    description: 'Classic reliable pharmacy',
    previewImage: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=400&fit=crop&q=80',
    primaryColor: '#0e7490',
  },
  {
    category: 'pharmacy',
    style: 'minimal',
    name: 'Simple Health',
    description: 'Clean healthcare design',
    previewImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=400&fit=crop&q=80',
    primaryColor: '#155e75',
  },
  // Other templates
  {
    category: 'other',
    style: 'modern',
    name: 'Vibrant Purple',
    description: 'Bold modern business style',
    previewImage: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&h=400&fit=crop&q=80',
    primaryColor: '#7c3aed',
  },
  {
    category: 'other',
    style: 'traditional',
    name: 'Classic Business',
    description: 'Professional traditional look',
    previewImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop&q=80',
    primaryColor: '#6d28d9',
  },
  {
    category: 'other',
    style: 'minimal',
    name: 'Simple Business',
    description: 'Clean professional design',
    previewImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop&q=80',
    primaryColor: '#4c1d95',
  },
];
