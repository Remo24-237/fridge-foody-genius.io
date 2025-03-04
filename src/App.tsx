
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import Index from "./pages/Index";
import Favorites from "./pages/Favorites";
import RecipeDetail from "./pages/RecipeDetail";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

// Initialize Capacitor if available
const initCapacitor = async () => {
  // Using a safer check for Capacitor existence
  if (typeof (window as any).Capacitor !== 'undefined') {
    try {
      const { StatusBar, Style } = await import('@capacitor/status-bar');
      StatusBar.setStyle({ style: Style.Light });
    } catch (e) {
      console.log('Status bar plugin not available', e);
    }
  }
};

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    initCapacitor();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <FavoritesProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="mobile-safe-area">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </FavoritesProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
