import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <html lang="en" />
      {/* Preload critical assets */}
      <link rel="preload" href="/fonts/your-main-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      {/* Add PWA meta tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      {/* Add accessibility meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
  );
};

export default SEO; 