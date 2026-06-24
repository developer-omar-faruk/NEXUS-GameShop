import { CATEGORIES, GAMES } from "../data";
import GameCard from "./homePage/GameCard";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

const cn = (...classes) => classes.filter(Boolean).join(" ");
const fadeUp   = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const stagger  = (delay = 0.1) => ({ visible: { transition: { staggerChildren: delay } } });


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

export default GamesPage

// test