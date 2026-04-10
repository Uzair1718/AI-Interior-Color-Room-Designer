import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Check } from 'lucide-react';

const categories = ["All", "Modern", "Vintage", "Eclectic"];

const styles = [
  { name: "Minimalist", category: "Modern", color: "bg-gray-100 dark:bg-gray-800", desc: "Clean lines, uncluttered, and stripped to essentials." },
  { name: "Modern Luxury", category: "Modern", color: "bg-amber-100 dark:bg-amber-900/30", desc: "Premium materials with bold, structural contrast." },
  { name: "Mid-Century Modern", category: "Vintage", color: "bg-orange-100 dark:bg-orange-900/40", desc: "Retro vibes, organic shapes, and functional designs." },
  { name: "Bohemian", category: "Eclectic", color: "bg-orange-100 dark:bg-orange-900/20", desc: "Earthy, expressive, and richly textured designs." },
  { name: "Industrial", category: "Modern", color: "bg-zinc-200 dark:bg-zinc-800", desc: "Raw elements like exposed brick and metal fixtures." },
  { name: "Coastal", category: "Modern", color: "bg-blue-100 dark:bg-blue-900/30", desc: "Breezy, light, and deeply inspired by the ocean." },
  { name: "Art Deco", category: "Vintage", color: "bg-emerald-100 dark:bg-emerald-900/30", desc: "Bold geometry, rich colors, and decadent detail work." },
  { name: "Maximalism", category: "Eclectic", color: "bg-purple-100 dark:bg-purple-900/30", desc: "More is more. Bold colors, layered patterns, unique art." },
  { name: "Scandinavian", category: "Modern", color: "bg-stone-100 dark:bg-stone-800", desc: "Functional, bright, wood-focused simplicity." },
];

export const Styles = () => {
  const [filter, setFilter] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const filteredStyles = styles.filter(s => filter === "All" || s.category === filter);

  return (
    <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10 w-full min-h-screen">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Explore Aesthetics</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">LuminaDesign algorithmically supports hundreds of interior aesthetics mapping perfectly to human design intuition.</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
        <div className="flex items-center gap-2 text-muted-foreground mr-4">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-semibold uppercase tracking-wider">Filter:</span>
        </div>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
              filter === cat 
                ? 'bg-primary text-background shadow-lg shadow-primary/20 scale-105' 
                : 'bg-card/50 border border-border/50 text-muted-foreground hover:bg-card hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredStyles.map((style) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              key={style.name} 
              onClick={() => setSelectedStyle(style.name)}
              className={`group cursor-pointer bg-card/40 backdrop-blur-xl border p-6 rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden ${
                selectedStyle === style.name ? 'border-primary ring-1 ring-primary' : 'border-border/40 hover:border-primary/40'
              }`}
            >
              {selectedStyle === style.name && (
                <div className="absolute top-4 right-4 bg-primary text-background p-1.5 rounded-full z-10 shadow-lg">
                  <Check className="w-4 h-4" />
                </div>
              )}
              <div className={`w-full h-40 rounded-2xl mb-6 ${style.color} border border-border/50 group-hover:scale-[1.02] transition-transform`}></div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold">{style.name}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold bg-secondary/10 text-secondary">{style.category}</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{style.desc}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </main>
  );
};
