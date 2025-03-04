
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { Recipe } from '../utils/recipeData';

type RecipeCardProps = {
  recipe: Recipe;
  delay?: number;
};

const RecipeCard = ({ recipe, delay = 0 }: RecipeCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some(fav => fav.id === recipe.id);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipe);
  };
  
  const matchCount = recipe.matchPercentage 
    ? Math.round(recipe.matchPercentage * 100) 
    : null;
  
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className={`block group relative overflow-hidden rounded-xl bg-white border border-border shadow-soft transition-all duration-300 hover:shadow-medium ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ 
        transitionDelay: `${delay}ms`,
        transitionProperty: 'opacity, transform' 
      }}
    >
      <div className="relative aspect-video overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 image-loading"></div>
        )}
        <img
          src={recipe.image}
          alt={recipe.title}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
          loading="lazy"
        />
        
        {/* Match percentage chip */}
        {matchCount !== null && (
          <div className="absolute top-3 left-3 bg-black/70 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
            {matchCount}% match
          </div>
        )}
        
        {/* Favorite button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
            isFavorite 
              ? 'bg-white text-red-500' 
              : 'bg-black/40 text-white hover:bg-black/60'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1 text-foreground">{recipe.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{recipe.cookTime} • {recipe.difficulty}</p>
        
        {/* Ingredients preview */}
        <div className="flex flex-wrap gap-1 mt-2">
          {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
            <span key={idx} className="text-xs bg-secondary px-2 py-0.5 rounded-full">
              {ingredient.name}
            </span>
          ))}
          {recipe.ingredients.length > 3 && (
            <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
              +{recipe.ingredients.length - 3} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
