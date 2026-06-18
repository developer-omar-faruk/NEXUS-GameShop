import {
  FiZap, FiStar, FiTarget, FiGlobe, FiShield,
  FiCpu, FiVolume2, FiAward,
} from "react-icons/fi";


// ----Data----
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