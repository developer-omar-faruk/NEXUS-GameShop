import Hero from "./homePage/Hero";

function HomePage({ setActivePage, setSelectedGame, wishlist, onWishlist }) {
  return (
    <div>
      <Hero setActivePage={setActivePage} setSelectedGame={setSelectedGame} />
      
    </div>
  );
}

export default HomePage
