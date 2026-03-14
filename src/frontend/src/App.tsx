import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronDown,
  ChevronUp,
  Globe,
  Heart,
  Instagram,
  Leaf,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Category } from "./backend";
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
  category: Category;
  shelfLife: string;
  pricing: PricingTier[];
}

const FALLBACK_LADDUS: ProductData[] = [
  {
    name: "Gond & Nuts Laddu",
    image: "/assets/generated/product-gond-nuts-laddu.dim_400x300.jpg",
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
    category: Category.laddu,
    shelfLife: "3-4 weeks in an airtight container",
    pricing: [
      { weight: "250g", price: 350 },
      { weight: "500g", price: 680 },
      { weight: "1kg", price: 1350 },
    ],
  },
  {
    name: "Wheat & Nuts Laddu",
    image: "/assets/generated/product-wheat-nuts-laddu.dim_400x300.jpg",
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
    category: Category.laddu,
    shelfLife: "3-4 weeks in an airtight container",
    pricing: [
      { weight: "250g", price: 360 },
      { weight: "500g", price: 700 },
      { weight: "1kg", price: 1400 },
    ],
  },
  {
    name: "Dry Fruits Laddu",
    image: "/assets/generated/product-dry-fruits-laddu.dim_400x300.jpg",
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
    category: Category.laddu,
    shelfLife: "2-3 weeks in an airtight container",
    pricing: [
      { weight: "250g", price: 460 },
      { weight: "500g", price: 900 },
      { weight: "1kg", price: 1800 },
    ],
  },
  {
    name: "Flax Seeds & Nuts Laddu",
    image: "/assets/generated/product-flaxseeds-nuts-laddu.dim_400x300.jpg",
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
    category: Category.laddu,
    shelfLife: "3-4 weeks in an airtight container",
    pricing: [
      { weight: "250g", price: 350 },
      { weight: "500g", price: 680 },
      { weight: "1kg", price: 1350 },
    ],
  },
  {
    name: "Ragi & Nuts Laddu",
    image: "/assets/generated/product-ragi-nuts-laddu.dim_400x300.jpg",
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
    category: Category.laddu,
    shelfLife: "3-4 weeks in an airtight container",
    pricing: [
      { weight: "250g", price: 350 },
      { weight: "500g", price: 680 },
      { weight: "1kg", price: 1350 },
    ],
  },
  {
    name: "Urad Dal Laddu",
    image: "/assets/generated/product-urad-dal-laddu.dim_400x300.jpg",
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
    category: Category.laddu,
    shelfLife: "3-4 weeks in an airtight container",
    pricing: [
      { weight: "250g", price: 300 },
      { weight: "500g", price: 450 },
      { weight: "1kg", price: 900 },
    ],
  },
  {
    name: "Til Laddu",
    image: "/assets/generated/product-til-laddu.dim_400x300.jpg",
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
    category: Category.laddu,
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
    image: "/assets/generated/product-moringa-chutney-powder.dim_400x300.jpg",
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
    category: Category.chutneyPowder,
    shelfLife: "Several months in airtight container",
    pricing: [{ weight: "100g", price: 95 }],
  },
  {
    name: "Curry Leaves Chutney Powder",
    image: "/assets/generated/product-curry-leaves-chutney.dim_400x300.jpg",
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
    category: Category.chutneyPowder,
    shelfLife: "Several months in airtight container",
    pricing: [{ weight: "100g", price: 95 }],
  },
  {
    name: "Mint Leaves Chutney Powder",
    image: "/assets/generated/product-mint-leaves-chutney.dim_400x300.jpg",
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
    category: Category.chutneyPowder,
    shelfLife: "Several months in airtight container",
    pricing: [{ weight: "100g", price: 95 }],
  },
  {
    name: "Flax Seeds Chutney Powder",
    image: "/assets/generated/product-flaxseeds-chutney.dim_400x300.jpg",
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
    category: Category.chutneyPowder,
    shelfLife: "Several months in airtight container",
    pricing: [{ weight: "100g", price: 95 }],
  },
  {
    name: "Groundnut Chutney Powder",
    image: "/assets/generated/product-groundnut-chutney.dim_400x300.jpg",
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
    category: Category.chutneyPowder,
    shelfLife: "Several weeks in airtight container",
    pricing: [{ weight: "100g", price: 95 }],
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    location: "Bengaluru",
    text: "I ordered the Gond & Nuts Laddus for my postpartum recovery and they were absolutely wonderful! So nourishing and made with so much care. The taste brought back memories of my grandmother's kitchen.",
    rating: 5,
  },
  {
    name: "Meena Krishnamurthy",
    location: "Mysore",
    text: "The Moringa Chutney Powder is a game-changer for our breakfast! My kids love it on dosas and I love that it's packed with nutrition. Shailaja aunty's recipes are truly authentic.",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    location: "Hyderabad",
    text: "Tried the Dry Fruits Laddu for my diabetic mother — no sugar, all natural sweetness. She loved it and I felt so good knowing she could enjoy sweets guilt-free. Highly recommended!",
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
          backgroundColor: "oklch(0.7 0.19 62 / 0.15)",
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
            backgroundColor: "oklch(0.7 0.19 62 / 0.12)",
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
}: { product: ProductData; index: number }) {
  const [expanded, setExpanded] = useState(false);

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
              backgroundColor: "oklch(0.7 0.19 62 / 0.15)",
              color: "oklch(0.38 0.1 52)",
              borderColor: "oklch(0.7 0.19 62 / 0.3)",
            }}
          >
            {product.category === Category.laddu ? "Laddu" : "Chutney"}
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
                          backgroundColor: "oklch(0.88 0.06 72 / 0.6)",
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
                          style={{ backgroundColor: "oklch(0.52 0.14 35)" }}
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

      <div className="px-5 pb-4">
        <button
          type="button"
          data-ocid={`offerings.item.${index}.toggle`}
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1.5 text-sm font-medium py-2 rounded-xl transition-colors"
          style={{
            color: "oklch(0.45 0.12 55)",
            backgroundColor: "oklch(0.7 0.19 62 / 0.1)",
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
  const { data: backendProducts } = useGetAllProducts();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  let laddus: ProductData[] = FALLBACK_LADDUS;
  let chutneys: ProductData[] = FALLBACK_CHUTNEYS;
  if (backendProducts && backendProducts.length > 0) {
    const bLaddus = backendProducts.filter(
      (p) => p.category === Category.laddu,
    );
    const bChutneys = backendProducts.filter(
      (p) => p.category === Category.chutneyPowder,
    );
    if (bLaddus.length > 0)
      laddus = bLaddus.map((p, i) => ({ ...FALLBACK_LADDUS[i], ...p }));
    if (bChutneys.length > 0)
      chutneys = bChutneys.map((p, i) => ({ ...FALLBACK_CHUTNEYS[i], ...p }));
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
    <div className="min-h-screen bg-background">
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
                  backgroundColor: "oklch(0.7 0.19 62)",
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
                      backgroundColor: "oklch(0.7 0.19 62)",
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
          <img
            src="/assets/generated/hero-banner.dim_1200x500.jpg"
            alt="Pleasing Delicacies hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          <div
            className="absolute top-20 right-8 w-48 h-48 rounded-full opacity-15 sm:w-72 sm:h-72"
            style={{
              background:
                "radial-gradient(circle, oklch(0.85 0.2 70), transparent 70%)",
            }}
          />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p
                className="text-sm font-semibold uppercase tracking-[0.2em] mb-3"
                style={{ color: "oklch(0.85 0.15 70)" }}
              >
                Est. 2022
              </p>
              <h1
                className="font-display text-5xl sm:text-7xl font-bold leading-tight mb-4"
                style={{ color: "oklch(0.97 0.02 75)" }}
              >
                Pleasing
                <br />
                <span style={{ color: "oklch(0.82 0.18 68)" }}>Delicacies</span>
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
                    backgroundColor: "oklch(0.7 0.19 62)",
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
        </section>

        {/* ABOUT */}
        <section id="about" className="section-padding bg-background">
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
                  style={{ color: "oklch(0.52 0.14 35)" }}
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
                  We specialize in crafting genuine laddus and nutritious
                  Chutney powders, preserving the rich flavors of tradition. Our
                  offerings are free from artificial colors and preservatives,
                  ensuring that everything is freshly prepared and delivered
                  straight to your doorsteps.
                </p>
                <a
                  href="tel:8792880292"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-transform hover:scale-105"
                  style={{
                    backgroundColor: "oklch(0.52 0.14 35)",
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
                    style={{ backgroundColor: "oklch(0.94 0.025 72)" }}
                  >
                    <div
                      className="p-2.5 rounded-xl shrink-0"
                      style={{
                        backgroundColor: "oklch(0.7 0.19 62 / 0.2)",
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
          className="section-padding"
          style={{ backgroundColor: "oklch(0.95 0.018 74)" }}
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
                style={{ color: "oklch(0.52 0.14 35)" }}
              >
                Homemade Goodness
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
                Our Offerings
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
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
            </div>

            <Tabs defaultValue="laddus">
              <TabsList
                className="w-full mb-8 h-12 p-1 rounded-2xl"
                style={{ backgroundColor: "oklch(0.88 0.04 72)" }}
              >
                <TabsTrigger
                  data-ocid="offerings.tab"
                  value="laddus"
                  className="flex-1 h-10 rounded-xl font-semibold text-sm transition-all data-[state=active]:shadow-warm"
                >
                  🍬 Laddus ({laddus.length})
                </TabsTrigger>
                <TabsTrigger
                  data-ocid="offerings.tab"
                  value="chutneys"
                  className="flex-1 h-10 rounded-xl font-semibold text-sm transition-all data-[state=active]:shadow-warm"
                >
                  🌿 Chutney Powders ({chutneys.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="laddus">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {laddus.map((product, i) => (
                    <ProductCard
                      key={product.name}
                      product={product}
                      index={i + 1}
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
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="section-padding bg-background">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
                style={{ color: "oklch(0.52 0.14 35)" }}
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
                  style={{ backgroundColor: "oklch(0.94 0.025 72)" }}
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
                        style={{ color: "oklch(0.7 0.19 62)" }}
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
                        backgroundColor: "oklch(0.7 0.19 62 / 0.2)",
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
        <section
          id="contact"
          className="section-padding"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.25 0.07 48) 0%, oklch(0.2 0.06 52) 100%)",
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em] mb-3"
                style={{ color: "oklch(0.7 0.19 62)" }}
              >
                Get in Touch
              </p>
              <h2
                className="font-display text-4xl sm:text-5xl font-bold mb-4 leading-tight"
                style={{ color: "oklch(0.97 0.02 75)" }}
              >
                Ready to Order?
              </h2>
              <p
                className="text-base sm:text-lg mb-10"
                style={{ color: "oklch(0.82 0.04 72)" }}
              >
                Fresh, homemade goodness delivered to your doorstep.
                <br className="hidden sm:block" /> Contact Shailaja directly to
                place your order.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <a
                  data-ocid="contact.button"
                  href="tel:8792880292"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105"
                  style={{
                    backgroundColor: "oklch(0.7 0.19 62)",
                    color: "oklch(0.15 0.04 48)",
                  }}
                >
                  <Phone className="w-5 h-5" />
                  Call 8792880292
                </a>
                <a
                  href="https://instagram.com/pleasing_delicacies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base transition-colors border"
                  style={{
                    borderColor: "oklch(0.7 0.19 62 / 0.4)",
                    color: "oklch(0.9 0.04 75)",
                  }}
                >
                  <Instagram className="w-5 h-5" />
                  @pleasing_delicacies
                </a>
              </div>
              <div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl"
                style={{ backgroundColor: "oklch(0.97 0.02 75 / 0.07)" }}
              >
                <Globe
                  className="w-4 h-4"
                  style={{ color: "oklch(0.7 0.19 62)" }}
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

      {/* FOOTER */}
      <footer
        className="py-8 px-4 text-center border-t border-border"
        style={{ backgroundColor: "oklch(0.19 0.05 48)" }}
      >
        <p
          className="font-display text-base font-semibold mb-1"
          style={{ color: "oklch(0.82 0.1 68)" }}
        >
          Pleasing Delicacies
        </p>
        <p className="text-xs mb-4" style={{ color: "oklch(0.65 0.04 65)" }}>
          Proprietor: Shailaja Patil B · 8792880292
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
