import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail, FiPhone, FiMessageCircle, FiGlobe, FiTwitter,
  FiYoutube, FiInstagram, FiGithub, FiChevronRight,
} from "react-icons/fi";

const cn = (...classes) => classes.filter(Boolean).join(" ");
const fadeUp   = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };


function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = e => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4000); };

  const faqs = [
    { q: "How do I download a game?", a: "Navigate to any game page and click the Download button. You'll need a free Nexus account." },
    { q: "What platforms are supported?", a: "We support PC, PS5, Xbox Series X, and Nintendo Switch across our library." },
    { q: "Can I get a refund?", a: "Yes! Games purchased within 14 days and under 2 hours of playtime are eligible for refunds." },
    { q: "How do I join tournaments?", a: "Visit the Esports page, find an upcoming tournament, and register your team." },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-10">
          <h1 className="text-4xl font-black text-white mb-2">Contact Us</h1>
          <p className="text-gray-400">We'd love to hear from you. Drop us a message!</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Form */}
          <motion.form variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }}
            onSubmit={submit} className="space-y-5 p-8 rounded-2xl bg-gray-900/50 border border-white/5">
            <h2 className="text-xl font-bold text-white mb-2">Send a Message</h2>
            {[["name","Name","text"],["email","Email","email"],["subject","Subject","text"]].map(([f, l, t]) => (
              <div key={f}>
                <label className="text-gray-400 text-xs uppercase tracking-widest mb-1.5 block">{l}</label>
                <input type={t} value={form[f]} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))}
                  required className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-white/10 text-white placeholder-gray-600 outline-none focus:border-cyan-500/50 transition-colors text-sm" />
              </div>
            ))}
            <div>
              <label className="text-gray-400 text-xs uppercase tracking-widest mb-1.5 block">Message</label>
              <textarea rows={5} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                required className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-white/10 text-white placeholder-gray-600 outline-none focus:border-cyan-500/50 transition-colors resize-none text-sm" />
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-black transition-all"
              style={{ background: "linear-gradient(135deg,#8b5cf6,#06b6d4)", boxShadow: "0 0 20px rgba(6,182,212,0.3)" }}>
              {sent ? "✓ Message Sent!" : "Send Message"}
            </motion.button>
          </motion.form>

          {/* Contact Info */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="space-y-5">
            <div className="p-6 rounded-2xl bg-gray-900/50 border border-white/5">
              <h2 className="text-xl font-bold text-white mb-5">Get In Touch</h2>
              <div className="space-y-4">
                {[
                  { icon: FiMail, label: "Email", value: "support@nexusgaming.gg", color: "text-cyan-400" },
                  { icon: FiPhone, label: "Phone", value: "+1 (888) NEXUS-GG", color: "text-purple-400" },
                  { icon: FiMessageCircle, label: "Discord", value: "discord.gg/nexusgaming", color: "text-indigo-400" },
                  { icon: FiGlobe, label: "Website", value: "nexusgaming.gg", color: "text-pink-400" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-white/5", color)}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">{label}</p>
                      <p className="text-white text-sm font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Social */}
            <div className="p-6 rounded-2xl bg-gray-900/50 border border-white/5">
              <h3 className="text-white font-bold mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[FiTwitter, FiYoutube, FiInstagram, FiGithub].map((Icon, i) => (
                  <motion.button key={i} whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/40 transition-all">
                    <Icon size={16} />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl font-black text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <motion.details key={i} className="group p-5 rounded-2xl bg-gray-900/50 border border-white/5 hover:border-purple-500/20 transition-all cursor-pointer">
                <summary className="text-white font-semibold text-sm list-none flex items-center justify-between">
                  {f.q} <FiChevronRight size={14} className="text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">{f.a}</p>
              </motion.details>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ContactPage
