import Hero from "./homePage/Hero";
import FeaturedGames from "./homePage/FeaturedGames";
import TrendingGames from "./homePage/TrendingGames";
import Categories from "./homePage/Categories";
import EsportsHome from "./homePage/EsportsHome";
import NewsSection from "./homePage/NewsSection";

function HomePage({ setActivePage, setSelectedGame, wishlist, onWishlist }) {
  return (
    <div>
      <Hero setActivePage={setActivePage} setSelectedGame={setSelectedGame} />
      <FeaturedGames setActivePage={setActivePage} setSelectedGame={setSelectedGame} wishlist={wishlist} onWishlist={onWishlist} />
      <TrendingGames setActivePage={setActivePage} setSelectedGame={setSelectedGame} wishlist={wishlist} onWishlist={onWishlist} />
      <Categories setActivePage={setActivePage} />
      <EsportsHome setActivePage={setActivePage} />
      <NewsSection setActivePage={setActivePage} />
      
    </div>
  );
}

export default HomePage
