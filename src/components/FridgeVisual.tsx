
import { useMemo, useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

type FridgeVisualProps = {
  ingredients: string[];
  isLoading?: boolean;
};

// Colors for different ingredient categories
const CATEGORY_COLORS: Record<string, string> = {
  vegetable: '#4ade80',
  fruit: '#f97316',
  protein: '#f43f5e',
  dairy: '#60a5fa',
  grain: '#fbbf24',
  spice: '#a855f7',
  default: '#94a3b8'
};

// Simple categorization of common ingredients
const INGREDIENT_CATEGORIES: Record<string, string> = {
  tomato: 'vegetable',
  lettuce: 'vegetable',
  cucumber: 'vegetable',
  carrot: 'vegetable',
  potato: 'vegetable',
  onion: 'vegetable',
  garlic: 'spice',
  apple: 'fruit',
  banana: 'fruit',
  orange: 'fruit',
  strawberry: 'fruit',
  chicken: 'protein',
  beef: 'protein',
  pork: 'protein',
  fish: 'protein',
  egg: 'protein',
  milk: 'dairy',
  cheese: 'dairy',
  yogurt: 'dairy',
  butter: 'dairy',
  rice: 'grain',
  pasta: 'grain',
  bread: 'grain',
  flour: 'grain',
  salt: 'spice',
  pepper: 'spice',
  olive: 'vegetable',
};

const getCategory = (ingredient: string): string => {
  // Check if the ingredient exactly matches any key
  if (INGREDIENT_CATEGORIES[ingredient]) return INGREDIENT_CATEGORIES[ingredient];
  
  // Check if the ingredient contains any key as a substring
  for (const [key, category] of Object.entries(INGREDIENT_CATEGORIES)) {
    if (ingredient.includes(key)) return category;
  }
  
  return 'default';
};

const getColor = (ingredient: string): string => {
  const category = getCategory(ingredient);
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.default;
};

const FridgeVisual = ({ ingredients, isLoading = false }: FridgeVisualProps) => {
  const [animation, setAnimation] = useState(false);
  
  // Calculate positions for ingredients in a grid-like pattern
  const ingredientElements = useMemo(() => {
    return ingredients.map((ingredient, index) => {
      const color = getColor(ingredient);
      
      return (
        <div
          key={ingredient}
          className="absolute transform transition-all duration-500 ease-out animate-fade-in"
          style={{
            backgroundColor: color,
            color: 'white',
            padding: '0.5rem 0.75rem',
            borderRadius: '0.5rem',
            fontSize: '0.75rem',
            fontWeight: 500,
            opacity: 0.9,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            // Position in a grid-like pattern
            top: `${(Math.floor(index / 3) * 3) + Math.random() * 3 + 30}%`,
            left: `${((index % 3) / 3) * 80 + 10 + Math.random() * 5}%`,
            zIndex: 10 - (index % 10),
            animationDelay: `${index * 0.1}s`,
          }}
        >
          {ingredient}
        </div>
      );
    });
  }, [ingredients]);
  
  useEffect(() => {
    setAnimation(true);
    const timer = setTimeout(() => setAnimation(false), 100);
    return () => clearTimeout(timer);
  }, [ingredients]);

  return (
    <div className="relative w-full h-64 flex items-center justify-center rounded-xl bg-secondary p-4 overflow-hidden">
      {/* Fridge background with glass effect */}
      <div className="absolute inset-0 glass rounded-xl border border-white/20"></div>
      
      {/* Fridge shelf lines */}
      <div className="absolute left-0 right-0 top-1/3 h-px bg-white/20"></div>
      <div className="absolute left-0 right-0 top-2/3 h-px bg-white/20"></div>
      
      {/* Ingredients */}
      <div className={`relative w-full h-full ${animation ? 'animate-pulse-soft' : ''}`}>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : ingredients.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
            Add ingredients to see your virtual fridge
          </div>
        ) : (
          ingredientElements
        )}
      </div>
    </div>
  );
};

export default FridgeVisual;
