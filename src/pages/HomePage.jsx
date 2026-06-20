import Hero from "./homePage/Hero";
import FeaturedGames from "./homePage/FeaturedGames";

function HomePage({ setActivePage, setSelectedGame, wishlist, onWishlist }) {
  return (
    <div>
      <Hero setActivePage={setActivePage} setSelectedGame={setSelectedGame} />
      <FeaturedGames setActivePage={setActivePage} setSelectedGame={setSelectedGame} wishlist={wishlist} onWishlist={onWishlist} />
      
    </div>
  );
}

export default HomePage
