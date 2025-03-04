
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Home, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-4 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-soft' : 'bg-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-display font-medium">Left<span className="text-primary">Overs</span></span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" isActive={isActive('/')} icon={<Home size={18} />} label="Home" />
          <NavLink to="/favorites" isActive={isActive('/favorites')} icon={<Heart size={18} />} label="Favorites" />
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center justify-center w-10 h-10 text-foreground"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg border-b border-border shadow-soft animate-fade-in">
          <nav className="container mx-auto py-6 px-6 flex flex-col space-y-6">
            <MobileNavLink to="/" isActive={isActive('/')} icon={<Home size={20} />} label="Home" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/favorites" isActive={isActive('/favorites')} icon={<Heart size={20} />} label="Favorites" onClick={() => setIsMenuOpen(false)} />
          </nav>
        </div>
      )}
    </header>
  );
};

// Desktop Nav Link Component
const NavLink = ({ to, isActive, icon, label }: { to: string; isActive: boolean; icon: React.ReactNode; label: string }) => (
  <Link 
    to={to} 
    className={`flex items-center transition-colors ${
      isActive ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
    }`}
  >
    <span className="mr-2">{icon}</span>
    <span className="link-hover">{label}</span>
  </Link>
);

// Mobile Nav Link Component
const MobileNavLink = ({ 
  to, 
  isActive, 
  icon, 
  label,
  onClick
}: { 
  to: string; 
  isActive: boolean; 
  icon: React.ReactNode; 
  label: string;
  onClick: () => void;
}) => (
  <Link 
    to={to} 
    className={`flex items-center py-2 px-4 rounded-md ${
      isActive ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-secondary'
    }`}
    onClick={onClick}
  >
    <span className="mr-3">{icon}</span>
    <span>{label}</span>
  </Link>
);

export default Header;
