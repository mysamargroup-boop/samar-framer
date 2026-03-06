import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import Script from 'next/script';
import { PageTransition } from '@/components/layout/page-transition';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://samarframer.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Samar Framer | Luxury Wedding & Fashion Photographer',
    template: '%s | Samar Framer',
  },
  description: 'Premium photography studio specializing in Weddings, Fashion, and Products. Capturing cinematic moments that last forever.',
  keywords: ['Wedding Photographer', 'Fashion Photographer', 'Luxury Photography', 'Mumbai Photographer', 'Cinematic Photography'],
  openGraph: {
    title: 'Samar Framer | Luxury Wedding & Fashion Photographer',
    description: 'Premium photography studio specializing in Weddings, Fashion, and Products. Capturing cinematic moments that last forever.',
    url: baseUrl,
    siteName: 'Samar Framer',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samar Framer | Luxury Wedding & Fashion Photographer',
    description: 'Premium photography studio specializing in Weddings, Fashion, and Products.',
  },
  alternates: {
    canonical: baseUrl,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Allura&family=Great+Vibes&family=Cinzel:wght@400;700&family=Montserrat:wght@400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground min-h-screen flex flex-col">
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
          </noscript>
        )}

        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
              `}
        </Script>

        <Navbar />
        <main className="flex-grow">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
      </body>
    </html >
  );
}
