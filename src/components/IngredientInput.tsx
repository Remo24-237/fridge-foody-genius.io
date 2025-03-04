
import { useState, useRef, useEffect } from 'react';
import { Search, X, Plus } from 'lucide-react';

type IngredientInputProps = {
  onAddIngredient: (ingredient: string) => void;
  onRemoveIngredient: (ingredient: string) => void;
  ingredients: string[];
};

const IngredientInput = ({ onAddIngredient, onRemoveIngredient, ingredients }: IngredientInputProps) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    
    if (trimmedInput && !ingredients.includes(trimmedInput.toLowerCase())) {
      onAddIngredient(trimmedInput.toLowerCase());
      setInput('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '/' && e.ctrlKey) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <form onSubmit={handleSubmit} className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add ingredients from your fridge..."
            className="w-full pl-12 pr-12 py-4 rounded-full border border-border bg-white shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            aria-label="Add ingredient"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors"
            aria-label="Add ingredient"
            disabled={!input.trim()}
          >
            <Plus size={20} />
          </button>
        </form>
        
        <div className="mt-3 text-xs text-muted-foreground">
          Press <kbd className="px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground font-mono">Ctrl + /</kbd> to quickly add ingredients
        </div>
      </div>
      
      {ingredients.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Your ingredients:</h3>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient) => (
              <span
                key={ingredient}
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-secondary text-foreground animate-fade-in"
              >
                {ingredient}
                <button
                  onClick={() => onRemoveIngredient(ingredient)}
                  className="ml-2 text-muted-foreground hover:text-destructive transition-colors"
                  aria-label={`Remove ${ingredient}`}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientInput;
