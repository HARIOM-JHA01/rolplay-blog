export const siteConfig = {
  name: 'Rolplay AI Blog',
  description: 'AI-powered insights, analysis, and reports on technology, markets, and innovation.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.rolplay.ai',
  ogImage: '/images/og-default.png',
  author: 'Rolplay AI',
  twitter: '@rolplayai',
  email: 'contact@rolplay.ai',
  locale: 'en',
  siteName: 'Rolplay AI Blog',
};

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'News', href: '/news' },
  { label: 'About', href: '/about' },
];

export const footerLinks = {
  product: [
    { label: 'News', href: '/news' },
    { label: 'About', href: '/about' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
  social: [
    { label: 'Twitter', href: 'https://twitter.com/rolplayai' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/rolplayai' },
  ],
};

export const BLOGS_PER_PAGE = 12;
export const REVALIDATE_INTERVAL = 3600; // 1 hour
