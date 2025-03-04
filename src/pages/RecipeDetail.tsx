
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Clock, ChefHat } from 'lucide-react';
import Header from '../components/Header';
import { getRecipeById } from '../utils/aiSuggestions';
import { useFavorites } from '../context/FavoritesContext';
import { Recipe } from '../utils/recipeData';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();
  
  useEffect(() => {
    if (id) {
      const fetchedRecipe = getRecipeById(id);
      if (fetchedRecipe) {
        setRecipe(fetchedRecipe);
      } else {
        // Recipe not found
        navigate('/');
      }
      setIsLoading(false);
    }
  }, [id, navigate]);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleToggleFavorite = () => {
    if (recipe) {
      toggleFavorite(recipe);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-28 pb-16 flex justify-center items-center">
          <div className="animate-pulse w-full max-w-4xl">
            <div className="h-64 bg-muted rounded-lg mb-6"></div>
            <div className="h-8 bg-muted rounded mb-4 w-3/4"></div>
            <div className="h-4 bg-muted rounded mb-2 w-1/2"></div>
            <div className="h-4 bg-muted rounded mb-2 w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!recipe) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-28 pb-16 px-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-semibold mb-4">Recipe not found</h2>
          <p className="text-muted-foreground mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={handleBack}
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md"
          >
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  const favorite = isFavorite(recipe.id);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-16">
        {/* Back button */}
        <div className="container mx-auto max-w-4xl px-6 py-4">
          <button 
            onClick={handleBack}
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back
          </button>
        </div>
        
        {/* Recipe image hero */}
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
          <div className={`aspect-[3/1] relative ${!imageLoaded ? 'image-loading' : ''}`}>
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className={`w-full h-full object-cover rounded-lg shadow-medium ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          
          {/* Favorite button */}
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-4 right-4 p-3 rounded-full shadow-soft transition-all ${
              favorite 
                ? 'bg-white text-red-500' 
                : 'bg-black/50 text-white hover:bg-black/70'
            }`}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={20} fill={favorite ? 'currentColor' : 'none'} />
          </button>
        </div>
        
        {/* Recipe details */}
        <div className="container mx-auto max-w-3xl px-6 mt-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{recipe.title}</h1>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-foreground text-sm">
              <Clock size={16} className="mr-2" />
              {recipe.cookTime}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-foreground text-sm">
              <ChefHat size={16} className="mr-2" />
              {recipe.difficulty}
            </span>
          </div>
          
          {/* Ingredients */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
            <ul className="space-y-2 bg-secondary/50 rounded-lg p-6">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-3"></span>
                  <span>{ingredient.amount || ingredient.name}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Instructions */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <ol className="space-y-6">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-4 font-medium">
                    {index + 1}
                  </span>
                  <p className="pt-1">{instruction}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
