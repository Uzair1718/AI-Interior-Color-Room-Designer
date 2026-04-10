import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 inset-x-0 border-b border-border/40 bg-background/60 backdrop-blur-xl z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="LuminaDesign" className="w-10 h-10 rounded-xl shadow-[0_0_20px_rgba(250,89,105,0.2)]" />
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Lumina<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Design</span>
          </h1>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link to="/how-it-works" className={`transition-colors ${location.pathname === '/how-it-works' ? 'text-primary' : 'hover:text-foreground'}`}>How it works</Link>
          <Link to="/styles" className={`transition-colors ${location.pathname === '/styles' ? 'text-primary' : 'hover:text-foreground'}`}>Styles</Link>
          <Link to="/pro-settings" className={`transition-colors ${location.pathname === '/pro-settings' ? 'text-primary' : 'hover:text-foreground'}`}>Pro Settings</Link>
          <Link to="/" className="flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-full hover:bg-foreground/90 transition-all font-semibold active:scale-95 shadow-lg shadow-black/10">
            Start Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
};
