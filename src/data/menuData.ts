export interface PriceOption {
  label: string; // Neutral configurable label (e.g., 'Option 1', 'Option 2')
  price: number;
  formatted: string;
}

export interface MenuItem {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  isVegetarian: boolean;
  isAvailable: boolean;
  image: string;
  price?: number;
  formattedPrice?: string;
  priceOptions?: PriceOption[];
  badge?: string;
  description?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  heroImage: string;
  description: string;
  hasDualPricing: boolean;
  option1Label: string;
  option2Label: string;
  items: MenuItem[];
}

// Configurable neutral labels for dual-price items (easily editable when portion sizes are confirmed)
export const DEFAULT_OPTION_1_LABEL = "Option 1";
export const DEFAULT_OPTION_2_LABEL = "Option 2";

export const MENU_CATEGORIES: MenuCategory[] = [
  // -------------------------------------------------------------
  // CATEGORY A — BURGERS
  // -------------------------------------------------------------
  {
    id: "burgers",
    name: "Burgers",
    slug: "burgers",
    tagline: "Crispy Golden Patties & Warm Toasted Buns",
    heroImage: "/assets/featured-burger.jpg",
    description: "Handcrafted Indian vegetarian burgers seared fresh to order with crunchy lettuce, ripe tomatoes, secret herb mayo, and seasoned patties.",
    hasDualPricing: false,
    option1Label: "",
    option2Label: "",
    items: [
      {
        id: "burger-classic",
        name: "Burger",
        categoryId: "burgers",
        categoryName: "Burgers",
        isVegetarian: true,
        isAvailable: true,
        price: 30,
        formattedPrice: "₹30",
        image: "/assets/categories/burger.jpg",
        badge: "Classic Street Style"
      },
      {
        id: "burger-paneer",
        name: "Paneer Burger",
        categoryId: "burgers",
        categoryName: "Burgers",
        isVegetarian: true,
        isAvailable: true,
        price: 50,
        formattedPrice: "₹50",
        image: "/assets/categories/burger.jpg",
        badge: "Campus Favorite"
      },
      {
        id: "burger-cheese",
        name: "Cheese Burger",
        categoryId: "burgers",
        categoryName: "Burgers",
        isVegetarian: true,
        isAvailable: true,
        price: 60,
        formattedPrice: "₹60",
        image: "/assets/categories/burger.jpg"
      },
      {
        id: "burger-kurkure",
        name: "Kurkure Burger",
        categoryId: "burgers",
        categoryName: "Burgers",
        isVegetarian: true,
        isAvailable: true,
        price: 70,
        formattedPrice: "₹70",
        image: "/assets/categories/burger.jpg",
        badge: "Extra Crunchy"
      },
      {
        id: "burger-paneer-cheese",
        name: "Paneer + Cheese Burger",
        categoryId: "burgers",
        categoryName: "Burgers",
        isVegetarian: true,
        isAvailable: true,
        price: 75,
        formattedPrice: "₹75",
        image: "/assets/featured-burger.jpg",
        badge: "Chef Signature"
      }
    ]
  },

  // -------------------------------------------------------------
  // CATEGORY B — CHOWMEIN
  // -------------------------------------------------------------
  {
    id: "chowmein",
    name: "Chowmein",
    slug: "chowmein",
    tagline: "High-Flame Iron Wok Tossed Street Noodles",
    heroImage: "/assets/featured-chowmein.jpg",
    description: "Sizzling wok-tossed street noodles infused with smoky aromas, fresh shredded cabbage, bell peppers, carrots, spring onions, and savory sauces.",
    hasDualPricing: true,
    option1Label: DEFAULT_OPTION_1_LABEL,
    option2Label: DEFAULT_OPTION_2_LABEL,
    items: [
      {
        id: "chowmein-veg",
        name: "Veg. Chowmein",
        categoryId: "chowmein",
        categoryName: "Chowmein",
        isVegetarian: true,
        isAvailable: true,
        image: "/assets/categories/noodles.jpg",
        priceOptions: [
          { label: DEFAULT_OPTION_1_LABEL, price: 40, formatted: "₹40" },
          { label: DEFAULT_OPTION_2_LABEL, price: 80, formatted: "₹80" }
        ],
        badge: "Popular"
      },
      {
        id: "chowmein-paneer",
        name: "Paneer Chowmein",
        categoryId: "chowmein",
        categoryName: "Chowmein",
        isVegetarian: true,
        isAvailable: true,
        image: "/assets/categories/noodles.jpg",
        priceOptions: [
          { label: DEFAULT_OPTION_1_LABEL, price: 60, formatted: "₹60" },
          { label: DEFAULT_OPTION_2_LABEL, price: 120, formatted: "₹120" }
        ]
      },
      {
        id: "chowmein-hakka",
        name: "Hakka Noodles",
        categoryId: "chowmein",
        categoryName: "Chowmein",
        isVegetarian: true,
        isAvailable: true,
        image: "/assets/featured-chowmein.jpg",
        priceOptions: [
          { label: DEFAULT_OPTION_1_LABEL, price: 60, formatted: "₹60" },
          { label: DEFAULT_OPTION_2_LABEL, price: 120, formatted: "₹120" }
        ],
        badge: "Hostel Special"
      },
      {
        id: "chowmein-manchurian",
        name: "Manchurian Noodles",
        categoryId: "chowmein",
        categoryName: "Chowmein",
        isVegetarian: true,
        isAvailable: true,
        image: "/assets/categories/noodles.jpg",
        priceOptions: [
          { label: DEFAULT_OPTION_1_LABEL, price: 60, formatted: "₹60" },
          { label: DEFAULT_OPTION_2_LABEL, price: 120, formatted: "₹120" }
        ]
      },
      {
        id: "chowmein-chilli-garlic",
        name: "Chilli Garlic Noodles",
        categoryId: "chowmein",
        categoryName: "Chowmein",
        isVegetarian: true,
        isAvailable: true,
        image: "/assets/categories/noodles.jpg",
        priceOptions: [
          { label: DEFAULT_OPTION_1_LABEL, price: 60, formatted: "₹60" },
          { label: DEFAULT_OPTION_2_LABEL, price: 120, formatted: "₹120" }
        ],
        badge: "Spicy"
      }
    ]
  },

  // -------------------------------------------------------------
  // CATEGORY C — MOMOS
  // -------------------------------------------------------------
  {
    id: "momos",
    name: "Momos",
    slug: "momos",
    tagline: "Handcrafted Steamed, Fried & Kurkure Dumplings",
    heroImage: "/assets/categories/momos.jpg",
    description: "Tender handmade dumplings filled with fresh seasoned vegetables and rich paneer, served with fiery red chili garlic sauce and creamy dip.",
    hasDualPricing: true,
    option1Label: DEFAULT_OPTION_1_LABEL,
    option2Label: DEFAULT_OPTION_2_LABEL,
    items: [
      {
        id: "momos-veg",
        name: "Veg. Momos",
        categoryId: "momos",
        categoryName: "Momos",
        isVegetarian: true,
        isAvailable: true,
        image: "/assets/categories/momos.jpg",
        priceOptions: [
          { label: DEFAULT_OPTION_1_LABEL, price: 30, formatted: "₹30" },
          { label: DEFAULT_OPTION_2_LABEL, price: 60, formatted: "₹60" }
        ],
        badge: "Steamed Classic"
      },
      {
        id: "momos-veg-fried",
        name: "Veg Fried Momos",
        categoryId: "momos",
        categoryName: "Momos",
        isVegetarian: true,
        isAvailable: true,
        image: "/assets/categories/momos.jpg",
        priceOptions: [
          { label: DEFAULT_OPTION_1_LABEL, price: 35, formatted: "₹35" },
          { label: DEFAULT_OPTION_2_LABEL, price: 70, formatted: "₹70" }
        ],
        badge: "Crispy"
      },
      {
        id: "momos-veg-kurkure",
        name: "Veg Kurkure Momos",
        categoryId: "momos",
        categoryName: "Momos",
        isVegetarian: true,
        isAvailable: true,
        image: "/assets/categories/momos.jpg",
        priceOptions: [
          { label: DEFAULT_OPTION_1_LABEL, price: 50, formatted: "₹50" },
          { label: DEFAULT_OPTION_2_LABEL, price: 100, formatted: "₹100" }
        ],
        badge: "Extra Crunchy"
      },
      {
        id: "momos-veg-gravy",
        name: "Veg Gravy Momos",
        categoryId: "momos",
        categoryName: "Momos",
        isVegetarian: true,
        isAvailable: true,
        image: "/assets/categories/momos.jpg",
        priceOptions: [
          { label: DEFAULT_OPTION_1_LABEL, price: 50, formatted: "₹50" },
          { label: DEFAULT_OPTION_2_LABEL, price: 100, formatted: "₹100" }
        ]
      },
      {
        id: "momos-paneer",
        name: "Paneer Momos",
        categoryId: "momos",
        categoryName: "Momos",
        isVegetarian: true,
        isAvailable: true,
        image: "/assets/categories/momos.jpg",
        priceOptions: [
          { label: DEFAULT_OPTION_1_LABEL, price: 50, formatted: "₹50" },
          { label: DEFAULT_OPTION_2_LABEL, price: 100, formatted: "₹100" }
        ],
        badge: "Rich Filling"
      },
      {
        id: "momos-paneer-fried",
        name: "Paneer Fried Momos",
        categoryId: "momos",
        categoryName: "Momos",
        isVegetarian: true,
        isAvailable: true,
        image: "/assets/categories/momos.jpg",
        priceOptions: [
          { label: DEFAULT_OPTION_1_LABEL, price: 60, formatted: "₹60" },
          { label: DEFAULT_OPTION_2_LABEL, price: 120, formatted: "₹120" }
        ]
      },
      {
        id: "momos-paneer-kurkure",
        name: "Paneer Kurkure Momos",
        categoryId: "momos",
        categoryName: "Momos",
        isVegetarian: true,
        isAvailable: true,
        image: "/assets/categories/momos.jpg",
        priceOptions: [
          { label: DEFAULT_OPTION_1_LABEL, price: 70, formatted: "₹70" },
          { label: DEFAULT_OPTION_2_LABEL, price: 140, formatted: "₹140" }
        ],
        badge: "Chef Special"
      }
    ]
  },

  // -------------------------------------------------------------
  // CATEGORY D — CHILLI SPECIALS
  // -------------------------------------------------------------
  {
    id: "chilli",
    name: "Chilli Specials",
    slug: "chilli-specials",
    tagline: "Sizzling Starters with Tangy Indo-Chinese Glaze",
    heroImage: "/assets/categories/paneer-chilli.jpg",
    description: "Crisp fried paneer cubes, vegetable manchurian balls, and crispy potatoes tossed in a glossy soy-chili reduction with bell peppers and green onions.",
    hasDualPricing: true,
    option1Label: DEFAULT_OPTION_1_LABEL,
    option2Label: DEFAULT_OPTION_2_LABEL,
    items: [
      {
        id: "chilli-paneer",
        name: "Paneer Chilli",
        categoryId: "chilli",
        categoryName: "Chilli Specials",
        isVegetarian: true,
        isAvailable: true,
        image: "/assets/categories/paneer-chilli.jpg",
        priceOptions: [
          { label: DEFAULT_OPTION_1_LABEL, price: 90, formatted: "₹90" },
          { label: DEFAULT_OPTION_2_LABEL, price: 170, formatted: "₹170" }
        ],
        badge: "All-Time Best Seller"
      },
      {
        id: "chilli-manchurian",
        name: "Manchurian",
        categoryId: "chilli",
        categoryName: "Chilli Specials",
        isVegetarian: true,
        isAvailable: true,
        image: "/assets/categories/paneer-chilli.jpg",
        priceOptions: [
          { label: DEFAULT_OPTION_1_LABEL, price: 50, formatted: "₹50" },
          { label: DEFAULT_OPTION_2_LABEL, price: 100, formatted: "₹100" }
        ]
      },
      {
        id: "chilli-potato",
        name: "Chilli Potato",
        categoryId: "chilli",
        categoryName: "Chilli Specials",
        isVegetarian: true,
        isAvailable: true,
        image: "/assets/categories/paneer-chilli.jpg",
        priceOptions: [
          { label: DEFAULT_OPTION_1_LABEL, price: 50, formatted: "₹50" },
          { label: DEFAULT_OPTION_2_LABEL, price: 120, formatted: "₹120" }
        ],
        badge: "Crispy"
      },
      {
        id: "chilli-honey-potato",
        name: "Honey Chilli Potato",
        categoryId: "chilli",
        categoryName: "Chilli Specials",
        isVegetarian: true,
        isAvailable: true,
        image: "/assets/categories/paneer-chilli.jpg",
        priceOptions: [
          { label: DEFAULT_OPTION_1_LABEL, price: 60, formatted: "₹60" },
          { label: DEFAULT_OPTION_2_LABEL, price: 120, formatted: "₹120" }
        ],
        badge: "Sweet & Spicy"
      },
      {
        id: "chilli-french-fry",
        name: "French Fry",
        categoryId: "chilli",
        categoryName: "Chilli Specials",
        isVegetarian: true,
        isAvailable: true,
        image: "/assets/categories/paneer-chilli.jpg",
        priceOptions: [
          { label: DEFAULT_OPTION_1_LABEL, price: 40, formatted: "₹40" },
          { label: DEFAULT_OPTION_2_LABEL, price: 80, formatted: "₹80" }
        ]
      },
      {
        id: "chilli-mushroom",
        name: "Mushroom Chilli",
        categoryId: "chilli",
        categoryName: "Chilli Specials",
        isVegetarian: true,
        isAvailable: true,
        image: "/assets/categories/paneer-chilli.jpg",
        priceOptions: [
          { label: DEFAULT_OPTION_1_LABEL, price: 90, formatted: "₹90" },
          { label: DEFAULT_OPTION_2_LABEL, price: 170, formatted: "₹170" }
        ],
        badge: "Premium"
      }
    ]
  },

  // -------------------------------------------------------------
  // CATEGORY E — RICE
  // -------------------------------------------------------------
  {
    id: "rice",
    name: "Rice",
    slug: "rice",
    tagline: "Fragrant Fried Basmati Rice with Garden Veggies",
    heroImage: "/assets/categories/fried-rice.jpg",
    description: "Aromatic long-grain basmati rice flash-fried in high heat with finely chopped seasonal vegetables, paneer cubes, and authentic street aromatics.",
    hasDualPricing: true,
    option1Label: DEFAULT_OPTION_1_LABEL,
    option2Label: DEFAULT_OPTION_2_LABEL,
    items: [
      {
        id: "rice-veg-fried",
        name: "Veg Fried Rice",
        categoryId: "rice",
        categoryName: "Rice",
        isVegetarian: true,
        isAvailable: true,
        image: "/assets/categories/fried-rice.jpg",
        priceOptions: [
          { label: DEFAULT_OPTION_1_LABEL, price: 50, formatted: "₹50" },
          { label: DEFAULT_OPTION_2_LABEL, price: 100, formatted: "₹100" }
        ],
        badge: "Classic Choice"
      },
      {
        id: "rice-paneer",
        name: "Paneer Rice",
        categoryId: "rice",
        categoryName: "Rice",
        isVegetarian: true,
        isAvailable: true,
        image: "/assets/categories/fried-rice.jpg",
        priceOptions: [
          { label: DEFAULT_OPTION_1_LABEL, price: 60, formatted: "₹60" },
          { label: DEFAULT_OPTION_2_LABEL, price: 120, formatted: "₹120" }
        ]
      },
      {
        id: "rice-manchurian",
        name: "Manchurian Rice",
        categoryId: "rice",
        categoryName: "Rice",
        isVegetarian: true,
        isAvailable: true,
        image: "/assets/categories/fried-rice.jpg",
        priceOptions: [
          { label: DEFAULT_OPTION_1_LABEL, price: 60, formatted: "₹60" },
          { label: DEFAULT_OPTION_2_LABEL, price: 120, formatted: "₹120" }
        ]
      },
      {
        id: "rice-mushroom",
        name: "Mushroom Rice",
        categoryId: "rice",
        categoryName: "Rice",
        isVegetarian: true,
        isAvailable: true,
        image: "/assets/categories/fried-rice.jpg",
        priceOptions: [
          { label: DEFAULT_OPTION_1_LABEL, price: 60, formatted: "₹60" },
          { label: DEFAULT_OPTION_2_LABEL, price: 120, formatted: "₹120" }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // CATEGORY F — ROLLS
  // -------------------------------------------------------------
  {
    id: "rolls",
    name: "Rolls",
    slug: "rolls",
    tagline: "Flaky Parathas Wrapped with Savory Spiced Fillings",
    heroImage: "/assets/categories/spring-roll.jpg",
    description: "Crisp golden wraps and flaky parathas rolled tight with spiced paneer, garden cabbage, onions, peppers, and our signature street chutneys.",
    hasDualPricing: false,
    option1Label: "",
    option2Label: "",
    items: [
      {
        id: "roll-veg",
        name: "Veg. Roll",
        categoryId: "rolls",
        categoryName: "Rolls",
        isVegetarian: true,
        isAvailable: true,
        price: 40,
        formattedPrice: "₹40",
        image: "/assets/categories/spring-roll.jpg"
      },
      {
        id: "roll-paneer",
        name: "Paneer Roll",
        categoryId: "rolls",
        categoryName: "Rolls",
        isVegetarian: true,
        isAvailable: true,
        price: 50,
        formattedPrice: "₹50",
        image: "/assets/categories/spring-roll.jpg",
        badge: "Hostel Favorite"
      },
      {
        id: "roll-spring",
        name: "Spring Roll",
        categoryId: "rolls",
        categoryName: "Rolls",
        isVegetarian: true,
        isAvailable: true,
        price: 30,
        formattedPrice: "₹30",
        image: "/assets/categories/spring-roll.jpg",
        badge: "Crispy Delight"
      },
      {
        id: "roll-kurkure-spring",
        name: "Kurkure Spring Roll",
        categoryId: "rolls",
        categoryName: "Rolls",
        isVegetarian: true,
        isAvailable: true,
        price: 50,
        formattedPrice: "₹50",
        image: "/assets/categories/spring-roll.jpg",
        badge: "Extra Crunchy"
      },
      {
        id: "roll-paneer-cheese",
        name: "Paneer Cheese Roll",
        categoryId: "rolls",
        categoryName: "Rolls",
        isVegetarian: true,
        isAvailable: true,
        price: 70,
        formattedPrice: "₹70",
        image: "/assets/categories/spring-roll.jpg",
        badge: "Chef Special"
      },
      {
        id: "roll-mushroom",
        name: "Mushroom Roll",
        categoryId: "rolls",
        categoryName: "Rolls",
        isVegetarian: true,
        isAvailable: true,
        price: 70,
        formattedPrice: "₹70",
        image: "/assets/categories/spring-roll.jpg"
      }
    ]
  }
];

// Helper to get all products flattened
export const ALL_MENU_PRODUCTS: MenuItem[] = MENU_CATEGORIES.flatMap(cat => cat.items);

// Helper to find category by id
export const getCategoryById = (id: string): MenuCategory | undefined => {
  return MENU_CATEGORIES.find(cat => cat.id === id);
};
