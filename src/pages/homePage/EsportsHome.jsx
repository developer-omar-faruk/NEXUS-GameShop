import SectionHeader from "./SectionHeader";
import { ESPORTS_EVENTS } from "../../data";

import { motion } from "framer-motion";

const cn = (...classes) => classes.filter(Boolean).join(" ");
const fadeUp   = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const stagger  = (delay = 0.1) => ({ visible: { transition: { staggerChildren: delay } } });


function EsportsHome({ setActivePage }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,transparent,rgba(139,92,246,0.08),transparent)" }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader badge="Esports" title="Live Tournaments" subtitle="Watch the world's best players compete for massive prize pools"
          action="View All Events" onAction={() => setActivePage("Esports")} />

        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ESPORTS_EVENTS.slice(0, 6).map(ev => (
            <motion.div key={ev.id} variants={fadeUp} whileHover={{ y: -4 }}
              className="group bg-gray-900/60 border border-white/5 rounded-2xl overflow-hidden backdrop-blur hover:border-purple-500/30 transition-all duration-300">
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
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Prize Pool</p>
                    <p className="text-green-400 font-black text-lg">{ev.prizePool}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Teams</p>
                    <p className="text-white font-bold">{ev.teams}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default EsportsHome
