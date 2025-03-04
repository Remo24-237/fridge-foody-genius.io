
import { Recipe, recipes } from './recipeData';

// Function to calculate match percentage based on user ingredients
export const suggestRecipes = (userIngredients: string[]): Recipe[] => {
  // If no ingredients, return empty list
  if (!userIngredients.length) return [];
  
  // Normalize user ingredients (lowercase)
  const normalizedUserIngredients = userIngredients.map(ing => ing.toLowerCase());
  
  // Calculate match percentage for each recipe
  const matchedRecipes = recipes.map(recipe => {
    const recipeIngredientNames = recipe.ingredients.map(ing => ing.name.toLowerCase());
    
    // Count how many user ingredients are in the recipe
    const matchingIngredients = normalizedUserIngredients.filter(ing => 
      recipeIngredientNames.some(recipeIng => recipeIng.includes(ing) || ing.includes(recipeIng))
    );
    
    // Calculate percentage based on user ingredients matched divided by total recipe ingredients
    // More weight given to higher percentage of user ingredients being used
    const userIngredientsUtilization = matchingIngredients.length / normalizedUserIngredients.length;
    const recipeIngredientsMatch = matchingIngredients.length / recipeIngredientNames.length;
    
    // Weighted average (70% weight on user ingredients utilization, 30% on recipe match)
    const matchPercentage = (userIngredientsUtilization * 0.7) + (recipeIngredientsMatch * 0.3);
    
    return {
      ...recipe,
      matchPercentage
    };
  });
  
  // Sort by match percentage (highest first)
  return matchedRecipes
    .filter(recipe => recipe.matchPercentage > 0) // Only include recipes with some match
    .sort((a, b) => (b.matchPercentage ?? 0) - (a.matchPercentage ?? 0));
};

// Function to simulate AI thinking for recommendations
export const getRecommendations = (
  userIngredients: string[], 
  recipeType?: string
): Promise<Recipe[]> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      let results = suggestRecipes(userIngredients);
      
      // If a specific recipe type is requested, filter further
      if (recipeType) {
        const recipeTypeLower = recipeType.toLowerCase();
        results = results.filter(recipe => 
          recipe.title.toLowerCase().includes(recipeTypeLower)
        );
      }
      
      resolve(results);
    }, 1000); // 1 second "loading" time to simulate AI processing
  });
};

// Get a single recipe by ID
export const getRecipeById = (id: string): Recipe | undefined => {
  return recipes.find(recipe => recipe.id === id);
};
