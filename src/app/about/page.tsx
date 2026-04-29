import type { Metadata } from 'next';
import { siteConfig } from '@/lib/constants';
import { Sparkles, Shield, Zap, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about Rolplay AI Blog and our mission to deliver AI-powered insights.',
  openGraph: {
    title: 'About Us',
    description: 'Learn more about Rolplay AI Blog and our mission to deliver AI-powered insights.',
    url: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-muted-foreground">
            AI-powered insights for the modern world
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            Welcome to <strong>{siteConfig.name}</strong>, a next-generation content platform
            that leverages artificial intelligence to deliver comprehensive, data-driven reports
            and analysis on technology, markets, and innovation.
          </p>

          <h2>Our Mission</h2>
          <p>
            We believe that high-quality analysis should be accessible to everyone. Our platform
            uses advanced AI models to research, analyze, and generate reports that would
            traditionally require hours of manual work. The result? Fresh, accurate, and
            actionable insights delivered daily.
          </p>

          <h2>How It Works</h2>
          <p>
            Our AI pipeline continuously monitors global trends, market data, and technological
            developments. Using state-of-the-art language models, we generate comprehensive
            reports that are then curated and published on this platform.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
            <div className="p-6 rounded-lg border">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-3">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">
                Advanced language models generate comprehensive analysis and reports.
              </p>
            </div>
            <div className="p-6 rounded-lg border">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-3">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Global Coverage</h3>
              <p className="text-sm text-muted-foreground">
                Analysis spanning markets, technology, science, and innovation worldwide.
              </p>
            </div>
            <div className="p-6 rounded-lg border">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-3">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Daily Updates</h3>
              <p className="text-sm text-muted-foreground">
                Fresh content published daily with the latest trends and analysis.
              </p>
            </div>
            <div className="p-6 rounded-lg border">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-3">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Quality Assured</h3>
              <p className="text-sm text-muted-foreground">
                Automated quality checks ensure accuracy and readability standards.
              </p>
            </div>
          </div>

          <h2>Our Technology</h2>
          <p>
            Built on cutting-edge infrastructure, our platform uses the latest in AI technology
            combined with a modern web stack to deliver fast, reliable, and SEO-optimized content.
            Every article is structured for maximum discoverability and shareability.
          </p>

          <h2>Get in Touch</h2>
          <p>
            Have questions, suggestions, or partnership inquiries? Reach out to us at{' '}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or connect with us
            on social media.
          </p>
        </div>
      </div>
    </div>
  );
}
