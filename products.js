/**
 * AURA - E-Commerce Product Database (INR Version)
 */

const products = [
  // --- WOMEN'S CATEGORY ---
  {
    id: "w1",
    name: "Classic Silk Slip Dress",
    price: 14900.00,
    salePrice: 11900.00,
    category: "women",
    tag: "Sale",
    rating: 4.8,
    reviewsCount: 24,
    description: "Crafted from 100% pure mulberry silk, this minimalist slip dress features a cowl neckline, adjustable spaghetti straps, and a bias cut that drapes elegantly over the silhouette. Perfect for evening soirées or layered luxury.",
    images: [
      "assets/women-1.jpg",
      "assets/women-1-back.jpg"
    ],
    colors: [
      { name: "Champagne", hex: "#f0e6d2" },
      { name: "Midnight Black", hex: "#1a1a1a" },
      { name: "Emerald Green", hex: "#1f4a3e" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    reviews: [
      {
        user: "Sophia L.",
        rating: 5,
        title: "Absolutely stunning",
        comment: "The silk is incredibly soft and the fit is perfect. It drapes beautifully. I received so many compliments!",
        date: "2026-05-12"
      },
      {
        user: "Emma W.",
        rating: 4,
        title: "Lovely dress, slightly long",
        comment: "Beautiful fabric, but at 5'4\" it was a bit longer than expected. Had it hemmed slightly and now it's my favorite.",
        date: "2026-05-28"
      }
    ]
  },
  {
    id: "w2",
    name: "Tailored Wool Double-Breasted Blazer",
    price: 22900.00,
    salePrice: null,
    category: "women",
    tag: "New Arrivals",
    rating: 4.9,
    reviewsCount: 15,
    description: "An essential tailoring piece designed with structured shoulders, peak lapels, and double-breasted horn buttons. Cut from premium Italian wool blend for a sharp, sophisticated look that transitions seamlessly from boardroom to evening.",
    images: [
      "assets/women-2.jpg",
      "assets/women-2-back.jpg"
    ],
    colors: [
      { name: "Oatmeal", hex: "#dfd5c6" },
      { name: "Midnight Black", hex: "#1a1a1a" }
    ],
    sizes: ["S", "M", "L", "XL"],
    reviews: [
      {
        user: "Olivia M.",
        rating: 5,
        title: "Impeccable tailoring",
        comment: "This blazer is worth every penny. The tailoring is sharp, structured, and the oatmeal color is gorgeous.",
        date: "2026-06-01"
      }
    ]
  },
  {
    id: "w3",
    name: "Ribbed Cashmere Turtleneck Sweater",
    price: 17900.00,
    salePrice: null,
    category: "women",
    tag: "Best Sellers",
    rating: 4.7,
    reviewsCount: 38,
    description: "Knit from ultra-soft Mongolian cashmere, this classic turtleneck boasts a refined ribbed texture, relaxed drop shoulders, and cozy ribbed cuffs. An exceptionally warm, lightweight layer for cold seasons.",
    images: [
      "assets/women-3.jpg",
      "assets/women-3-detail.jpg"
    ],
    colors: [
      { name: "Sand", hex: "#c2b6a3" },
      { name: "Charcoal Grey", hex: "#4a4a4a" },
      { name: "Ivory", hex: "#fdfbf7" }
    ],
    sizes: ["XS", "S", "M", "L"],
    reviews: [
      {
        user: "Charlotte B.",
        rating: 5,
        title: "Heavenly soft",
        comment: "So soft it feels like a cloud. It is thin but incredibly warm. Excellent quality cashmere that doesn't pill easily.",
        date: "2026-04-18"
      }
    ]
  },
  {
    id: "w4",
    name: "Linen Wide-Leg Pleated Trousers",
    price: 10900.00,
    salePrice: 8900.00,
    category: "women",
    tag: "Seasonal Collections",
    rating: 4.5,
    reviewsCount: 19,
    description: "Lightweight and breathable, these high-rise trousers are tailored from Belgian linen. Featuring a front pleated structure, wide-leg cut, side slip pockets, and a clean hook-and-bar closure.",
    images: [
      "assets/women-4.jpg",
      "assets/women-4-back.jpg"
    ],
    colors: [
      { name: "Flax Linen", hex: "#dcd3c1" },
      { name: "Olive Green", hex: "#556b2f" },
      { name: "Soft White", hex: "#fafafa" }
    ],
    sizes: ["S", "M", "L"],
    reviews: [
      {
        user: "Aria S.",
        rating: 4,
        title: "Great summer staple",
        comment: "Very breathable and flattering shape. They wrinkle easily because it's pure linen, but that's part of the look.",
        date: "2026-05-19"
      }
    ]
  },

  // --- MEN'S CATEGORY ---
  {
    id: "m1",
    name: "Premium Suede Bomber Jacket",
    price: 35900.00,
    salePrice: null,
    category: "men",
    tag: "New Arrivals",
    rating: 5.0,
    reviewsCount: 12,
    description: "Handcrafted from buttery-soft calf suede, this bomber jacket offers an elevated take on a classic sport silhouette. Detailed with two-way silver hardware, ribbed knit collar and cuffs, and smooth satin lining.",
    images: [
      "assets/men-1.jpg",
      "assets/men-1-detail.jpg"
    ],
    colors: [
      { name: "Tan", hex: "#a07855" },
      { name: "Dark Navy", hex: "#162238" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    reviews: [
      {
        user: "Marcus G.",
        rating: 5,
        title: "Luxurious piece",
        comment: "Absolutely top-tier quality. The suede is incredibly smooth, and it fits like a glove. Highly recommended.",
        date: "2026-06-05"
      }
    ]
  },
  {
    id: "m2",
    name: "Minimalist Italian Wool Overcoat",
    price: 31900.00,
    salePrice: 25900.00,
    category: "men",
    tag: "Sale",
    rating: 4.8,
    reviewsCount: 29,
    description: "A timeless, clean-cut overcoat tailored in premium Italian virgin wool and cashmere. Designed with a concealed button placket, single rear vent, and two interior chest pockets for seamless utility.",
    images: [
      "assets/men-2.jpg",
      "assets/men-2-back.jpg"
    ],
    colors: [
      { name: "Camel", hex: "#bfa38a" },
      { name: "Charcoal", hex: "#3e3e3e" },
      { name: "Black", hex: "#0a0a0a" }
    ],
    sizes: ["M", "L", "XL", "XXL"],
    reviews: [
      {
        user: "James K.",
        rating: 5,
        title: "A true classic",
        comment: "Warm, elegant, and perfectly cut. It looks amazing over a suit or layered with a hoodie. Worth every dollar.",
        date: "2026-03-11"
      }
    ]
  },
  {
    id: "m3",
    name: "Organic Cotton Oxford Shirt",
    price: 7500.00,
    salePrice: null,
    category: "men",
    tag: "Best Sellers",
    rating: 4.6,
    reviewsCount: 42,
    description: "The ultimate casual staple. woven from certified organic cotton, this Oxford shirt features a button-down collar, chest pocket, and a classic box pleat at the back for comfort and mobility.",
    images: [
      "assets/men-3.jpg",
      "assets/men-3-detail.jpg"
    ],
    colors: [
      { name: "Sky Blue", hex: "#b9d3ee" },
      { name: "Classic White", hex: "#ffffff" },
      { name: "Pink Tint", hex: "#fbe3e8" }
    ],
    sizes: ["S", "M", "L", "XL"],
    reviews: [
      {
        user: "David H.",
        rating: 4,
        title: "Great everyday shirt",
        comment: "Good weight to the fabric. It fits a bit slim, so if you like a relaxed fit, maybe size up. Otherwise, perfect.",
        date: "2026-05-02"
      }
    ]
  },
  {
    id: "m4",
    name: "Slim-Fit Selvedge Denim Jeans",
    price: 12900.00,
    salePrice: null,
    category: "men",
    tag: "Best Sellers",
    rating: 4.7,
    reviewsCount: 31,
    description: "Crafted from 13.5oz Japanese selvedge indigo denim. Cut in a modern slim profile, featuring custom copper hardware, button fly, and a red selvedge ID line along the cuff. Will break in beautifully over time.",
    images: [
      "assets/men-4.jpg",
      "assets/men-4-back.jpg"
    ],
    colors: [
      { name: "Raw Indigo", hex: "#1f2d3d" },
      { name: "Washed Black", hex: "#2f2f2f" }
    ],
    sizes: ["30", "32", "34", "36"],
    reviews: [
      {
        user: "Robert T.",
        rating: 5,
        title: "Outstanding Selvedge",
        comment: "Excellent stiff raw denim. Yes, they take a few weeks to break in, but that is the beauty of Japanese selvedge. Highly recommend.",
        date: "2026-05-15"
      }
    ]
  },

  // --- KIDS' CATEGORY ---
  {
    id: "k1",
    name: "Organic Cotton Knit Romper",
    price: 3900.00,
    salePrice: 2900.00,
    category: "kids",
    tag: "Sale",
    rating: 4.9,
    reviewsCount: 18,
    description: "Super soft and gentle on baby skin, this knit romper is made from 100% organic cotton. Features front wooden buttons and bottom snap closures for easy dressing and quick diaper changes.",
    images: [
      "assets/kids-1.jpg",
      "assets/kids-1-detail.jpg"
    ],
    colors: [
      { name: "Warm Sage", hex: "#b4c3b6" },
      { name: "Soft Clay", hex: "#cca698" }
    ],
    sizes: ["0-3M", "3-6M", "6-12M", "12-18M"],
    reviews: [
      {
        user: "Elena R.",
        rating: 5,
        title: "So soft!",
        comment: "Bought this for my 6-month-old. It's incredibly soft, doesn't scratch, and washes really well. Love the clay color.",
        date: "2026-06-10"
      }
    ]
  },
  {
    id: "k2",
    name: "Kids Denim Utility Dungarees",
    price: 4900.00,
    salePrice: null,
    category: "kids",
    tag: "New Arrivals",
    rating: 4.5,
    reviewsCount: 8,
    description: "Durable cotton denim overalls built for active play. Featuring adjustable clip straps, utility chest pockets, and button sides. Double-stitched seams ensure longevity through all outdoor adventures.",
    images: [
      "assets/kids-2.jpg",
      "assets/kids-2-back.jpg"
    ],
    colors: [
      { name: "Vintage Indigo", hex: "#46627f" },
      { name: "Hickory Stripe", hex: "#b0b8c0" }
    ],
    sizes: ["2T", "3T", "4T", "5T"],
    reviews: [
      {
        user: "Lucas M.",
        rating: 4,
        title: "Very durable",
        comment: "My son plays hard in these, and they are holding up wonderfully. The straps are easy to adjust.",
        date: "2026-06-03"
      }
    ]
  },
  {
    id: "k3",
    name: "Merino Wool Blend Kids Cardigan",
    price: 5900.00,
    salePrice: null,
    category: "kids",
    tag: "Seasonal Collections",
    rating: 4.7,
    reviewsCount: 14,
    description: "A cozy knit cardigan featuring a V-neck, ribbed cuffs, and tortoiseshell-effect buttons. Knit from a warm yet lightweight merino wool blend that doesn't itch, offering children warmth with full mobility.",
    images: [
      "assets/kids-3.jpg",
      "assets/kids-3-detail.jpg"
    ],
    colors: [
      { name: "Mustard Gold", hex: "#d4af37" },
      { name: "Heather Oatmeal", hex: "#dcd2c4" }
    ],
    sizes: ["3T", "4T", "5T", "6Y", "8Y"],
    reviews: [
      {
        user: "Sarah D.",
        rating: 5,
        title: "Perfect cozy cardigan",
        comment: "Excellent quality. It looks so charming on my daughter, and she says it's not scratchy at all.",
        date: "2026-05-22"
      }
    ]
  },
  {
    id: "k4",
    name: "Waterproof Fleece-Lined Raincoat",
    price: 6900.00,
    salePrice: null,
    category: "kids",
    tag: "New Arrivals",
    rating: 4.8,
    reviewsCount: 22,
    description: "Equipped to handle rainy days, this jacket features a fully waterproof outer shell, a cozy high-pile fleece lining, a secure storm hood, and reflective stripes on the sleeves for safety.",
    images: [
      "assets/kids-4.jpg",
      "assets/kids-4-back.jpg"
    ],
    colors: [
      { name: "Sunshine Yellow", hex: "#ffcc00" },
      { name: "Forest Green", hex: "#2d5a27" }
    ],
    sizes: ["4T", "5T", "6Y", "8Y", "10Y"],
    reviews: [
      {
        user: "Karen P.",
        rating: 5,
        title: "Highly visible and dry!",
        comment: "Keeps my child completely dry. The yellow is bright and great for rainy afternoon walks. The fleece is super soft.",
        date: "2026-04-30"
      }
    ]
  }
];

// Helper functions for catalog queries
function getProductsByCategory(category) {
  if (!category || category === "all") return products;
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

// Export functions to window
window.AuraProducts = {
  list: products,
  getByCategory: getProductsByCategory,
  getById: id => products.find(p => p.id === id),
  getByTag: tag => products.filter(p => p.tag && p.tag.toLowerCase() === tag.toLowerCase())
};
