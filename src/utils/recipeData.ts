
export interface Ingredient {
  name: string;
  amount?: string;
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: Ingredient[];
  instructions: string[];
  matchPercentage?: number; // For AI matching
}

// Sample recipes database
export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Mediterranean Salad',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    cookTime: '15 min',
    difficulty: 'Easy',
    ingredients: [
      { name: 'cucumber', amount: '1, diced' },
      { name: 'tomato', amount: '2, chopped' },
      { name: 'red onion', amount: '1/4, thinly sliced' },
      { name: 'bell pepper', amount: '1, diced' },
      { name: 'feta cheese', amount: '100g, crumbled' },
      { name: 'olives', amount: '1/4 cup, pitted' },
      { name: 'olive oil', amount: '2 tbsp' },
      { name: 'lemon juice', amount: '1 tbsp' },
      { name: 'oregano', amount: '1 tsp' },
      { name: 'salt', amount: 'to taste' },
      { name: 'pepper', amount: 'to taste' },
    ],
    instructions: [
      'In a large bowl, combine cucumber, tomato, red onion, and bell pepper.',
      'Add olives and crumbled feta cheese.',
      'In a small bowl, whisk together olive oil, lemon juice, oregano, salt, and pepper.',
      'Pour dressing over the salad and gently toss to combine.',
      'Serve immediately or chill for 30 minutes to let flavors meld.'
    ]
  },
  {
    id: '2',
    title: 'Spinach Mushroom Omelette',
    image: 'https://images.unsplash.com/photo-1510693045981-3ad4abc694b1?auto=format&fit=crop&w=800&q=80',
    cookTime: '10 min',
    difficulty: 'Easy',
    ingredients: [
      { name: 'eggs', amount: '3, beaten' },
      { name: 'spinach', amount: '1 cup, fresh' },
      { name: 'mushrooms', amount: '1/2 cup, sliced' },
      { name: 'onion', amount: '2 tbsp, chopped' },
      { name: 'cheese', amount: '1/4 cup, shredded' },
      { name: 'butter', amount: '1 tbsp' },
      { name: 'salt', amount: 'to taste' },
      { name: 'pepper', amount: 'to taste' },
    ],
    instructions: [
      'In a non-stick skillet, melt butter over medium heat.',
      'Add onions and mushrooms, cook until softened.',
      'Add spinach and cook until wilted.',
      'Season beaten eggs with salt and pepper, then pour over vegetables.',
      'As eggs set, lift edges to allow uncooked eggs to flow underneath.',
      'When almost set, sprinkle cheese on top and fold omelette in half.',
      'Cook until cheese melts and eggs are fully set but not dry.',
      'Serve immediately.'
    ]
  },
  {
    id: '3',
    title: 'Avocado Toast with Egg',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    cookTime: '10 min',
    difficulty: 'Easy',
    ingredients: [
      { name: 'bread', amount: '2 slices' },
      { name: 'avocado', amount: '1, ripe' },
      { name: 'eggs', amount: '2' },
      { name: 'cherry tomatoes', amount: '1/4 cup, halved' },
      { name: 'lemon juice', amount: '1 tsp' },
      { name: 'red pepper flakes', amount: 'pinch' },
      { name: 'salt', amount: 'to taste' },
      { name: 'pepper', amount: 'to taste' },
    ],
    instructions: [
      'Toast bread slices until golden and crisp.',
      'In a small bowl, mash avocado with lemon juice, salt, and pepper.',
      'In a non-stick pan, fry eggs to your preference.',
      'Spread mashed avocado over toast slices.',
      'Top each slice with a fried egg and halved cherry tomatoes.',
      'Sprinkle with red pepper flakes and serve immediately.'
    ]
  },
  {
    id: '4',
    title: 'Chicken Stir-Fry',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80',
    cookTime: '25 min',
    difficulty: 'Medium',
    ingredients: [
      { name: 'chicken breast', amount: '2, sliced' },
      { name: 'bell pepper', amount: '1, sliced' },
      { name: 'broccoli', amount: '1 cup, florets' },
      { name: 'carrot', amount: '1, julienned' },
      { name: 'onion', amount: '1, sliced' },
      { name: 'garlic', amount: '2 cloves, minced' },
      { name: 'soy sauce', amount: '3 tbsp' },
      { name: 'honey', amount: '1 tbsp' },
      { name: 'vegetable oil', amount: '2 tbsp' },
      { name: 'sesame seeds', amount: '1 tsp' },
    ],
    instructions: [
      'In a small bowl, mix soy sauce and honey; set aside.',
      'Heat oil in a wok or large skillet over high heat.',
      'Add chicken and cook until no longer pink, about 5-6 minutes.',
      'Remove chicken and set aside.',
      'In the same pan, stir-fry vegetables and garlic until crisp-tender.',
      'Return chicken to the pan and add sauce mixture.',
      'Cook for 2-3 minutes until sauce thickens slightly.',
      'Sprinkle with sesame seeds and serve hot with rice or noodles.'
    ]
  },
  {
    id: '5',
    title: 'Simple Pasta Primavera',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80',
    cookTime: '20 min',
    difficulty: 'Easy',
    ingredients: [
      { name: 'pasta', amount: '8 oz, your choice' },
      { name: 'zucchini', amount: '1, sliced' },
      { name: 'bell pepper', amount: '1, diced' },
      { name: 'cherry tomatoes', amount: '1 cup, halved' },
      { name: 'broccoli', amount: '1 cup, florets' },
      { name: 'garlic', amount: '2 cloves, minced' },
      { name: 'olive oil', amount: '3 tbsp' },
      { name: 'parmesan cheese', amount: '1/4 cup, grated' },
      { name: 'basil', amount: '2 tbsp, fresh chopped' },
      { name: 'salt', amount: 'to taste' },
      { name: 'pepper', amount: 'to taste' },
    ],
    instructions: [
      'Cook pasta according to package directions. Reserve 1/2 cup of pasta water before draining.',
      'Meanwhile, heat olive oil in a large skillet over medium heat.',
      'Add garlic and cook for 30 seconds until fragrant.',
      'Add vegetables and cook until tender-crisp, about 5-7 minutes.',
      'Add drained pasta to the skillet along with splash of reserved pasta water.',
      'Toss everything together and add more pasta water if needed.',
      'Remove from heat, add parmesan cheese, basil, salt, and pepper.',
      'Toss until well combined and serve immediately.'
    ]
  },
  {
    id: '6',
    title: 'Berry Smoothie Bowl',
    image: 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?auto=format&fit=crop&w=800&q=80',
    cookTime: '5 min',
    difficulty: 'Easy',
    ingredients: [
      { name: 'frozen mixed berries', amount: '1 cup' },
      { name: 'banana', amount: '1, frozen' },
      { name: 'yogurt', amount: '1/2 cup, Greek' },
      { name: 'milk', amount: '1/4 cup' },
      { name: 'honey', amount: '1 tbsp' },
      { name: 'granola', amount: '2 tbsp' },
      { name: 'fresh berries', amount: '1/4 cup' },
      { name: 'chia seeds', amount: '1 tsp' },
    ],
    instructions: [
      'In a blender, combine frozen berries, frozen banana, yogurt, milk, and honey.',
      'Blend until smooth and thick, adding more milk if needed.',
      'Pour into a bowl.',
      'Top with granola, fresh berries, and chia seeds.',
      'Serve immediately.'
    ]
  },
  {
    id: '7',
    title: 'Quick Vegetable Soup',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    cookTime: '30 min',
    difficulty: 'Medium',
    ingredients: [
      { name: 'onion', amount: '1, chopped' },
      { name: 'carrot', amount: '2, diced' },
      { name: 'celery', amount: '2 stalks, chopped' },
      { name: 'potato', amount: '1, diced' },
      { name: 'zucchini', amount: '1, diced' },
      { name: 'tomato', amount: '2, diced' },
      { name: 'vegetable broth', amount: '4 cups' },
      { name: 'garlic', amount: '2 cloves, minced' },
      { name: 'thyme', amount: '1 tsp, dried' },
      { name: 'bay leaf', amount: '1' },
      { name: 'olive oil', amount: '2 tbsp' },
      { name: 'salt', amount: 'to taste' },
      { name: 'pepper', amount: 'to taste' },
    ],
    instructions: [
      'Heat olive oil in a large pot over medium heat.',
      'Add onion, carrot, and celery. Cook until softened, about 5 minutes.',
      'Add garlic and cook for 30 seconds until fragrant.',
      'Add potato, vegetable broth, thyme, and bay leaf.',
      'Bring to a boil, then reduce heat and simmer for 10 minutes.',
      'Add zucchini and tomato. Simmer for another 5-10 minutes until all vegetables are tender.',
      'Season with salt and pepper to taste.',
      'Remove bay leaf before serving.'
    ]
  },
  {
    id: '8',
    title: 'Simple Banana Pancakes',
    image: 'https://images.unsplash.com/photo-1575853121743-60c24f0a7502?auto=format&fit=crop&w=800&q=80',
    cookTime: '15 min',
    difficulty: 'Easy',
    ingredients: [
      { name: 'banana', amount: '1, ripe' },
      { name: 'eggs', amount: '2' },
      { name: 'flour', amount: '1/2 cup' },
      { name: 'milk', amount: '1/4 cup' },
      { name: 'baking powder', amount: '1 tsp' },
      { name: 'vanilla extract', amount: '1/2 tsp' },
      { name: 'cinnamon', amount: '1/4 tsp' },
      { name: 'butter', amount: '1 tbsp, for cooking' },
      { name: 'maple syrup', amount: 'for serving' },
    ],
    instructions: [
      'In a bowl, mash the banana with a fork.',
      'Add eggs, milk, and vanilla extract. Mix well.',
      'In another bowl, combine flour, baking powder, and cinnamon.',
      'Add wet ingredients to dry ingredients and mix until just combined.',
      'Heat a non-stick skillet over medium heat and melt butter.',
      'Pour 1/4 cup of batter for each pancake.',
      'Cook until bubbles form on surface, then flip and cook until golden.',
      'Serve warm with maple syrup.'
    ]
  }
];
