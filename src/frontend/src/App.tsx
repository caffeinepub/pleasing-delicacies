import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronDown,
  ChevronUp,
  Globe,
  Heart,
  Instagram,
  Leaf,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

enum ProductCategory {
  laddu = "laddu",
  chutneyPowder = "chutneyPowder",
  savoury = "savoury",
}
import { useGetAllProducts } from "./hooks/useQueries";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

interface PricingTier {
  weight: string;
  price: number;
}

interface ProductData {
  name: string;
  image?: string;
  description: string;
  ingredients: string[];
  nutritionalBenefits: string[];
  usageSuggestions: string[];
  category: ProductCategory;
  shelfLife: string;
  pricing: PricingTier[];
}

// ─────────────────────────────────────────────
// CART
// ─────────────────────────────────────────────

interface CartItem {
  id: string;
  name: string;
  weightOption: string;
  price: number;
  quantity: number;
}

const FALLBACK_LADDUS: ProductData[] = [
  {
    name: "Gond & Nuts Laddu",
    image: "/assets/uploads/WhatsApp-Image-2026-03-14-at-1.18.20-PM-1.jpeg",
    description:
      "Traditional sweet made from edible gum (gond), mixed nuts, ghee, and jaggery. Roasted gond adds a distinct crispy texture.",
    ingredients: [
      "Edible gum (gond)",
      "Almonds",
      "Cashews",
      "Pistachios",
      "Ghee",
      "Jaggery",
      "Cardamom",
    ],
    nutritionalBenefits: [
      "Strengthens bones",
      "Improves stamina",
      "Provides warmth",
      "Energy-boosting",
    ],
    usageSuggestions: [
      "Excellent during winter months",
      "Ideal for postpartum recovery",
      "Daily health supplement",
    ],
    category: ProductCategory.laddu,
    shelfLife: "3-4 weeks in an airtight container",
    pricing: [
      { weight: "250g", price: 350 },
      { weight: "500g", price: 680 },
      { weight: "1kg", price: 1350 },
    ],
  },
  {
    name: "Wheat & Nuts Laddu",
    image: "/assets/uploads/WhatsApp-Image-2026-03-14-at-2.46.00-PM-1.jpeg",
    description:
      "Made from whole wheat flour, mixed nuts, ghee, and jaggery. Flour roasted in ghee until golden brown with a rich nutty aroma.",
    ingredients: [
      "Whole wheat flour",
      "Almonds",
      "Cashews",
      "Ghee",
      "Jaggery",
      "Cardamom",
    ],
    nutritionalBenefits: [
      "Rich in fiber",
      "Good source of protein",
      "Healthy fats",
      "Essential vitamins & minerals",
    ],
    usageSuggestions: [
      "Popular during colder months",
      "Festive treat",
      "Nutritious snack",
    ],
    category: ProductCategory.laddu,
    shelfLife: "3-4 weeks in an airtight container",
    pricing: [
      { weight: "250g", price: 360 },
      { weight: "500g", price: 700 },
      { weight: "1kg", price: 1400 },
    ],
  },
  {
    name: "Dry Fruits Laddu",
    image: "/assets/uploads/Dry-Fruits-Laddu-1.jpeg",
    description:
      "No Sugar or Jaggery — sweetness purely from dates and raisins. Contains almonds, cashews, pistachios, and walnuts.",
    ingredients: [
      "Dates",
      "Raisins",
      "Almonds",
      "Cashews",
      "Pistachios",
      "Walnuts",
      "Cardamom",
    ],
    nutritionalBenefits: [
      "Naturally gluten-free",
      "No refined sugars",
      "Rich in healthy fats",
      "High in fiber & vitamins",
    ],
    usageSuggestions: [
      "Perfect for health-conscious individuals",
      "Diabetic-friendly option",
      "Great energy snack",
    ],
    category: ProductCategory.laddu,
    shelfLife: "2-3 weeks in an airtight container",
    pricing: [
      { weight: "250g", price: 460 },
      { weight: "500g", price: 900 },
      { weight: "1kg", price: 1800 },
    ],
  },
  {
    name: "Flax Seeds & Nuts Laddu",
    image: "/assets/uploads/image-3-1.png",
    description:
      "Made from roasted flax seeds, jaggery, ghee, dry fruits and nuts. Rich in omega-3 fatty acids and antioxidants.",
    ingredients: [
      "Flax seeds",
      "Mixed nuts",
      "Dry fruits",
      "Jaggery",
      "Ghee",
      "Cardamom",
    ],
    nutritionalBenefits: [
      "Rich in omega-3 fatty acids",
      "High dietary fiber",
      "Antioxidant properties",
      "Supports heart health",
    ],
    usageSuggestions: [
      "Daily wellness snack",
      "Great for digestion",
      "Heart-healthy treat",
    ],
    category: ProductCategory.laddu,
    shelfLife: "3-4 weeks in an airtight container",
    pricing: [
      { weight: "250g", price: 350 },
      { weight: "500g", price: 680 },
      { weight: "1kg", price: 1350 },
    ],
  },
  {
    name: "Ragi & Nuts Laddu",
    image: "/assets/uploads/WhatsApp-Image-2026-03-14-at-2.31.32-PM-1--1.jpeg",
    description:
      "Made from ragi (finger millet) flour, mixed nuts, ghee, and jaggery. Ragi is rich in calcium, iron, and dietary fiber.",
    ingredients: [
      "Ragi (finger millet) flour",
      "Almonds",
      "Cashews",
      "Ghee",
      "Jaggery",
      "Cardamom",
    ],
    nutritionalBenefits: [
      "High in calcium",
      "Rich in iron",
      "Dietary fiber",
      "Great for bone health",
    ],
    usageSuggestions: [
      "Suitable for all ages",
      "Great for growing children",
      "Supports bone strength",
    ],
    category: ProductCategory.laddu,
    shelfLife: "3-4 weeks in an airtight container",
    pricing: [
      { weight: "250g", price: 350 },
      { weight: "500g", price: 680 },
      { weight: "1kg", price: 1350 },
    ],
  },
  {
    name: "Urad Dal Laddu",
    image: "/assets/generated/urad-dal-nuts-laddu.dim_800x600.jpg",
    description:
      "Made from roasted urad dal (black gram lentils), ghee, and jaggery. Dal roasted until golden and ground to fine powder.",
    ingredients: [
      "Urad dal (black gram)",
      "Ghee",
      "Jaggery",
      "Almonds",
      "Cashews",
      "Cardamom",
    ],
    nutritionalBenefits: [
      "Excellent protein source",
      "Rich in dietary fiber",
      "Contains magnesium & iron",
      "Promotes strength",
    ],
    usageSuggestions: [
      "Festive treat",
      "Post-workout snack",
      "Nourishing energy booster",
    ],
    category: ProductCategory.laddu,
    shelfLife: "3-4 weeks in an airtight container",
    pricing: [
      { weight: "250g", price: 300 },
      { weight: "500g", price: 450 },
      { weight: "1kg", price: 900 },
    ],
  },
  {
    name: "Til Laddu",
    image: "/assets/uploads/image-8-1.png",
    description:
      "Made from roasted sesame seeds (til) and jaggery. Simple, crunchy, and rich in calcium, magnesium, iron, and healthy fats.",
    ingredients: ["Sesame seeds (til)", "Jaggery", "Cardamom"],
    nutritionalBenefits: [
      "Rich in calcium",
      "High magnesium & iron",
      "Healthy fats",
      "Provides warmth in winter",
    ],
    usageSuggestions: [
      "Traditional Makar Sankranti sweet",
      "Winter energy booster",
      "Daily healthy treat",
    ],
    category: ProductCategory.laddu,
    shelfLife: "4-6 weeks in an airtight container",
    pricing: [
      { weight: "250g", price: 225 },
      { weight: "500g", price: 450 },
      { weight: "1kg", price: 900 },
    ],
  },
];

const FALLBACK_CHUTNEYS: ProductData[] = [
  {
    name: "Moringa Chutney Powder",
    image: "/assets/generated/moringa-chutney-powder.dim_600x600.jpg",
    description:
      "Made from dried Moringa (drumstick tree) leaves. Blended with roasted lentils, dry chilies, tamarind, curry leaves, and spices.",
    ingredients: [
      "Moringa leaves",
      "Roasted lentils (urad/chana dal)",
      "Dry chilies",
      "Tamarind",
      "Curry leaves",
      "Spices",
    ],
    nutritionalBenefits: [
      "Rich in vitamins A, C & E",
      "High in calcium, potassium & iron",
      "Antioxidant properties",
      "Supports immunity & digestion",
    ],
    usageSuggestions: [
      "Sprinkle over hot rice with ghee",
      "Accompaniment for dosas & idlis",
      "Add to chapatis or soups",
    ],
    category: ProductCategory.chutneyPowder,
    shelfLife: "Several months in airtight container",
    pricing: [{ weight: "100g", price: 95 }],
  },
  {
    name: "Curry Leaves Chutney Powder",
    image: "/assets/generated/curry-leaves-chutney-powder.dim_600x600.jpg",
    description:
      "Made from aromatic curry leaves with roasted lentils, dry red chilies, tamarind, and fresh garlic.",
    ingredients: [
      "Curry leaves",
      "Urad/chana dal",
      "Dry red chilies",
      "Tamarind",
      "Garlic",
      "Salt",
    ],
    nutritionalBenefits: [
      "Rich in iron & calcium",
      "Vitamins A, B, C & E",
      "Digestive aid",
      "Anti-inflammatory",
    ],
    usageSuggestions: [
      "Mix with hot rice and ghee",
      "Pair with idlis, dosas, parathas",
      "Blend into yogurt for a dip",
    ],
    category: ProductCategory.chutneyPowder,
    shelfLife: "Several months in airtight container",
    pricing: [{ weight: "100g", price: 95 }],
  },
  {
    name: "Mint Leaves Chutney Powder",
    image: "/assets/generated/mint-leaves-chutney-powder.dim_600x600.jpg",
    description:
      "Made from dried mint leaves with roasted lentils, tamarind, red chilies, and cumin. Refreshing and cooling.",
    ingredients: [
      "Dried mint leaves",
      "Roasted lentils",
      "Tamarind",
      "Red chilies",
      "Cumin",
      "Optional garlic or coconut",
    ],
    nutritionalBenefits: [
      "Rich in antioxidants",
      "Aids digestion",
      "Naturally cooling",
      "Contains vitamins A & C",
    ],
    usageSuggestions: [
      "Sprinkle over rice with ghee",
      "Pair with idlis or dosas",
      "Mix into yogurt for raita",
    ],
    category: ProductCategory.chutneyPowder,
    shelfLife: "Several months in airtight container",
    pricing: [{ weight: "100g", price: 95 }],
  },
  {
    name: "Flax Seeds Chutney Powder",
    image: "/assets/generated/flax-seeds-chutney-powder.dim_600x600.jpg",
    description:
      "Made from roasted flax seeds with dry red chilies, tamarind, cumin, and garlic. Nutty, hearty, and highly nutritious.",
    ingredients: [
      "Flax seeds",
      "Dry red chilies",
      "Tamarind",
      "Cumin",
      "Garlic",
      "Optional curry leaves or coconut",
    ],
    nutritionalBenefits: [
      "Rich in omega-3 fatty acids",
      "High fiber content",
      "Antioxidants (lignans)",
      "Promotes heart health",
    ],
    usageSuggestions: [
      "Sprinkle over steamed rice",
      "Side for idlis or dosas",
      "Add to salads or soups",
    ],
    category: ProductCategory.chutneyPowder,
    shelfLife: "Several months in airtight container",
    pricing: [{ weight: "100g", price: 95 }],
  },
  {
    name: "Groundnut Chutney Powder",
    image: "/assets/generated/groundnut-chutney-powder.dim_600x600.jpg",
    description:
      "Made from roasted peanuts with dry red chilies, tamarind, curry leaves, garlic, and cumin. Rich, nutty, and versatile.",
    ingredients: [
      "Roasted groundnuts (peanuts)",
      "Dry red chilies",
      "Tamarind",
      "Curry leaves",
      "Garlic",
      "Cumin seeds",
    ],
    nutritionalBenefits: [
      "Excellent protein source",
      "Healthy monounsaturated fats",
      "Vitamin E, magnesium & potassium",
      "Energy boosting",
    ],
    usageSuggestions: [
      "Mix with hot rice and ghee",
      "Serve with idlis, dosas, chapatis",
      "Use as seasoning for stir-fries",
    ],
    category: ProductCategory.chutneyPowder,
    shelfLife: "Several weeks in airtight container",
    pricing: [{ weight: "100g", price: 95 }],
  },
];

const FALLBACK_SAVOURIES: ProductData[] = [
  {
    name: "Peri Peri Makhana",
    description:
      "Crispy fox nuts (makhana) roasted and tossed in a bold peri peri spice blend. A guilt-free, fiery snack that is light, crunchy, and utterly addictive.",
    ingredients: [
      "Fox nuts (makhana)",
      "Peri peri spice blend",
      "Red chili",
      "Salt",
    ],
    nutritionalBenefits: [
      "Low in calories",
      "Rich in calcium & magnesium",
      "High in antioxidants",
      "Good source of protein",
    ],
    usageSuggestions: [
      "Healthy evening snack",
      "Great movie-time munch",
      "Guilt-free alternative to chips",
    ],
    image: "/assets/uploads/image-1-1.png",
    category: ProductCategory.savoury,
    shelfLife: "3-4 weeks in an airtight container",
    pricing: [{ weight: "100g", price: 300 }],
  },
  {
    name: "Pepper Butter Makhana",
    description:
      "Roasted fox nuts (makhana) tossed in rich butter and freshly cracked black pepper. A delicate, melt-in-the-mouth snack with a warm peppery finish.",
    ingredients: ["Fox nuts (makhana)", "Butter", "Black pepper", "Salt"],
    nutritionalBenefits: [
      "Low in calories",
      "Rich in calcium & magnesium",
      "Good source of protein",
      "Naturally gluten-free",
    ],
    usageSuggestions: [
      "Light tea-time snack",
      "Healthy munch for kids",
      "Post-workout snack",
    ],
    image: "/assets/uploads/image-2-1.png",
    category: ProductCategory.savoury,
    shelfLife: "3-4 weeks in an airtight container",
    pricing: [{ weight: "100g", price: 300 }],
  },
  {
    name: "Poha (Avalakki)",
    description:
      "Lightly roasted flattened rice seasoned with mustard seeds, curry leaves, peanuts, green chili, and turmeric. A classic Karnataka breakfast snack loved by all ages.",
    ingredients: [
      "Flattened rice (poha/avalakki)",
      "Peanuts",
      "Curry leaves",
      "Mustard seeds",
      "Green chili",
      "Turmeric",
      "Sugar",
      "Salt",
      "Oil",
    ],
    nutritionalBenefits: [
      "Good source of iron",
      "Easily digestible",
      "Energy-rich carbohydrates",
      "Naturally light on the stomach",
    ],
    usageSuggestions: [
      "Quick breakfast option",
      "Afternoon tea snack",
      "Travel-friendly munch",
    ],
    image: "/assets/uploads/image-4-1.png",
    category: ProductCategory.savoury,
    shelfLife: "2-3 weeks in an airtight container",
    pricing: [
      { weight: "250g", price: 160 },
      { weight: "500g", price: 300 },
    ],
  },
  {
    name: "Churmuri",
    description:
      "A beloved Karnataka street-food style spiced puffed rice mix with peanuts, curry leaves, coconut, and a squeeze of lemon. Light, tangy, and irresistibly crunchy.",
    ingredients: [
      "Puffed rice (murmure)",
      "Peanuts",
      "Curry leaves",
      "Grated coconut",
      "Green chili",
      "Lemon juice",
      "Turmeric",
      "Salt",
      "Oil",
    ],
    nutritionalBenefits: [
      "Very low in calories",
      "Light and easily digestible",
      "Good source of carbohydrates",
      "Contains healthy fats from peanuts",
    ],
    usageSuggestions: [
      "Perfect evening snack with chai",
      "Light and refreshing any time of day",
      "Great for kids and adults alike",
    ],
    category: ProductCategory.savoury,
    shelfLife: "2-3 weeks in an airtight container",
    image: "/assets/uploads/image-5-1.png",
    pricing: [
      { weight: "200g", price: 120 },
      { weight: "400g", price: 220 },
    ],
  },
];

const TESTIMONIALS = [
  {
    name: "Rashmi",
    location: "Customer",
    text: "I recently purchased Gond Ladoo and Ragi Ladoo. The taste was very authentic and homemade. The sweetness was perfectly balanced and not artificial. The quality and freshness were clearly visible. A healthy and tasty option for snacks. Highly recommended.",
    rating: 5,
  },
  {
    name: "Roopa Arvind",
    location: "Customer",
    text: "Pleasing Delicacies truly lives up to its name. The sweets and snacks are fresh, authentic, and taste just like traditional homemade food. I especially appreciate that they use no preservatives, no added colours, and no oil, which makes everything feel healthy and safe for the family. The Sugar-Free Laddus made with pure ghee are absolutely delicious and perfect for health-conscious people. The variety is impressive — from Gond & Nuts Laddu to Ragi & Nuts (Millet Special) and Til Laddu, each one has a rich, natural flavour. The chutney powders and snacks are equally tasty and well-balanced in flavour. You can really feel the homemade touch in every item. Highly recommended for festive orders and gifting. A perfect place for authentic, traditional delicacies!",
    rating: 5,
  },
  {
    name: "Meena Krishnamurthy",
    location: "Customer",
    text: "The Moringa Chutney Powder is a game-changer for our breakfast! My kids love it on dosas and I love that it's packed with nutrition. Shailaja aunty's recipes are truly authentic.",
    rating: 5,
  },
  {
    name: "Chandrakant Sugoor",
    location: "Bangalore",
    text: "Pleasing Delicacies shop, which has newly come up is in the vicinity of Sambram Engg. College area on Hesaragatta road, Bangalore. I bought some chutney powders recently namely, of Curry leaves, Ground nut, Flax seeds and Drumstick leaves. I could not believe that they all tasted like home made authentic healthy chutney powders. I found them very nice, tasty and perfect combinations to Rice, wheat Chapati, Jower roti, Idli and Dosas. We really enjoyed all of them. I strongly recommend this shop for these products and am sure you will not be disappointed.",
    rating: 5,
  },
  {
    name: "Suvarna Bharani",
    location: "Customer",
    text: "This shop has varieties of ladoos made with zero sugar. All are so tasty that we can keep eating without guilt of gaining weight. They are made with ghee, jaggery and dates. My favourite was dry fruit ladoo without sugar and jaggery. Must give a try for those who have cravings for sweets.",
    rating: 5,
  },
  {
    name: "Hemanth",
    location: "Customer",
    text: "Great laddoos very tastyyy!!! Always want more laddoos after eating one.",
    rating: 5,
  },
  {
    name: "Shreelekha",
    location: "Customer",
    text: "Amazing sunnaundalu... Don't miss this. Tasty dry fruits laddu.",
    rating: 5,
  },
  {
    name: "Radhika",
    location: "Customer",
    text: "Wow the laddus are so delicious. Loved it. It was a great experience.",
    rating: 5,
  },
  {
    name: "Sai Kiran",
    location: "Customer",
    text: "Delicious laddus. Everyone loved them.",
    rating: 5,
  },
  {
    name: "Ajay Kumar",
    location: "Customer",
    text: "Tasty Healthy Hygienic.",
    rating: 5,
  },
];

// ─────────────────────────────────────────────
// PRICING BADGE
// ─────────────────────────────────────────────

function PricingDisplay({ pricing }: { pricing: PricingTier[] }) {
  if (pricing.length === 1) {
    return (
      <div
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-bold"
        style={{
          backgroundColor: "oklch(0.58 0.28 38 / 0.15)",
          color: "oklch(0.38 0.1 52)",
        }}
      >
        ₹{pricing[0].price}
        <span className="text-xs font-normal opacity-75">
          / {pricing[0].weight}
        </span>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {pricing.map((tier) => (
        <div
          key={tier.weight}
          className="flex flex-col items-center px-2.5 py-1 rounded-lg"
          style={{
            backgroundColor: "oklch(0.58 0.28 38 / 0.12)",
            color: "oklch(0.35 0.1 52)",
          }}
        >
          <span className="text-xs font-medium opacity-70">{tier.weight}</span>
          <span className="text-sm font-bold">₹{tier.price}</span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────

function ProductCard({
  product,
  index,
  onAddToCart,
}: {
  product: ProductData;
  index: number;
  onAddToCart: (item: CartItem) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState(
    product.pricing[0].weight,
  );

  const badgeLabel =
    product.category === ProductCategory.laddu
      ? "Laddu"
      : product.category === ProductCategory.savoury
        ? "Savoury"
        : "Chutney";

  return (
    <motion.div
      data-ocid={`offerings.item.${index}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: (index - 1) * 0.07 }}
      className="bg-card rounded-2xl overflow-hidden shadow-warm border border-border flex flex-col"
    >
      {product.image && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      )}

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold leading-tight text-foreground">
            {product.name}
          </h3>
          <Badge
            className="shrink-0 mt-0.5 text-xs"
            style={{
              backgroundColor: "oklch(0.58 0.28 38 / 0.15)",
              color: "oklch(0.38 0.1 52)",
              borderColor: "oklch(0.7 0.19 62 / 0.3)",
            }}
          >
            {badgeLabel}
          </Badge>
        </div>

        <PricingDisplay pricing={product.pricing} />

        <p className="text-sm text-muted-foreground leading-relaxed">
          {product.description}
        </p>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-3 flex flex-col gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-terracotta mb-1.5">
                    Ingredients
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: "oklch(0.92 0.08 72 / 0.7)",
                          color: "oklch(0.3 0.07 48)",
                        }}
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-terracotta mb-1.5">
                    Nutritional Benefits
                  </p>
                  <ul className="space-y-1">
                    {product.nutritionalBenefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-1.5 text-sm text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-terracotta mb-1.5">
                    How to Use
                  </p>
                  <ul className="space-y-1">
                    {product.usageSuggestions.map((u) => (
                      <li
                        key={u}
                        className="flex items-center gap-1.5 text-sm text-muted-foreground"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: "oklch(0.38 0.2 28)" }}
                        />
                        {u}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-muted-foreground italic">
                  🕐 Shelf Life: {product.shelfLife}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-5 pb-3">
        <div className="flex gap-2 items-center">
          <select
            value={selectedWeight}
            onChange={(e) => setSelectedWeight(e.target.value)}
            className="flex-1 text-xs font-medium rounded-lg px-2 py-2 border cursor-pointer"
            style={{
              backgroundColor: "oklch(0.58 0.28 38 / 0.08)",
              borderColor: "oklch(0.7 0.19 62 / 0.3)",
              color: "oklch(0.35 0.1 52)",
            }}
            data-ocid={`product.select.${index}`}
          >
            {product.pricing.map((tier) => (
              <option key={tier.weight} value={tier.weight}>
                {tier.weight} — ₹{tier.price}
              </option>
            ))}
          </select>
          <button
            type="button"
            data-ocid={`product.add_to_cart_button.${index}`}
            onClick={() => {
              const tier = product.pricing.find(
                (t) => t.weight === selectedWeight,
              )!;
              onAddToCart({
                id: `${product.name}-${selectedWeight}`,
                name: product.name,
                weightOption: selectedWeight,
                price: tier.price,
                quantity: 1,
              });
            }}
            className="shrink-0 flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 active:scale-95"
            style={{
              backgroundColor: "oklch(0.58 0.28 38)",
              color: "oklch(0.15 0.04 48)",
            }}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>

      <div className="px-5 pb-4">
        <button
          type="button"
          data-ocid={`offerings.item.${index}.toggle`}
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1.5 text-sm font-medium py-2 rounded-xl transition-colors"
          style={{
            color: "oklch(0.45 0.12 55)",
            backgroundColor: "oklch(0.58 0.28 38 / 0.1)",
          }}
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" /> Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" /> View Details
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { data: backendProducts } = useGetAllProducts();

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i,
      ),
    );
  };

  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const sendWhatsAppOrder = () => {
    if (cartItems.length === 0) return;
    const lines = cartItems
      .map(
        (i) =>
          `- ${i.name} (${i.weightOption}): ₹${i.price} x ${i.quantity} = ₹${i.price * i.quantity}`,
      )
      .join("\n");
    const msg = `Hello! I'd like to order:\n${lines}\n\nTotal: ₹${cartTotal}\nPlease confirm availability.`;
    window.open(
      `https://wa.me/918792880292?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  let laddus: ProductData[] = FALLBACK_LADDUS;
  let chutneys: ProductData[] = FALLBACK_CHUTNEYS;
  let savouries: ProductData[] = FALLBACK_SAVOURIES;
  if (backendProducts && backendProducts.length > 0) {
    const bLaddus = backendProducts.filter(
      (p) => (p.category as string) === ProductCategory.laddu,
    );
    const bChutneys = backendProducts.filter(
      (p) => (p.category as string) === ProductCategory.chutneyPowder,
    );
    const bSavouries = backendProducts.filter(
      (p) => (p.category as string) === ProductCategory.savoury,
    );
    if (bLaddus.length > 0)
      laddus = bLaddus.map(
        (p, i) => ({ ...FALLBACK_LADDUS[i], ...p }) as unknown as ProductData,
      );
    if (bChutneys.length > 0)
      chutneys = bChutneys.map(
        (p, i) => ({ ...FALLBACK_CHUTNEYS[i], ...p }) as unknown as ProductData,
      );
    if (bSavouries.length > 0)
      savouries = bSavouries.map(
        (p, i) =>
          ({
            ...FALLBACK_SAVOURIES[i],
            ...p,
          }) as unknown as ProductData,
      );
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Offerings", id: "offerings" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact", id: "contact" },
  ];

  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen traditional-bg">
      {/* NAV */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-card/95 backdrop-blur-md shadow-warm"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="font-display text-xl font-bold"
            style={{
              color: scrolled ? "oklch(0.38 0.1 52)" : "oklch(0.96 0.04 75)",
            }}
          >
            Pleasing Delicacies
          </button>

          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  data-ocid="nav.link"
                  onClick={() => scrollTo(link.id)}
                  className="text-sm font-medium transition-colors hover:opacity-80"
                  style={{
                    color: scrolled
                      ? "oklch(0.35 0.07 50)"
                      : "oklch(0.96 0.04 75)",
                  }}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <a
                data-ocid="nav.link"
                href="tel:8792880292"
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                style={{
                  backgroundColor: "oklch(0.58 0.28 38)",
                  color: "oklch(0.15 0.04 48)",
                }}
              >
                Order Now
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg"
            style={{
              color: scrolled ? "oklch(0.35 0.07 50)" : "oklch(0.96 0.04 75)",
            }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-card/98 backdrop-blur-md border-t border-border overflow-hidden"
            >
              <ul className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      data-ocid="nav.link"
                      onClick={() => scrollTo(link.id)}
                      className="w-full text-left px-3 py-3 rounded-xl text-base font-medium text-foreground hover:bg-accent transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li className="pt-2">
                  <a
                    data-ocid="nav.link"
                    href="tel:8792880292"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-base font-semibold"
                    style={{
                      backgroundColor: "oklch(0.58 0.28 38)",
                      color: "oklch(0.15 0.04 48)",
                    }}
                  >
                    <Phone className="w-4 h-4" /> Order Now
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* HERO */}
        <section
          id="hero"
          className="relative min-h-[92vh] flex items-end pb-16"
        >
          <div className="hero-overlay absolute inset-0" />
          <div
            className="absolute top-20 right-8 w-48 h-48 rounded-full opacity-15 sm:w-72 sm:h-72"
            style={{
              background:
                "radial-gradient(circle, oklch(0.85 0.2 70), transparent 70%)",
            }}
          />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
            <div className="grid lg:grid-cols-2 gap-10 items-end">
              {/* Left: text content */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div
                  className="relative w-36 h-36 sm:w-44 sm:h-44 mb-6"
                  style={{
                    filter:
                      "drop-shadow(0 0 12px rgba(0,0,0,0.95)) drop-shadow(0 0 24px rgba(0,0,0,0.8)) drop-shadow(0 0 40px rgba(0,0,0,0.6))",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)",
                    }}
                  />
                  <img
                    src="/assets/generated/PD-Logo-transparent.png"
                    alt="Pleasing Delicacies Logo"
                    className="relative w-full h-full object-contain"
                  />
                </div>
                <p
                  className="text-sm font-semibold uppercase tracking-[0.2em] mb-3"
                  style={{ color: "oklch(0.85 0.15 70)" }}
                >
                  Est. 2022
                </p>
                <h1
                  className="font-display text-5xl sm:text-7xl font-bold leading-tight mb-4"
                  style={{ color: "white" }}
                >
                  Pleasing
                  <br />
                  <span style={{ color: "white" }}>Delicacies</span>
                </h1>
                <p
                  className="text-xl sm:text-2xl font-light tracking-wide mb-8"
                  style={{ color: "oklch(0.9 0.04 75)" }}
                >
                  Authentic. Traditional. Homemade.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => scrollTo("offerings")}
                    className="px-6 py-3 rounded-full text-base font-semibold transition-transform hover:scale-105"
                    style={{
                      backgroundColor: "oklch(0.58 0.28 38)",
                      color: "oklch(0.15 0.04 48)",
                    }}
                  >
                    Explore Our Offerings
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollTo("about")}
                    className="px-6 py-3 rounded-full text-base font-medium border transition-colors"
                    style={{
                      borderColor: "oklch(0.9 0.04 75 / 0.5)",
                      color: "oklch(0.97 0.02 75)",
                    }}
                  >
                    Our Story
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section-padding traditional-bg">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
                  style={{ color: "oklch(0.38 0.2 28)" }}
                >
                  Our Story
                </p>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
                  Recipes from
                  <br />
                  <span style={{ color: "oklch(0.6 0.17 55)" }}>
                    Grandmother's Kitchen
                  </span>
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                  PLEASING DELICACIES, established in 2022, is dedicated to
                  providing authentic, traditional and healthy homemade
                  delicacies. Each of our products is made using time honored
                  recipes handed down from our Mothers and mother-in-law.
                </p>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                  We specialize in crafting genuine laddus, nutritious Chutney
                  powders, and crispy savoury snacks, preserving the rich
                  flavors of tradition. Our offerings are free from artificial
                  colors and preservatives, ensuring that everything is freshly
                  prepared and delivered straight to your doorsteps.
                </p>
                <a
                  href="tel:8792880292"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-transform hover:scale-105"
                  style={{
                    backgroundColor: "oklch(0.38 0.2 28)",
                    color: "oklch(0.97 0.02 75)",
                  }}
                >
                  <Phone className="w-4 h-4" /> Place an Order
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4"
              >
                {[
                  {
                    icon: <Leaf className="w-6 h-6" />,
                    title: "No Artificial Colors",
                    desc: "Only pure, natural ingredients — every batch, every time.",
                  },
                  {
                    icon: <ShieldCheck className="w-6 h-6" />,
                    title: "No Preservatives",
                    desc: "Made fresh with no chemical additives or preservatives.",
                  },
                  {
                    icon: <Sparkles className="w-6 h-6" />,
                    title: "Freshly Prepared",
                    desc: "Made to order and delivered fresh to your doorstep.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.12 }}
                    className="flex items-start gap-4 p-5 rounded-2xl"
                    style={{ backgroundColor: "oklch(0.97 0.025 72)" }}
                  >
                    <div
                      className="p-2.5 rounded-xl shrink-0"
                      style={{
                        backgroundColor: "oklch(0.58 0.28 38 / 0.2)",
                        color: "oklch(0.45 0.12 55)",
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">
                        {item.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* OFFERINGS */}
        <section
          id="offerings"
          className="section-padding traditional-bg-muted"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
                style={{ color: "oklch(0.38 0.2 28)" }}
              >
                Homemade Goodness
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
                Our Offerings
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative rounded-2xl overflow-hidden h-48"
              >
                <img
                  src="/assets/generated/laddus-hero.dim_600x400.jpg"
                  alt="Traditional laddus"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
                  <p className="font-display text-2xl font-bold text-white">
                    Laddus
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative rounded-2xl overflow-hidden h-48"
              >
                <img
                  src="/assets/generated/chutney-powders-hero.dim_600x400.jpg"
                  alt="Chutney powders"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
                  <p className="font-display text-2xl font-bold text-white">
                    Chutney Powders
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative rounded-2xl overflow-hidden h-48 sm:col-span-2 lg:col-span-1"
              >
                <img
                  src="/assets/generated/savouries-hero.dim_600x400.jpg"
                  alt="Savoury snacks"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
                  <p className="font-display text-2xl font-bold text-white">
                    Savouries
                  </p>
                </div>
              </motion.div>
            </div>

            <Tabs defaultValue="laddus">
              <TabsList
                className="w-full mb-8 h-14 p-1 rounded-2xl border-2"
                style={{
                  backgroundColor: "oklch(0.30 0.10 45)",
                  borderColor: "oklch(0.58 0.28 38)",
                }}
              >
                <TabsTrigger
                  data-ocid="offerings.tab"
                  value="laddus"
                  className="flex-1 h-11 rounded-xl font-bold text-sm transition-all data-[state=active]:shadow-warm"
                  style={{ color: "oklch(0.96 0.04 75)", fontWeight: 700 }}
                >
                  🍬 Laddus ({laddus.length})
                </TabsTrigger>
                <TabsTrigger
                  data-ocid="offerings.tab"
                  value="chutneys"
                  className="flex-1 h-11 rounded-xl font-bold text-sm transition-all data-[state=active]:shadow-warm"
                  style={{ color: "oklch(0.96 0.04 75)", fontWeight: 700 }}
                >
                  🌿 Chutney Powders ({chutneys.length})
                </TabsTrigger>
                <TabsTrigger
                  data-ocid="offerings.tab"
                  value="savouries"
                  className="flex-1 h-11 rounded-xl font-bold text-sm transition-all data-[state=active]:shadow-warm"
                  style={{ color: "oklch(0.96 0.04 75)", fontWeight: 700 }}
                >
                  🥨 Savouries ({savouries.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="laddus">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {laddus.map((product, i) => (
                    <ProductCard
                      key={product.name}
                      product={product}
                      index={i + 1}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="chutneys">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {chutneys.map((product, i) => (
                    <ProductCard
                      key={product.name}
                      product={product}
                      index={i + 1}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="savouries">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {savouries.map((product, i) => (
                    <ProductCard
                      key={product.name}
                      product={product}
                      index={i + 1}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section
          id="testimonials"
          className="section-padding traditional-bg-muted"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
                style={{ color: "oklch(0.38 0.2 28)" }}
              >
                Happy Customers
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
                What People Say
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="relative p-6 rounded-2xl flex flex-col gap-4"
                  style={{ backgroundColor: "oklch(0.97 0.025 72)" }}
                >
                  <span
                    className="absolute top-4 right-5 font-display text-6xl leading-none opacity-15"
                    style={{ color: "oklch(0.6 0.17 55)" }}
                    aria-hidden
                  >
                    &ldquo;
                  </span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }, (_, j) => j).map((j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 fill-current"
                        style={{ color: "oklch(0.58 0.28 38)" }}
                      />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-foreground leading-relaxed flex-1">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm"
                      style={{
                        backgroundColor: "oklch(0.58 0.28 38 / 0.2)",
                        color: "oklch(0.38 0.1 52)",
                      }}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section-padding traditional-bg-dark">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
                style={{ color: "oklch(0.58 0.28 38)" }}
              >
                Get in Touch
              </p>
              <h2
                className="font-display text-4xl sm:text-5xl font-bold mb-4 leading-tight"
                style={{ color: "white" }}
              >
                Ready to Order?
              </h2>
              <p
                className="text-base sm:text-lg mb-10"
                style={{ color: "oklch(0.82 0.04 72)" }}
              >
                Fresh, homemade goodness delivered to your doorstep.
                <br className="hidden sm:block" /> Contact us directly to place
                your order.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <a
                  data-ocid="contact.button"
                  href="tel:8792880292"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105"
                  style={{
                    backgroundColor: "oklch(0.58 0.28 38)",
                    color: "oklch(0.15 0.04 48)",
                  }}
                >
                  <Phone className="w-5 h-5" />
                  Call 8792880292
                </a>
                <a
                  href="https://www.instagram.com/pleasing._.delicacies?igsh=YnJtbzA3NjZydW9v"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.55 0.22 310), oklch(0.5 0.25 25), oklch(0.65 0.28 55))",
                    color: "white",
                    boxShadow: "0 4px 20px oklch(0.55 0.22 310 / 0.4)",
                  }}
                >
                  <Instagram className="w-5 h-5" />
                  @pleasing_delicacies
                </a>
                <a
                  data-ocid="contact.button"
                  href="https://wa.me/918792880292"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
                  style={{
                    backgroundColor: "oklch(0.52 0.18 145)",
                    color: "white",
                    boxShadow: "0 4px 20px oklch(0.52 0.18 145 / 0.5)",
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </a>
              </div>
              <div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl"
                style={{ backgroundColor: "oklch(0.97 0.02 75 / 0.07)" }}
              >
                <Globe
                  className="w-4 h-4"
                  style={{ color: "oklch(0.58 0.28 38)" }}
                />
                <a
                  href="https://pleasing-delicacies.mini.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm"
                  style={{ color: "oklch(0.85 0.06 72)" }}
                >
                  pleasing-delicacies.mini.site
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* FLOATING CART BUTTON */}
      <button
        type="button"
        data-ocid="cart.open_modal_button"
        onClick={() => setCartOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        style={{
          backgroundColor: "oklch(0.58 0.28 38)",
          color: "oklch(0.15 0.04 48)",
        }}
      >
        <ShoppingCart className="w-6 h-6" />
        {cartCount > 0 && (
          <span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: "oklch(0.45 0.2 25)", color: "white" }}
          >
            {cartCount}
          </span>
        )}
      </button>

      {/* CART SHEET */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent
          data-ocid="cart.sheet"
          side="right"
          className="w-full sm:max-w-md p-0 flex flex-col"
          style={{
            backgroundColor: "oklch(0.97 0.02 75)",
            borderLeft: "1px solid oklch(0.85 0.06 65)",
          }}
        >
          <SheetHeader
            className="px-5 pt-5 pb-4 border-b"
            style={{ borderColor: "oklch(0.85 0.06 65)" }}
          >
            <SheetTitle
              className="font-display text-xl flex items-center gap-2"
              style={{ color: "oklch(0.25 0.07 48)" }}
            >
              <ShoppingCart
                className="w-5 h-5"
                style={{ color: "oklch(0.58 0.28 38)" }}
              />
              Your Cart
              {cartCount > 0 && (
                <span
                  className="ml-auto text-sm font-normal"
                  style={{ color: "oklch(0.55 0.04 65)" }}
                >
                  {cartCount} item{cartCount !== 1 ? "s" : ""}
                </span>
              )}
            </SheetTitle>
          </SheetHeader>

          {cartItems.length === 0 ? (
            <div
              data-ocid="cart.empty_state"
              className="flex-1 flex flex-col items-center justify-center gap-3 px-5"
            >
              <ShoppingCart
                className="w-12 h-12 opacity-20"
                style={{ color: "oklch(0.58 0.28 38)" }}
              />
              <p className="text-sm" style={{ color: "oklch(0.55 0.04 65)" }}>
                Your cart is empty
              </p>
              <p
                className="text-xs text-center"
                style={{ color: "oklch(0.65 0.04 65)" }}
              >
                Browse our products and add items to get started
              </p>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 px-5 py-4">
                <div className="flex flex-col gap-4">
                  {cartItems.map((item, idx) => (
                    <div
                      key={item.id}
                      data-ocid={`cart.item.${idx + 1}`}
                      className="flex items-start gap-3 p-3 rounded-xl"
                      style={{ backgroundColor: "oklch(0.93 0.05 70 / 0.5)" }}
                    >
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-semibold text-sm truncate"
                          style={{ color: "oklch(0.25 0.07 48)" }}
                        >
                          {item.name}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "oklch(0.55 0.08 55)" }}
                        >
                          {item.weightOption} — ₹{item.price} each
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, -1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-lg transition-colors hover:bg-white"
                            style={{
                              backgroundColor: "oklch(0.58 0.28 38 / 0.15)",
                              color: "oklch(0.38 0.1 52)",
                            }}
                          >
                            −
                          </button>
                          <span
                            className="text-sm font-bold w-5 text-center"
                            style={{ color: "oklch(0.25 0.07 48)" }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, 1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-lg transition-colors hover:bg-white"
                            style={{
                              backgroundColor: "oklch(0.58 0.28 38 / 0.15)",
                              color: "oklch(0.38 0.1 52)",
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <p
                          className="font-bold text-sm"
                          style={{ color: "oklch(0.38 0.1 52)" }}
                        >
                          ₹{item.price * item.quantity}
                        </p>
                        <button
                          type="button"
                          data-ocid={`cart.delete_button.${idx + 1}`}
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div
                className="px-5 py-5 border-t"
                style={{ borderColor: "oklch(0.85 0.06 65)" }}
              >
                <div className="flex justify-between items-center mb-4">
                  <span
                    className="font-semibold text-base"
                    style={{ color: "oklch(0.25 0.07 48)" }}
                  >
                    Total
                  </span>
                  <span
                    className="font-bold text-xl"
                    style={{ color: "oklch(0.38 0.1 52)" }}
                  >
                    ₹{cartTotal}
                  </span>
                </div>
                <button
                  type="button"
                  data-ocid="cart.whatsapp_button"
                  onClick={sendWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                  style={{
                    backgroundColor: "oklch(0.55 0.18 145)",
                    color: "white",
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Send Order via WhatsApp
                </button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* FOOTER */}
      <footer className="py-8 px-4 text-center border-t border-border traditional-bg-dark">
        <p
          className="font-display text-base font-semibold mb-1"
          style={{ color: "oklch(0.82 0.1 68)" }}
        >
          Pleasing Delicacies
        </p>
        <p className="text-xs mb-4" style={{ color: "oklch(0.65 0.04 65)" }}>
          8792880292
        </p>
        <p className="text-xs" style={{ color: "oklch(0.55 0.04 65)" }}>
          © {year}. Built with{" "}
          <Heart
            className="inline w-3 h-3"
            style={{ color: "oklch(0.6 0.15 35)" }}
          />{" "}
          using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            className="underline underline-offset-2"
            style={{ color: "oklch(0.65 0.06 65)" }}
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
