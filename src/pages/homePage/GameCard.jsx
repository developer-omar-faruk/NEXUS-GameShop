import { motion } from "framer-motion";
import { FiPlay, FiHeart, FiStar } from "react-icons/fi";

const cn = (...classes) => classes.filter(Boolean).join(" ");
const scaleIn  = { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } };


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

export default GameCard
