// Policy pages (copy from design/source/Policy.dc.html). Kept at the site root, outside any country prefix.
export interface PolicySection {
  id: string;
  h: string;
  p: string;
  items?: string[];
}

export interface Policy {
  key: 'returns' | 'terms' | 'privacy' | 'disclaimer';
  title: string;
  path: string;
  seoTitle: string;
  meta: string;
  intro: string;
  factsTitle?: string;
  facts?: { k: string; v: string }[];
  sections: PolicySection[];
}

const returns: Policy = {
  key: 'returns',
  title: 'Return and Refund Policy',
  path: '/return-and-refund-policy/',
  seoTitle: 'Return and Refund Policy | Hull Cases',
  meta: 'How returns work at Hull Cases: RMA required, 30-day window, 25% restocking fee on non-defective items, and final-sale items.',
  intro:
    'Thank you for choosing Hull Cases. All returns, defective or not, need a Return Merchandise Authorization (RMA) number and a copy of the original invoice. To request an RMA, email info@hullcases.com.',
  factsTitle: 'Quick return facts',
  facts: [
    { k: 'RMA required', v: 'Every return needs an RMA number. Email info@hullcases.com to start.' },
    { k: '30-day window', v: 'Defective or stock items must be returned within 30 days of purchase, in original packaging.' },
    { k: 'Final sale', v: 'Custom cases, foam inserts (including foam inside cases), modified or printed items, and flashlights.' },
    { k: 'Restocking fee', v: 'Non-defective stock returns have a 25% restocking fee.' },
    { k: 'Shipping', v: 'Shipping and handling fees are non-refundable. Once an order leaves our facility, the carrier is responsible for loss or damage.' },
    { k: 'Fitment', v: 'We guarantee a perfect fit only when you send us your physical parts for custom foam fabrication.' },
  ],
  sections: [
    {
      id: 'defective',
      h: 'Defective merchandise',
      p: 'If a product is defective from the manufacturer (this does not include shipping damage), it may be returned for a replacement or refund within 30 days of purchase, provided that:',
      items: [
        'The product is returned in its original packaging.',
        'Manufacturer warranty support: if the original manufacturer is unwilling or unable to repair or replace the item under their warranty, Hull Cases will issue a refund or replacement.',
        'All shipping charges are non-refundable.',
      ],
    },
    {
      id: 'stock',
      h: 'Non-defective stock merchandise',
      p: 'Regular stock items may be returned for a refund within 30 days of purchase, subject to:',
      items: [
        'A 25% restocking fee.',
        'The product must be unused, undamaged and in its original packaging.',
        'All shipping and handling charges are non-refundable.',
      ],
    },
    {
      id: 'final-sale',
      h: 'Non-returnable and final sale items',
      p: 'These items are made-to-order, custom or hygiene-sensitive and cannot be returned or exchanged. Please verify all specifications before ordering:',
      items: [
        'Custom orders: all custom cases, modified cases (including printing) and cases with glued-in foam or material.',
        'Foam products: all standalone foam inserts and foam sets included within cases.',
        'Clearance and non-stock: all non-stocked cases, discounted items and flashlights.',
        'Any product marked “Non-Returnable” at the time of purchase.',
      ],
    },
    {
      id: 'shipping',
      h: 'Shipping and carrier liability',
      p: 'Once a product leaves our facility (via UPS, FedEx, freight or customer pickup), the risk of loss or damage passes to the customer. Hull Cases is not responsible for missing, lost or damaged packages.',
      items: [
        'Insurance and signatures: if you have concerns about delivery security, contact us before shipping to buy shipping insurance or require a signature on delivery.',
        'Shipping claims: if a carrier loses or damages your product, we will help you with the claims process, but we cannot guarantee the carrier’s final decision.',
        'Delivery guarantees: transit times and delivery dates (Overnight, 2nd Day, etc.) are guaranteed by the carrier, not Hull Cases. We guarantee on-time dispatch from our facility but are not liable for carrier delays.',
        'Returned to sender: if a package comes back after failed delivery attempts, the customer pays the shipping to resend it. If you choose a refund instead, a 25% restocking fee applies.',
      ],
    },
    {
      id: 'fitment',
      h: 'Fitment and recommendations',
      p: 'Our team works to give good product recommendations, but the final decision on fit and purchase lies with the customer.',
      items: [
        'Hull Cases is not liable for products that don’t fit or don’t suit you based on general recommendations.',
        'Guaranteed fit: we only guarantee a proper fit if you send the physical parts to our facility to be fitted into a custom foam insert.',
      ],
    },
    {
      id: 'manufacturer',
      h: 'Manufacturer direct guarantees',
      p: 'Some manufacturers offer their own money-back guarantees. Please check the documentation included with your merchandise; you may be able to return or exchange directly through the manufacturer.',
    },
  ],
};

// TODO(content): the design carries only the opening line of each section; paste the full
// Terms of Service text from the current live page before launch (see README, "Open items").
const terms: Policy = {
  key: 'terms',
  title: 'Terms and Conditions',
  path: '/terms-and-conditions/',
  seoTitle: 'Terms and Conditions | Hull Cases',
  meta: 'The Terms of Service for buying from Hull Cases and using hullcases.com: orders, pricing, products, returns and contact details.',
  intro: 'This website is operated by Hull Cases. By visiting our site or buying from us, you agree to these Terms of Service.',
  sections: [
    { id: 'overview', h: 'Overview', p: 'Hull Cases offers this website, including all information, tools and services, to you on the condition that you accept all terms, conditions, policies and notices stated here.' },
    { id: 's1', h: '1. Online store terms', p: 'By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence.' },
    { id: 's2', h: '2. General conditions', p: 'We reserve the right to refuse service to anyone for any reason at any time. Credit card information is always encrypted during transfer over networks.' },
    { id: 's3', h: '3. Accuracy, completeness and timeliness of information', p: 'We are not responsible if information made available on this site is not accurate, complete or current.' },
    { id: 's4', h: '4. Modifications to the service and prices', p: 'Prices for our products are subject to change without notice.' },
    { id: 's5', h: '5. Products or services', p: 'Certain products or services may be available exclusively online and may have limited quantities. They are subject to return or exchange only according to our Return and Refund Policy.' },
    { id: 's6', h: '6. Accuracy of billing and account information', p: 'We reserve the right to refuse any order you place with us, and may limit or cancel quantities purchased per person, household or order.' },
    { id: 's7', h: '7. Optional tools', p: 'We may provide access to third-party tools that we do not monitor or control.' },
    { id: 's8', h: '8. Third-party links', p: 'Some content, products and services on our site may include materials from third parties.' },
    { id: 's9', h: '9. User comments, feedback and other submissions', p: 'Ideas, suggestions or other materials you send us may be used by us without restriction.' },
    { id: 's10', h: '10. Personal information', p: 'Your submission of personal information through the store is governed by our Privacy Policy.' },
    { id: 's11', h: '11. Errors, inaccuracies and omissions', p: 'Occasionally our site may contain typographical errors, inaccuracies or omissions relating to product descriptions, pricing, promotions, shipping charges, transit times or availability.' },
    { id: 's12', h: '12. Prohibited uses', p: 'You may not use the site or its content for any unlawful purpose or in breach of these Terms.' },
    { id: 's13', h: '13. Disclaimer of warranties; limitation of liability', p: 'We do not guarantee that your use of our service will be uninterrupted, timely, secure or error-free.' },
    { id: 's14', h: '14. Indemnification', p: 'You agree to indemnify and hold harmless Hull Cases and its affiliates from claims arising from your breach of these Terms.' },
    { id: 's15', h: '15. Severability', p: 'If any provision of these Terms is found unenforceable, the remaining provisions stay in effect.' },
    { id: 's16', h: '16. Termination', p: 'These Terms are effective unless and until terminated by you or us.' },
    { id: 's17', h: '17. Entire agreement', p: 'These Terms and any policies posted on this site make up the entire agreement between you and us.' },
    { id: 's19', h: '18. Changes to Terms of Service', p: 'You can review the most current version of the Terms at any time on this page.' },
    { id: 's20', h: '19. Contact information', p: 'Questions about the Terms of Service should be sent to support@hullcases.com.' },
  ],
};

const privacy: Policy = {
  key: 'privacy',
  title: 'Privacy Policy',
  path: '/privacy-policy/',
  seoTitle: 'Privacy Policy | Hull Cases',
  meta: 'How Hull Cases collects, uses and shares personal information when you visit hullcases.com, contact us or buy from us.',
  intro:
    'This Privacy Policy explains how Hull Cases, 3827 Wacker Dr., Mira Loma, CA 91752, collects, uses and shares personal information when you visit hullcases.com, contact us or buy from us.',
  sections: [
    { id: 'collect', h: 'Information we collect', p: 'Contact details you give us (name, email, phone, company), order details (billing and shipping address, items purchased), details of custom projects you send, and basic browsing data collected by cookies. Card payments are handled by our payment processor; we don’t store full card numbers.' },
    { id: 'use', h: 'How we use it', p: 'To process, ship and support your orders and returns, answer questions and prepare custom quotes, send emails you sign up for, and keep the site secure.' },
    { id: 'share', h: 'Who we share it with', p: 'We do not sell your personal information. We share it only with service providers who help us run the store, such as shipping carriers (UPS, FedEx and freight companies), our payment processor and our website and email providers, or when the law requires it.' },
    { id: 'cookies', h: 'Cookies and tracking', p: 'Our store uses cookies to keep items in your cart, remember your login and keep checkout working. You can block or delete cookies in your browser, but parts of the store may stop working.' },
    { id: 'rights', h: 'Your choices and rights', p: 'You can unsubscribe from emails at any time. California residents may ask what personal information we hold about them and ask us to correct or delete it. Email info@hullcases.com or call (833) 236-0699.' },
    { id: 'security', h: 'Data security', p: 'Credit card information is encrypted during transfer, and the site uses secure HTTPS connections. No method of storage or transmission is completely secure.' },
    { id: 'changes', h: 'Changes to this policy', p: 'We may update this policy from time to time. Changes take effect when they are posted on this page.' },
  ],
};

const disclaimer: Policy = {
  key: 'disclaimer',
  title: 'Disclaimer',
  path: '/disclaimer/',
  seoTitle: 'Disclaimer | Hull Cases',
  meta: 'General information, product specifications, airline travel and liability: the disclaimer for hullcases.com.',
  intro: 'This disclaimer applies to the information on hullcases.com.',
  sections: [
    { id: 'general', h: 'General information', p: 'The material on this site is provided for general information only. Prices and product details may change without notice.' },
    { id: 'specs', h: 'Product specifications', p: 'Dimensions and ratings are listed for guidance. Hull Cases guarantees fit only when your physical parts are sent to us for a custom foam insert.' },
    { id: 'airline', h: 'Airline travel', p: 'Airline size and weight rules vary. Please check with your airline before travel.' },
    { id: 'use', h: 'Use of our cases', p: 'You are responsible for choosing a case that suits your equipment and for packing it securely.' },
    { id: 'links', h: 'Third-party links', p: 'Links to other websites are provided for convenience; we don’t control their content.' },
    { id: 'liability', h: 'Limitation of liability', p: 'To the extent permitted by law, Hull Cases is not liable for indirect or consequential losses arising from use of this site or our products.' },
  ],
};

export const POLICIES: Policy[] = [returns, terms, privacy, disclaimer];
