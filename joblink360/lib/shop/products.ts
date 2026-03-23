// lib/shop/products.ts
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  subcategory?: string;
  images: string[];
  videoUrl?: string;
  tags: string[];
  inStock: boolean;
  quantity: number;
  rating: number;
  reviewCount: number;
  isDigital: boolean;
  downloadUrl?: string;
  featured: boolean;
  bestseller: boolean;
  onSale: boolean;
  saleEndDate?: string;
  specifications: Record<string, string>;
  variants?: ProductVariant[];
  relatedProducts?: string[];
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  attributes: Record<string, string>;
  quantity: number;
}

export const PRODUCTS: Product[] = [
  // Tech & AI Courses
  {
    id: '1',
    name: 'AI Fundamentals Masterclass',
    slug: 'ai-fundamentals-masterclass',
    description: 'Complete AI fundamentals course with hands-on projects',
    longDescription: 'Master Artificial Intelligence from scratch. Learn machine learning, neural networks, and real-world applications.',
    price: 299,
    compareAtPrice: 499,
    category: 'Courses',
    subcategory: 'AI & Machine Learning',
    images: ['/shop/products/ai-course-1.jpg', '/shop/products/ai-course-2.jpg'],
    tags: ['AI', 'Machine Learning', 'Certificate'],
    inStock: true,
    quantity: 50,
    rating: 4.8,
    reviewCount: 124,
    isDigital: true,
    downloadUrl: '/downloads/ai-course',
    featured: true,
    bestseller: true,
    onSale: true,
    saleEndDate: '2024-12-31',
    specifications: {
      'Duration': '40 hours',
      'Certificate': 'Yes',
      'Level': 'Beginner to Advanced',
      'Projects': '12 real-world projects'
    }
  },
  {
    id: '2',
    name: 'Full-Stack Web Development Bootcamp',
    slug: 'fullstack-web-dev-bootcamp',
    description: 'Become a full-stack developer in 12 weeks',
    longDescription: 'Master React, Node.js, MongoDB, and deployment. Build real-world applications.',
    price: 499,
    compareAtPrice: 799,
    category: 'Courses',
    subcategory: 'Web Development',
    images: ['/shop/products/web-dev-1.jpg'],
    tags: ['React', 'Node.js', 'MongoDB'],
    inStock: true,
    quantity: 100,
    rating: 4.9,
    reviewCount: 342,
    isDigital: true,
    featured: true,
    bestseller: true,
    onSale: true,
    specifications: {
      'Duration': '60 hours',
      'Certificate': 'Yes',
      'Projects': '8 projects',
      'Lifetime Access': 'Yes'
    }
  },
  {
    id: '3',
    name: 'Data Science with Python',
    slug: 'data-science-python',
    description: 'Complete data science certification program',
    longDescription: 'Master data analysis, visualization, and machine learning with Python.',
    price: 399,
    compareAtPrice: 599,
    category: 'Courses',
    subcategory: 'Data Science',
    images: ['/shop/products/data-science-1.jpg'],
    tags: ['Python', 'Pandas', 'Machine Learning'],
    inStock: true,
    quantity: 75,
    rating: 4.7,
    reviewCount: 256,
    isDigital: true,
    featured: true,
    onSale: false,
    specifications: {
      'Duration': '50 hours',
      'Certificate': 'Yes',
      'Projects': '15 projects'
    }
  },
  
  // Digital Products
  {
    id: '4',
    name: 'AI Prompt Engineering Guide',
    slug: 'ai-prompt-engineering-guide',
    description: 'Master the art of prompt engineering for AI models',
    longDescription: 'Learn to craft effective prompts for ChatGPT, Claude, Gemini, and more.',
    price: 49,
    compareAtPrice: 99,
    category: 'Digital Products',
    subcategory: 'E-books',
    images: ['/shop/products/prompt-guide-1.jpg'],
    tags: ['AI', 'Prompt Engineering', 'E-book'],
    inStock: true,
    quantity: 500,
    rating: 4.9,
    reviewCount: 567,
    isDigital: true,
    downloadUrl: '/downloads/prompt-guide.pdf',
    featured: true,
    bestseller: true,
    onSale: true,
    specifications: {
      'Format': 'PDF',
      'Pages': '250',
      'Language': 'English',
      'Bonus': 'Video tutorials included'
    }
  },
  {
    id: '5',
    name: 'Sovereign AI Agent Template Pack',
    slug: 'ai-agent-templates',
    description: '50+ AI agent templates for business automation',
    longDescription: 'Ready-to-use AI agent configurations for customer service, sales, marketing, and operations.',
    price: 199,
    compareAtPrice: 399,
    category: 'Digital Products',
    subcategory: 'Templates',
    images: ['/shop/products/agent-templates.jpg'],
    tags: ['AI', 'Automation', 'Templates'],
    inStock: true,
    quantity: 1000,
    rating: 4.8,
    reviewCount: 234,
    isDigital: true,
    downloadUrl: '/downloads/ai-templates.zip',
    featured: true,
    onSale: true,
    specifications: {
      'Format': 'ZIP',
      'Templates': '50+',
      'Platform': 'Universal',
      'Updates': '1 year'
    }
  },
  
  // Physical Products
  {
    id: '6',
    name: 'Sovereign Intelligence T-Shirt',
    slug: 'sovereign-tshirt',
    description: 'Premium quality cotton t-shirt with Sovereign AI design',
    longDescription: '100% organic cotton, eco-friendly printing. Available in multiple sizes and colors.',
    price: 39,
    compareAtPrice: 59,
    category: 'Merchandise',
    subcategory: 'Apparel',
    images: ['/shop/products/tshirt-1.jpg', '/shop/products/tshirt-2.jpg'],
    tags: ['Apparel', 'Merch', 'Limited Edition'],
    inStock: true,
    quantity: 200,
    rating: 4.7,
    reviewCount: 89,
    isDigital: false,
    featured: true,
    bestseller: true,
    onSale: true,
    variants: [
      {
        id: '6-s',
        name: 'Small',
        sku: 'SOV-TS-S',
        price: 39,
        attributes: { size: 'Small', color: 'Black' },
        quantity: 50
      },
      {
        id: '6-m',
        name: 'Medium',
        sku: 'SOV-TS-M',
        price: 39,
        attributes: { size: 'Medium', color: 'Black' },
        quantity: 80
      },
      {
        id: '6-l',
        name: 'Large',
        sku: 'SOV-TS-L',
        price: 39,
        attributes: { size: 'Large', color: 'Black' },
        quantity: 70
      }
    ],
    specifications: {
      'Material': '100% Cotton',
      'Sizes': 'S, M, L, XL',
      'Colors': 'Black, Navy, Gray',
      'Care': 'Machine wash cold'
    }
  },
  {
    id: '7',
    name: 'Titanium ERP Hoodie',
    slug: 'titanium-hoodie',
    description: 'Premium hoodie with Titanium ERP branding',
    longDescription: 'Comfortable, high-quality hoodie perfect for developers and tech enthusiasts.',
    price: 69,
    compareAtPrice: 99,
    category: 'Merchandise',
    subcategory: 'Apparel',
    images: ['/shop/products/hoodie-1.jpg'],
    tags: ['Apparel', 'Hoodie', 'Premium'],
    inStock: true,
    quantity: 150,
    rating: 4.9,
    reviewCount: 67,
    isDigital: false,
    featured: true,
    bestseller: false,
    onSale: true,
    variants: [
      {
        id: '7-m',
        name: 'Medium',
        sku: 'TIT-HOOD-M',
        price: 69,
        attributes: { size: 'Medium', color: 'Navy' },
        quantity: 50
      },
      {
        id: '7-l',
        name: 'Large',
        sku: 'TIT-HOOD-L',
        price: 69,
        attributes: { size: 'Large', color: 'Navy' },
        quantity: 60
      }
    ],
    specifications: {
      'Material': '80% Cotton, 20% Polyester',
      'Sizes': 'M, L, XL',
      'Colors': 'Navy, Black',
      'Care': 'Machine washable'
    }
  },
  
  // Software & Tools
  {
    id: '8',
    name: 'Sovereign AI Assistant Pro',
    slug: 'ai-assistant-pro',
    description: 'Advanced AI assistant for business automation',
    longDescription: 'AI-powered virtual assistant that automates tasks, manages schedules, and provides insights.',
    price: 299,
    compareAtPrice: 499,
    category: 'Software',
    subcategory: 'AI Tools',
    images: ['/shop/products/ai-assistant.jpg'],
    tags: ['AI', 'Software', 'Automation'],
    inStock: true,
    quantity: 1000,
    rating: 4.8,
    reviewCount: 156,
    isDigital: true,
    downloadUrl: '/downloads/ai-assistant.exe',
    featured: true,
    bestseller: true,
    onSale: true,
    specifications: {
      'Platform': 'Windows, Mac, Linux',
      'License': 'Annual',
      'Updates': 'Free',
      'Support': '24/7 AI support'
    }
  },
  {
    id: '9',
    name: 'JobLink360 Premium API',
    slug: 'joblink-api',
    description: 'Access to 10,000+ jobs via API',
    longDescription: 'Real-time job data API with advanced filtering and analytics.',
    price: 199,
    compareAtPrice: 399,
    category: 'Software',
    subcategory: 'API',
    images: ['/shop/products/api-access.jpg'],
    tags: ['API', 'Jobs', 'Data'],
    inStock: true,
    quantity: 500,
    rating: 4.7,
    reviewCount: 89,
    isDigital: true,
    featured: true,
    onSale: false,
    specifications: {
      'Requests': '10,000/month',
      'Support': 'Email support',
      'Documentation': 'Full API docs',
      'SLA': '99.9% uptime'
    }
  }
];

// Generate 40+ more products programmatically
const categories = ['Courses', 'Digital Products', 'Merchandise', 'Software', 'Services', 'E-books'];
const subcategories = {
  'Courses': ['AI', 'Web Development', 'Data Science', 'DevOps', 'Cloud', 'Security'],
  'Digital Products': ['E-books', 'Templates', 'Assets', 'Design Kits', 'Fonts'],
  'Merchandise': ['Apparel', 'Accessories', 'Stationery', 'Gadgets'],
  'Software': ['AI Tools', 'API', 'Plugins', 'Extensions', 'SaaS'],
  'Services': ['Consulting', 'Coaching', 'Support', 'Custom Development'],
  'E-books': ['Technology', 'Business', 'Self-Development', 'AI Guides']
};

const productNames = [
  'Advanced Machine Learning', 'Cloud Architecture Mastery', 'DevOps Engineering', 'Cybersecurity Professional',
  'React Native Mobile Dev', 'Flutter Complete Guide', 'Blockchain Development', 'Smart Contract Programming',
  'AI Ethics & Governance', 'Quantum Computing Basics', 'Edge Computing Solutions', 'IoT Device Programming',
  'Sovereign Dev Kit', 'API Integration Suite', 'Automation Workflow Templates', 'Data Visualization Tools',
  'Premium Sticker Pack', 'Sovereign Coffee Mug', 'Tech Enthusiast Cap', 'Laptop Sleeve Case',
  'Digital Business Card', 'Executive Coaching', 'Team Training Program', 'Custom AI Development'
];

for (let i = 10; i <= 50; i++) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const subcatList = subcategories[category as keyof typeof subcategories];
  const subcategory = subcatList[Math.floor(Math.random() * subcatList.length)];
  const name = productNames[(i - 10) % productNames.length] + (i > 33 ? ` ${Math.floor(i/10)}.0` : '');
  
  PRODUCTS.push({
    id: i.toString(),
    name: name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    description: `Master ${name} with our comprehensive training and materials`,
    longDescription: `Complete ${name} course with hands-on projects, certification, and lifetime access.`,
    price: Math.random() > 0.7 ? 49 + Math.floor(Math.random() * 300) : 29 + Math.floor(Math.random() * 100),
    compareAtPrice: Math.random() > 0.5 ? undefined : 99 + Math.floor(Math.random() * 200),
    category: category,
    subcategory: subcategory,
    images: ['/shop/products/default-product.jpg'],
    tags: [category, subcategory, 'Premium'],
    inStock: Math.random() > 0.1,
    quantity: 50 + Math.floor(Math.random() * 500),
    rating: 4 + Math.random(),
    reviewCount: 10 + Math.floor(Math.random() * 200),
    isDigital: category !== 'Merchandise',
    featured: i < 20,
    bestseller: i < 15,
    onSale: Math.random() > 0.7,
    specifications: {
      'Duration': `${20 + Math.floor(Math.random() * 40)} hours`,
      'Certificate': 'Yes',
      'Projects': `${5 + Math.floor(Math.random() * 15)} projects`,
      'Access': 'Lifetime'
    }
  });
}

export const getProductById = (id: string) => PRODUCTS.find(p => p.id === id);
export const getProductBySlug = (slug: string) => PRODUCTS.find(p => p.slug === slug);
export const getProductsByCategory = (category: string) => PRODUCTS.filter(p => p.category === category);
export const getFeaturedProducts = () => PRODUCTS.filter(p => p.featured).slice(0, 8);
export const getBestsellers = () => PRODUCTS.filter(p => p.bestseller).slice(0, 8);
export const getOnSale = () => PRODUCTS.filter(p => p.onSale).slice(0, 8);
