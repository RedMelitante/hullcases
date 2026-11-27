// Blog posts (copy from design/source/BlogPost.dc.html). Slugs match the live /blogs/ URLs.
export interface PostSection {
  id: string;
  h: string;
  p?: string;
  list?: string[];
  callout?: boolean;
}

export interface Post {
  key: 'camera' | 'tactical' | 'utility';
  slug: string;
  crumb: string;
  eyebrow: string;
  read: string;
  date: string;
  isoDate: string;
  title: string;
  seoTitle: string;
  meta: string;
  hero: string;
  fit: 'contain' | 'cover';
  heroAlt: string;
  thumb: string;
  excerpt: string;
  lead: string;
  intro: string;
  sections: PostSection[];
  calloutTitle: string;
  bottom: string;
  products: string[];
}

export const POSTS: Post[] = [
  {
    key: 'camera',
    slug: 'hard-case-for-camera-equipment',
    crumb: 'Hard case for camera equipment',
    eyebrow: 'Photo & video',
    read: '4 min read',
    date: 'December 2, 2025',
    isoDate: '2025-12-02',
    title: 'Why You Need a Hard Case for Camera Equipment in the U.S',
    seoTitle: 'Hard Cases for Camera Equipment | Hull Cases',
    meta: 'Why camera gear needs a waterproof hard case, what to look for (IP67, foam, size) and how to fly with it. A guide from Hull Cases.',
    hero: '/images/open-case-foam.jpg',
    fit: 'contain',
    heroAlt: 'Open hard case with foam interior, ready for a camera kit',
    thumb: '/images/open-case-foam.jpg',
    excerpt: 'Purpose-built to protect cameras, lenses and accessories, making transport simpler and stress-free.',
    lead: 'Hard cases are purpose-built to protect cameras, lenses and accessories, making transport simpler and stress-free.',
    intro:
      'A soft camera bag is fine for a walk around town. But once your gear goes in a car trunk, a truck bed, a plane’s cargo hold or a muddy location, a hard case is the safer choice. Here’s what it protects against and how to choose one.',
    sections: [
      {
        id: 'why',
        h: 'Why camera gear needs a hard case',
        p: 'Most damage happens in transit, not during a shoot. Bags get dropped, stacked under heavier luggage, left in the rain or set down in dust and sand. A rigid shell takes those knocks instead of your camera, and a sealed lid keeps water and grit away from sensors and lens elements.',
      },
      {
        id: 'look',
        h: 'What to look for',
        list: [
          'Waterproof sealing: look for an IP67 rating, which means dust-tight and protected against temporary immersion. Hull cases are rated IP67.',
          'A tough shell that handles heat and cold: Hull cases use a polypropylene alloy rated from −40 °F to 210 °F.',
          'Foam that holds each body and lens in place, so nothing knocks together. Custom foam interiors are available.',
          'A size that works for how you travel, whether that’s airline check-in, carry-on or the back of a vehicle.',
        ],
        callout: true,
      },
      {
        id: 'size',
        h: 'Choosing the right size',
        p: 'Lay out everything you carry on a shoot: bodies with lenses attached, spare lenses, batteries, chargers and cards. Measure the arrangement (length × width × height), then compare it with the internal size listed on each Hull product page. Each page also shows the lid and base depths, so you can check that your tallest item fits.',
      },
      {
        id: 'travel',
        h: 'Flying with camera gear',
        p: 'Hull cases are suitable for airline check-in, and the smaller sizes fit common carry-on limits. Airline size and weight rules vary, and spare lithium batteries usually have to travel in the cabin, so always check your airline’s rules before you fly.',
      },
    ],
    calloutTitle: 'Get foam cut around your camera kit',
    bottom: 'If your camera gear travels, a waterproof hard case is cheap insurance for an expensive kit.',
    products: ['D3213', 'D3913', 'D4223', 'D4821'],
  },
  {
    key: 'tactical',
    slug: 'tacical-equipment-cases',
    crumb: 'Tactical equipment cases',
    eyebrow: 'Tactical & field work',
    read: '4 min read',
    date: 'December 2, 2025',
    isoDate: '2025-12-02',
    title: 'Why Tactical Equipment Cases Are Essential for Professionals in the Field',
    seoTitle: 'Tactical Equipment Cases for Field Work | Hull Cases',
    meta: 'What field work does to equipment and what makes a case field-ready: IP67 sealing, a tough shell, custom foam and wheels for heavy kits. A guide from Hull Cases.',
    hero: '/images/tactical-cases.jpg',
    fit: 'cover',
    heroAlt: 'Two tall black hard cases standing outdoors',
    thumb: '/images/long-case.jpg',
    excerpt: 'The right protective case helps prevent costly damage, streamline operations and give professionals peace of mind.',
    lead: 'The right protective case helps prevent costly damage, streamline operations and give professionals peace of mind in the field.',
    intro:
      'Field equipment lives a hard life: truck beds, wet ground, dust, heat and constant loading and unloading. A case that can’t keep up turns every trip into a risk. Here’s what to look for in a case built for field work.',
    sections: [
      {
        id: 'field',
        h: 'What field work does to equipment',
        p: 'Vibration on rough roads loosens and scuffs gear. Rain, spray and wet ground get into soft bags. Heat in a parked vehicle and cold at dawn stress materials. And every load-in and load-out is another chance for a drop.',
      },
      {
        id: 'ready',
        h: 'What makes a case field-ready',
        list: [
          'Sealed against water and dust: Hull cases are rated IP67.',
          'A shell that handles temperature swings: polypropylene alloy rated from −40 °F to 210 °F.',
          'Foam that locks each item in place, so nothing rattles loose. Custom foam interiors are available.',
          'Wheels and a pull handle on the larger cases (D5524, D6125 and D6530) for heavy kits.',
        ],
        callout: true,
      },
      {
        id: 'organize',
        h: 'Organize the kit, not just protect it',
        p: 'A custom foam layout gives every tool or device its own cutout. That makes it obvious when something is missing before you leave, and quicker to find what you need on site. Hull Cases offers custom foam, custom panels and logo printing on its cases.',
      },
      {
        id: 'size',
        h: 'Choosing a size',
        p: 'List everything that goes in the case and measure it laid out together. Compare that with the internal size on each product page, and check the lid and base depths for your tallest item. Hull’s range runs from compact cases about 10 inches long inside to wheeled cases with more than 23 inches of interior length.',
      },
    ],
    calloutTitle: 'Get foam cut around your field kit',
    bottom: 'In the field, a case is part of the equipment. Choose one that’s sealed, tough and laid out for the job.',
    products: ['D4821', 'D5222', 'D5524', 'D6530'],
  },
  {
    key: 'utility',
    slug: 'hard-utility-case-in-u-s',
    crumb: 'Waterproof utility cases',
    eyebrow: 'Tools & trades',
    read: '3 min read',
    date: 'December 2, 2025',
    isoDate: '2025-12-02',
    title: 'Waterproof Hard Utility Cases in the U.S: Why They’re Worth the Investment',
    seoTitle: 'Waterproof Hard Utility Cases | Hull Cases',
    meta: 'What makes a waterproof utility case worth the money, and how to pick a small, medium or wheeled case for your tools and gear. A guide from Hull Cases.',
    hero: '/images/stacked-black-yellow.jpg',
    fit: 'contain',
    heroAlt: 'Yellow and black Hull hard cases stacked',
    thumb: '/images/stacked-black-yellow.jpg',
    excerpt: 'What makes a waterproof utility case worth the money, and how to pick one for your tools and gear.',
    lead: 'What makes a waterproof utility case worth the money, and how to pick one for your tools and gear.',
    intro:
      'A utility case is the box you throw in the truck every day: tools, meters, parts, chargers. It doesn’t need to be fancy, but it does need to keep water out and survive being knocked around.',
    sections: [
      {
        id: 'cost',
        h: 'What it costs when a case fails',
        p: 'Water in a toolbox means rusted tools and dead batteries. A cracked lid can mean a lost part or a damaged meter. Replacing even one piece of equipment usually costs more than a good case.',
      },
      {
        id: 'look',
        h: 'What to look for',
        list: [
          'A real waterproof rating: Hull cases are rated IP67, dust-tight and protected against temporary immersion.',
          'A tough polypropylene alloy shell rated from −40 °F to 210 °F.',
          'Interior space that matches your kit, with dimensions listed for every model.',
          'A size you can carry comfortably, or wheels for heavier loads.',
        ],
        callout: true,
      },
      {
        id: 'which',
        h: 'Small, medium or wheeled?',
        p: 'Hull’s small cases suit meters, hand tools and small parts. Medium cases fit power tools and larger kits. The large wheeled cases (D5524, D6125 and D6530) are for heavy gear you’d rather roll than carry.',
      },
    ],
    calloutTitle: 'Get foam cut around your tools',
    bottom: 'A waterproof utility case pays for itself the first time it keeps your tools dry.',
    products: ['D3608', 'D4215', 'D4218', 'D6125'],
  },
];

export const postUrl = (p: Post): string => `/blogs/${p.slug}/`;
export const POST_BY_KEY = Object.fromEntries(POSTS.map((p) => [p.key, p])) as Record<Post['key'], Post>;
