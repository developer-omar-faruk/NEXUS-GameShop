import { useState, useEffect, useContext, createContext, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useInView } from "framer-motion";
import {
  FiShoppingCart, FiHeart, FiSearch, FiUser, FiStar,
  FiFilter, FiTruck, FiCreditCard, FiCheckCircle, FiPackage,
  FiMenu, FiX, FiArrowRight, FiMinus, FiPlus, FiTrash2,
  FiMail, FiPhone, FiMapPin, FiInstagram, FiTwitter, FiFacebook,
  FiChevronDown, FiChevronLeft, FiChevronRight, FiEye, FiSun, FiMoon,
  FiHome, FiGrid, FiInfo, FiMessageCircle, FiShield, FiRefreshCw
} from "react-icons/fi";

// ============================================================
// DATA
// ============================================================
const CATEGORIES = [
  { id: 1, name: "Electronics", icon: "💻", color: "from-blue-500 to-indigo-600", count: 120 },
  { id: 2, name: "Fashion", icon: "👗", color: "from-pink-500 to-rose-600", count: 340 },
  { id: 3, name: "Shoes", icon: "👟", color: "from-amber-500 to-orange-600", count: 89 },
  { id: 4, name: "Watches", icon: "⌚", color: "from-slate-500 to-gray-700", count: 54 },
  { id: 5, name: "Beauty", icon: "💄", color: "from-purple-500 to-violet-600", count: 210 },
  { id: 6, name: "Home & Living", icon: "🏠", color: "from-green-500 to-emerald-600", count: 178 },
  { id: 7, name: "Accessories", icon: "👜", color: "from-yellow-500 to-amber-600", count: 95 },
  { id: 8, name: "Gaming", icon: "🎮", color: "from-red-500 to-rose-600", count: 67 },
];

const BRANDS = [
  "Apple", "Nike", "Samsung", "Sony", "Adidas",
  "Gucci", "Rolex", "LG", "Bose", "Prada",
  "Canon", "Dyson", "Zara", "Asus", "Microsoft"
];

const generateProducts = () => {
  const products = [];
  const data = [
    { name: "Pro Wireless Headphones", cat: "Electronics", brand: "Sony", price: 299, orig: 399, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", badge: "Best Seller" },
    { name: "Ultrabook Pro 14", cat: "Electronics", brand: "Asus", price: 1199, orig: 1499, img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80", badge: "New" },
    { name: "Smartwatch Series X", cat: "Watches", brand: "Apple", price: 449, orig: 549, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", badge: "Hot" },
    { name: "Running Shoes Air Max", cat: "Shoes", brand: "Nike", price: 129, orig: 179, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", badge: "Sale" },
    { name: "4K OLED Smart TV 55\"", cat: "Electronics", brand: "LG", price: 899, orig: 1199, img: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&q=80", badge: "Deal" },
    { name: "Luxury Handbag Classic", cat: "Fashion", brand: "Gucci", price: 1850, orig: 2200, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80", badge: "Premium" },
    { name: "Noise Cancelling Buds", cat: "Electronics", brand: "Bose", price: 249, orig: 329, img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80", badge: "New" },
    { name: "Designer Sunglasses", cat: "Accessories", brand: "Prada", price: 320, orig: 420, img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80", badge: "Trending" },
    { name: "DSLR Camera Pro", cat: "Electronics", brand: "Canon", price: 1299, orig: 1599, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80", badge: "Best Seller" },
    { name: "Adidas Track Jacket", cat: "Fashion", brand: "Adidas", price: 89, orig: 120, img: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&q=80", badge: "Sale" },
    { name: "Smart Robot Vacuum", cat: "Home & Living", brand: "Dyson", price: 599, orig: 799, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", badge: "Hot" },
    { name: "Wireless Gaming Mouse", cat: "Gaming", brand: "Asus", price: 79, orig: 99, img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80", badge: "New" },
    { name: "Premium Perfume Set", cat: "Beauty", brand: "Prada", price: 189, orig: 260, img: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&q=80", badge: "Luxury" },
    { name: "Mechanic Keyboard RGB", cat: "Gaming", brand: "Asus", price: 149, orig: 199, img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80", badge: "Hot" },
    { name: "Leather Wallet Slim", cat: "Accessories", brand: "Gucci", price: 275, orig: 350, img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80", badge: "Premium" },
    { name: "Air Purifier Smart", cat: "Home & Living", brand: "Dyson", price: 449, orig: 549, img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80", badge: "New" },
    { name: "Luxury Chronograph", cat: "Watches", brand: "Rolex", price: 8900, orig: 9800, img: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&q=80", badge: "Exclusive" },
    { name: "Samsung Galaxy S24", cat: "Electronics", brand: "Samsung", price: 999, orig: 1199, img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80", badge: "New" },
    { name: "High-Top Sneakers", cat: "Shoes", brand: "Adidas", price: 115, orig: 155, img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&q=80", badge: "Trending" },
    { name: "Floral Maxi Dress", cat: "Fashion", brand: "Zara", price: 79, orig: 110, img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80", badge: "Sale" },
    { name: "MacBook Air M3", cat: "Electronics", brand: "Apple", price: 1299, orig: 1499, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80", badge: "Best Seller" },
    { name: "Silk Evening Gown", cat: "Fashion", brand: "Gucci", price: 1200, orig: 1600, img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&q=80", badge: "Luxury" },
    { name: "Bluetooth Speaker", cat: "Electronics", brand: "Bose", price: 199, orig: 279, img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80", badge: "Hot" },
    { name: "Yoga Mat Premium", cat: "Home & Living", brand: "Nike", price: 65, orig: 89, img: "https://images.unsplash.com/photo-1601925228204-f00b0278b8c8?w=400&q=80", badge: "New" },
    { name: "Gaming Headset Pro", cat: "Gaming", brand: "Sony", price: 129, orig: 179, img: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&q=80", badge: "Best Seller" },
    { name: "Gold Hoop Earrings", cat: "Accessories", brand: "Prada", price: 340, orig: 450, img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80", badge: "Premium" },
    { name: "Hydrating Serum Kit", cat: "Beauty", brand: "Dyson", price: 95, orig: 130, img: "https://images.unsplash.com/photo-1570194065650-d99fb4de8b4e?w=400&q=80", badge: "New" },
    { name: "Vintage Denim Jacket", cat: "Fashion", brand: "Zara", price: 99, orig: 140, img: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&q=80", badge: "Trending" },
    { name: "Leather Oxford Shoes", cat: "Shoes", brand: "Gucci", price: 650, orig: 850, img: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&q=80", badge: "Luxury" },
    { name: "iPad Pro 12.9\"", cat: "Electronics", brand: "Apple", price: 1099, orig: 1299, img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80", badge: "Best Seller" },
    { name: "Sport Water Bottle", cat: "Accessories", brand: "Nike", price: 45, orig: 60, img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80", badge: "Sale" },
    { name: "Mini LED Desk Lamp", cat: "Home & Living", brand: "LG", price: 55, orig: 75, img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80", badge: "New" },
    { name: "Pro Gaming Chair", cat: "Gaming", brand: "Asus", price: 399, orig: 549, img: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=80", badge: "Hot" },
    { name: "Wireless Charger Pad", cat: "Electronics", brand: "Samsung", price: 49, orig: 69, img: "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=400&q=80", badge: "New" },
    { name: "Crossbody Mini Bag", cat: "Accessories", brand: "Prada", price: 480, orig: 620, img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80", badge: "Premium" },
    { name: "Electric Toothbrush", cat: "Beauty", brand: "Dyson", price: 179, orig: 229, img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80", badge: "Deal" },
    { name: "Trail Running Shoes", cat: "Shoes", brand: "Adidas", price: 135, orig: 185, img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80", badge: "New" },
    { name: "Smart Home Hub", cat: "Home & Living", brand: "Apple", price: 199, orig: 249, img: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&q=80", badge: "Hot" },
    { name: "Cashmere Sweater", cat: "Fashion", brand: "Zara", price: 155, orig: 210, img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80", badge: "Luxury" },
    { name: "4K Webcam Ultra", cat: "Electronics", brand: "LG", price: 189, orig: 249, img: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&q=80", badge: "New" },
    { name: "Silver Chain Bracelet", cat: "Accessories", brand: "Gucci", price: 290, orig: 380, img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80", badge: "Premium" },
    { name: "Face Roller Set", cat: "Beauty", brand: "Prada", price: 68, orig: 95, img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=80", badge: "Trending" },
    { name: "Formal Blazer Navy", cat: "Fashion", brand: "Zara", price: 189, orig: 260, img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80", badge: "New" },
    { name: "Mechanical Watch", cat: "Watches", brand: "Rolex", price: 3200, orig: 3800, img: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&q=80", badge: "Exclusive" },
    { name: "Smart Doorbell Cam", cat: "Electronics", brand: "Samsung", price: 229, orig: 299, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", badge: "Sale" },
    { name: "Plush Throw Blanket", cat: "Home & Living", brand: "Zara", price: 79, orig: 110, img: "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=400&q=80", badge: "Cozy" },
    { name: "VR Headset Pro", cat: "Gaming", brand: "Sony", price: 549, orig: 699, img: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&q=80", badge: "Hot" },
    { name: "Satin Slip Dress", cat: "Fashion", brand: "Gucci", price: 760, orig: 960, img: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&q=80", badge: "Luxury" },
    { name: "Platform Sneakers", cat: "Shoes", brand: "Prada", price: 520, orig: 680, img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80", badge: "Premium" },
    { name: "Noise-Free Earphones", cat: "Electronics", brand: "Sony", price: 159, orig: 219, img: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80", badge: "Best Seller" },
  ];

  return data.map((p, i) => ({
    id: i + 1,
    ...p,
    rating: parseFloat((3.8 + Math.random() * 1.2).toFixed(1)),
    reviews: Math.floor(20 + Math.random() * 480),
    inStock: Math.random() > 0.1,
    isNew: p.badge === "New",
    isSale: p.badge === "Sale",
    discount: Math.round(((p.orig - p.price) / p.orig) * 100),
    description: `Premium quality ${p.name.toLowerCase()} crafted with attention to detail. Experience luxury and performance in one stunning package. Perfect for everyday use and special occasions.`,
    specs: {
      Material: "Premium Grade",
      Warranty: "2 Years",
      Color: "Multiple Options",
      Weight: `${(0.2 + Math.random() * 2).toFixed(1)} kg`,
    },
  }));
};

const PRODUCTS = generateProducts();

const TESTIMONIALS = [
  { id: 1, name: "Sarah Johnson", role: "Fashion Designer", avatar: "https://i.pravatar.cc/80?img=1", text: "Absolutely love the quality! The products exceeded my expectations. Fast shipping and beautiful packaging.", rating: 5 },
  { id: 2, name: "Marcus Chen", role: "Tech Entrepreneur", avatar: "https://i.pravatar.cc/80?img=3", text: "World-class shopping experience. The MacBook Air I ordered arrived in pristine condition. Will definitely shop again!", rating: 5 },
  { id: 3, name: "Amelia Brooks", role: "Lifestyle Blogger", avatar: "https://i.pravatar.cc/80?img=5", text: "The curation of products is impeccable. Everything feels premium and the customer service is outstanding.", rating: 5 },
  { id: 4, name: "Jordan Rivera", role: "Photographer", avatar: "https://i.pravatar.cc/80?img=7", text: "Found my dream camera here at the best price. The detailed product pages made my decision easy.", rating: 4 },
  { id: 5, name: "Sophia Patel", role: "Interior Designer", avatar: "https://i.pravatar.cc/80?img=9", text: "I always find unique and elegant items here. The Home & Living section is a treasure trove.", rating: 5 },
  { id: 6, name: "Tyler Nguyen", role: "Game Streamer", avatar: "https://i.pravatar.cc/80?img=11", text: "The gaming gear quality is top-notch. My setup has never looked better. Fast delivery too!", rating: 5 },
];

// ============================================================
// CONTEXT
// ============================================================
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart") || "[]"));
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem("wishlist") || "[]"));
  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem("darkMode") || "false"));
  const [toasts, setToasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => { localStorage.setItem("cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("wishlist", JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem("darkMode", JSON.stringify(darkMode)); }, [darkMode]);

  const addToast = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const addToCart = useCallback((product, qty = 1) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
    addToast(`${product.name} added to cart! 🛒`);
  }, [addToast]);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id));
    addToast("Item removed from cart", "info");
  }, [addToast]);

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) return;
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }, []);

  const clearCart = useCallback(() => { setCart([]); addToast("Cart cleared", "info"); }, [addToast]);

  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const inW = prev.find(i => i.id === product.id);
      if (inW) { addToast("Removed from wishlist", "info"); return prev.filter(i => i.id !== product.id); }
      addToast(`${product.name} added to wishlist! ❤️`);
      return [...prev, product];
    });
  }, [addToast]);

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <AppContext.Provider value={{
      cart, wishlist, darkMode, setDarkMode, toasts,
      addToCart, removeFromCart, updateQty, clearCart, toggleWishlist,
      cartTotal, cartCount, addToast, searchQuery, setSearchQuery,
      currentPage, setCurrentPage, selectedProduct, setSelectedProduct,
      mobileMenuOpen, setMobileMenuOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => useContext(AppContext);

// ============================================================
// REUSABLE COMPONENTS
// ============================================================

// Star Rating
const StarRating = ({ rating, size = "text-sm" }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map(s => (
      <FiStar key={s} className={`${size} ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-600"}`} />
    ))}
  </div>
);

// Badge
const Badge = ({ text, color = "indigo" }) => {
  const colors = {
    indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
    red: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    green: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  };
  return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${colors[color] || colors.indigo}`}>{text}</span>;
};

// Section Header
const SectionHeader = ({ title, subtitle, action, onAction }) => (
  <div className="flex items-end justify-between mb-8">
    <div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
      >{title}</motion.h2>
      {subtitle && <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-gray-500 dark:text-gray-400 mt-1">{subtitle}</motion.p>}
    </div>
    {action && (
      <motion.button whileHover={{ x: 4 }} onClick={onAction}
        className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:gap-3 transition-all"
      >{action} <FiArrowRight /></motion.button>
    )}
  </div>
);

// Product Card
const ProductCard = ({ product, index = 0 }) => {
  const { addToCart, toggleWishlist, wishlist, setCurrentPage, setSelectedProduct } = useApp();
  const inWishlist = wishlist.find(i => i.id === product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl dark:shadow-gray-900/50 transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-800 aspect-square">
        <motion.img
          src={product.img} alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={e => { e.target.src = `https://placehold.co/400x400/e2e8f0/94a3b8?text=${encodeURIComponent(product.name)}`; }}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.badge && <Badge text={product.badge} color={product.badge === "Sale" || product.badge === "Deal" ? "red" : product.badge === "New" ? "green" : "indigo"} />}
          {product.discount > 0 && <Badge text={`-${product.discount}%`} color="red" />}
        </div>
        {/* Wishlist */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <FiHeart className={`w-4 h-4 ${inWishlist ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
        </motion.button>
        {/* Quick View Overlay */}
        <motion.div
          initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <motion.button
            initial={{ scale: 0.8 }} whileInView={{ scale: 1 }}
            onClick={() => { setSelectedProduct(product); setCurrentPage("product"); }}
            className="flex items-center gap-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg hover:bg-indigo-600 hover:text-white transition-colors"
          >
            <FiEye className="w-4 h-4" /> Quick View
          </motion.button>
        </motion.div>
      </div>
      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-indigo-500 dark:text-indigo-400 font-semibold mb-1">{product.brand} · {product.cat}</p>
        <h3
          onClick={() => { setSelectedProduct(product); setCurrentPage("product"); }}
          className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors leading-snug"
        >{product.name}</h3>
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2 mb-4 mt-auto">
          <span className="text-lg font-bold text-gray-900 dark:text-white">${product.price.toLocaleString()}</span>
          {product.orig > product.price && <span className="text-sm text-gray-400 line-through">${product.orig.toLocaleString()}</span>}
        </div>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
          className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-2.5 rounded-xl font-semibold text-sm hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiShoppingCart className="w-4 h-4" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </motion.button>
      </div>
    </motion.div>
  );
};

// Toast System
const ToastContainer = () => {
  const { toasts } = useApp();
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div key={t.id}
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            className={`pointer-events-auto px-5 py-3 rounded-2xl shadow-2xl text-white font-medium text-sm backdrop-blur-md flex items-center gap-2 ${t.type === "success" ? "bg-gray-900/95 dark:bg-gray-800/95" : "bg-indigo-600/95"}`}
          >
            {t.type === "success" ? <FiCheckCircle className="text-green-400 w-4 h-4 flex-shrink-0" /> : <FiPackage className="w-4 h-4 flex-shrink-0" />}
            {t.msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Back to Top
const BackToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-50 w-11 h-11 rounded-2xl bg-indigo-600 text-white shadow-xl flex items-center justify-center hover:bg-indigo-700 transition-colors"
        >
          <FiChevronDown className="rotate-180 w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Scroll Progress
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div style={{ scaleX, transformOrigin: "0%" }} className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-[9999]" />;
};

// ============================================================
// NAVBAR
// ============================================================
const Navbar = () => {
  const { cartCount, wishlist, darkMode, setDarkMode, setCurrentPage, currentPage, mobileMenuOpen, setMobileMenuOpen, searchQuery, setSearchQuery } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [
    { id: "home", label: "Home", icon: <FiHome /> },
    { id: "shop", label: "Shop", icon: <FiGrid /> },
    { id: "about", label: "About", icon: <FiInfo /> },
    { id: "contact", label: "Contact", icon: <FiMessageCircle /> },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-800/50" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <motion.button whileHover={{ scale: 1.05 }} onClick={() => setCurrentPage("home")} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <FiShoppingCart className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-xl text-gray-900 dark:text-white tracking-tight">LUXE<span className="text-indigo-600">STORE</span></span>
            </motion.button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(l => (
                <button key={l.id} onClick={() => setCurrentPage(l.id)}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${currentPage === l.id ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                >{l.label}</button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <AnimatePresence>
                {searchOpen && (
                  <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 200, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <input
                      autoFocus
                      value={searchQuery}
                      onChange={e => { setSearchQuery(e.target.value); if (e.target.value) setCurrentPage("shop"); }}
                      placeholder="Search products..."
                      className="w-full px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl border-none outline-none"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setSearchOpen(s => !s)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {searchOpen ? <FiX className="w-4 h-4" /> : <FiSearch className="w-4 h-4" />}
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setDarkMode(d => !d)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {darkMode ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setCurrentPage("wishlist")}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <FiHeart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{wishlist.length}</span>
                )}
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setCurrentPage("cart")}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <FiShoppingCart className="w-4 h-4" />
                {cartCount > 0 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</motion.span>
                )}
              </motion.button>
              <button onClick={() => setMobileMenuOpen(o => !o)} className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-xl md:hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map(l => (
                <button key={l.id} onClick={() => { setCurrentPage(l.id); setMobileMenuOpen(false); }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${currentPage === l.id ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
                >{l.icon}{l.label}</button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ============================================================
// HOME PAGE SECTIONS
// ============================================================

// Hero Section
const Hero = () => {
  const { setCurrentPage } = useApp();
  const featured = PRODUCTS[0];
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-900">
      {/* BG elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div key={i}
            animate={{ y: [0, -30, 0], x: [0, 15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6 + i * 2, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
            className={`absolute rounded-full opacity-10 bg-gradient-to-br from-indigo-400 to-purple-600`}
            style={{ width: `${80 + i * 40}px`, height: `${80 + i * 40}px`, top: `${10 + i * 12}%`, left: `${5 + i * 14}%` }}
          />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.15)_0%,_transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> New Collection 2025
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6"
          >
            Discover <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Premium</span>
            <br />Products
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-gray-400 text-lg mb-8 max-w-md leading-relaxed"
          >
            Explore the finest collection of luxury goods, cutting-edge electronics, and exclusive fashion. Curated for those who demand excellence.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-wrap gap-4">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={() => setCurrentPage("shop")}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-2xl font-semibold text-base shadow-xl shadow-indigo-900/50 transition-colors"
            >
              Shop Now <FiArrowRight />
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={() => setCurrentPage("shop")}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-8 py-3.5 rounded-2xl font-semibold text-base transition-colors"
            >
              Explore Collection
            </motion.button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex items-center gap-8 mt-10">
            {[["50K+", "Happy Customers"], ["10K+", "Products"], ["500+", "Brands"]].map(([num, label]) => (
              <div key={label}>
                <div className="text-2xl font-black text-white">{num}</div>
                <div className="text-gray-500 text-xs">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero Product */}
        <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          <div className="relative w-full max-w-md">
            <motion.div animate={{ rotate: [0, 2, -2, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 rounded-3xl blur-3xl"
            />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl"
            >
              <img src={featured.img} alt={featured.name} className="w-full h-64 md:h-80 object-cover rounded-2xl mb-4"
                onError={e => { e.target.src = `https://placehold.co/400x320/1e1b4b/a5b4fc?text=${encodeURIComponent(featured.name)}`; }}
              />
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-indigo-400 text-xs font-semibold">{featured.brand}</p>
                  <h3 className="text-white font-bold text-lg">{featured.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <StarRating rating={featured.rating} />
                    <span className="text-gray-400 text-xs">({featured.reviews})</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-black text-xl">${featured.price}</div>
                  <div className="text-gray-500 text-sm line-through">${featured.orig}</div>
                </div>
              </div>
            </motion.div>
            {/* Floating badges */}
            {[
              { text: "Free Shipping", icon: <FiTruck />, pos: "-top-4 -left-4", delay: 1 },
              { text: "Secure Pay", icon: <FiShield />, pos: "-bottom-4 -right-4", delay: 1.2 },
            ].map(({ text, icon, pos, delay }) => (
              <motion.div key={text}
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay }}
                className={`absolute ${pos} bg-white dark:bg-gray-900 rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-800`}
              >
                <span className="text-indigo-600">{icon}</span> {text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-xs">Scroll to explore</span>
        <FiChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
};

// Flash Sale
const FlashSale = () => {
  const { setCurrentPage } = useApp();
  const [time, setTime] = useState({ h: 5, m: 42, s: 17 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) { h = 23; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const pad = n => String(n).padStart(2, "0");
  const flashProducts = PRODUCTS.filter(p => p.discount >= 20).slice(0, 4);
  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-indigo-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">⚡</span>
              <h2 className="text-2xl md:text-3xl font-black">Flash Sale</h2>
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
            </div>
            <p className="text-gray-400">Unbeatable deals for a limited time only</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 mr-2">Ends in:</span>
            {[pad(time.h), pad(time.m), pad(time.s)].map((v, i) => (
              <span key={i} className="flex items-center gap-2">
                <motion.span key={v} initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                  className="bg-white/10 backdrop-blur border border-white/20 text-white font-black text-xl w-12 h-12 flex items-center justify-center rounded-xl"
                >{v}</motion.span>
                {i < 2 && <span className="text-white font-black text-xl">:</span>}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {flashProducts.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setCurrentPage("shop")}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={e => { e.target.src = `https://placehold.co/300x300/1e1b4b/a5b4fc?text=${encodeURIComponent(p.name)}`; }} />
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-black px-2 py-0.5 rounded-full">-{p.discount}%</div>
              </div>
              <div className="p-3">
                <p className="text-white font-semibold text-sm line-clamp-1">{p.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-indigo-300 font-black">${p.price}</span>
                  <span className="text-gray-500 text-xs line-through">${p.orig}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Categories
const Categories = () => {
  const { setCurrentPage, setSearchQuery } = useApp();
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader title="Shop by Category" subtitle="Find exactly what you're looking for" action="All Categories" onAction={() => setCurrentPage("shop")} />
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map((cat, i) => (
            <motion.button key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4, scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => { setSearchQuery(cat.name); setCurrentPage("shop"); }}
              className="group flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-800 transition-all"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>{cat.icon}</div>
              <span className="font-semibold text-xs text-gray-700 dark:text-gray-300 text-center leading-tight">{cat.name}</span>
              <span className="text-gray-400 text-xs">{cat.count}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

// Featured Products
const FeaturedProducts = () => {
  const { setCurrentPage } = useApp();
  const products = PRODUCTS.slice(0, 8);
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader title="Featured Products" subtitle="Hand-picked premium items for you" action="View All" onAction={() => setCurrentPage("shop")} />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
};

// Best Sellers Carousel
const BestSellers = () => {
  const { setCurrentPage } = useApp();
  const [idx, setIdx] = useState(0);
  const best = PRODUCTS.sort((a, b) => b.reviews - a.reviews).slice(0, 10);
  const visible = 4;
  const next = () => setIdx(i => Math.min(i + 1, best.length - visible));
  const prev = () => setIdx(i => Math.max(i - 1, 0));
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <SectionHeader title="Best Sellers" subtitle="Our most popular products" />
          <div className="flex items-center gap-2 mb-8">
            <motion.button whileTap={{ scale: 0.9 }} onClick={prev} disabled={idx === 0}
              className="w-9 h-9 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm hover:border-indigo-400 disabled:opacity-40 transition-colors"
            ><FiChevronLeft /></motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={next} disabled={idx >= best.length - visible}
              className="w-9 h-9 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm hover:border-indigo-400 disabled:opacity-40 transition-colors"
            ><FiChevronRight /></motion.button>
          </div>
        </div>
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: `-${idx * (100 / visible)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="flex gap-4 md:gap-6"
          >
            {best.map((p, i) => (
              <div key={p.id} className="flex-shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.33%-11px)] lg:w-[calc(25%-12px)]">
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// New Arrivals
const NewArrivals = () => {
  const { setCurrentPage } = useApp();
  const newProds = PRODUCTS.filter(p => p.isNew || p.badge === "New").slice(0, 6);
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader title="New Arrivals" subtitle="Fresh additions to our collection" action="See All New" onAction={() => setCurrentPage("shop")} />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
          {newProds.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
};

// Brands
const BrandsSection = () => (
  <section className="py-12 bg-gray-50 dark:bg-gray-950 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="text-center text-gray-400 dark:text-gray-600 text-sm font-medium mb-8 uppercase tracking-widest"
      >Trusted Brands</motion.p>
      <div className="relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 items-center whitespace-nowrap"
        >
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <span key={i} className="text-xl font-black text-gray-300 dark:text-gray-700 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors cursor-default flex-shrink-0">{brand}</span>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

// Testimonials
const Testimonials = () => {
  const [active, setActive] = useState(0);
  const next = () => setActive(a => (a + 1) % TESTIMONIALS.length);
  const prev = () => setActive(a => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <SectionHeader title="What Our Customers Say" subtitle="Real reviews from real shoppers" />
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="text-4xl mb-6">"</div>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8 italic">"{TESTIMONIALS[active].text}"</p>
              <div className="flex items-center justify-center gap-4">
                <img src={TESTIMONIALS[active].avatar} alt={TESTIMONIALS[active].name} className="w-12 h-12 rounded-full ring-2 ring-indigo-500/30" />
                <div className="text-left">
                  <p className="font-bold text-gray-900 dark:text-white">{TESTIMONIALS[active].name}</p>
                  <p className="text-gray-500 text-sm">{TESTIMONIALS[active].role}</p>
                </div>
                <StarRating rating={TESTIMONIALS[active].rating} />
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex items-center justify-center gap-3 mt-6">
            <motion.button whileTap={{ scale: 0.9 }} onClick={prev}
              className="w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-indigo-400 transition-colors"
            ><FiChevronLeft /></motion.button>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === active ? "w-6 bg-indigo-600" : "bg-gray-300 dark:bg-gray-600"}`}
              />
            ))}
            <motion.button whileTap={{ scale: 0.9 }} onClick={next}
              className="w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-indigo-400 transition-colors"
            ><FiChevronRight /></motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Newsletter
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { addToast } = useApp();
  return (
    <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl font-black text-white mb-3"
        >Get Exclusive Deals</motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="text-indigo-200 mb-8"
        >Subscribe to our newsletter and get 10% off your first order.</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="flex gap-2 max-w-md mx-auto"
        >
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email"
            className="flex-1 px-5 py-3 rounded-2xl text-gray-900 bg-white border-none outline-none text-sm font-medium"
          />
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onClick={() => { if (email) { addToast("Subscribed! 🎉 Check your inbox."); setEmail(""); } }}
            className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-semibold text-sm hover:bg-gray-800 transition-colors whitespace-nowrap"
          >Subscribe</motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// Features Bar
const FeaturesBar = () => (
  <section className="py-10 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: <FiTruck className="w-6 h-6" />, title: "Free Shipping", desc: "On orders over $99" },
          { icon: <FiRefreshCw className="w-6 h-6" />, title: "Easy Returns", desc: "30-day return policy" },
          { icon: <FiShield className="w-6 h-6" />, title: "Secure Payments", desc: "256-bit SSL encryption" },
          { icon: <FiCreditCard className="w-6 h-6" />, title: "Flexible Payment", desc: "Multiple payment options" },
        ].map(({ icon, title, desc }, i) => (
          <motion.div key={title}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">{icon}</div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">{title}</p>
              <p className="text-gray-500 text-xs">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ============================================================
// SHOP PAGE
// ============================================================
const ShopPage = () => {
  const { searchQuery, setSearchQuery } = useApp();
  const [filters, setFilters] = useState({ category: "", brand: "", minPrice: 0, maxPrice: 10000, rating: 0, inStock: false });
  const [sort, setSort] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const filtered = PRODUCTS.filter(p => {
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !p.cat.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !p.brand.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filters.category && p.cat !== filters.category) return false;
    if (filters.brand && p.brand !== filters.brand) return false;
    if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
    if (filters.rating && p.rating < filters.rating) return false;
    if (filters.inStock && !p.inStock) return false;
    return true;
  }).sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "popular") return b.reviews - a.reviews;
    return b.id - a.id;
  });

  const paginated = filtered.slice(0, page * PER_PAGE);

  const FilterPanel = () => (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm space-y-6 sticky top-24">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900 dark:text-white">Filters</h3>
        <button onClick={() => setFilters({ category: "", brand: "", minPrice: 0, maxPrice: 10000, rating: 0, inStock: false })}
          className="text-indigo-600 text-xs font-semibold hover:underline">Clear All</button>
      </div>
      {/* Category */}
      <div>
        <p className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2">Category</p>
        <div className="space-y-1">
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setFilters(f => ({ ...f, category: f.category === c.name ? "" : c.name }))}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors ${filters.category === c.name ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
            ><span>{c.name}</span><span className="text-xs text-gray-400">{c.count}</span></button>
          ))}
        </div>
      </div>
      {/* Price */}
      <div>
        <p className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2">Max Price: <span className="text-indigo-600">${filters.maxPrice.toLocaleString()}</span></p>
        <input type="range" min={0} max={10000} step={50} value={filters.maxPrice}
          onChange={e => setFilters(f => ({ ...f, maxPrice: +e.target.value }))}
          className="w-full accent-indigo-600"
        />
      </div>
      {/* Rating */}
      <div>
        <p className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2">Min Rating</p>
        <div className="flex gap-2">
          {[3, 3.5, 4, 4.5].map(r => (
            <button key={r} onClick={() => setFilters(f => ({ ...f, rating: f.rating === r ? 0 : r }))}
              className={`px-2 py-1 rounded-lg text-xs font-semibold border transition-colors ${filters.rating === r ? "bg-amber-500 text-white border-amber-500" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"}`}
            >⭐ {r}+</button>
          ))}
        </div>
      </div>
      {/* In Stock */}
      <div className="flex items-center justify-between">
        <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">In Stock Only</p>
        <button onClick={() => setFilters(f => ({ ...f, inStock: !f.inStock }))}
          className={`w-12 h-6 rounded-full transition-colors ${filters.inStock ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-700"}`}
        >
          <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${filters.inStock ? "translate-x-6" : ""}`} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Shop</h1>
            <p className="text-gray-500 text-sm">{filtered.length} products found</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search..."
                className="pl-9 pr-4 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-indigo-400 text-gray-900 dark:text-white w-44"
              />
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="px-3 py-2 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-700 dark:text-gray-300"
            >
              <option value="newest">Newest</option>
              <option value="popular">Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => setShowFilters(f => !f)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <FiFilter className="w-4 h-4" /> Filters
            </motion.button>
          </div>
        </div>
        {/* Mobile Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="md:hidden mb-4 overflow-hidden">
              <FilterPanel />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0"><FilterPanel /></div>
          {/* Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="text-6xl mb-4">🔍</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or search term</p>
                <button onClick={() => { setSearchQuery(""); setFilters({ category: "", brand: "", minPrice: 0, maxPrice: 10000, rating: 0, inStock: false }); }} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors">Reset Filters</button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-5">
                  {paginated.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
                </div>
                {paginated.length < filtered.length && (
                  <div className="text-center mt-10">
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => setPage(p => p + 1)}
                      className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-semibold text-sm hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white transition-colors"
                    >Load More ({filtered.length - paginated.length} remaining)</motion.button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// PRODUCT DETAIL PAGE
// ============================================================
const ProductPage = () => {
  const { selectedProduct: product, addToCart, toggleWishlist, wishlist, setCurrentPage } = useApp();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");
  const [imgIdx, setImgIdx] = useState(0);
  if (!product) return null;
  const inWishlist = wishlist.find(i => i.id === product.id);
  const related = PRODUCTS.filter(p => p.cat === product.cat && p.id !== product.id).slice(0, 4);
  const images = [product.img, ...related.slice(0, 3).map(p => p.img)];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <button onClick={() => setCurrentPage("home")} className="hover:text-indigo-600 transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => setCurrentPage("shop")} className="hover:text-indigo-600 transition-colors">Shop</button>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium line-clamp-1">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Gallery */}
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="relative bg-gray-50 dark:bg-gray-800 rounded-3xl overflow-hidden aspect-square mb-4"
            >
              <motion.img key={imgIdx} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }}
                src={images[imgIdx]} alt={product.name}
                className="w-full h-full object-cover"
                onError={e => { e.target.src = `https://placehold.co/600x600/e2e8f0/94a3b8?text=${encodeURIComponent(product.name)}`; }}
              />
              {product.badge && <div className="absolute top-4 left-4"><Badge text={product.badge} /></div>}
              {product.discount > 0 && <div className="absolute top-4 right-4"><Badge text={`-${product.discount}%`} color="red" /></div>}
            </motion.div>
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  className={`flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-colors ${imgIdx === i ? "border-indigo-500" : "border-transparent"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover"
                    onError={e => { e.target.src = `https://placehold.co/100x100/e2e8f0/94a3b8?text=img`; }} />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <p className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-2">{product.brand} · {product.cat}</p>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={product.rating} size="text-base" />
              <span className="text-gray-600 dark:text-gray-400 text-sm">{product.rating} ({product.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-black text-gray-900 dark:text-white">${product.price.toLocaleString()}</span>
              {product.orig > product.price && <span className="text-xl text-gray-400 line-through">${product.orig.toLocaleString()}</span>}
              {product.discount > 0 && <Badge text={`Save ${product.discount}%`} color="red" />}
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{product.description}</p>
            {/* Qty & Cart */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-colors">
                  <FiMinus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-gray-900 dark:text-white">{qty}</span>
                <button onClick={() => setQty(q => q + 1)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-colors">
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => { addToCart(product, qty); }}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-2xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 min-w-[150px]"
              >
                <FiShoppingCart /> {product.inStock ? "Add to Cart" : "Out of Stock"}
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }}
                onClick={() => toggleWishlist(product)}
                className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-colors ${inWishlist ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-gray-200 dark:border-gray-700"}`}
              >
                <FiHeart className={`w-5 h-5 ${inWishlist ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
              </motion.button>
            </div>
            {/* Features */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[["Free Shipping", <FiTruck />], ["Secure Payment", <FiCreditCard />], ["Easy Returns", <FiRefreshCw />], ["Quality Assured", <FiCheckCircle />]].map(([l, icon]) => (
                <div key={l} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-indigo-500">{icon}</span>{l}
                </div>
              ))}
            </div>
            {/* Specs */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 grid grid-cols-2 gap-3">
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k}><p className="text-xs text-gray-500 dark:text-gray-500">{k}</p><p className="font-semibold text-gray-900 dark:text-white text-sm">{v}</p></div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mb-12">
          <div className="flex gap-1 border-b border-gray-200 dark:border-gray-800 mb-6">
            {["description", "specifications", "reviews"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-5 py-3 font-semibold text-sm capitalize transition-colors ${tab === t ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
              >{t}</button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {tab === "description" && (
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">{product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
              )}
              {tab === "specifications" && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                      <p className="text-xs text-gray-500 mb-1">{k}</p>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{v}</p>
                    </div>
                  ))}
                </div>
              )}
              {tab === "reviews" && (
                <div className="space-y-4 max-w-2xl">
                  {TESTIMONIALS.slice(0, 4).map((r) => (
                    <div key={r.id} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <img src={r.avatar} className="w-9 h-9 rounded-full" alt={r.name} />
                        <div><p className="font-semibold text-sm text-gray-900 dark:text-white">{r.name}</p>
                          <StarRating rating={r.rating} /></div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{r.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <SectionHeader title="Related Products" subtitle="You might also like" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// CART PAGE
// ============================================================
const CartPage = () => {
  const { cart, removeFromCart, updateQty, clearCart, cartTotal, addToCart, setCurrentPage } = useApp();

  if (cart.length === 0) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 flex items-center justify-center">
      <div className="text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-8xl mb-6">🛒</motion.div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Discover amazing products and add them to your cart</p>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => setCurrentPage("shop")}
          className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-700 transition-colors"
        >Start Shopping</motion.button>
      </div>
    </div>
  );

  const shipping = cartTotal > 99 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Shopping Cart <span className="text-gray-400 font-normal text-xl">({cart.length})</span></h1>
          <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1"><FiTrash2 className="w-4 h-4" /> Clear Cart</button>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence>
              {cart.map(item => (
                <motion.div key={item.id}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20, height: 0 }}
                  layout
                  className="bg-white dark:bg-gray-900 rounded-2xl p-4 flex gap-4 border border-gray-100 dark:border-gray-800 shadow-sm"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800 flex-shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover"
                      onError={e => { e.target.src = `https://placehold.co/80x80/e2e8f0/94a3b8?text=img`; }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-indigo-500 font-semibold">{item.brand}</p>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">{item.name}</h3>
                    <p className="text-gray-500 text-xs">{item.cat}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-0.5">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-colors">
                          <FiMinus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-gray-900 dark:text-white">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-colors">
                          <FiPlus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white">${(item.price * item.qty).toLocaleString()}</p>
                        <p className="text-gray-400 text-xs">${item.price} each</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors self-start">
                    <FiX className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm sticky top-24">
              <h2 className="font-black text-gray-900 dark:text-white mb-5 text-lg">Order Summary</h2>
              <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Subtotal</span><span className="font-semibold text-gray-900 dark:text-white">${cartTotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-500 font-semibold" : "font-semibold text-gray-900 dark:text-white"}>{shipping === 0 ? "FREE" : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Tax (8%)</span><span className="font-semibold text-gray-900 dark:text-white">${tax.toFixed(2)}</span></div>
                {shipping > 0 && <div className="text-xs text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-2">Add ${(99 - cartTotal).toFixed(2)} more for free shipping!</div>}
                <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex justify-between text-base font-black text-gray-900 dark:text-white">
                  <span>Total</span><span>${total.toFixed(2)}</span>
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => setCurrentPage("checkout")}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3.5 rounded-2xl font-bold hover:bg-indigo-700 transition-colors"
              >
                <FiCreditCard className="w-4 h-4" /> Checkout
              </motion.button>
              <button onClick={() => setCurrentPage("shop")} className="w-full mt-3 py-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:underline">Continue Shopping</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// WISHLIST PAGE
// ============================================================
const WishlistPage = () => {
  const { wishlist, toggleWishlist, addToCart, setCurrentPage } = useApp();
  if (wishlist.length === 0) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 flex items-center justify-center">
      <div className="text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="text-8xl mb-6">❤️</motion.div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-6">Save items you love for later</p>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => setCurrentPage("shop")}
          className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-700 transition-colors"
        >Browse Products</motion.button>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Wishlist ({wishlist.length})</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlist.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm group hover:shadow-xl transition-all"
            >
              <div className="relative aspect-square bg-gray-50 dark:bg-gray-800 overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={e => { e.target.src = `https://placehold.co/300x300/e2e8f0/94a3b8?text=${encodeURIComponent(p.name)}`; }} />
                <button onClick={() => toggleWishlist(p)} className="absolute top-3 right-3 w-8 h-8 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow">
                  <FiHeart className="w-4 h-4 fill-red-500 text-red-500" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1 mb-1">{p.name}</h3>
                <p className="font-bold text-gray-900 dark:text-white mb-3">${p.price.toLocaleString()}</p>
                <motion.button whileTap={{ scale: 0.96 }}
                  onClick={() => { addToCart(p); toggleWishlist(p); }}
                  className="w-full py-2 bg-indigo-600 text-white rounded-xl font-semibold text-xs hover:bg-indigo-700 transition-colors"
                >Move to Cart</motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// CHECKOUT PAGE
// ============================================================
const CheckoutPage = () => {
  const { cart, cartTotal, clearCart, setCurrentPage } = useApp();
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({ name: "", email: "", phone: "", address: "", city: "", zip: "", country: "US" });
  const [payment, setPayment] = useState("card");
  const shipping = cartTotal > 99 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  const handleSubmit = () => {
    clearCart();
    setCurrentPage("success");
  };

  const steps = ["Shipping", "Payment", "Review"];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Steps */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {steps.map((s, i) => (
            <span key={s} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${step > i + 1 ? "bg-green-500 text-white" : step === i + 1 ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-500"}`}>
                {step > i + 1 ? <FiCheckCircle className="w-4 h-4" /> : <span>{i + 1}</span>}
                <span className="hidden sm:inline">{s}</span>
              </div>
              {i < 2 && <FiChevronRight className="text-gray-400 flex-shrink-0" />}
            </span>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Step 1 */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm"
              >
                <h2 className="font-black text-gray-900 dark:text-white text-lg mb-5">Shipping Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[["Full Name", "name", "text"], ["Email", "email", "email"], ["Phone", "phone", "tel"], ["Address", "address", "text"]].map(([l, k, t]) => (
                    <div key={k} className={k === "address" ? "sm:col-span-2" : ""}>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">{l}</label>
                      <input type={t} value={info[k]} onChange={e => setInfo(i => ({ ...i, [k]: e.target.value }))} placeholder={l}
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-400 transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">City</label>
                    <input value={info.city} onChange={e => setInfo(i => ({ ...i, city: e.target.value }))} placeholder="City"
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-400" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">ZIP Code</label>
                    <input value={info.zip} onChange={e => setInfo(i => ({ ...i, zip: e.target.value }))} placeholder="ZIP"
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-400" />
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(2)}
                  className="mt-6 w-full py-3 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >Continue to Payment <FiArrowRight /></motion.button>
              </motion.div>
            )}
            {/* Step 2 */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm"
              >
                <h2 className="font-black text-gray-900 dark:text-white text-lg mb-5">Payment Method</h2>
                <div className="space-y-3 mb-6">
                  {[["card", "💳", "Credit / Debit Card"], ["paypal", "🅿️", "PayPal"], ["stripe", "⚡", "Stripe"]].map(([val, icon, label]) => (
                    <label key={val} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-colors ${payment === val ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" : "border-gray-200 dark:border-gray-700"}`}>
                      <input type="radio" value={val} checked={payment === val} onChange={() => setPayment(val)} className="sr-only" />
                      <span className="text-2xl">{icon}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{label}</span>
                      {payment === val && <FiCheckCircle className="ml-auto text-indigo-600 w-5 h-5" />}
                    </label>
                  ))}
                </div>
                {payment === "card" && (
                  <div className="space-y-4 mb-6">
                    <input placeholder="Card Number (1234 5678 9012 3456)" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-400" />
                    <div className="grid grid-cols-2 gap-4">
                      <input placeholder="MM / YY" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-400" />
                      <input placeholder="CVV" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-400" />
                    </div>
                  </div>
                )}
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-200 dark:border-gray-700 rounded-2xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Back</button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => setStep(3)}
                    className="flex-1 py-3 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                  >Review Order <FiArrowRight /></motion.button>
                </div>
              </motion.div>
            )}
            {/* Step 3 */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm"
              >
                <h2 className="font-black text-gray-900 dark:text-white text-lg mb-5">Review Order</h2>
                <div className="space-y-3 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img src={item.img} className="w-14 h-14 rounded-xl object-cover bg-gray-100" alt={item.name}
                        onError={e => { e.target.src = `https://placehold.co/56x56/e2e8f0/94a3b8?text=img`; }} />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-1">{item.name}</p>
                        <p className="text-gray-400 text-xs">Qty: {item.qty}</p>
                      </div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">${(item.price * item.qty).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="flex-1 py-3 border border-gray-200 dark:border-gray-700 rounded-2xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Back</button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleSubmit}
                    className="flex-1 py-3 bg-green-600 text-white rounded-2xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  ><FiCheckCircle /> Place Order</motion.button>
                </div>
              </motion.div>
            )}
          </div>
          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm h-fit sticky top-24">
            <h3 className="font-black text-gray-900 dark:text-white mb-4">Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Subtotal</span><span className="font-semibold text-gray-900 dark:text-white">${cartTotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Shipping</span><span className={shipping === 0 ? "text-green-500 font-semibold" : "font-semibold text-gray-900 dark:text-white"}>{shipping === 0 ? "FREE" : `$${shipping}`}</span></div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400"><span>Tax</span><span className="font-semibold text-gray-900 dark:text-white">${tax.toFixed(2)}</span></div>
              <div className="border-t border-gray-100 dark:border-gray-800 pt-2 flex justify-between font-black text-gray-900 dark:text-white text-base">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// ORDER SUCCESS PAGE
// ============================================================
const SuccessPage = () => {
          const { setCurrentPage } = useApp();
          const orderId = `LX${Math.floor(100000 + Math.random() * 900000)}`;
          
          return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 flex items-center justify-center">
              <div className="max-w-md w-full mx-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ type: "spring", bounce: 0.4 }}
                  className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-10 text-center shadow-2xl"
                >
                  <motion.div
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    transition={{ type: "spring", delay: 0.2, bounce: 0.6 }}
                    className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <FiCheckCircle className="w-12 h-12 text-green-500" />
                  </motion.div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.4 }}
                    className="text-3xl font-black text-gray-900 dark:text-white mb-2"
                  >
                    Order Placed! 🎉
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.5 }}
                    className="text-gray-500 mb-4"
                  >
                    Thank you for shopping with us. Your order has been confirmed.
                  </motion.p>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 mb-8">
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-mono font-bold text-lg text-indigo-600">{orderId}</p>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setCurrentPage("home")}
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-semibold transition-colors"
                  >
                    Continue Shopping
                  </motion.button>
                </motion.div>
              </div>
            </div>
          );
        };

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-xl font-bold mb-2">
          LUXESTORE
        </h3>
        <p className="text-gray-400">
          Premium E-commerce Experience
        </p>
        <p className="text-gray-500 text-sm mt-4">
          © 2026 All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

// === MAIN APP COMPONENT ===
function AppContent() {
  const { currentPage, darkMode } = useApp();

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />

        {currentPage === "home" && (
          <>
            <Hero />
            <FlashSale />
            <Categories />
            <FeaturedProducts />
            <BestSellers />
            <NewArrivals />
            <BrandsSection />
            <Testimonials />
            <FeaturesBar />
            <Newsletter />
          </>
        )}

        {currentPage === "shop" && <ShopPage />}
        {currentPage === "cart" && <CartPage />}
        {currentPage === "wishlist" && <WishlistPage />}
        {currentPage === "product" && <ProductDetailPage />}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "contact" && <ContactPage />}

        <Footer />
        <ToastContainer />
        <BackToTop />
        <ScrollProgress />
      </div>
    </div>
  );
}

// Export App
export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}