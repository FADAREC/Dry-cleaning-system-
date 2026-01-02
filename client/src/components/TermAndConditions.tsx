import { businessConfig } from "../../../config/business";

export default function TermsAndConditions() {
  const { name } = businessConfig;
  const lastUpdated = "January 2, 2026";
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-600">
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By using the services of {name} ("we," "us," or "our"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services Offered</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {name} provides professional laundry, dry cleaning, ironing, stain treatment, and related fabric care services. Services are available at our two locations:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Yaba Branch: Suit 3, Wisdom Cafe, 2001 Cafeteria, Newhall, Unilag, Akoka-Yaba</li>
              <li>Lekki Branch: Grande Mall, Shop 2A, Second Floor, Orchid Road, Lekki</li>
            </ul>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Payment Policy</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-gray-800 font-semibold">100% Prepayment Required</p>
              <p className="text-gray-700 mt-2">
                All services require full payment at the time of drop-off or before scheduled pickup. Payment can be made via:
              </p>
            </div>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Bank Transfer to: CAPERBERRY FABRIC CARE - ORCHID</li>
              <li>Account Number: 5195709104 (Moniepoint)</li>
              <li>Cash at our physical locations</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              No items will be released without proof of payment.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Service Turnaround</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Standard Service:</strong> 4 working days from drop-off</li>
              <li><strong>Express Service:</strong> 24 hours (subject to availability, pricing varies by location)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Turnaround times are estimates and may be affected by factors beyond our control, including public holidays, equipment maintenance, or unusually high volume.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Customer Responsibilities</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Check Pockets:</strong> You are responsible for emptying all pockets. We are not liable for items left in garments (money, jewelry, electronics, etc.).</li>
              <li><strong>Highlight Stains:</strong> Point out any stains or special care requirements at drop-off. Undeclared stains may not receive treatment.</li>
              <li><strong>Accurate Count:</strong> Verify the item count on your receipt. Discrepancies must be reported immediately.</li>
              <li><strong>Timely Pickup:</strong> Items not collected within 1 month of completion may be donated or disposed of.</li>
            </ul>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Stain Removal</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We make every reasonable effort to remove stains. However, we cannot guarantee complete stain removal for all fabrics and stain types. If a stain cannot be safely removed without risking fabric damage, we will:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Inform you of the issue</li>
              <li>Not charge for stain treatment on that item</li>
              <li>Proceed with standard cleaning only (with your approval)</li>
            </ul>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Damage and Loss Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In the rare event that an item is damaged or lost during our care:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>We will reimburse you up to <strong>5 times the cleaning charge</strong> for that specific item</li>
              <li>Claims must be made <strong>within 24 hours</strong> of item collection</li>
              <li>Proof of purchase or value may be required for high-value items</li>
              <li>Our liability is limited to the reimbursement amount stated above</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              We are not liable for damage to items with pre-existing wear, weak seams, or undeclared damage.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Unclaimed Items</h2>
            <p className="text-gray-700 leading-relaxed">
              Items not collected within <strong>1 month</strong> of completion and notification will be considered abandoned. {name} reserves the right to donate, sell, or dispose of unclaimed items after this period. No refunds will be provided for unclaimed items.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              {name} is not liable for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
              <li>Items left in pockets or attached to garments</li>
              <li>Color bleeding or fading from garments not colorfast</li>
              <li>Shrinkage of natural fibers beyond industry norms</li>
              <li>Damage to buttons, beads, sequins, or decorative elements that cannot withstand professional cleaning</li>
              <li>Garments without care labels or with unclear care instructions</li>
            </ul>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Data Protection & Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              We collect and store customer information (name, phone, email, address) solely for service delivery and communication. We do not share your personal information with third parties except as required by law. By using our services, you consent to this data collection and usage.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Refund Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Due to the nature of our services (immediate processing upon receipt), we do not offer refunds once cleaning has commenced. If you are dissatisfied with our service quality, please contact us immediately so we can re-clean the items at no additional charge.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Modifications to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              {name} reserves the right to modify these Terms and Conditions at any time. Updated terms will be posted on our website and in-store. Continued use of our services after changes constitutes acceptance of the new terms.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms and Conditions are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from these terms or our services shall be resolved in the courts of Lagos State, Nigeria.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For questions about these Terms and Conditions, please contact us:
            </p>
            <ul className="list-none text-gray-700 space-y-2">
              <li><strong>Phone:</strong> +234 802 834 7146 (Yaba) | +234 813 654 5705 (Lekki)</li>
              <li><strong>Email:</strong> info@caperberrylaundry.com</li>
              <li><strong>WhatsApp:</strong> +234 802 834 7146</li>
            </ul>
          </section>
          
          <div className="mt-12 p-6 bg-gray-50 rounded-lg border">
            <p className="text-sm text-gray-600">
              <strong>Acknowledgment:</strong> By checking the "I accept the terms and conditions" box during booking, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer CTA */}
      <div className="bg-gray-50 border-t py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
