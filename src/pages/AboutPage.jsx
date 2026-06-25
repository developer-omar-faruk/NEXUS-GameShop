import { motion } from "framer-motion";
import { FiZap, FiGlobe, FiUsers } from "react-icons/fi";

const cn = (...classes) => classes.filter(Boolean).join(" ");
const fadeUp   = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const scaleIn  = { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } };
const stagger  = (delay = 0.1) => ({ visible: { transition: { staggerChildren: delay } } });


function AboutPage() {
  const milestones = [
    { year: "2018", title: "Founded", desc: "Nexus Gaming launched with a vision to redefine the gaming platform experience." },
    { year: "2019", title: "1M Users", desc: "Reached our first million players within 12 months of launch." },
    { year: "2020", title: "Esports Launch", desc: "Introduced the Nexus Esports Division with $5M in total prize pools." },
    { year: "2021", title: "Global Expansion", desc: "Expanded to 50+ countries, supporting 20+ languages." },
    { year: "2022", title: "10M Players", desc: "Surpassed 10 million active players, becoming the fastest-growing gaming platform." },
    { year: "2023", title: "4K Library", desc: "4,000+ games in library with exclusive AAA partnerships." },
    { year: "2024", title: "AI Integration", desc: "Launched AI-powered game recommendations and matchmaking." },
    { year: "2025", title: "The Future", desc: "Pioneering the next era of cloud gaming and VR experiences." },
  ];
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="text-center mb-16">
          <h1 className="text-5xl font-black mb-4" style={{ background: "linear-gradient(135deg,#a78bfa,#22d3ee,#f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Our Story
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Nexus Gaming was built by gamers, for gamers. Our mission is to create the world's most immersive, connected, and thrilling gaming platform — one that brings every player, every game, and every community together.
          </p>
        </motion.div>

        {/* Mission cards */}
        <motion.div variants={stagger(0.1)} initial="hidden" animate="visible" className="grid sm:grid-cols-3 gap-5 mb-16">
          {[
            { icon: FiZap, title: "Our Mission", text: "Deliver the ultimate gaming platform experience with cutting-edge technology and an unmatched game library.", color: "text-cyan-400", bg: "from-cyan-500/10 to-blue-500/10", border: "border-cyan-500/20" },
            { icon: FiGlobe, title: "Our Vision", text: "To be the global hub where every gamer, creator, and esports professional connects and thrives.", color: "text-purple-400", bg: "from-purple-500/10 to-pink-500/10", border: "border-purple-500/20" },
            { icon: FiUsers, title: "Community First", text: "Every decision we make puts our community of 12+ million players at the absolute center.", color: "text-pink-400", bg: "from-pink-500/10 to-rose-500/10", border: "border-pink-500/20" },
          ].map((c, i) => (
            <motion.div key={i} variants={scaleIn}
              className={cn("p-6 rounded-2xl bg-gradient-to-br border text-center", c.bg, c.border)}>
              <c.icon size={32} className={cn("mx-auto mb-4", c.color)} />
              <h3 className="text-white font-bold text-lg mb-2">{c.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{c.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl font-black text-white text-center mb-10">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-cyan-500 to-pink-500" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }} className="relative flex gap-6 pl-14">
                  <div className="absolute left-3.5 top-3 w-5 h-5 rounded-full border-2 border-cyan-400 bg-gray-950" style={{ boxShadow: "0 0 10px rgba(6,182,212,0.5)" }} />
                  <div className="flex-1 p-4 rounded-xl bg-gray-900/50 border border-white/5">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-cyan-400 font-black text-sm">{m.year}</span>
                      <span className="text-white font-bold">{m.title}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AboutPage
