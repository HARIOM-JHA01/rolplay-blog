import type { Metadata } from 'next';
import { siteConfig } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Rolplay AI Blog. Learn how we collect, use, and protect your data.',
  openGraph: {
    title: 'Privacy Policy',
    description: 'Privacy policy for Rolplay AI Blog.',
    url: `${siteConfig.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: April 2026</p>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            This Privacy Policy describes how {siteConfig.name} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;)
            collects, uses, and shares information when you use our blog platform.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect minimal information to provide our services:
          </p>
          <ul>
            <li><strong>Usage Data:</strong> Page views, reading time, and interaction metrics to improve content quality.</li>
            <li><strong>Technical Data:</strong> Browser type, device type, and referral source for analytics purposes.</li>
          </ul>

          <h2>How We Use Information</h2>
          <p>
            The information we collect is used to:
          </p>
          <ul>
            <li>Improve our content and user experience</li>
            <li>Analyze trends and usage patterns</li>
            <li>Maintain and enhance our platform</li>
          </ul>

          <h2>Third-Party Services</h2>
          <p>
            We use MongoDB Atlas for data storage. These services have their own privacy policies
            and data handling practices.
          </p>

          <h2>Cookies</h2>
          <p>
            We do not use tracking cookies. Any cookies set are strictly necessary for the
            functioning of the website.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain usage analytics data for up to 26 months. Blog content and associated
            metadata are retained indefinitely as part of our published archive.
          </p>

          <h2>Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data where applicable</li>
          </ul>

          <h2>Contact</h2>
          <p>
            For any privacy-related inquiries, please contact us at{' '}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
