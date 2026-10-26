import SeoMeta from "@/layouts/partials/SeoMeta";
import PageHeader from "@/layouts/partials/PageHeader";

const ACS_PRICELIST_PDF =
  "https://cyp.acscourier.net/media/canpe2pc/acs-courier-international-pricelist-2026.pdf";

const Shipping = () => {
  return (
    <>
      <SeoMeta
        title="Shipping"
        meta_title="Shipping"
        description="MOOD shipping rates and delivery times. We ship worldwide from Cyprus via ACS Courier. Free shipping within Cyprus."
        image=""
      />
      <PageHeader title="Shipping" />

      <section className="py-10">
        <div className="container">
          <div className="content max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-text-light mb-8">
                We ship worldwide from Cyprus via ACS Courier. Tracking is
                included. Rates below are customer prices for a typical order
                billed as up to 1 kg.
              </p>

              <h2>Order processing</h2>
              <p>
                Orders usually ship within <strong>1–3 business days</strong>{" "}
                after payment.
              </p>

              <h2>Shipping rates</h2>
              <p>Free shipping within Cyprus.</p>

              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Destination</th>
                      <th>Rate</th>
                      <th>Typical delivery</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Cyprus</strong>
                      </td>
                      <td>Free</td>
                      <td>1–3 business days</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Greece</strong>
                      </td>
                      <td>€35</td>
                      <td>2–5 business days</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>EU Zone 1</strong> (Austria, Belgium, France,
                        Germany, Italy, Luxembourg, Netherlands, Monaco)
                      </td>
                      <td>€49</td>
                      <td>3–7 business days</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>United Kingdom</strong>
                      </td>
                      <td>€50</td>
                      <td>3–7 business days</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>EU Zone 2</strong> (Spain, Portugal, Ireland,
                        Poland, Sweden, Finland, Denmark, Czechia, Hungary,
                        Romania, Bulgaria, Croatia, Slovakia, Slovenia, Estonia,
                        Latvia, Lithuania, Malta, and other ACS Zone 2 EU)
                      </td>
                      <td>€54</td>
                      <td>3–8 business days</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Zone 3</strong> (USA, Canada, China, Israel,
                        Switzerland, Norway, UAE, Turkey, India, Singapore,
                        Hong Kong, Mexico, and other ACS Zone 3)
                      </td>
                      <td>€70</td>
                      <td>4–10 business days</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Zone 4</strong> (Australia, Japan, Brazil, South
                        Africa, New Zealand, Argentina, and other ACS Zone 4)
                      </td>
                      <td>€75</td>
                      <td>5–12 business days</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                For the full country-to-zone map, see the{" "}
                <a
                  href={ACS_PRICELIST_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  ACS Courier international pricelist (PDF)
                </a>
                .
              </p>

              <h2>Customs and delivery times</h2>
              <ul>
                <li>
                  Outside the EU, the buyer is responsible for any customs
                  duties or import VAT.
                </li>
                <li>
                  Delivery times are estimates and can vary by destination and
                  customs.
                </li>
              </ul>

              <h2>Questions</h2>
              <p>
                For shipping questions, email{" "}
                <a
                  href="mailto:moodcyi@gmail.com"
                  className="text-primary hover:underline"
                >
                  moodcyi@gmail.com
                </a>
                .
              </p>

              <hr className="my-8" />

              <p className="text-sm text-text-light">
                <strong>Last updated:</strong> October 26, 2026
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shipping;
