import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import {
  FiMenu, FiX, FiSearch, FiPlay, FiArrowRight, FiStar,
  FiHeart, FiUsers, FiAward, FiMonitor, FiTrendingUp,
  FiCalendar, FiMessageCircle, FiMail, FiPhone,
  FiChevronLeft, FiChevronRight, FiDownload, FiShield,
  FiZap, FiGlobe, FiTwitter, FiYoutube, FiInstagram,
  FiGithub, FiLinkedin, FiBookmark, FiEye, FiCpu,
  FiTarget, FiVolume2, FiWifi, FiChevronUp
} from "react-icons/fi";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "Games", "Esports", "News", "About", "Contact"];

const CATEGORIES = [
  { id: 1, name: "Action",    icon: FiZap,       color: "from-red-500 to-orange-500",    count: 240 },
  { id: 2, name: "RPG",       icon: FiStar,      color: "from-purple-500 to-pink-500",   count: 185 },
  { id: 3, name: "FPS",       icon: FiTarget,    color: "from-blue-500 to-cyan-500",     count: 160 },
  { id: 4, name: "Racing",    icon: FiZap,       color: "from-yellow-500 to-red-500",    count: 95  },
  { id: 5, name: "Adventure", icon: FiGlobe,     color: "from-green-500 to-teal-500",    count: 210 },
  { id: 6, name: "Open World",icon: FiGlobe,     color: "from-cyan-500 to-blue-500",     count: 130 },
  { id: 7, name: "Survival",  icon: FiShield,    color: "from-amber-500 to-orange-600",  count: 88  },
  { id: 8, name: "Strategy",  icon: FiCpu,       color: "from-indigo-500 to-purple-600", count: 145 },
  { id: 9, name: "Horror",    icon: FiVolume2,   color: "from-gray-700 to-red-900",      count: 72  },
  { id: 10,name: "Sports",    icon: FiAward,     color: "from-lime-500 to-green-600",    count: 118 },
];

const GAMES = Array.from({ length: 40 }, (_, i) => {
  const titles = [
    "Cyber Nexus 2077","Shadow Realm Online","Astral Conquest","Void Hunters","Neon Strike",
    "Dragon's Dominion","Phantom Protocol","Eclipse Warfare","Nova Frontiers","Iron Citadel",
    "Abyss Crawler","Star Forge","Quantum Breach","Mythic Legends","Bloodsteel Arena",
    "Galactic Siege","Dark Horizon","Arcane Rift","Turbo Blitz","Eternal Crusade",
    "Chrome Havoc","Warlords Rise","Spectral Ops","Inferno Gates","Cobalt Storm",
    "Oathbreaker","Digital Phantoms","Vortex Empire","Crystal Dominion","Ruinwalkers",
    "Nebula Clash","Rogue Singularity","Forsaken Bastion","Pulse Arena","Titan Protocol",
    "Shadow Nexus","Apex Dominion","Crimson Fleet","Omega Storm","Parallax Zero"
  ];
  const genres = ["Action","RPG","FPS","Adventure","Open World","Strategy","Survival","Horror","Racing","Sports"];
  const platforms = ["PC","PS5","Xbox","Switch","Multi-Platform"];
  const prices = [0, 19.99, 29.99, 39.99, 49.99, 59.99];
  const g = genres[i % genres.length];
  const colors = [
    ["#7c3aed","#06b6d4"],["#ec4899","#8b5cf6"],["#06b6d4","#3b82f6"],
    ["#f59e0b","#ef4444"],["#10b981","#06b6d4"],["#8b5cf6","#ec4899"]
  ];
  const [c1, c2] = colors[i % colors.length];
  return {
    id: i + 1,
    title: titles[i],
    genre: g,
    platform: platforms[i % platforms.length],
    rating: (3.5 + Math.random() * 1.5).toFixed(1),
    price: prices[i % prices.length],
    releaseDate: `${2022 + (i % 3)}-${String((i % 12) + 1).padStart(2,"0")}-${String((i % 28) + 1).padStart(2,"0")}`,
    description: `An epic ${g.toLowerCase()} experience that pushes the boundaries of interactive entertainment. Featuring stunning visuals, deep mechanics, and an unforgettable story.`,
    cover: `https://picsum.photos/seed/game${i + 1}/400/560`,
    banner: `https://picsum.photos/seed/banner${i + 1}/1200/500`,
    color1: c1, color2: c2,
    featured: i < 6,
    trending: i >= 6 && i < 14,
    tags: [g, platforms[i % platforms.length], i % 2 === 0 ? "Multiplayer" : "Single Player"],
    screenshots: Array.from({ length: 4 }, (_, j) => `https://picsum.photos/seed/ss${i}${j}/800/450`),
    features: ["4K Ultra HD","HDR Support","Ray Tracing","Cross-Platform Play","Cloud Save"],
    minReq: "Intel i5-8600K / AMD Ryzen 5 3600, 16GB RAM, GTX 1070",
    recReq: "Intel i9-12900K / AMD Ryzen 9 5900X, 32GB RAM, RTX 3080",
    reviews: Array.from({ length: 3 }, (_, j) => ({
      author: ["ProGamer99","NightOwl","PixelKnight"][j],
      rating: (4 + Math.random()).toFixed(1),
      text: ["Absolutely breathtaking gameplay loop. Can't stop playing!","The best in its genre, period. Highly recommend.","Stunning visuals and tight controls. A must-buy."][j]
    }))
  };
});

const NEWS = Array.from({ length: 20 }, (_, i) => {
  const titles = [
    "Cyber Nexus 2077 Expansion Drops Next Month","Shadow Realm Online Hits 10M Players",
    "Epic Games Store Announces Massive Sale","Esports Championship 2025 Draws Record Viewers",
    "New RTX 5090 Benchmarks Revealed","PlayStation 6 Specs Officially Confirmed",
    "Indie Dev Spotlight: Abyss Crawler","Game Pass Adds 30 Titles in January",
    "Quantum Breach Breaks Steam Records","Riot Games New IP Announced",
    "Xbox Series X Pro Confirmed for 2025","Unreal Engine 6 Demo Stuns Community",
    "Best FPS Games of 2025 Ranked","Switch 2 Launch Titles Revealed",
    "Steam Deck 2 Announced with OLED Display","Mobile Gaming Revenue Surpasses Console",
    "Top 10 Most Anticipated Games of 2026","Halo Returns with New Studio",
    "From Software New Project Teased","Cyberpunk Sequel in Development"
  ];
  const cats = ["Industry","Updates","Hardware","Esports","Reviews"];
  return {
    id: i + 1,
    title: titles[i],
    category: cats[i % cats.length],
    date: `${["Jan","Feb","Mar","Apr","May","Jun"][i % 6]} ${10 + i}, 2025`,
    thumbnail: `https://picsum.photos/seed/news${i + 1}/600/400`,
    excerpt: "The gaming industry continues to evolve at breakneck speed, bringing new experiences and innovations that redefine what interactive entertainment can be.",
    readTime: `${2 + (i % 6)} min read`,
    featured: i < 3,
  };
});

const ESPORTS_EVENTS = Array.from({ length: 15 }, (_, i) => {
  const names = [
    "World Championship 2025","Cyber League Season 8","Global Invitational",
    "Pro Series Grand Final","Masters Circuit","Champions Cup",
    "Apex Invitational","Elite Tournament","Digital Olympics","Battle Royale World Cup",
    "FPS World Finals","Strategy Masters","Racing Grand Prix","Combat Championship","Shadow Cup"
  ];
  const games = ["Cyber Nexus 2077","Void Hunters","Neon Strike","Phantom Protocol","Astral Conquest"];
  const statuses = ["Live","Upcoming","Concluded"];
  const prizes = ["$500,000","$1,000,000","$250,000","$750,000","$2,000,000"];
  return {
    id: i + 1,
    name: names[i],
    game: games[i % games.length],
    prizePool: prizes[i % prizes.length],
    teams: 8 + (i % 16),
    startDate: `2025-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2,"0")}`,
    status: statuses[i % statuses.length],
    location: ["Online","Los Angeles","Seoul","London","Tokyo","Berlin"][i % 6],
    banner: `https://picsum.photos/seed/esport${i + 1}/600/300`,
  };
});

const TEAMS = Array.from({ length: 10 }, (_, i) => {
  const names = ["Team Phoenix","Neon Wolves","Cyber Dragons","Shadow Squad","Iron Titans",
    "Void Reapers","Nova Force","Phantom 5","Galactic Raiders","Storm Breakers"];
  const regions = ["NA","EU","APAC","KR","BR","CIS"];
  return {
    id: i + 1,
    name: names[i],
    region: regions[i % regions.length],
    rank: i + 1,
    wins: 50 - i * 3,
    losses: 5 + i * 2,
    points: 2500 - i * 180,
    logo: `https://picsum.photos/seed/team${i + 1}/80/80`,
  };
});

const COMMUNITY_STATS = [
  { label: "Active Players",   value: "12.4M", icon: FiUsers,      color: "text-cyan-400"   },
  { label: "Games Available",  value: "4,200+",icon: FiMonitor,    color: "text-purple-400" },
  { label: "Tournaments Won",  value: "8,900", icon: FiAward,      color: "text-pink-400"   },
  { label: "Discord Members",  value: "2.1M",  icon: FiMessageCircle,color:"text-blue-400"  },
];

const TESTIMONIALS = Array.from({ length: 10 }, (_, i) => {
  const names = ["xXProSlayer","NightOwlGamer","PixelKnight","CyberViper","StarForge",
    "ZeroGravity","NeonShadow","VoidRunner","PhantomAce","StormRider"];
  const texts = [
    "This platform completely changed how I experience gaming. The UI is next level!",
    "Never going back to any other gaming platform. The community here is incredible.",
    "The esports coverage is unmatched. Live stats, real-time updates — absolutely elite.",
    "Found so many hidden gems through the recommendation system. 10/10.",
    "The game discovery features are insane. My backlog has never been bigger!",
    "Smooth, fast, and gorgeous. This is what a gaming platform should look like.",
    "The tournament section got me into competitive gaming. Life changing honestly.",
    "Best deals on games, best UI, best community. What more do you want?",
    "The news section keeps me updated on everything. My go-to gaming hub.",
    "Played my first esports match through this platform. Now I'm hooked forever."
  ];
  return { id: i + 1, name: names[i], avatar: `https://picsum.photos/seed/user${i + 1}/60/60`, text: texts[i], rating: 5, game: GAMES[i].title };
});

// ─── UTILITIES ─────────────────────────────────────────────────────────────────

const cn = (...classes) => classes.filter(Boolean).join(" ");

const fadeUp   = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const fadeIn   = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } };
const scaleIn  = { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } };
const stagger  = (delay = 0.1) => ({ visible: { transition: { staggerChildren: delay } } });

// ─── ANIMATED BACKGROUND ───────────────────────────────────────────────────────

function ParticleField() {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 5,
    color: ["#06b6d4","#8b5cf6","#ec4899","#3b82f6"][Math.floor(Math.random() * 4)]
  }));
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full opacity-30"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color, boxShadow: `0 0 ${p.size * 4}px ${p.color}` }}
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(6,182,212,0.06) 0%, transparent 60%)" }} />
    </div>
  );
}

// ─── CURSOR ────────────────────────────────────────────────────────────────────

function CustomCursor() {
  const [pos, setPos]     = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = e => {
      setPos({ x: e.clientX, y: e.clientY });
      setTimeout(() => setTrail({ x: e.clientX, y: e.clientY }), 80);
    };
    const over = e => setHover(!!e.target.closest("a,button,[data-hover]"));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);

  return (
    <>
      <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
        animate={{ x: pos.x - 6, y: pos.y - 6, scale: hover ? 1.8 : 1 }}
        transition={{ type: "spring", stiffness: 800, damping: 35 }}
        style={{ width: 12, height: 12, background: "#06b6d4" }}
      />
      <motion.div className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-cyan-400/40"
        animate={{ x: trail.x - 20, y: trail.y - 20, scale: hover ? 1.5 : 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ width: 40, height: 40 }}
      />
    </>
  );
}

// ─── SCROLL PROGRESS ───────────────────────────────────────────────────────────

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div className="fixed top-0 left-0 right-0 h-0.5 z-[100] origin-left"
      style={{ scaleX, background: "linear-gradient(90deg,#8b5cf6,#06b6d4,#ec4899)" }}
    />
  );
}

// ─── BACK TO TOP ───────────────────────────────────────────────────────────────

function BackToTop() {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const fn = () => setVis(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <AnimatePresence>
      {vis && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center border border-cyan-500/50 bg-gray-900/80 backdrop-blur-md text-cyan-400 hover:bg-cyan-500/20 transition-colors"
          style={{ boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}
        >
          <FiChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── LOADING SCREEN ────────────────────────────────────────────────────────────

function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setProgress(p => { if (p >= 100) { clearInterval(t); setTimeout(onDone, 300); return 100; } return p + 2; }), 30);
    return () => clearInterval(t);
  }, [onDone]);
  return (
    <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#030712]">
      <motion.div animate={{ rotateY: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-20 h-20 mb-8">
        <div className="w-full h-full border-4 border-transparent border-t-cyan-400 border-r-purple-500 rounded-full" style={{ boxShadow: "0 0 30px rgba(6,182,212,0.5)" }} />
      </motion.div>
      <h1 className="text-3xl font-black tracking-widest mb-2" style={{ background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>NEXUS GAMING</h1>
      <p className="text-gray-500 text-sm mb-8 tracking-widest uppercase">Loading Experience</p>
      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ width: `${progress}%`, background: "linear-gradient(90deg,#8b5cf6,#06b6d4)" }} transition={{ ease: "linear" }} />
      </div>
      <p className="text-cyan-400 text-sm mt-3 font-mono">{progress}%</p>
    </motion.div>
  );
}

// ─── NAVBAR ────────────────────────────────────────────────────────────────────

function Navbar({ activePage, setActivePage, wishlist, setSearchOpen }) {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-gray-950/90 backdrop-blur-xl border-b border-white/5 shadow-2xl" : "bg-transparent")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button whileHover={{ scale: 1.05 }} onClick={() => setActivePage("Home")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", boxShadow: "0 0 20px rgba(6,182,212,0.4)" }}>
              <FiZap size={16} className="text-white" />
            </div>
            <span className="text-xl font-black tracking-wider" style={{ background: "linear-gradient(135deg,#a78bfa,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>NEXUS</span>
          </motion.button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <motion.button key={link} whileHover={{ scale: 1.05 }} onClick={() => setActivePage(link)}
                className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  activePage === link ? "text-cyan-400 bg-cyan-400/10" : "text-gray-400 hover:text-white hover:bg-white/5")}
              >
                {link}
                {activePage === link && <motion.div layoutId="nav-indicator" className="w-full h-0.5 mt-0.5 rounded-full bg-cyan-400" />}
              </motion.button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <motion.button whileHover={{ scale: 1.1 }} onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all">
              <FiSearch size={18} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} onClick={() => setActivePage("Wishlist")}
              className="relative p-2 rounded-lg text-gray-400 hover:text-pink-400 hover:bg-pink-400/10 transition-all">
              <FiHeart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 text-white text-[10px] flex items-center justify-center font-bold">{wishlist.length}</span>
              )}
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-black transition-all"
              style={{ background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}>
              <FiMonitor size={14} /> Play Now
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-gray-400 hover:text-white">
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-950/95 backdrop-blur-xl border-t border-white/5">
            <div className="px-4 py-4 flex flex-col gap-2">
              {NAV_LINKS.map(link => (
                <motion.button key={link} whileHover={{ x: 8 }} onClick={() => { setActivePage(link); setMobileOpen(false); }}
                  className={cn("text-left px-4 py-3 rounded-lg text-sm font-medium transition-all",
                    activePage === link ? "text-cyan-400 bg-cyan-400/10" : "text-gray-400 hover:text-white")}>
                  {link}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── SEARCH MODAL ──────────────────────────────────────────────────────────────

function SearchModal({ open, onClose, setActivePage, setSelectedGame }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef();
  const results = query.length > 1 ? GAMES.filter(g => g.title.toLowerCase().includes(query.toLowerCase())).slice(0, 6) : [];

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 100); }, [open]);
  useEffect(() => { const fn = e => e.key === "Escape" && onClose(); window.addEventListener("keydown", fn); return () => window.removeEventListener("keydown", fn); }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          onClick={e => e.target === e.currentTarget && onClose()}>
          <motion.div initial={{ scale: 0.9, y: -20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: -20 }}
            className="w-full max-w-2xl bg-gray-900/95 border border-white/10 rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 0 60px rgba(6,182,212,0.2)" }}>
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <FiSearch size={18} className="text-gray-400" />
              <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search games, news, categories…"
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg" />
              <button onClick={onClose}><FiX size={18} className="text-gray-400 hover:text-white" /></button>
            </div>
            {results.length > 0 && (
              <div className="py-2">
                {results.map(g => (
                  <motion.button key={g.id} whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                    onClick={() => { setSelectedGame(g); setActivePage("GameDetails"); onClose(); setQuery(""); }}
                    className="w-full flex items-center gap-4 px-5 py-3 transition-colors">
                    <img src={g.cover} alt={g.title} className="w-10 h-14 object-cover rounded-lg" />
                    <div className="text-left">
                      <p className="text-white font-semibold text-sm">{g.title}</p>
                      <p className="text-gray-400 text-xs">{g.genre} · {g.platform}</p>
                    </div>
                    <div className="ml-auto text-cyan-400 text-xs font-bold">{g.price === 0 ? "Free" : `$${g.price}`}</div>
                  </motion.button>
                ))}
              </div>
            )}
            {query.length > 1 && results.length === 0 && (
              <p className="text-center text-gray-500 py-8">No results for "{query}"</p>
            )}
            {query.length === 0 && (
              <div className="px-5 py-4">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Quick Access</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.slice(0, 6).map(c => (
                    <button key={c.id} onClick={() => { setActivePage("Games"); onClose(); }}
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs hover:border-cyan-500/50 hover:text-cyan-400 transition-all">
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── HERO SECTION ──────────────────────────────────────────────────────────────

function Hero({ setActivePage, setSelectedGame }) {
  const hero = GAMES[0];
  const [idx, setIdx] = useState(0);
  const featured = GAMES.slice(0, 5);
  const ref = useRef();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % featured.length), 5000);
    return () => clearInterval(t);
  }, []);

  const current = featured[idx];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* BG */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <img src={current.banner} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(3,7,18,0.97) 0%,rgba(3,7,18,0.7) 50%,rgba(3,7,18,0.9) 100%)" }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 70% 50%,${current.color1}18 0%,transparent 60%)` }} />
      </motion.div>

      {/* Grid */}
      <div className="absolute inset-0 z-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(6,182,212,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <motion.div key={`badge-${idx}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> Featured Game
            </motion.div>
            <motion.h1 key={`title-${idx}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none mb-4"
              style={{ background: `linear-gradient(135deg,#ffffff,${current.color1},${current.color2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {current.title}
            </motion.h1>
            <motion.div key={`meta-${idx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="flex items-center gap-4 mb-4 text-sm text-gray-400">
              <span className="px-2 py-0.5 rounded bg-white/10 text-white">{current.genre}</span>
              <span className="flex items-center gap-1 text-yellow-400"><FiStar size={12} /> {current.rating}</span>
              <span>{current.platform}</span>
              <span className="flex items-center gap-1"><FiCalendar size={12} /> {current.releaseDate}</span>
            </motion.div>
            <motion.p key={`desc-${idx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="text-gray-400 text-base mb-8 max-w-lg leading-relaxed">{current.description}</motion.p>
            <motion.div key={`cta-${idx}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => { setSelectedGame(current); setActivePage("GameDetails"); }}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-black transition-all"
                style={{ background: `linear-gradient(135deg,${current.color1},${current.color2})`, boxShadow: `0 0 30px ${current.color1}50` }}>
                <FiPlay size={16} /> Play Now
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setActivePage("Games")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white border border-white/20 bg-white/5 backdrop-blur hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all">
                <FiArrowRight size={16} /> Explore Games
              </motion.button>
            </motion.div>

            {/* Dots */}
            <div className="flex gap-2 mt-8">
              {featured.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)}
                  className={cn("h-1 rounded-full transition-all duration-300", i === idx ? "w-8 bg-cyan-400" : "w-4 bg-white/20")} />
              ))}
            </div>
          </div>

          {/* Right – floating cover */}
          <div className="hidden lg:flex justify-center items-center relative">
            <motion.div key={`cover-${idx}`} initial={{ opacity: 0, scale: 0.8, rotateY: -20 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.6 }} className="relative"
              animate={{ y: [0, -12, 0] }} style={{ animationDuration: "4s" }}>
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                <img src={current.cover} alt={current.title}
                  className="w-72 h-96 object-cover rounded-2xl"
                  style={{ boxShadow: `0 0 80px ${current.color1}60, 0 0 40px ${current.color2}40` }} />
                <div className="absolute inset-0 rounded-2xl" style={{ border: `1px solid ${current.color1}40` }} />
              </motion.div>
            </motion.div>

            {/* Floating badges */}
            <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-8 -left-8 px-3 py-2 rounded-xl bg-gray-900/80 backdrop-blur border border-white/10 text-xs">
              <p className="text-yellow-400 font-bold flex items-center gap-1"><FiStar size={10} /> {current.rating} Rating</p>
            </motion.div>
            <motion.div animate={{ y: [5, -5, 5] }} transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute bottom-12 -right-4 px-3 py-2 rounded-xl bg-gray-900/80 backdrop-blur border border-white/10 text-xs">
              <p className="text-green-400 font-bold">🟢 12.4K Online</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-xs">
        <div className="w-5 h-8 rounded-full border border-gray-600 flex items-start justify-center pt-1">
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-1 h-2 rounded-full bg-cyan-400" />
        </div>
        Scroll
      </motion.div>
    </section>
  );
}

// ─── SECTION HEADER ────────────────────────────────────────────────────────────

function SectionHeader({ badge, title, subtitle, action, onAction }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-4">
          <FiZap size={10} /> {badge}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">{title}</h2>
      {subtitle && <p className="text-gray-400 max-w-xl mx-auto">{subtitle}</p>}
      {action && (
        <motion.button whileHover={{ scale: 1.05 }} onClick={onAction}
          className="mt-4 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors">
          {action} <FiArrowRight size={14} />
        </motion.button>
      )}
    </motion.div>
  );
}

// ─── GAME CARD ─────────────────────────────────────────────────────────────────

function GameCard({ game, onSelect, wishlist, onWishlist }) {
  const wished = wishlist.includes(game.id);
  return (
    <motion.div variants={scaleIn} whileHover={{ y: -6, scale: 1.02 }} data-hover
      className="relative group bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
      style={{ boxShadow: "0 0 0 transparent" }}
      whileHover_style={{ boxShadow: `0 0 40px ${game.color1}30` }}
      onClick={() => onSelect(game)}>
      {/* Cover */}
      <div className="relative overflow-hidden aspect-[3/4]">
        <img src={game.cover} alt={game.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,7,18,0.95) 0%,transparent 60%)" }} />
        {/* Overlay buttons */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 rounded-xl font-bold text-sm text-black flex items-center gap-2"
            style={{ background: `linear-gradient(135deg,${game.color1},${game.color2})`, boxShadow: `0 0 20px ${game.color1}60` }}>
            <FiPlay size={14} /> Play
          </motion.button>
        </div>
        {/* Wishlist */}
        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
          onClick={e => { e.stopPropagation(); onWishlist(game.id); }}
          className={cn("absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center transition-all",
            wished ? "bg-pink-500/20 text-pink-400 border border-pink-500/40" : "bg-gray-900/60 text-gray-400 border border-white/10 opacity-0 group-hover:opacity-100")}>
          <FiHeart size={14} />
        </motion.button>
        {/* Price */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-gray-900/80 backdrop-blur text-xs font-bold"
          style={{ color: game.price === 0 ? "#4ade80" : "#f8fafc" }}>
          {game.price === 0 ? "FREE" : `$${game.price}`}
        </div>
      </div>
      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-white font-bold text-sm leading-tight line-clamp-1">{game.title}</h3>
          <span className="flex items-center gap-0.5 text-yellow-400 text-xs shrink-0"><FiStar size={10} />{game.rating}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="px-1.5 py-0.5 rounded bg-white/5">{game.genre}</span>
          <span>{game.platform}</span>
        </div>
      </div>
      {/* Glow border on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${game.color1}40` }} />
    </motion.div>
  );
}

// ─── FEATURED GAMES ────────────────────────────────────────────────────────────

function FeaturedGames({ setActivePage, setSelectedGame, wishlist, onWishlist }) {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader badge="Featured" title="Featured Games" subtitle="Handpicked titles delivering unforgettable gaming experiences"
          action="View All Games" onAction={() => setActivePage("Games")} />
        <motion.div variants={stagger(0.08)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {GAMES.filter(g => g.featured).map(g => (
            <GameCard key={g.id} game={g} onSelect={g => { setSelectedGame(g); setActivePage("GameDetails"); }} wishlist={wishlist} onWishlist={onWishlist} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── TRENDING SLIDER ───────────────────────────────────────────────────────────

function TrendingGames({ setActivePage, setSelectedGame, wishlist, onWishlist }) {
  const [startIdx, setStartIdx] = useState(0);
  const trending = GAMES.filter(g => g.trending);
  const visible = 4;

  const prev = () => setStartIdx(i => Math.max(0, i - 1));
  const next = () => setStartIdx(i => Math.min(trending.length - visible, i + 1));

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%,rgba(139,92,246,0.06) 0%,transparent 70%)" }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <FiTrendingUp size={10} /> Trending Now
            </div>
            <h2 className="text-3xl font-black text-white">Hot Right Now</h2>
          </div>
          <div className="flex gap-3">
            <motion.button whileHover={{ scale: 1.1 }} onClick={prev} disabled={startIdx === 0}
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-cyan-500/50 disabled:opacity-30 transition-all">
              <FiChevronLeft size={18} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} onClick={next} disabled={startIdx >= trending.length - visible}
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-cyan-500/50 disabled:opacity-30 transition-all">
              <FiChevronRight size={18} />
            </motion.button>
          </div>
        </div>

        <div className="overflow-hidden">
          <motion.div className="flex gap-5" animate={{ x: `-${startIdx * (100 / visible)}%` }} transition={{ type: "spring", stiffness: 200, damping: 30 }}>
            {trending.map(g => (
              <div key={g.id} className="flex-shrink-0" style={{ width: `calc(${100 / visible}% - 20px)` }}>
                <GameCard game={g} onSelect={g => { setSelectedGame(g); setActivePage("GameDetails"); }} wishlist={wishlist} onWishlist={onWishlist} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── CATEGORIES ────────────────────────────────────────────────────────────────

function Categories({ setActivePage }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader badge="Browse" title="Game Categories" subtitle="Explore every genre and find your next favorite game"
          action="See All" onAction={() => setActivePage("Games")} />
        <motion.div variants={stagger(0.07)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CATEGORIES.map(cat => (
            <motion.button key={cat.id} variants={scaleIn} whileHover={{ y: -4, scale: 1.03 }} data-hover
              onClick={() => setActivePage("Games")}
              className="group relative p-5 rounded-2xl border border-white/5 bg-gray-900/50 backdrop-blur overflow-hidden transition-all duration-300">
              <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br", cat.color)} style={{ opacity: 0 }}
                   onMouseEnter={e => { e.currentTarget.style.opacity = "0.08"; }} onMouseLeave={e => { e.currentTarget.style.opacity = "0"; }} />
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br text-white", cat.color)}>
                <cat.icon size={18} />
              </div>
              <p className="text-white font-bold text-sm">{cat.name}</p>
              <p className="text-gray-500 text-xs mt-0.5">{cat.count} Games</p>
              <div className={cn("absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r", cat.color)} />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── ESPORTS SECTION ───────────────────────────────────────────────────────────

function EsportsHome({ setActivePage }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,transparent,rgba(139,92,246,0.08),transparent)" }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader badge="Esports" title="Live Tournaments" subtitle="Watch the world's best players compete for massive prize pools"
          action="View All Events" onAction={() => setActivePage("Esports")} />

        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ESPORTS_EVENTS.slice(0, 6).map(ev => (
            <motion.div key={ev.id} variants={fadeUp} whileHover={{ y: -4 }}
              className="group bg-gray-900/60 border border-white/5 rounded-2xl overflow-hidden backdrop-blur hover:border-purple-500/30 transition-all duration-300">
              <div className="relative h-36 overflow-hidden">
                <img src={ev.banner} alt={ev.name} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,7,18,1) 0%,transparent 70%)" }} />
                <div className={cn("absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold",
                  ev.status === "Live" ? "bg-red-500/20 border border-red-500/40 text-red-400" :
                  ev.status === "Upcoming" ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-400" : "bg-gray-500/20 border border-gray-500/40 text-gray-400")}>
                  {ev.status === "Live" && <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse mr-1" />}
                  {ev.status}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold mb-1">{ev.name}</h3>
                <p className="text-gray-400 text-xs mb-3">{ev.game} · {ev.location}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Prize Pool</p>
                    <p className="text-green-400 font-black text-lg">{ev.prizePool}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Teams</p>
                    <p className="text-white font-bold">{ev.teams}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── NEWS SECTION ──────────────────────────────────────────────────────────────

function NewsSection({ setActivePage }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader badge="News" title="Gaming News" subtitle="Stay updated with the latest from the gaming world"
          action="All Articles" onAction={() => setActivePage("News")} />
        <motion.div variants={stagger(0.08)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {NEWS.slice(0, 4).map(n => (
            <motion.div key={n.id} variants={fadeUp} whileHover={{ y: -4 }}
              className="group bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 cursor-pointer">
              <div className="relative h-44 overflow-hidden">
                <img src={n.thumbnail} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,7,18,0.9),transparent 60%)" }} />
                <span className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-semibold">{n.category}</span>
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-sm leading-tight mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">{n.title}</h3>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1"><FiCalendar size={10} /> {n.date}</span>
                  <span>{n.readTime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── COMMUNITY SECTION ─────────────────────────────────────────────────────────

function CommunitySection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,transparent,rgba(6,182,212,0.05),transparent)" }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader badge="Community" title="Join the Community" subtitle="Millions of gamers, one platform. Your next team is waiting." />

        {/* Stats */}
        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {COMMUNITY_STATS.map((s, i) => (
            <motion.div key={i} variants={scaleIn} className="text-center p-6 rounded-2xl bg-gray-900/50 border border-white/5 backdrop-blur">
              <s.icon size={28} className={cn("mx-auto mb-3", s.color)} />
              <p className={cn("text-3xl font-black mb-1", s.color)}>{s.value}</p>
              <p className="text-gray-400 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Discord CTA */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-center"
          style={{ background: "linear-gradient(135deg,rgba(88,101,242,0.2),rgba(139,92,246,0.2))", border: "1px solid rgba(139,92,246,0.3)" }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 50% 50%,#8b5cf6 0%,transparent 70%)" }} />
          <FiMessageCircle size={48} className="text-indigo-400 mx-auto mb-4" />
          <h3 className="text-3xl font-black text-white mb-3">Join Our Discord</h3>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">Connect with 2.1 million gamers, find teammates, participate in events, and be part of the most active gaming community online.</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white transition-all"
            style={{ background: "linear-gradient(135deg,#5865f2,#8b5cf6)", boxShadow: "0 0 30px rgba(88,101,242,0.4)" }}>
            <FiUsers size={18} /> Join Discord Community
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader badge="Reviews" title="What Gamers Say" />
        <motion.div variants={stagger(0.07)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {TESTIMONIALS.slice(0, 8).map(t => (
            <motion.div key={t.id} variants={scaleIn} whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-gray-900/50 border border-white/5 backdrop-blur hover:border-purple-500/20 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.game}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => <FiStar key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">"{t.text}"</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────

function HomePage({ setActivePage, setSelectedGame, wishlist, onWishlist }) {
  return (
    <div>
      <Hero setActivePage={setActivePage} setSelectedGame={setSelectedGame} />
      <FeaturedGames setActivePage={setActivePage} setSelectedGame={setSelectedGame} wishlist={wishlist} onWishlist={onWishlist} />
      <TrendingGames setActivePage={setActivePage} setSelectedGame={setSelectedGame} wishlist={wishlist} onWishlist={onWishlist} />
      <Categories setActivePage={setActivePage} />
      <EsportsHome setActivePage={setActivePage} />
      <NewsSection setActivePage={setActivePage} />
      <CommunitySection />
      <Testimonials />
    </div>
  );
}

// ─── GAMES PAGE ────────────────────────────────────────────────────────────────

function GamesPage({ setActivePage, setSelectedGame, wishlist, onWishlist }) {
  const [search, setSearch] = useState("");
  const [genre, setGenre]   = useState("All");
  const [sort, setSort]     = useState("popular");
  const genres = ["All", ...CATEGORIES.map(c => c.name)];

  const filtered = GAMES
    .filter(g => genre === "All" || g.genre === genre)
    .filter(g => g.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort === "rating" ? b.rating - a.rating : sort === "price" ? a.price - b.price : b.id - a.id);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
          <h1 className="text-4xl font-black text-white mb-2">All Games</h1>
          <p className="text-gray-400">{filtered.length} games found</p>
        </motion.div>

        {/* Filters */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900/60 border border-white/10 flex-1 min-w-[200px] max-w-xs">
            <FiSearch size={16} className="text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search games…"
              className="bg-transparent text-white placeholder-gray-500 outline-none text-sm w-full" />
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-gray-900/60 border border-white/10 text-gray-300 text-sm outline-none">
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price">Lowest Price</option>
          </select>
        </motion.div>

        {/* Genre pills */}
        <div className="flex gap-2 flex-wrap mb-8">
          {genres.map(g => (
            <motion.button key={g} whileHover={{ scale: 1.05 }} onClick={() => setGenre(g)}
              className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all",
                genre === g ? "text-black font-bold" : "bg-gray-900/50 border border-white/10 text-gray-400 hover:text-white")}
              style={genre === g ? { background: "linear-gradient(135deg,#8b5cf6,#06b6d4)" } : {}}>
              {g}
            </motion.button>
          ))}
        </div>

        <motion.div variants={stagger(0.05)} initial="hidden" animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filtered.map(g => (
            <GameCard key={g.id} game={g} onSelect={g => { setSelectedGame(g); setActivePage("GameDetails"); }} wishlist={wishlist} onWishlist={onWishlist} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─── GAME DETAILS PAGE ─────────────────────────────────────────────────────────

function GameDetailsPage({ game, setActivePage, wishlist, onWishlist }) {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [activeShot, setActiveShot]  = useState(0);

  if (!game) return null;
  const wished = wishlist.includes(game.id);

  return (
    <div className="min-h-screen pt-16 pb-16">
      {/* Banner */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        <img src={game.banner} alt={game.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,7,18,1) 20%,rgba(3,7,18,0.4) 100%)" }} />
        <motion.button whileHover={{ scale: 1.05 }} onClick={() => setActivePage("Games")}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900/70 border border-white/10 text-gray-300 hover:text-white text-sm backdrop-blur transition-all">
          <FiChevronLeft size={16} /> Back
        </motion.button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2">
            <div className="flex items-start gap-6 mb-8">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="flex-shrink-0 w-28 h-40 rounded-xl overflow-hidden" style={{ boxShadow: `0 0 40px ${game.color1}50` }}>
                <img src={game.cover} alt={game.title} className="w-full h-full object-cover" />
              </motion.div>
              <div className="pt-12 sm:pt-16">
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">{game.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-4">
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white">{game.genre}</span>
                  <span className="flex items-center gap-1 text-yellow-400"><FiStar size={12} /> {game.rating}</span>
                  <span>{game.platform}</span>
                  <span className="flex items-center gap-1"><FiCalendar size={12} /> {game.releaseDate}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map(t => (
                    <span key={t} className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-xs">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="mb-8 p-6 rounded-2xl bg-gray-900/50 border border-white/5">
              <h2 className="text-lg font-bold text-white mb-3">About</h2>
              <p className="text-gray-400 leading-relaxed">{game.description} Experience unparalleled depth with a world that reacts to your every decision, featuring advanced AI companions, dynamic weather systems, and a 100+ hour main campaign.</p>
            </motion.div>

            {/* Screenshots */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
              <h2 className="text-lg font-bold text-white mb-4">Screenshots</h2>
              <div className="rounded-2xl overflow-hidden mb-3 aspect-video bg-gray-900">
                <img src={game.screenshots[activeShot]} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {game.screenshots.map((s, i) => (
                  <button key={i} onClick={() => setActiveShot(i)}
                    className={cn("rounded-xl overflow-hidden aspect-video", i === activeShot ? "ring-2 ring-cyan-400" : "opacity-60 hover:opacity-100 transition-opacity")}>
                    <img src={s} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="mb-8 p-6 rounded-2xl bg-gray-900/50 border border-white/5">
              <h2 className="text-lg font-bold text-white mb-4">Features</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {game.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <FiZap size={14} className="text-cyan-400 shrink-0" /> {f}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Requirements */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="mb-8 p-6 rounded-2xl bg-gray-900/50 border border-white/5">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><FiCpu size={16} className="text-purple-400" /> System Requirements</h2>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div><p className="text-gray-500 mb-1">Minimum</p><p className="text-gray-300">{game.minReq}</p></div>
                <div><p className="text-gray-500 mb-1">Recommended</p><p className="text-gray-300">{game.recReq}</p></div>
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <h2 className="text-lg font-bold text-white mb-4">Player Reviews</h2>
              <div className="space-y-4">
                {game.reviews.map((r, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-gray-900/50 border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-white font-semibold text-sm">{r.author}</p>
                      <div className="flex items-center gap-1 text-yellow-400 text-xs"><FiStar size={10} /> {r.rating}</div>
                    </div>
                    <p className="text-gray-400 text-sm">"{r.text}"</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="sticky top-24 p-6 rounded-2xl bg-gray-900/70 border border-white/10 backdrop-blur">
              <div className="text-center mb-6">
                <p className="text-4xl font-black text-white mb-1">{game.price === 0 ? "FREE" : `$${game.price}`}</p>
                <p className="text-gray-500 text-sm">One-time purchase</p>
              </div>
              <div className="space-y-3 mb-6">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl font-bold text-black flex items-center justify-center gap-2 transition-all"
                  style={{ background: `linear-gradient(135deg,${game.color1},${game.color2})`, boxShadow: `0 0 25px ${game.color1}50` }}>
                  <FiDownload size={16} /> {game.price === 0 ? "Download Free" : "Buy Now"}
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} onClick={() => setTrailerOpen(true)}
                  className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 border border-white/20 bg-white/5 hover:border-cyan-500/50 transition-all">
                  <FiPlay size={16} /> Watch Trailer
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} onClick={() => onWishlist(game.id)}
                  className={cn("w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 border transition-all text-sm",
                    wished ? "text-pink-400 border-pink-500/40 bg-pink-500/10" : "text-gray-400 border-white/10 bg-white/5 hover:text-pink-400 hover:border-pink-500/30")}>
                  <FiHeart size={14} /> {wished ? "Wishlisted" : "Add to Wishlist"}
                </motion.button>
              </div>
              <div className="space-y-2 text-sm">
                {[["Genre", game.genre], ["Platform", game.platform], ["Release", game.releaseDate], ["Rating", `${game.rating} / 5.0`]].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-500">{k}</span><span className="text-white font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trailer modal */}
      <AnimatePresence>
        {trailerOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setTrailerOpen(false)}>
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              className="w-full max-w-4xl rounded-2xl overflow-hidden bg-gray-900 border border-white/10"
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h3 className="text-white font-bold">{game.title} — Official Trailer</h3>
                <button onClick={() => setTrailerOpen(false)}><FiX size={20} className="text-gray-400 hover:text-white" /></button>
              </div>
              <div className="aspect-video bg-black flex items-center justify-center">
                <img src={game.banner} alt="Trailer" className="w-full h-full object-cover opacity-60" />
                <div className="absolute flex flex-col items-center gap-3">
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur">
                    <FiPlay size={32} className="text-white ml-1" />
                  </div>
                  <p className="text-gray-400 text-sm">Trailer Preview</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── ESPORTS PAGE ──────────────────────────────────────────────────────────────

function EsportsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" /> Live Esports
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Tournaments & Events</h1>
          <p className="text-gray-400">Watch the world's best compete for glory and prize pools</p>
        </motion.div>

        {/* Events */}
        <h2 className="text-xl font-bold text-white mb-5">Upcoming & Live Events</h2>
        <motion.div variants={stagger(0.07)} initial="hidden" animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {ESPORTS_EVENTS.map(ev => (
            <motion.div key={ev.id} variants={fadeUp} whileHover={{ y: -4 }}
              className="group bg-gray-900/60 border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300">
              <div className="relative h-36 overflow-hidden">
                <img src={ev.banner} alt={ev.name} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,7,18,1) 0%,transparent 70%)" }} />
                <div className={cn("absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold",
                  ev.status === "Live" ? "bg-red-500/20 border border-red-500/40 text-red-400" :
                  ev.status === "Upcoming" ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-400" : "bg-gray-500/20 border border-gray-500/40 text-gray-400")}>
                  {ev.status === "Live" && <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse mr-1" />}
                  {ev.status}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold mb-1">{ev.name}</h3>
                <p className="text-gray-400 text-xs mb-3">{ev.game} · {ev.location}</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[["Prize", ev.prizePool, "text-green-400"], ["Teams", ev.teams, "text-cyan-400"], ["Date", ev.startDate.slice(5), "text-purple-400"]].map(([l, v, c]) => (
                    <div key={l}><p className="text-gray-600 text-[10px] uppercase">{l}</p><p className={cn("font-bold text-xs", c)}>{v}</p></div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Rankings */}
        <h2 className="text-xl font-bold text-white mb-5">Team Rankings</h2>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="rounded-2xl bg-gray-900/50 border border-white/5 overflow-hidden">
          <div className="grid grid-cols-5 px-5 py-3 text-xs text-gray-500 uppercase tracking-widest border-b border-white/5">
            <span>Rank</span><span className="col-span-2">Team</span><span className="text-center">W/L</span><span className="text-right">Points</span>
          </div>
          {TEAMS.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="grid grid-cols-5 items-center px-5 py-3.5 border-b border-white/5 hover:bg-white/3 transition-colors">
              <span className={cn("font-black text-sm", i < 3 ? "text-yellow-400" : "text-gray-500")}>#{t.rank}</span>
              <div className="col-span-2 flex items-center gap-3">
                <img src={t.logo} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.region}</p>
                </div>
              </div>
              <div className="text-center text-sm">
                <span className="text-green-400">{t.wins}W</span>
                <span className="text-gray-600 mx-1">/</span>
                <span className="text-red-400">{t.losses}L</span>
              </div>
              <div className="text-right font-bold text-cyan-400">{t.points.toLocaleString()}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─── NEWS PAGE ─────────────────────────────────────────────────────────────────

function NewsPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat]       = useState("All");
  const cats = ["All", "Industry", "Updates", "Hardware", "Esports", "Reviews"];
  const filtered = NEWS.filter(n => (cat === "All" || n.category === cat) && n.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
          <h1 className="text-4xl font-black text-white mb-2">Gaming News</h1>
          <p className="text-gray-400">Latest from the world of gaming</p>
        </motion.div>

        {/* Featured Article */}
        {NEWS.filter(n => n.featured)[0] && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
            className="group relative rounded-3xl overflow-hidden mb-10 cursor-pointer h-64 sm:h-80">
            <img src={NEWS[0].thumbnail} alt={NEWS[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,7,18,0.97) 30%,transparent 80%)" }} />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="px-2 py-1 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase mb-3 inline-block">Featured</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 group-hover:text-cyan-400 transition-colors">{NEWS[0].title}</h2>
              <p className="text-gray-400 text-sm">{NEWS[0].date} · {NEWS[0].readTime}</p>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900/60 border border-white/10 flex-1 min-w-[200px] max-w-xs">
            <FiSearch size={16} className="text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search news…"
              className="bg-transparent text-white placeholder-gray-500 outline-none text-sm w-full" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all",
                  cat === c ? "text-black font-bold" : "bg-gray-900/50 border border-white/10 text-gray-400 hover:text-white")}
                style={cat === c ? { background: "linear-gradient(135deg,#8b5cf6,#06b6d4)" } : {}}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.div variants={stagger(0.06)} initial="hidden" animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(n => (
            <motion.div key={n.id} variants={scaleIn} whileHover={{ y: -4 }}
              className="group bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/20 transition-all duration-300 cursor-pointer">
              <div className="relative h-44 overflow-hidden">
                <img src={n.thumbnail} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,7,18,0.9),transparent 60%)" }} />
                <span className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-semibold">{n.category}</span>
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-sm leading-tight mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">{n.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{n.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span className="flex items-center gap-1"><FiCalendar size={10} /> {n.date}</span>
                  <span className="text-cyan-400 flex items-center gap-1">Read <FiArrowRight size={10} /></span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─── ABOUT PAGE ────────────────────────────────────────────────────────────────

function AboutPage() {
  const milestones = [
    { year: "2018", title: "Founded", desc: "Nexus Gaming launched with a vision to redefine the gaming platform experience." },
    { year: "2019", title: "1M Users", desc: "Reached our first million players within 12 months of launch." },
    { year: "2020", title: "Esports Launch", desc: "Introduced the Nexus Esports Division with $5M in total prize pools." },
    { year: "2021", title: "Global Expansion", desc: "Expanded to 50+ countries, supporting 20+ languages." },
    { year: "2022", title: "10M Players", desc: "Surpassed 10 million active players, becoming the fastest-growing gaming platform." },
    { year: "2023", title: "4K Library", desc: "4,000+ games in library with exclusive AAA partnerships." },
    { year: "2024", title: "AI Integration", desc: "Launched AI-powered game recommendations and matchmaking." },
    { year: "2025", title: "The Future", desc: "Pioneering the next era of cloud gaming and VR experiences." },
  ];
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="text-center mb-16">
          <h1 className="text-5xl font-black mb-4" style={{ background: "linear-gradient(135deg,#a78bfa,#22d3ee,#f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Our Story
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Nexus Gaming was built by gamers, for gamers. Our mission is to create the world's most immersive, connected, and thrilling gaming platform — one that brings every player, every game, and every community together.
          </p>
        </motion.div>

        {/* Mission cards */}
        <motion.div variants={stagger(0.1)} initial="hidden" animate="visible" className="grid sm:grid-cols-3 gap-5 mb-16">
          {[
            { icon: FiZap, title: "Our Mission", text: "Deliver the ultimate gaming platform experience with cutting-edge technology and an unmatched game library.", color: "text-cyan-400", bg: "from-cyan-500/10 to-blue-500/10", border: "border-cyan-500/20" },
            { icon: FiGlobe, title: "Our Vision", text: "To be the global hub where every gamer, creator, and esports professional connects and thrives.", color: "text-purple-400", bg: "from-purple-500/10 to-pink-500/10", border: "border-purple-500/20" },
            { icon: FiUsers, title: "Community First", text: "Every decision we make puts our community of 12+ million players at the absolute center.", color: "text-pink-400", bg: "from-pink-500/10 to-rose-500/10", border: "border-pink-500/20" },
          ].map((c, i) => (
            <motion.div key={i} variants={scaleIn}
              className={cn("p-6 rounded-2xl bg-gradient-to-br border text-center", c.bg, c.border)}>
              <c.icon size={32} className={cn("mx-auto mb-4", c.color)} />
              <h3 className="text-white font-bold text-lg mb-2">{c.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{c.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl font-black text-white text-center mb-10">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-cyan-500 to-pink-500" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }} className="relative flex gap-6 pl-14">
                  <div className="absolute left-3.5 top-3 w-5 h-5 rounded-full border-2 border-cyan-400 bg-gray-950" style={{ boxShadow: "0 0 10px rgba(6,182,212,0.5)" }} />
                  <div className="flex-1 p-4 rounded-xl bg-gray-900/50 border border-white/5">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-cyan-400 font-black text-sm">{m.year}</span>
                      <span className="text-white font-bold">{m.title}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── CONTACT PAGE ──────────────────────────────────────────────────────────────

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = e => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4000); };

  const faqs = [
    { q: "How do I download a game?", a: "Navigate to any game page and click the Download button. You'll need a free Nexus account." },
    { q: "What platforms are supported?", a: "We support PC, PS5, Xbox Series X, and Nintendo Switch across our library." },
    { q: "Can I get a refund?", a: "Yes! Games purchased within 14 days and under 2 hours of playtime are eligible for refunds." },
    { q: "How do I join tournaments?", a: "Visit the Esports page, find an upcoming tournament, and register your team." },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
          <h1 className="text-4xl font-black text-white mb-2">Contact Us</h1>
          <p className="text-gray-400">We'd love to hear from you. Drop us a message!</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Form */}
          <motion.form variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
            onSubmit={submit} className="space-y-5 p-8 rounded-2xl bg-gray-900/50 border border-white/5">
            <h2 className="text-xl font-bold text-white mb-2">Send a Message</h2>
            {[["name","Name","text"],["email","Email","email"],["subject","Subject","text"]].map(([f, l, t]) => (
              <div key={f}>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-1.5 block">{l}</label>
                <input type={t} value={form[f]} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))}
                  required className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-white/10 text-white placeholder-gray-600 outline-none focus:border-cyan-500/50 transition-colors text-sm" />
              </div>
            ))}
            <div>
              <label className="text-gray-400 text-xs uppercase tracking-widest mb-1.5 block">Message</label>
              <textarea rows={5} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                required className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-white/10 text-white placeholder-gray-600 outline-none focus:border-cyan-500/50 transition-colors resize-none text-sm" />
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-black transition-all"
              style={{ background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}>
              {sent ? "✓ Message Sent!" : "Send Message"}
            </motion.button>
          </motion.form>

          {/* Contact Info */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="space-y-5">
            <div className="p-6 rounded-2xl bg-gray-900/50 border border-white/5">
              <h2 className="text-xl font-bold text-white mb-5">Get In Touch</h2>
              <div className="space-y-4">
                {[
                  { icon: FiMail, label: "Email", value: "support@nexusgaming.gg", color: "text-cyan-400" },
                  { icon: FiPhone, label: "Phone", value: "+1 (888) NEXUS-GG", color: "text-purple-400" },
                  { icon: FiMessageCircle, label: "Discord", value: "discord.gg/nexusgaming", color: "text-indigo-400" },
                  { icon: FiGlobe, label: "Website", value: "nexusgaming.gg", color: "text-pink-400" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-white/5", color)}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">{label}</p>
                      <p className="text-white text-sm font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Social */}
            <div className="p-6 rounded-2xl bg-gray-900/50 border border-white/5">
              <h3 className="text-white font-bold mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[FiTwitter, FiYoutube, FiInstagram, FiGithub].map((Icon, i) => (
                  <motion.button key={i} whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/40 transition-all">
                    <Icon size={16} />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl font-black text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <motion.details key={i} className="group p-5 rounded-2xl bg-gray-900/50 border border-white/5 hover:border-purple-500/20 transition-all cursor-pointer">
                <summary className="text-white font-semibold text-sm list-none flex items-center justify-between">
                  {f.q} <FiChevronRight size={14} className="text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">{f.a}</p>
              </motion.details>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── WISHLIST PAGE ─────────────────────────────────────────────────────────────

function WishlistPage({ wishlist, setActivePage, setSelectedGame, onWishlist }) {
  const games = GAMES.filter(g => wishlist.includes(g.id));
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
          <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
            <FiHeart className="text-pink-400" /> Wishlist
          </h1>
          <p className="text-gray-400">{games.length} game{games.length !== 1 ? "s" : ""} saved</p>
        </motion.div>
        {games.length === 0 ? (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="text-center py-24">
            <FiHeart size={48} className="text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-6">Your wishlist is empty</p>
            <motion.button whileHover={{ scale: 1.05 }} onClick={() => setActivePage("Games")}
              className="px-6 py-3 rounded-xl font-bold text-black"
              style={{ background: "linear-gradient(135deg,#8b5cf6,#06b6d4)" }}>
              Browse Games
            </motion.button>
          </motion.div>
        ) : (
          <motion.div variants={stagger(0.07)} initial="hidden" animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {games.map(g => (
              <GameCard key={g.id} game={g} onSelect={g => { setSelectedGame(g); setActivePage("GameDetails"); }} wishlist={wishlist} onWishlist={onWishlist} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────

function Footer({ setActivePage }) {
  const [email, setEmail] = useState("");
  return (
    <footer className="relative border-t border-white/5 bg-gray-950/80 backdrop-blur pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#8b5cf6,#06b6d4)" }}>
                <FiZap size={16} className="text-white" />
              </div>
              <span className="text-xl font-black" style={{ background: "linear-gradient(135deg,#a78bfa,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>NEXUS</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">The next-generation gaming platform for players, esports pros, and communities worldwide.</p>
            <div className="flex gap-3">
              {[FiTwitter, FiYoutube, FiInstagram, FiGithub, FiLinkedin].map((Icon, i) => (
                <motion.button key={i} whileHover={{ scale: 1.1, y: -2 }}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/40 transition-all">
                  <Icon size={13} />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Navigation</h4>
            <div className="space-y-2">
              {NAV_LINKS.map(link => (
                <button key={link} onClick={() => setActivePage(link)}
                  className="block text-gray-500 hover:text-cyan-400 text-sm transition-colors">{link}</button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Categories</h4>
            <div className="space-y-2">
              {CATEGORIES.slice(0, 6).map(c => (
                <button key={c.id} onClick={() => setActivePage("Games")}
                  className="block text-gray-500 hover:text-cyan-400 text-sm transition-colors">{c.name}</button>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Newsletter</h4>
            <p className="text-gray-500 text-sm mb-4">Get the latest gaming news and updates straight to your inbox.</p>
            <div className="flex gap-2">
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
                className="flex-1 px-3 py-2.5 rounded-xl bg-gray-800/50 border border-white/10 text-white placeholder-gray-600 outline-none focus:border-cyan-500/50 text-sm transition-colors" />
              <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2.5 rounded-xl text-sm font-bold text-black"
                style={{ background: "linear-gradient(135deg,#8b5cf6,#06b6d4)" }}>
                <FiArrowRight size={14} />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© 2025 Nexus Gaming. All rights reserved.</p>
          <div className="flex gap-4">
            {["Privacy Policy","Terms of Service","Cookie Policy"].map(l => (
              <button key={l} className="hover:text-gray-400 transition-colors">{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [loading, setLoading]         = useState(true);
  const [activePage, setActivePage]   = useState("Home");
  const [selectedGame, setSelectedGame] = useState(null);
  const [wishlist, setWishlist]       = useState([]);
  const [searchOpen, setSearchOpen]   = useState(false);

  const onWishlist = useCallback(id => {
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  }, []);

  // Scroll to top on page change
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [activePage]);

  const pageProps = { setActivePage, setSelectedGame, wishlist, onWishlist };

  const renderPage = () => {
    switch (activePage) {
      case "Home":        return <HomePage {...pageProps} />;
      case "Games":       return <GamesPage {...pageProps} />;
      case "GameDetails": return <GameDetailsPage game={selectedGame} {...pageProps} />;
      case "Esports":     return <EsportsPage />;
      case "News":        return <NewsPage />;
      case "About":       return <AboutPage />;
      case "Contact":     return <ContactPage />;
      case "Wishlist":    return <WishlistPage {...pageProps} />;
      default:            return <HomePage {...pageProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <AnimatePresence>{loading && <LoadingScreen onDone={() => setLoading(false)} />}</AnimatePresence>

      {!loading && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <ParticleField />

          <Navbar activePage={activePage} setActivePage={setActivePage} wishlist={wishlist} setSearchOpen={setSearchOpen} />
          <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} setActivePage={setActivePage} setSelectedGame={setSelectedGame} />

          <AnimatePresence mode="wait">
            <motion.main key={activePage} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              {renderPage()}
            </motion.main>
          </AnimatePresence>

          <Footer setActivePage={setActivePage} />
          <BackToTop />
        </>
      )}
    </div>
  );
}