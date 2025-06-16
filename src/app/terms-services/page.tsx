import SeoMeta from "@/layouts/partials/SeoMeta";
import PageHeader from "@/layouts/partials/PageHeader";

const TermsOfService = () => {
  return (
    <>
      <SeoMeta
        title="Terms of Service"
        meta_title="Terms of Service"
        description="Terms of Service for MOOD - Read our terms and conditions for purchasing and using our products."
        image=""
      />
      <PageHeader title="Terms of Service" />
      
      <section className="py-10">
        <div className="container">
          <div className="content max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-text-light mb-8">
                Welcome to MOOD! These terms and conditions outline the rules and regulations for the use of MOOD's Website and services.
              </p>

              <h2>1. Introduction</h2>
              <p>
                By accessing this website, we assume you accept these terms and conditions. Do not continue to use MOOD if you do not agree to take all of the terms and conditions stated on this page.
              </p>

              <h2>2. Definitions</h2>
              <p>
                The following terminology applies to these terms:
              </p>
              <ul>
                <li><strong>"Company"</strong> (or "we" or "us" or "our") refers to MOOD.</li>
                <li><strong>"You"</strong> refers to the user or viewer of our website.</li>
                <li><strong>"Service"</strong> refers to the website and products offered by MOOD.</li>
              </ul>

              <h2>3. Products and Services</h2>
              <p>
                MOOD specializes in crypto-inspired streetwear and T-shirts. All products are subject to availability and we reserve the right to discontinue any product at any time.
              </p>

              <h2>4. Orders and Payment</h2>
              <p>
                When you place an order with us, you agree to provide accurate and complete information. We reserve the right to refuse or cancel orders at our discretion.
              </p>
              <ul>
                <li>All prices are subject to change without notice</li>
                <li>Payment must be received before order processing</li>
                <li>We accept various payment methods as displayed at checkout</li>
              </ul>

              <h2>5. Shipping and Delivery</h2>
              <p>
                Shipping policies vary by location:
              </p>
              <ul>
                <li><strong>Cyprus:</strong> Free shipping</li>
                <li><strong>International:</strong> Shipping costs covered by buyer</li>
                <li>Delivery times may vary based on location and product availability</li>
                <li>We are not responsible for delays caused by customs or postal services</li>
              </ul>

              <h2>6. Returns and Exchanges</h2>
              <p>
                We offer a 14-day return policy for unworn items in original condition:
              </p>
              <ul>
                <li>Items must be returned within 14 days of delivery</li>
                <li>Items must be unworn, unwashed, and in original packaging</li>
                <li>Return shipping costs are the responsibility of the customer</li>
                <li>Refunds will be processed within 5-10 business days after receiving returned items</li>
              </ul>

              <h2>7. Intellectual Property</h2>
              <p>
                All content on this website, including designs, logos, and text, is the property of MOOD and is protected by copyright and trademark laws. You may not use our content without explicit written permission.
              </p>

              <h2>8. Limited Edition Policy</h2>
              <p>
                Our products are released in limited quantities. Once sold out, designs will not be reprinted. This policy ensures exclusivity and authenticity of our drops.
              </p>

              <h2>9. User Conduct</h2>
              <p>
                When using our website, you agree not to:
              </p>
              <ul>
                <li>Use the service for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of the website</li>
                <li>Upload or transmit malicious code</li>
              </ul>

              <h2>10. Privacy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
              </p>

              <h2>11. Disclaimers</h2>
              <p>
                The information on this website is provided on an "as is" basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
              </p>

              <h2>12. Limitation of Liability</h2>
              <p>
                In no event shall MOOD be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>

              <h2>13. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of the service after changes constitutes acceptance of the new terms.
              </p>

              <h2>14. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p>
                <strong>Email:</strong> <a href="mailto:moodcyi@gmail.com" className="text-primary hover:underline">moodcyi@gmail.com</a>
              </p>

              <hr className="my-8" />
              
              <p className="text-sm text-text-light">
                <strong>Last updated:</strong> January 1, 2024
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsOfService; 