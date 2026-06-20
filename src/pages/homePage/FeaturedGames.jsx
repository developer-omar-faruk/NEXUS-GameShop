import {GAMES} from '../../data'
import SectionHeader from "./SectionHeader";
import GameCard from "./GameCard";

import { motion } from "framer-motion";

const stagger  = (delay = 0.1) => ({ visible: { transition: { staggerChildren: delay } } });


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

export default FeaturedGames
