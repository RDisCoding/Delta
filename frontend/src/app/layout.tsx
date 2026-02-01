import './globals.css';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { client } from '../sanity/client';
import { groq } from 'next-sanity';
import { urlFor } from '../sanity/imageUrl';

async function getSiteSettings() {
  const query = groq`*[_type == "siteSettings"][0]{
    companyName,
    tagline,
    logo
  }`;
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: settings?.companyName || 'AgroPure Commodities',
    description: settings?.tagline || 'Premium Quality Agricultural Raw Materials - Wheat, Chana, Pulses and more. Contact us for bulk orders.',
    keywords: ['agricultural raw materials', 'wheat', 'chana', 'pulses', 'grains', 'bulk supplier', 'wholesale'],
    openGraph: {
      title: settings?.companyName || 'AgroPure Commodities',
      description: settings?.tagline || 'Premium Quality Agricultural Raw Materials',
      type: 'website',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const logoUrl = settings?.logo ? urlFor(settings.logo).url() : undefined;

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                // This function is called by Google Translate script
                // The actual initialization happens in Navbar component
              }
            `,
          }}
        />
        <script
          type="text/javascript"
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          async
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ScrollToTop />
        <Navbar companyName={settings?.companyName} logo={logoUrl} />
        <main className="min-h-screen">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}