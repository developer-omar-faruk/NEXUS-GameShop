import { useState, useEffect} from "react";
import { motion } from "framer-motion";


function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setProgress(p => { if (p >= 100) { clearInterval(t); setTimeout(onDone, 300); return 100; } return p + 2; }), 30);
    return () => clearInterval(t);
  }, [onDone]);
  return (
    <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#030712]">
      <motion.div animate={{ rotateY: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-20 h-20 mb-8">
        <div className="w-full h-full border-4 border-transparent border-t-cyan-400 border-r-purple-500 rounded-full" style={{ boxShadow: "0 0 30px rgba(6,182,212,0.5)" }} />
      </motion.div>
      <h1 className="text-3xl font-black tracking-widest mb-2" style={{ background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>NEXUS GAMING</h1>
      <p className="text-gray-500 text-sm mb-8 tracking-widest uppercase">Loading Experience</p>
      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ width: `${progress}%`, background: "linear-gradient(90deg,#8b5cf6,#06b6d4)" }} transition={{ ease: "linear" }} />
      </div>
      <p className="text-cyan-400 text-sm mt-3 font-mono">{progress}%</p>
    </motion.div>
  );
}

export default LoadingScreen
