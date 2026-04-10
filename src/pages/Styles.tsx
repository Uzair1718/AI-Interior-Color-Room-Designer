import { motion } from 'framer-motion';

const styles = [
  { name: "Minimalist", color: "bg-gray-100 dark:bg-gray-800", desc: "Clean lines, uncluttered, and stripped to essentials." },
  { name: "Modern Luxury", color: "bg-amber-100 dark:bg-amber-900/30", desc: "Premium materials with bold, structural contrast." },
  { name: "Bohemian", color: "bg-orange-100 dark:bg-orange-900/30", desc: "Earthy, expressive, and richly textured designs." },
  { name: "Industrial", color: "bg-zinc-200 dark:bg-zinc-800", desc: "Raw elements like exposed brick and metal fixtures." },
  { name: "Coastal", color: "bg-blue-100 dark:bg-blue-900/30", desc: "Breezy, light, and deeply inspired by the ocean." },
  { name: "Scandinavian", color: "bg-stone-100 dark:bg-stone-800", desc: "Functional, bright, wood-focused simplicity." },
];

export const Styles = () => {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10 w-full">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Explore Aesthetics</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">LuminaDesign algorithmically supports hundreds of interior aesthetics. Here are our featured styles.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {styles.map((style, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="group cursor-pointer bg-card/40 backdrop-blur-xl border border-border/40 p-6 rounded-[2rem] shadow-lg hover:shadow-2xl hover:border-primary/40 transition-all duration-300"
          >
            <div className={`w-full h-40 rounded-2xl mb-6 ${style.color} border border-border/50 group-hover:scale-[1.02] transition-transform`}></div>
            <h3 className="text-2xl font-bold mb-2">{style.name}</h3>
            <p className="text-muted-foreground text-sm">{style.desc}</p>
          </motion.div>
        ))}
      </div>
    </main>
  );
};
