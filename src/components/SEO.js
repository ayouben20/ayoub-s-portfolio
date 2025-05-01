import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, keywords }) => {
  const siteUrl = 'https://ayoubben.com'; // Updated domain
  const defaultTitle = 'Ayoub Benammour - Full Stack Developer';
  const defaultDescription = 'Professional portfolio of Ayoub Benammour, a versatile developer specializing in web and game development. Expert in React, Node.js, and modern web technologies.';
  const defaultKeywords = 'Ayoub Benammour, web development, full stack developer, react developer, node.js developer, game development, unity developer, morocco developer';

  const schemaOrgWebPage = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    name: title || defaultTitle,
    description: description || defaultDescription,
    url: siteUrl,
    author: {
      '@type': 'Person',
      name: 'Ayoub Benammour',
      url: siteUrl,
      sameAs: [
        'https://github.com/ayoubben',
        'https://linkedin.com/in/ayoubben'
      ]
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <link rel="canonical" href={siteUrl} />
      <meta name="author" content="Ayoub Benammour" />
      <html lang="en" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content="Ayoub Benammour Portfolio" />
      <meta property="og:image" content={`${siteUrl}/images/og-image.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={`${siteUrl}/images/og-image.jpg`} />

      {/* Performance and PWA Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />

      {/* Preload Critical Assets */}
      <link rel="preload" href="/fonts/Montserrat-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/Montserrat-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgWebPage)}
      </script>
    </Helmet>
  );
};

export default SEO; 