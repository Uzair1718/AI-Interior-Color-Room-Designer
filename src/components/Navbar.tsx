import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 border-b border-border/40 bg-background/80 backdrop-blur-xl z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={handleLinkClick} className="flex items-center gap-3 relative z-50">
          <img src="/logo.png" alt="LuminaDesign" className="w-10 h-10 rounded-xl shadow-[0_0_20px_rgba(250,89,105,0.2)] bg-black" />
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Lumina<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Design</span>
          </h1>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link to="/how-it-works" className={`transition-colors ${location.pathname === '/how-it-works' ? 'text-primary' : 'hover:text-foreground'}`}>How it works</Link>
          <Link to="/styles" className={`transition-colors ${location.pathname === '/styles' ? 'text-primary' : 'hover:text-foreground'}`}>Styles</Link>
          <Link to="/pro-settings" className={`transition-colors ${location.pathname === '/pro-settings' ? 'text-primary' : 'hover:text-foreground'}`}>Pro Settings</Link>
          <Link to="/" className="flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-full hover:bg-foreground/90 transition-all font-semibold active:scale-95 shadow-lg shadow-black/10">
            Start Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>

        {/* Mobile Toggle Trigger */}
        <button 
          className="md:hidden relative z-50 p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-20 inset-x-0 bg-background/95 backdrop-blur-2xl border-b border-border/50 shadow-2xl flex flex-col p-6 space-y-6"
          >
            <Link onClick={handleLinkClick} to="/how-it-works" className={`text-lg font-semibold ${location.pathname === '/how-it-works' ? 'text-primary' : 'text-foreground'}`}>How it works</Link>
            <Link onClick={handleLinkClick} to="/styles" className={`text-lg font-semibold ${location.pathname === '/styles' ? 'text-primary' : 'text-foreground'}`}>Styles</Link>
            <Link onClick={handleLinkClick} to="/pro-settings" className={`text-lg font-semibold ${location.pathname === '/pro-settings' ? 'text-primary' : 'text-foreground'}`}>Pro Settings</Link>
            
            <div className="pt-4 border-t border-border/40">
              <Link onClick={handleLinkClick} to="/" className="flex items-center justify-center w-full gap-2 bg-foreground text-background px-6 py-4 rounded-xl font-bold active:scale-95 transition-all text-lg shadow-lg">
                Start Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
