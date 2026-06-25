import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ------Components-------
import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import ParticleField from "./components/ParticleField";
import BackToTop from "./components/BackToTop";

// ------Pages-------
import HomePage from "./pages/HomePage";
import GamesPage from "./pages/GamesPage";
import GameDetailsPage from "./pages/GameDetailsPage";
import EsportsPage from "./pages/EsportsPage";
import NewsPage from "./pages/NewsPage";



export default function App() {
  const [loading, setLoading]         = useState(true);
  const [activePage, setActivePage]   = useState("News");
  const [selectedGame, setSelectedGame] = useState(null);
  const [wishlist, setWishlist]       = useState([]);
  const [searchOpen, setSearchOpen]   = useState(false);

  const onWishlist = useCallback(id => {
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  }, []);

  // Scroll to top on page change
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [activePage]);

  const pageProps = { setActivePage, setSelectedGame, wishlist, onWishlist };

  const renderPage = () => {
    switch (activePage) {
      case "Home":        return <HomePage {...pageProps} />;
      case "Games":       return <GamesPage {...pageProps} />;
      case "GameDetails": return <GameDetailsPage game={selectedGame} {...pageProps} />;
      case "Esports":     return <EsportsPage />;
      case "News":        return <NewsPage />;
      case "About":       return <AboutPage />;
      case "Contact":     return <ContactPage />;
      case "Wishlist":    return <WishlistPage {...pageProps} />;
      default:            return <HomePage {...pageProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <AnimatePresence>{loading && <LoadingScreen onDone={() => setLoading(false)} />}</AnimatePresence>

      {!loading && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <ParticleField />

          <Navbar activePage={activePage} setActivePage={setActivePage} wishlist={wishlist} setSearchOpen={setSearchOpen} />
          

          <AnimatePresence mode="wait">
            <motion.main key={activePage} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              {renderPage()}
            </motion.main>
          </AnimatePresence>

          <Footer setActivePage={setActivePage} />
          <BackToTop />
        </>
      )}
    </div>
  );
}