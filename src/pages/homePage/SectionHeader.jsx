import { motion } from "framer-motion";
import { FiZap, FiArrowRight } from "react-icons/fi";

const fadeUp   = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };


function SectionHeader({ badge, title, subtitle, action, onAction }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-4">
          <FiZap size={10} /> {badge}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">{title}</h2>
      {subtitle && <p className="text-gray-400 max-w-xl mx-auto">{subtitle}</p>}
      {action && (
        <motion.button whileHover={{ scale: 1.05 }} onClick={onAction}
          className="mt-4 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors">
          {action} <FiArrowRight size={14} />
        </motion.button>
      )}
    </motion.div>
  );
}

export default SectionHeader
