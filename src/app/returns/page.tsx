import SeoMeta from "@/layouts/partials/SeoMeta";
import PageHeader from "@/layouts/partials/PageHeader";

const Returns = () => {
  return (
    <>
      <SeoMeta
        title="Returns & Refunds"
        meta_title="Returns & Refunds"
        description="MOOD returns and refunds. EU/EEA customers have a 14-day right of withdrawal. We extend the same 14-day returns window to customers outside the EU."
        image=""
      />
      <PageHeader title="Returns & Refunds" />

      <section className="py-10">
        <div className="container">
          <div className="content max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-text-light mb-8">
                We want you to love your MOOD T-shirt. If it is not right, you
                can return it.
              </p>

              <h2>14-day right of withdrawal (EU/EEA customers)</h2>
              <p>
                If you live in the EU/EEA, you can withdraw from your purchase
                within <strong>14 days</strong> of the day you (or someone you
                name, other than the carrier) receive your order, without giving
                a reason. This is your legal right under the EU Consumer Rights
                Directive (2011/83/EU), as applied in Cyprus.
              </p>
              <p>
                We extend the same 14-day returns window to customers outside
                the EU.
              </p>

              <h2>How to start a return</h2>
              <ol>
                <li>
                  Email{" "}
                  <a
                    href="mailto:moodcyi@gmail.com"
                    className="text-primary hover:underline"
                  >
                    moodcyi@gmail.com
                  </a>{" "}
                  within 14 days of delivery with your order number and the
                  item(s) you want to return. A clear written statement is
                  enough; you may also use the EU model withdrawal form (below).
                </li>
                <li>We reply with the return address and instructions.</li>
                <li>
                  Send the item(s) back within <strong>14 days</strong> of
                  telling us you are withdrawing.
                </li>
              </ol>

              <h2>Condition of returned items</h2>
              <p>
                Items should be unused, unworn, unwashed, and in their original
                condition with tags/packaging where possible. You may handle the
                T-shirt as you would in a shop to check size and fit. If an item
                comes back worn, washed, damaged or with reduced value beyond
                what is needed to check it, we may deduct the loss in value from
                your refund.
              </p>

              <h2>Return shipping costs</h2>
              <p>
                You pay the cost of returning the item, unless it arrived
                faulty, damaged, or not as ordered. We recommend a tracked
                service; we are not responsible for parcels lost on the way back
                to us.
              </p>

              <h2>Refunds</h2>
              <ul>
                <li>
                  We refund the price of the item(s) and the{" "}
                  <strong>original standard shipping cost</strong> (not extra
                  cost if you chose a faster method) within{" "}
                  <strong>14 days</strong> of receiving your withdrawal notice.
                </li>
                <li>
                  We may hold the refund until we receive the item back, or you
                  show proof you sent it, whichever is first.
                </li>
                <li>
                  Refunds go to your original payment method. No fees are
                  charged for the refund.
                </li>
                <li>
                  Partial returns: original shipping is refunded only if the
                  whole order is returned.
                </li>
              </ul>

              <h2>Faulty, damaged or wrong items</h2>
              <p>
                If your item arrives faulty, damaged or is not what you ordered,
                email us with your order number and photos within 14 days of
                delivery. We will replace or refund it and cover return
                shipping. This does not affect your legal guarantee rights: in
                the EU, goods must conform to the contract for at least{" "}
                <strong>2 years</strong> from delivery.
              </p>

              <h2>Exceptions</h2>
              <ul>
                <li>
                  Items that were personalised or made to your specifications
                  (custom orders) cannot be returned unless faulty.
                </li>
                <li>
                  Gift cards / discount codes are not refundable for cash.
                </li>
                <li>
                  Sale or discounted items follow the same rules as full-price
                  items (EU withdrawal right still applies).
                </li>
              </ul>

              <h2>Exchanges</h2>
              <p>
                Need a different size? Return the item for a refund and place a
                new order, or email us and we will help if stock allows.
              </p>

              <h2>Model withdrawal form (optional)</h2>
              <div className="not-prose border border-border rounded-md bg-light p-6 my-6 text-base text-text space-y-3">
                <p>
                  To: MOOD, Eleni kulumu, 8016 Paphos, Cyprus —{" "}
                  <a
                    href="mailto:moodcyi@gmail.com"
                    className="text-primary hover:underline"
                  >
                    moodcyi@gmail.com
                  </a>
                </p>
                <p>
                  I hereby give notice that I withdraw from my contract of sale
                  of the following goods: ___
                </p>
                <p>Ordered on / received on: ___ · Order number: ___</p>
                <p>Name: ___ · Address: ___ · Date: ___ · Signature (paper only)</p>
              </div>

              <h2>Contact</h2>
              <p>
                MOOD · Eleni kulumu, 8016 Paphos, Cyprus ·{" "}
                <a
                  href="mailto:moodcyi@gmail.com"
                  className="text-primary hover:underline"
                >
                  moodcyi@gmail.com
                </a>{" "}
                ·{" "}
                <a
                  href="tel:+35796465036"
                  className="text-primary hover:underline"
                >
                  +357 96 465036
                </a>
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

export default Returns;
