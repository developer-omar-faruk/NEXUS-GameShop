import { ESPORTS_EVENTS, TEAMS } from "../data";
import { useState } from "react";
import { motion } from "framer-motion";

const cn = (...classes) => classes.filter(Boolean).join(" ");
const fadeUp   = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const stagger  = (delay = 0.1) => ({ visible: { transition: { staggerChildren: delay } } });


function EsportsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" /> Live Esports
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Tournaments & Events</h1>
          <p className="text-gray-400">Watch the world's best compete for glory and prize pools</p>
        </motion.div>

        {/* Events */}
        <h2 className="text-xl font-bold text-white mb-5">Upcoming & Live Events</h2>
        <motion.div variants={stagger(0.07)} initial="hidden" animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {ESPORTS_EVENTS.map(ev => (
            <motion.div key={ev.id} variants={fadeUp} whileHover={{ y: -4 }}
              className="group bg-gray-900/60 border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300">
              <div className="relative h-36 overflow-hidden">
                <img src={ev.banner} alt={ev.name} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(3,7,18,1) 0%,transparent 70%)" }} />
                <div className={cn("absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold",
                  ev.status === "Live" ? "bg-red-500/20 border border-red-500/40 text-red-400" :
                  ev.status === "Upcoming" ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-400" : "bg-gray-500/20 border border-gray-500/40 text-gray-400")}>
                  {ev.status === "Live" && <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse mr-1" />}
                  {ev.status}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold mb-1">{ev.name}</h3>
                <p className="text-gray-400 text-xs mb-3">{ev.game} · {ev.location}</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[["Prize", ev.prizePool, "text-green-400"], ["Teams", ev.teams, "text-cyan-400"], ["Date", ev.startDate.slice(5), "text-purple-400"]].map(([l, v, c]) => (
                    <div key={l}><p className="text-gray-600 text-[10px] uppercase">{l}</p><p className={cn("font-bold text-xs", c)}>{v}</p></div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Rankings */}
        <h2 className="text-xl font-bold text-white mb-5">Team Rankings</h2>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="rounded-2xl bg-gray-900/50 border border-white/5 overflow-hidden">
          <div className="grid grid-cols-5 px-5 py-3 text-xs text-gray-500 uppercase tracking-widest border-b border-white/5">
            <span>Rank</span><span className="col-span-2">Team</span><span className="text-center">W/L</span><span className="text-right">Points</span>
          </div>
          {TEAMS.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              className="grid grid-cols-5 items-center px-5 py-3.5 border-b border-white/5 hover:bg-white/3 transition-colors">
              <span className={cn("font-black text-sm", i < 3 ? "text-yellow-400" : "text-gray-500")}>#{t.rank}</span>
              <div className="col-span-2 flex items-center gap-3">
                <img src={t.logo} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.region}</p>
                </div>
              </div>
              <div className="text-center text-sm">
                <span className="text-green-400">{t.wins}W</span>
                <span className="text-gray-600 mx-1">/</span>
                <span className="text-red-400">{t.losses}L</span>
              </div>
              <div className="text-right font-bold text-cyan-400">{t.points.toLocaleString()}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default EsportsPage
