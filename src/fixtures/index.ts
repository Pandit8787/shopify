import type { Product, Collection, Category, Brand, Review, Coupon, Order, Notification } from "@/services/types";

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Apparel",
    slug: "apparel",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
    count: 128,
  },
  {
    id: "cat-2",
    name: "Footwear",
    slug: "footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    count: 86,
  },
  {
    id: "cat-3",
    name: "Accessories",
    slug: "accessories",
    image:
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=900&q=80",
    count: 54,
  },
  {
    id: "cat-4",
    name: "Tech & Audio",
    slug: "tech",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    count: 41,
  },
  {
    id: "cat-5",
    name: "Bags & Luggage",
    slug: "bags",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    count: 39,
  },
  {
    id: "cat-6",
    name: "Watches",
    slug: "watches",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80",
    count: 27,
  },
];

export const brands: Brand[] = [
  { id: "b1", name: "LUXE Atelier", logo: "" },
  { id: "b2", name: "Nova Moto", logo: "" },
  { id: "b3", name: "Aurora Labs", logo: "" },
  { id: "b4", name: "Céleste", logo: "" },
  { id: "b5", name: "Monolith Gear", logo: "" },
  { id: "b6", name: "Sable Heritage", logo: "" },
];

export const collections: Collection[] = [
  {
    id: "col-1",
    title: "Aurora Collection",
    subtitle: "Iridescent color-shifting essentials",
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1600&q=85",
    tag: "New Drop",
    slug: "aurora",
  },
  {
    id: "col-2",
    title: "Noir Monolith",
    subtitle: "Shadow-black minimalism",
    image:
      "https://images.unsplash.com/photo-1503342452485-86ec28691130?auto=format&fit=crop&w=1600&q=85",
    tag: "Limited",
    slug: "noir",
  },
  {
    id: "col-3",
    title: "Gold Chapter",
    subtitle: "24K gilded heritage pieces",
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1600&q=85",
    tag: "Heritage",
    slug: "gold",
  },
  {
    id: "col-4",
    title: "Moto Tech",
    subtitle: "Future-forward performance wear",
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1600&q=85",
    tag: "Performance",
    slug: "moto",
  },
];

const sharedImages = {
  jacket: [
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=85",
  ],
  sneaker: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85",
  ],
  watch: [
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1200&q=85",
  ],
  bag: [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85",
  ],
  headphone: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=85",
  ],
  hoodie: [
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=85",
  ],
};

export const products: Product[] = [
  {
    id: "p-001",
    title: "Aurora Bomber Jacket",
    handle: "aurora-bomber-jacket",
    price: 890,
    compareAtPrice: 1200,
    currency: "USD",
    category: "apparel",
    brand: "LUXE Atelier",
    tags: ["new", "bestseller", "limited"],
    images: sharedImages.jacket,
    rating: 4.9,
    reviewCount: 312,
    stock: 42,
    description:
      "Color-shifting iridescent bomber crafted from Japanese 3-layer membrane with hand-finished gold zippers.",
    longDescription:
      "Cut from a proprietary 3-layer Japanese membrane fabric, the Aurora Bomber shifts hue between royal cobalt, amethyst and rose at the mercy of light. Hand-set 14k gold-plated zippers, satin quilted lining, and an interior chest pocket with laser-engraved serial number. Limited to 500 pieces worldwide.",
    specs: {
      Material: "3-layer Japanese membrane",
      Lining: "Silk-blend satin quilt",
      Closure: "14k gold-plated RiRi zips",
      Origin: "Handmade in Florence, IT",
      Warranty: "Lifetime craftsmanship guarantee",
    },
    colors: [
      { name: "Aurora", hex: "#8b5cf6" },
      { name: "Obsidian", hex: "#0a0a0a" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: true,
    isNew: true,
    discountPercent: 26,
  },
  {
    id: "p-002",
    title: "Monolith Runner X",
    handle: "monolith-runner-x",
    price: 420,
    currency: "USD",
    category: "footwear",
    brand: "Nova Moto",
    tags: ["performance", "new"],
    images: sharedImages.sneaker,
    rating: 4.8,
    reviewCount: 1028,
    stock: 187,
    description:
      "Carbon-plated hyper runner with magnetorheological cushioning and woven titanium laces.",
    specs: {
      "Midsole": "Carbon-infused PEBA + MR fluid",
      Upper: "Dyneema-woven titanium mesh",
      Drop: "6mm racing drop",
      Weight: "218g (size 9)",
      "Best For": "Marathon / Daily trainer",
    },
    colors: [
      { name: "Signal Red", hex: "#dc2626" },
      { name: "Void Black", hex: "#111827" },
      { name: "Ghost White", hex: "#f8fafc" },
    ],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"],
    featured: true,
    isNew: true,
  },
  {
    id: "p-003",
    title: "Chronograph Héritage",
    handle: "chronograph-heritage",
    price: 4800,
    compareAtPrice: 5600,
    currency: "USD",
    category: "watches",
    brand: "Sable Heritage",
    tags: ["heritage", "limited"],
    images: sharedImages.watch,
    rating: 5.0,
    reviewCount: 96,
    stock: 18,
    description:
      "Swiss-made automatic chronograph with meteorite dial, 18k gold case and 72h power reserve.",
    specs: {
      Movement: "SW800-1 Automatic, 28,800vph",
      Case: "18k rose gold, 42mm",
      Dial: "Muonionalusta meteorite",
      "Power Reserve": "72 hours",
      "Water Res.": "100m / 10 bar",
    },
    colors: [{ name: "Rose Gold", hex: "#b45309" }],
    featured: true,
    discountPercent: 14,
  },
  {
    id: "p-004",
    title: "Céleste Weekender 48H",
    handle: "celeste-weekender",
    price: 1290,
    currency: "USD",
    category: "bags",
    brand: "Céleste",
    tags: ["bestseller"],
    images: sharedImages.bag,
    rating: 4.7,
    reviewCount: 421,
    stock: 65,
    description:
      "Pebbled Tuscan leather weekender with hand-saddle stitching, suede interior, and YKK Excella zippers.",
    specs: {
      Leather: "Full-grain Tuscan calf",
      Dimensions: "52 × 28 × 26 cm",
      Capacity: "48L",
      "Carry-on": "IATA approved",
      Lining: "Split-calf suede",
    },
    colors: [
      { name: "Espresso", hex: "#3f2d1e" },
      { name: "Noir", hex: "#0a0a0a" },
    ],
  },
  {
    id: "p-005",
    title: "Aurora Acoustic Headphones",
    handle: "aurora-acoustic",
    price: 749,
    currency: "USD",
    category: "tech",
    brand: "Aurora Labs",
    tags: ["tech", "new", "bestseller"],
    images: sharedImages.headphone,
    rating: 4.9,
    reviewCount: 1687,
    stock: 240,
    description:
      "Planar magnetic hi-fi headphones with 120-hour battery, lossless 24-bit Bluetooth, and liquid metal headband.",
    specs: {
      Driver: "42mm Planar Magnetic",
      "Freq. Response": "8 Hz – 48 kHz",
      Battery: "120 hours (ANC off)",
      Codecs: "LDAC, aptX Lossless, LC3plus",
      Weight: "278g",
    },
    colors: [
      { name: "Midnight", hex: "#1e293b" },
      { name: "Parchment", hex: "#fafaf9" },
    ],
    isNew: true,
    featured: true,
  },
  {
    id: "p-006",
    title: "Monolith Heavy Hoodie",
    handle: "monolith-hoodie",
    price: 310,
    compareAtPrice: 380,
    currency: "USD",
    category: "apparel",
    brand: "Monolith Gear",
    tags: ["bestseller"],
    images: sharedImages.hoodie,
    rating: 4.8,
    reviewCount: 552,
    stock: 130,
    description:
      "600 GSM heavyweight French terry hoodie with boxy silhouette, flatlock stitching and magnetic zip.",
    specs: {
      Fabric: "600 GSM French terry",
      Origin: "Made in Portugal",
      Closure: "Magnetic snap half-zip",
      Fit: "Boxy / Relaxed",
      Wash: "Garment-dyed, pre-shrunk",
    },
    colors: [
      { name: "Iron", hex: "#52525b" },
      { name: "Pitch", hex: "#0a0a0a" },
      { name: "Sand", hex: "#e7e5e4" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    discountPercent: 18,
  },
  {
    id: "p-007",
    title: "Sable Silk Button-Down",
    handle: "sable-silk-shirt",
    price: 540,
    currency: "USD",
    category: "apparel",
    brand: "Sable Heritage",
    tags: ["heritage"],
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85",
    ],
    rating: 4.7,
    reviewCount: 173,
    stock: 78,
    description:
      "22 momme mulberry silk shirt, hand-cut collar, mother-of-pearl buttons, hand-rolled cuffs.",
    specs: {
      Silk: "22 momme Grade A mulberry",
      Buttons: "Australian MOP",
      Weave: "Charmeuse satin",
      "Care": "Dry clean only",
    },
    colors: [
      { name: "Ivory", hex: "#fffbeb" },
      { name: "Black", hex: "#030712" },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "p-008",
    title: "Nova Tech Cap",
    handle: "nova-tech-cap",
    price: 110,
    currency: "USD",
    category: "accessories",
    brand: "Nova Moto",
    tags: ["new"],
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=85",
    ],
    rating: 4.6,
    reviewCount: 91,
    stock: 210,
    description:
      "6-panel cap with laser perforated apex, reflective logo weld, and hydrophobic nano-coating.",
    specs: {
      Fabric: "Recycled nylon ripstop",
      Coating: "Hydrophobic nano",
      Closure: "Magnetic snapback",
    },
    colors: [
      { name: "Black", hex: "#0a0a0a" },
      { name: "Graphite", hex: "#27272a" },
    ],
    isNew: true,
  },
  {
    id: "p-009",
    title: "Atelier Loafer Strada",
    handle: "atelier-loafer",
    price: 680,
    currency: "USD",
    category: "footwear",
    brand: "LUXE Atelier",
    tags: ["heritage"],
    images: [
      "https://images.unsplash.com/photo-1614252369475-531eba835e3e?auto=format&fit=crop&w=1200&q=85",
    ],
    rating: 4.8,
    reviewCount: 202,
    stock: 55,
    description:
      "Whole-cut hand-stitched penny loafer in vegetable-tanned crust leather, Norvegese welted.",
    specs: {
      Leather: "Vegetable-tanned Tuscan crust",
      Welt: "Norvegese hand-welted",
      Sole: "Leather + rubber injection",
      Last: "Rounded almond R8",
    },
    colors: [
      { name: "Whiskey", hex: "#b45309" },
      { name: "Nero", hex: "#0a0a0a" },
    ],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
  },
  {
    id: "p-010",
    title: "Céleste Mini Crossbody",
    handle: "celeste-mini-crossbody",
    price: 420,
    compareAtPrice: 490,
    currency: "USD",
    category: "bags",
    brand: "Céleste",
    tags: ["bestseller"],
    images: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1200&q=85",
    ],
    rating: 4.9,
    reviewCount: 631,
    stock: 92,
    description:
      "Mini crossbody in pebbled leather with signature C-lock clasp, gilded chain + leather strap.",
    specs: {
      Leather: "Pebbled full-grain",
      Dimensions: "19 × 13 × 7 cm",
      Closure: "PVD gold C-lock",
      Strap: "Detachable chain + leather",
    },
    colors: [
      { name: "Cognac", hex: "#92400e" },
      { name: "Nero", hex: "#0a0a0a" },
    ],
    discountPercent: 14,
  },
  {
    id: "p-011",
    title: "Aurora Soundbar Dolby Atmos",
    handle: "aurora-soundbar",
    price: 1490,
    currency: "USD",
    category: "tech",
    brand: "Aurora Labs",
    tags: ["tech"],
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1200&q=85",
    ],
    rating: 4.7,
    reviewCount: 284,
    stock: 43,
    description:
      "11.1.4 channel Dolby Atmos soundbar with room correction, wireless subs and HDMI 2.1 eARC.",
    specs: {
      Channels: "11.1.4 with up-firing",
      Power: "780W RMS",
      Connectivity: "eARC, Wi-Fi 6, AirPlay 2",
      Sub: "Wireless 10\" subwoofer included",
    },
    colors: [{ name: "Titanium", hex: "#9ca3af" }],
  },
  {
    id: "p-012",
    title: "Monolith Cargo Pant",
    handle: "monolith-cargo-pant",
    price: 290,
    currency: "USD",
    category: "apparel",
    brand: "Monolith Gear",
    tags: ["performance", "new"],
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=85",
    ],
    rating: 4.6,
    reviewCount: 137,
    stock: 150,
    description:
      "Tactical ripstop cargo with magnetic storm pockets, 4-way stretch, and DWR 20k finish.",
    specs: {
      Fabric: "Ripstop blend, 4-way stretch",
      Coating: "DWR 20,000mm",
      Pockets: "8× storm-secured magnetic",
      Fit: "Straight tapered",
    },
    colors: [
      { name: "Ranger", hex: "#365314" },
      { name: "Black", hex: "#0a0a0a" },
    ],
    sizes: ["28", "30", "32", "34", "36", "38"],
    isNew: true,
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "p-001",
    user: "Aarav Sharma",
    avatar:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    title: "Worth every penny.",
    comment:
      "The color shift is unreal. Fabric feels like nothing I've ever owned — and the zippers… chef's kiss.",
    date: "12 days ago",
    verified: true,
  },
  {
    id: "r2",
    productId: "p-001",
    user: "Isabella Moretti",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    title: "A future heirloom.",
    comment:
      "Packaging, fit, finish. Everything is deliberate. I got the Aurora and it photographs like magic.",
    date: "3 weeks ago",
    verified: true,
  },
  {
    id: "r3",
    productId: "p-002",
    user: "Noah Williams",
    rating: 5,
    title: "Best marathon shoe I own.",
    comment:
      "MR cushioning is a game changer. After 60 miles the bounce is still there, and the upper hugs like a sock.",
    date: "5 days ago",
    verified: true,
  },
];

export const coupons: Coupon[] = [
  {
    code: "LUXE10",
    type: "percent",
    value: 10,
    description: "10% off sitewide (new customers)",
    active: true,
  },
  {
    code: "PREMIUM50",
    type: "fixed",
    value: 50,
    description: "$50 off orders over $500",
    active: true,
  },
];

export const orders: Order[] = [
  {
    id: "ORD-09421",
    items: [
      {
        productId: "p-002",
        quantity: 1,
        priceSnapshot: 420,
        title: "Monolith Runner X",
        image: sharedImages.sneaker[0],
        size: "9",
        color: "Signal Red",
      },
    ],
    subtotal: 420,
    tax: 36.4,
    shipping: 0,
    discount: 42,
    total: 414.4,
    status: "shipped",
    createdAt: "2026-07-12T09:22:00Z",
    tracking: "1Z999AA10123456784",
  },
  {
    id: "ORD-09360",
    items: [
      {
        productId: "p-005",
        quantity: 1,
        priceSnapshot: 749,
        title: "Aurora Acoustic Headphones",
        image: sharedImages.headphone[0],
        color: "Midnight",
      },
    ],
    subtotal: 749,
    tax: 64.9,
    shipping: 0,
    discount: 74.9,
    total: 739.0,
    status: "delivered",
    createdAt: "2026-06-28T14:07:00Z",
    tracking: "1Z888BB20212345679",
  },
  {
    id: "ORD-09210",
    items: [
      {
        productId: "p-006",
        quantity: 1,
        priceSnapshot: 310,
        title: "Monolith Heavy Hoodie",
        image: sharedImages.hoodie[0],
        size: "M",
        color: "Iron",
      },
      {
        productId: "p-008",
        quantity: 1,
        priceSnapshot: 110,
        title: "Nova Tech Cap",
        image:
          "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=85",
        color: "Black",
      },
    ],
    subtotal: 420,
    tax: 36.4,
    shipping: 15,
    discount: 0,
    total: 471.4,
    status: "delivered",
    createdAt: "2026-06-02T11:51:00Z",
  },
];

export const notifications: Notification[] = [
  {
    id: "n1",
    title: "Your order shipped!",
    description: "ORD-09421 is on the way — arriving in 2 days.",
    time: "2h ago",
    read: false,
    type: "order",
  },
  {
    id: "n2",
    title: "Flash Sale Live",
    description: "Aurora collection 20% off for the next 6 hours.",
    time: "5h ago",
    read: false,
    type: "offer",
  },
  {
    id: "n3",
    title: "2,500 Rewards Unlocked",
    description: "You earned 2,500 points from your last three orders.",
    time: "1d ago",
    read: true,
    type: "reward",
  },
  {
    id: "n4",
    title: "Back in stock",
    description: "Chronograph Héritage is back in 18k rose gold.",
    time: "2d ago",
    read: true,
    type: "system",
  },
];

export const revenueSeries = [
  { month: "Jan", revenue: 184000, orders: 382 },
  { month: "Feb", revenue: 201000, orders: 401 },
  { month: "Mar", revenue: 241000, orders: 488 },
  { month: "Apr", revenue: 278000, orders: 560 },
  { month: "May", revenue: 312000, orders: 612 },
  { month: "Jun", revenue: 346000, orders: 699 },
  { month: "Jul", revenue: 421000, orders: 812 },
];

export const trafficBySource = [
  { name: "Direct", value: 38, color: "#7C3AED" },
  { name: "Search", value: 27, color: "#1E40AF" },
  { name: "Social", value: 19, color: "#EC4899" },
  { name: "Email", value: 11, color: "#D4AF37" },
  { name: "Referral", value: 5, color: "#22c55e" },
];
