// FAQ copy shared by /faq/ and /contact-us/ (design/source/FAQ.dc.html, Contact.dc.html).
// Answers are trusted HTML authored here.
export interface FaqItem {
  q: string;
  a: string;
}
export interface FaqGroup {
  id: string;
  title: string;
  items: FaqItem[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: 'sizing',
    title: 'Sizing & fit',
    items: [
      { q: 'How do I pick the right size?', a: 'Measure your gear (length × width × height) and compare it with the internal size on the product page. We’re happy to recommend a model, and if you need a guaranteed fit, send us the parts for a custom foam insert.' },
      { q: "What's the difference between interior and exterior size?", a: 'Interior is the usable space inside the case. Exterior is the full outside size, including the shell and hardware. Use exterior when checking a trunk, shelf or airline limit.' },
      { q: 'Are the cases waterproof?', a: 'Yes. Hull cases are rated IP67: dust-tight and protected against temporary immersion in water. Shells are rated from −40 °F to 210 °F.' },
      { q: 'Can I fly with a Hull case?', a: "Our cases are suitable for airline check-in, and many sizes work as carry-on. Check your airline's size and weight limits before you travel." },
      { q: 'Do you offer custom foam or logos?', a: 'Yes: custom foam lining, custom panels and custom logos. <a class="link" href="/custom-products/">Request a custom case quote</a>.' },
    ],
  },
  {
    id: 'orders',
    title: 'Orders & shipping',
    items: [
      { q: 'Where do you ship?', a: 'We ship within the United States via UPS, FedEx or freight, and you can also pick up at our Mira Loma facility.' },
      { q: 'How long does shipping take?', a: 'We guarantee on-time dispatch from Mira Loma, CA. Transit times (Ground, 2nd Day, Overnight) are set by the carrier.' },
      { q: 'How do I track my order?', a: "You'll get a tracking link by email when your order ships. You can also see order status in your account." },
    ],
  },
  {
    id: 'returns',
    title: 'Returns & warranty',
    items: [
      { q: 'Can I return a case?', a: 'Yes, within 30 days of purchase, in original packaging, with an RMA number (email info@hullcases.com). Non-defective returns have a 25% restocking fee and shipping isn’t refundable. Custom cases, foam and clearance items are final sale. See the full <a class="link" href="/return-and-refund-policy/">Return and Refund Policy</a>.' },
      { q: 'What does the warranty cover?', a: 'Every Hull case has a lifetime warranty. For a warranty question, email info@hullcases.com with your order number and photos of the issue.' },
      { q: 'My case arrived damaged. What now?', a: 'Once an order leaves our facility, the carrier is responsible for loss or damage. Take photos of the box and the case and contact us with your order number. We’ll help you file a claim with the carrier.' },
    ],
  },
];
