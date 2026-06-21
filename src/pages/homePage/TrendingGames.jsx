import { GAMES } from "../../data";
import GameCard from "./GameCard";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiTrendingUp, FiChevronLeft, FiChevronRight } from "react-icons/fi";


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

export default TrendingGames
