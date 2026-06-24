import {
  FiZap, FiStar, FiTarget, FiGlobe, FiShield,
  FiCpu, FiVolume2, FiAward, FiUsers, FiMonitor,
  FiMessageCircle
} from "react-icons/fi";


// ----Data----

//
export const NAV_LINKS = ["Home", "Games", "Esports", "News", "About", "Contact"];

//----Navbar, HomePage/Categories Data----

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


// ----HomePage/EsportsHome Data----

export const ESPORTS_EVENTS = Array.from({ length: 15 }, (_, i) => {
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


// ----HomePage/NewsSection Data----

export const NEWS = Array.from({ length: 20 }, (_, i) => {
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


// ----HomePage/CommunitySection Data----

export const COMMUNITY_STATS = [
  { label: "Active Players",   value: "12.4M", icon: FiUsers,      color: "text-cyan-400"   },
  { label: "Games Available",  value: "4,200+",icon: FiMonitor,    color: "text-purple-400" },
  { label: "Tournaments Won",  value: "8,900", icon: FiAward,      color: "text-pink-400"   },
  { label: "Discord Members",  value: "2.1M",  icon: FiMessageCircle,color:"text-blue-400"  },
];


// ----HomePage/TestimonialSection Data----

export const TESTIMONIALS = Array.from({ length: 10 }, (_, i) => {
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