import {
  FiZap, FiStar, FiTarget, FiGlobe, FiShield,
  FiCpu, FiVolume2, FiAward,
} from "react-icons/fi";


// ----Data----

//
export const NAV_LINKS = ["Home", "Games", "Esports", "News", "About", "Contact"];

export const CATEGORIES = [
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


// ----HomePage/Hero, HomePage/FeaturedGames, HomePage/TrendingGames Data ----

export const GAMES = Array.from({ length: 40 }, (_, i) => {
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