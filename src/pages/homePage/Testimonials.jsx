import SectionHeader from "./SectionHeader";
import { TESTIMONIALS } from "../../data";

import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

const scaleIn  = { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } };
const stagger  = (delay = 0.1) => ({ visible: { transition: { staggerChildren: delay } } });


function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader badge="Reviews" title="What Gamers Say" />
        <motion.div variants={stagger(0.07)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {TESTIMONIALS.slice(0, 8).map(t => (
            <motion.div key={t.id} variants={scaleIn} whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-gray-900/50 border border-white/5 backdrop-blur hover:border-purple-500/20 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.game}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => <FiStar key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">"{t.text}"</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials