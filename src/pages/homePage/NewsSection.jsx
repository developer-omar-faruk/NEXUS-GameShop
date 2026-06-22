import SectionHeader from "./SectionHeader";
import {NEWS} from '../../data'

import { motion } from "framer-motion";
import { FiCalendar } from "react-icons/fi";

const fadeUp   = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const stagger  = (delay = 0.1) => ({ visible: { transition: { staggerChildren: delay } } });


function NewsSection({ setActivePage }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader badge="News" title="Gaming News" subtitle="Stay updated with the latest from the gaming world"
          action="All Articles" onAction={() => setActivePage("News")} />
        <motion.div variants={stagger(0.08)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {NEWS.slice(0, 4).map(n => (
            <motion.div key={n.id} variants={fadeUp} whileHover={{ y: -4 }}
              className="group bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 cursor-pointer">
              <div className="relative h-44 overflow-hidden">
                <img src={n.thumbnail} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,7,18,0.9),transparent 60%)" }} />
                <span className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-semibold">{n.category}</span>
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-sm leading-tight mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">{n.title}</h3>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1"><FiCalendar size={10} /> {n.date}</span>
                  <span>{n.readTime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default NewsSection
