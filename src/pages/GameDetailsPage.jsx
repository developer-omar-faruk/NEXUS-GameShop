import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX, FiPlay, FiStar, FiHeart, FiCalendar,
  FiDownload, FiZap, FiChevronLeft, FiCpu
} from "react-icons/fi";

const cn = (...classes) => classes.filter(Boolean).join(" ");


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

export default GameDetailsPage
