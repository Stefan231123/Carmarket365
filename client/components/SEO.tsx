import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: Record<string, any>;
}

const DEFAULT_TITLE = "CarMarket365 - Find Your Perfect Car";
const DEFAULT_DESCRIPTION = "CarMarket365 - The leading multilingual car marketplace. Buy and sell cars across Europe.";
const SITE_URL = "https://www.carmarket365.com";

export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogImage,
  ogType = "website",
  jsonLd,
}: SEOProps) {
  const fullTitle = title ? `${title} | CarMarket365` : DEFAULT_TITLE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonical && <link rel="canonical" href={`${SITE_URL}${canonical}`} />}
      {canonical && <meta property="og:url" content={`${SITE_URL}${canonical}`} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
