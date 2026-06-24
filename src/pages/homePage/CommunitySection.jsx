import SectionHeader from "./SectionHeader";
import { COMMUNITY_STATS } from "../../data";

import { motion } from "framer-motion";
import { FiUsers, FiMessageCircle } from "react-icons/fi";


const cn = (...classes) => classes.filter(Boolean).join(" ");
const fadeUp   = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const scaleIn  = { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } };
const stagger  = (delay = 0.1) => ({ visible: { transition: { staggerChildren: delay } } });


function CommunitySection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,transparent,rgba(6,182,212,0.05),transparent)" }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader badge="Community" title="Join the Community" subtitle="Millions of gamers, one platform. Your next team is waiting." />

        {/* Stats */}
        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {COMMUNITY_STATS.map((s, i) => (
            <motion.div key={i} variants={scaleIn} className="text-center p-6 rounded-2xl bg-gray-900/50 border border-white/5 backdrop-blur">
              <s.icon size={28} className={cn("mx-auto mb-3", s.color)} />
              <p className={cn("text-3xl font-black mb-1", s.color)}>{s.value}</p>
              <p className="text-gray-400 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Discord CTA */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-center"
          style={{ background: "linear-gradient(135deg,rgba(88,101,242,0.2),rgba(139,92,246,0.2))", border: "1px solid rgba(139,92,246,0.3)" }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 50% 50%,#8b5cf6 0%,transparent 70%)" }} />
          <FiMessageCircle size={48} className="text-indigo-400 mx-auto mb-4" />
          <h3 className="text-3xl font-black text-white mb-3">Join Our Discord</h3>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">Connect with 2.1 million gamers, find teammates, participate in events, and be part of the most active gaming community online.</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white transition-all"
            style={{ background: "linear-gradient(135deg,#5865f2,#8b5cf6)", boxShadow: "0 0 30px rgba(88,101,242,0.4)" }}>
            <FiUsers size={18} /> Join Discord Community
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default CommunitySection
