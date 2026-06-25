import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiCalendar, FiArrowRight } from "react-icons/fi";

import { NEWS } from "../data";

const cn = (...classes) => classes.filter(Boolean).join(" ");
const fadeUp   = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const scaleIn  = { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } };
const stagger  = (delay = 0.1) => ({ visible: { transition: { staggerChildren: delay } } });


function NewsPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat]       = useState("All");
  const cats = ["All", "Industry", "Updates", "Hardware", "Esports", "Reviews"];
  const filtered = NEWS.filter(n => (cat === "All" || n.category === cat) && n.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
          <h1 className="text-4xl font-black text-white mb-2">Gaming News</h1>
          <p className="text-gray-400">Latest from the world of gaming</p>
        </motion.div>

        {/* Featured Article */}
        {NEWS.filter(n => n.featured)[0] && (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
            className="group relative rounded-3xl overflow-hidden mb-10 cursor-pointer h-64 sm:h-80">
            <img src={NEWS[0].thumbnail} alt={NEWS[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,7,18,0.97) 30%,transparent 80%)" }} />
            <div className="absolute bottom-0 left-0 p-8">
              <span className="px-2 py-1 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase mb-3 inline-block">Featured</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 group-hover:text-cyan-400 transition-colors">{NEWS[0].title}</h2>
              <p className="text-gray-400 text-sm">{NEWS[0].date} · {NEWS[0].readTime}</p>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900/60 border border-white/10 flex-1 min-w-[200px] max-w-xs">
            <FiSearch size={16} className="text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search news…"
              className="bg-transparent text-white placeholder-gray-500 outline-none text-sm w-full" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all",
                  cat === c ? "text-black font-bold" : "bg-gray-900/50 border border-white/10 text-gray-400 hover:text-white")}
                style={cat === c ? { background: "linear-gradient(135deg,#8b5cf6,#06b6d4)" } : {}}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.div variants={stagger(0.06)} initial="hidden" animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(n => (
            <motion.div key={n.id} variants={scaleIn} whileHover={{ y: -4 }}
              className="group bg-gray-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/20 transition-all duration-300 cursor-pointer">
              <div className="relative h-44 overflow-hidden">
                <img src={n.thumbnail} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,7,18,0.9),transparent 60%)" }} />
                <span className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-semibold">{n.category}</span>
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-sm leading-tight mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">{n.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{n.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span className="flex items-center gap-1"><FiCalendar size={10} /> {n.date}</span>
                  <span className="text-cyan-400 flex items-center gap-1">Read <FiArrowRight size={10} /></span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default NewsPage
