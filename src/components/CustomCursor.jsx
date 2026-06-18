import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function CustomCursor() {
  const [pos, setPos]     = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = e => {
      setPos({ x: e.clientX, y: e.clientY });
      setTimeout(() => setTrail({ x: e.clientX, y: e.clientY }), 80);
    };
    const over = e => setHover(!!e.target.closest("a,button,[data-hover]"));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);

  return (
    <>
      <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
        animate={{ x: pos.x - 6, y: pos.y - 6, scale: hover ? 1.8 : 1 }}
        transition={{ type: "spring", stiffness: 800, damping: 35 }}
        style={{ width: 12, height: 12, background: "#06b6d4" }}
      />
      <motion.div className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-cyan-400/40"
        animate={{ x: trail.x - 20, y: trail.y - 20, scale: hover ? 1.5 : 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ width: 40, height: 40 }}
      />
    </>
  );
}

export default CustomCursor
