import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiZap, FiSearch, FiHeart, FiMonitor, FiMenu, FiX
} from "react-icons/fi";

const NAV_LINKS = ["Home", "Games", "Esports", "News", "About", "Contact"];

const cn = (...classes) => classes.filter(Boolean).join(" ");


function Navbar({ activePage, setActivePage, wishlist, setSearchOpen }) {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-gray-950/90 backdrop-blur-xl border-b border-white/5 shadow-2xl" : "bg-transparent")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button whileHover={{ scale: 1.05 }} onClick={() => setActivePage("Home")} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", boxShadow: "0 0 20px rgba(6,182,212,0.4)" }}>
              <FiZap size={16} className="text-white" />
            </div>
            <span className="text-xl font-black tracking-wider" style={{ background: "linear-gradient(135deg,#a78bfa,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>NEXUS</span>
          </motion.button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <motion.button key={link} whileHover={{ scale: 1.05 }} onClick={() => setActivePage(link)}
                className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  activePage === link ? "text-cyan-400 bg-cyan-400/10" : "text-gray-400 hover:text-white hover:bg-white/5")}
              >
                {link}
                {activePage === link && <motion.div layoutId="nav-indicator" className="w-full h-0.5 mt-0.5 rounded-full bg-cyan-400" />}
              </motion.button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <motion.button whileHover={{ scale: 1.1 }} onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all">
              <FiSearch size={18} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} onClick={() => setActivePage("Wishlist")}
              className="relative p-2 rounded-lg text-gray-400 hover:text-pink-400 hover:bg-pink-400/10 transition-all">
              <FiHeart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 text-white text-[10px] flex items-center justify-center font-bold">{wishlist.length}</span>
              )}
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-black transition-all"
              style={{ background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}>
              <FiMonitor size={14} /> Play Now
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-gray-400 hover:text-white">
              {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-950/95 backdrop-blur-xl border-t border-white/5">
            <div className="px-4 py-4 flex flex-col gap-2">
              {NAV_LINKS.map(link => (
                <motion.button key={link} whileHover={{ x: 8 }} onClick={() => { setActivePage(link); setMobileOpen(false); }}
                  className={cn("text-left px-4 py-3 rounded-lg text-sm font-medium transition-all",
                    activePage === link ? "text-cyan-400 bg-cyan-400/10" : "text-gray-400 hover:text-white")}>
                  {link}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar
