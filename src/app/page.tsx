// Temporary minimal page for testing production deployment
export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        MOOD - Production Test
      </h1>
      <p className="text-center text-lg">
        If you can see this, the basic routing is working!
      </p>
      <div className="text-center mt-8">
        <p>Environment check:</p>
        <ul className="list-disc list-inside mt-4">
          <li>Domain: {process.env.SHOPIFY_STORE_DOMAIN ? '✅ Set' : '❌ Missing'}</li>
          <li>Access Token: {process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ? '✅ Set' : '❌ Missing'}</li>
          <li>Site URL: {process.env.SITE_URL || 'Not set'}</li>
        </ul>
      </div>
    </div>
  );
}
