import { Helmet } from "react-helmet-async";
import { useTranslation } from "@/hooks/useTranslation";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: Record<string, any>;
}

const SITE_URL = "https://www.carmarket365.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export function SEO({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  jsonLd,
}: SEOProps) {
  const { t, currentLanguage } = useTranslation();

  const defaultTitle = t('meta.defaultTitle');
  const defaultDescription = t('meta.defaultDescription');

  const fullTitle = title ? `${title} | CarMarket365` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <html lang={currentLanguage} />
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={image} />
      {canonical && <link rel="canonical" href={`${SITE_URL}${canonical}`} />}
      {canonical && <meta property="og:url" content={`${SITE_URL}${canonical}`} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
