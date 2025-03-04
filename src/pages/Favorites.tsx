
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { useFavorites } from '../context/FavoritesContext';
import { Heart, ArrowRight } from 'lucide-react';

const Favorites = () => {
  const { favorites } = useFavorites();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Favorites Content */}
      <section className="pt-28 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-red-100 text-red-500 rounded-full animate-fade-in">
              <Heart size={16} className="inline-block mr-1.5" />
              Saved Recipes
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight animate-fade-up">
              Your Favorite Recipes
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '100ms' }}>
              All your saved recipes in one place for easy access
            </p>
          </div>
          
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((recipe, index) => (
                <RecipeCard key={recipe.id} recipe={recipe} delay={index * 100} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6">
                <Heart size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No favorites yet</h3>
              <p className="text-muted-foreground max-w-md">
                When you find recipes you love, save them here for quick access
              </p>
              <a 
                href="/" 
                className="mt-6 inline-flex items-center px-4 py-2 rounded-md bg-primary text-white font-medium animate-fade-up"
              >
                Discover Recipes
                <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Favorites;
