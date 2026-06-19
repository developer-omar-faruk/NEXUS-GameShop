import { GAMES } from "../../data";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { FiPlay, FiArrowRight, FiStar, FiCalendar } from "react-icons/fi";

const cn = (...classes) => classes.filter(Boolean).join(" ");


function Hero({ setActivePage, setSelectedGame }) {
  const hero = GAMES[0];
  const [idx, setIdx] = useState(0);
  const featured = GAMES.slice(0, 5);
  const ref = useRef();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % featured.length), 5000);
    return () => clearInterval(t);
  }, []);

  const current = featured[idx];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* BG */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <img src={current.banner} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(3,7,18,0.97) 0%,rgba(3,7,18,0.7) 50%,rgba(3,7,18,0.9) 100%)" }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 70% 50%,${current.color1}18 0%,transparent 60%)` }} />
      </motion.div>

      {/* Grid */}
      <div className="absolute inset-0 z-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(6,182,212,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,0.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <motion.div key={`badge-${idx}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> Featured Game
            </motion.div>
            <motion.h1 key={`title-${idx}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none mb-4"
              style={{ background: `linear-gradient(135deg,#ffffff,${current.color1},${current.color2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {current.title}
            </motion.h1>
            <motion.div key={`meta-${idx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="flex items-center gap-4 mb-4 text-sm text-gray-400">
              <span className="px-2 py-0.5 rounded bg-white/10 text-white">{current.genre}</span>
              <span className="flex items-center gap-1 text-yellow-400"><FiStar size={12} /> {current.rating}</span>
              <span>{current.platform}</span>
              <span className="flex items-center gap-1"><FiCalendar size={12} /> {current.releaseDate}</span>
            </motion.div>
            <motion.p key={`desc-${idx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="text-gray-400 text-base mb-8 max-w-lg leading-relaxed">{current.description}</motion.p>
            <motion.div key={`cta-${idx}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => { setSelectedGame(current); setActivePage("GameDetails"); }}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-black transition-all"
                style={{ background: `linear-gradient(135deg,${current.color1},${current.color2})`, boxShadow: `0 0 30px ${current.color1}50` }}>
                <FiPlay size={16} /> Play Now
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setActivePage("Games")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white border border-white/20 bg-white/5 backdrop-blur hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all">
                <FiArrowRight size={16} /> Explore Games
              </motion.button>
            </motion.div>

            {/* Dots */}
            <div className="flex gap-2 mt-8">
              {featured.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)}
                  className={cn("h-1 rounded-full transition-all duration-300", i === idx ? "w-8 bg-cyan-400" : "w-4 bg-white/20")} />
              ))}
            </div>
          </div>

          {/* Right – floating cover */}
          <div className="hidden lg:flex justify-center items-center relative">
            <motion.div key={`cover-${idx}`} initial={{ opacity: 0, scale: 0.8, rotateY: -20 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.6 }} className="relative"
              animate={{ y: [0, -12, 0] }} style={{ animationDuration: "4s" }}>
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                <img src={current.cover} alt={current.title}
                  className="w-72 h-96 object-cover rounded-2xl"
                  style={{ boxShadow: `0 0 80px ${current.color1}60, 0 0 40px ${current.color2}40` }} />
                <div className="absolute inset-0 rounded-2xl" style={{ border: `1px solid ${current.color1}40` }} />
              </motion.div>
            </motion.div>

            {/* Floating badges */}
            <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-8 -left-8 px-3 py-2 rounded-xl bg-gray-900/80 backdrop-blur border border-white/10 text-xs">
              <p className="text-yellow-400 font-bold flex items-center gap-1"><FiStar size={10} /> {current.rating} Rating</p>
            </motion.div>
            <motion.div animate={{ y: [5, -5, 5] }} transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute bottom-12 -right-4 px-3 py-2 rounded-xl bg-gray-900/80 backdrop-blur border border-white/10 text-xs">
              <p className="text-green-400 font-bold">🟢 12.4K Online</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-xs">
        <div className="w-5 h-8 rounded-full border border-gray-600 flex items-start justify-center pt-1">
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-1 h-2 rounded-full bg-cyan-400" />
        </div>
        Scroll
      </motion.div>
    </section>
  );
}

export default Hero
