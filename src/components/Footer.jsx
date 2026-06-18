import { NAV_LINKS, CATEGORIES } from "../data";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiZap, FiTwitter, FiYoutube, FiInstagram, FiGithub, FiLinkedin } from "react-icons/fi";


function Footer({ setActivePage }) {
  const [email, setEmail] = useState("");
  return (
    <footer className="relative border-t border-white/5 bg-gray-950/80 backdrop-blur pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#8b5cf6,#06b6d4)" }}>
                <FiZap size={16} className="text-white" />
              </div>
              <span className="text-xl font-black" style={{ background: "linear-gradient(135deg,#a78bfa,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>NEXUS</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">The next-generation gaming platform for players, esports pros, and communities worldwide.</p>
            <div className="flex gap-3">
              {[FiTwitter, FiYoutube, FiInstagram, FiGithub, FiLinkedin].map((Icon, i) => (
                <motion.button key={i} whileHover={{ scale: 1.1, y: -2 }}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/40 transition-all">
                  <Icon size={13} />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Navigation</h4>
            <div className="space-y-2">
              {NAV_LINKS.map(link => (
                <button key={link} onClick={() => setActivePage(link)}
                  className="block text-gray-500 hover:text-cyan-400 text-sm transition-colors">{link}</button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Categories</h4>
            <div className="space-y-2">
              {CATEGORIES.slice(0, 6).map(c => (
                <button key={c.id} onClick={() => setActivePage("Games")}
                  className="block text-gray-500 hover:text-cyan-400 text-sm transition-colors">{c.name}</button>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Newsletter</h4>
            <p className="text-gray-500 text-sm mb-4">Get the latest gaming news and updates straight to your inbox.</p>
            <div className="flex gap-2">
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
                className="flex-1 px-3 py-2.5 rounded-xl bg-gray-800/50 border border-white/10 text-white placeholder-gray-600 outline-none focus:border-cyan-500/50 text-sm transition-colors" />
              <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2.5 rounded-xl text-sm font-bold text-black"
                style={{ background: "linear-gradient(135deg,#8b5cf6,#06b6d4)" }}>
                <FiArrowRight size={14} />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© 2025 Nexus Gaming. All rights reserved.</p>
          <div className="flex gap-4">
            {["Privacy Policy","Terms of Service","Cookie Policy"].map(l => (
              <button key={l} className="hover:text-gray-400 transition-colors">{l}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer
