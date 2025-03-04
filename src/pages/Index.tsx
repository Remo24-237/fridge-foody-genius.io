
import { useState, useEffect } from 'react';
import { ArrowRight, Clock, Search } from 'lucide-react';
import Header from '../components/Header';
import IngredientInput from '../components/IngredientInput';
import RecipeCard from '../components/RecipeCard';
import FridgeVisual from '../components/FridgeVisual';
import { getRecommendations } from '../utils/aiSuggestions';
import { Recipe } from '../utils/recipeData';

const Index = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<Recipe[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleAddIngredient = (ingredient: string) => {
    setIngredients(prev => [...prev, ingredient]);
  };
  
  const handleRemoveIngredient = (ingredient: string) => {
    setIngredients(prev => prev.filter(item => item !== ingredient));
  };
  
  const handleGetRecommendations = async () => {
    if (ingredients.length === 0) return;
    
    setIsSearching(true);
    try {
      const results = await getRecommendations(ingredients);
      setRecommendations(results);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setIsSearching(false);
    }
  };
  
  // Update recommendations when ingredients change
  useEffect(() => {
    if (ingredients.length > 0) {
      handleGetRecommendations();
    } else {
      setRecommendations([]);
    }
  }, [ingredients]);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 pb-14 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full animate-fade-in">
            <Clock size={16} className="inline-block mr-1.5" />
            Recipe Genius
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight animate-fade-up">
            Turn Your Fridge Ingredients into Delicious Meals
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '100ms' }}>
            Let AI find the perfect recipes based on what you already have. No more food waste, no more grocery runs.
          </p>
          
          <div className="mt-10 mb-16 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <IngredientInput 
              onAddIngredient={handleAddIngredient}
              onRemoveIngredient={handleRemoveIngredient}
              ingredients={ingredients}
            />
            
            <div className="mt-8">
              <FridgeVisual ingredients={ingredients} isLoading={isSearching} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Recommendations Section */}
      <section className="py-12 px-6 bg-secondary/50">
        <div className="container mx-auto max-w-6xl">
          {recommendations.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-display font-semibold">
                  Your Recipe Recommendations
                </h2>
                <span className="text-sm text-muted-foreground">
                  <Search size={16} className="inline mr-1" />
                  {recommendations.length} recipes found
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((recipe, index) => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    delay={index * 100} 
                  />
                ))}
              </div>
            </>
          ) : ingredients.length > 0 && isSearching ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Looking for recipes...</p>
            </div>
          ) : ingredients.length > 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No recipes match your ingredients. Try adding more ingredients.</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center p-6 rounded-full bg-primary/5 mb-4">
                <Search size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Start by adding ingredients</h3>
              <p className="text-muted-foreground">
                Add what's in your fridge to get personalized recipe recommendations
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-display font-semibold mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-xl font-medium text-primary">1</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Add Your Ingredients</h3>
              <p className="text-muted-foreground">Enter what's in your fridge or pantry</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-xl font-medium text-primary">2</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Get AI Suggestions</h3>
              <p className="text-muted-foreground">Our AI finds recipes matching your ingredients</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-xl font-medium text-primary">3</span>
              </div>
              <h3 className="text-lg font-medium mb-2">Cook & Enjoy</h3>
              <p className="text-muted-foreground">Follow the recipe and enjoy your meal</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
