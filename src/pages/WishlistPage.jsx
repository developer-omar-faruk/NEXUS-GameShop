import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";

import { GAMES } from "../data";
import GameCard from "./homePage/GameCard";

const fadeUp   = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const stagger  = (delay = 0.1) => ({ visible: { transition: { staggerChildren: delay } } });


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

export default WishlistPage
