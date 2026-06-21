import SectionHeader from "./SectionHeader";
import { CATEGORIES } from "../../data";

import { motion } from "framer-motion";

const cn = (...classes) => classes.filter(Boolean).join(" ");
const scaleIn  = { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } };
const stagger  = (delay = 0.1) => ({ visible: { transition: { staggerChildren: delay } } });


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

export default Categories
