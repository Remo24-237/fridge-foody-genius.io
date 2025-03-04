
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Recipe } from '../utils/recipeData';
import { toast } from 'sonner';

interface FavoritesContextType {
  favorites: Recipe[];
  toggleFavorite: (recipe: Recipe) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Recipe[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (recipe: Recipe) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(fav => fav.id === recipe.id);
      
      if (isAlreadyFavorite) {
        toast.success(`Removed "${recipe.title}" from favorites`);
        return prevFavorites.filter(fav => fav.id !== recipe.id);
      } else {
        toast.success(`Added "${recipe.title}" to favorites`);
        return [...prevFavorites, recipe];
      }
    });
  };

  const isFavorite = (id: string) => {
    return favorites.some(recipe => recipe.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
