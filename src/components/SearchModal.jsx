import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";

import { CATEGORIES, GAMES } from "../data";


function SearchModal({ open, onClose, setActivePage, setSelectedGame }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef();
  const results = query.length > 1 ? GAMES.filter(g => g.title.toLowerCase().includes(query.toLowerCase())).slice(0, 6) : [];

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 100); }, [open]);
  useEffect(() => { const fn = e => e.key === "Escape" && onClose(); window.addEventListener("keydown", fn); return () => window.removeEventListener("keydown", fn); }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          onClick={e => e.target === e.currentTarget && onClose()}>
          <motion.div initial={{ scale: 0.9, y: -20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: -20 }}
            className="w-full max-w-2xl bg-gray-900/95 border border-white/10 rounded-2xl overflow-hidden"
            style={{ boxShadow: "0 0 60px rgba(6,182,212,0.2)" }}>
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <FiSearch size={18} className="text-gray-400" />
              <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Search games, news, categories…"
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg" />
              <button onClick={onClose}><FiX size={18} className="text-gray-400 hover:text-white" /></button>
            </div>
            {results.length > 0 && (
              <div className="py-2">
                {results.map(g => (
                  <motion.button key={g.id} whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                    onClick={() => { setSelectedGame(g); setActivePage("GameDetails"); onClose(); setQuery(""); }}
                    className="w-full flex items-center gap-4 px-5 py-3 transition-colors">
                    <img src={g.cover} alt={g.title} className="w-10 h-14 object-cover rounded-lg" />
                    <div className="text-left">
                      <p className="text-white font-semibold text-sm">{g.title}</p>
                      <p className="text-gray-400 text-xs">{g.genre} · {g.platform}</p>
                    </div>
                    <div className="ml-auto text-cyan-400 text-xs font-bold">{g.price === 0 ? "Free" : `$${g.price}`}</div>
                  </motion.button>
                ))}
              </div>
            )}
            {query.length > 1 && results.length === 0 && (
              <p className="text-center text-gray-500 py-8">No results for "{query}"</p>
            )}
            {query.length === 0 && (
              <div className="px-5 py-4">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Quick Access</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.slice(0, 6).map(c => (
                    <button key={c.id} onClick={() => { setActivePage("Games"); onClose(); }}
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs hover:border-cyan-500/50 hover:text-cyan-400 transition-all">
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SearchModal
