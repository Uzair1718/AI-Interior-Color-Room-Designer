import { motion } from 'framer-motion';
import { Camera, Brain, Palette, Sparkles } from 'lucide-react';

export const HowItWorks = () => {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10 w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">How LuminaDesign Works</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Transforming your space is easier than ever with our 3-step AI process.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card/40 backdrop-blur-xl border border-border/40 p-8 rounded-[2rem] shadow-xl text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3">1. Capture Space</h3>
          <p className="text-muted-foreground text-sm">Upload a photo or use your camera to scan any room in your home.</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card/40 backdrop-blur-xl border border-border/40 p-8 rounded-[2rem] shadow-xl text-center">
          <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Brain className="w-8 h-8 text-secondary" />
          </div>
          <h3 className="text-xl font-bold mb-3">2. AI Analysis</h3>
          <p className="text-muted-foreground text-sm">Our Gemini Vision models extract lighting, layout, and architectural details.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card/40 backdrop-blur-xl border border-border/40 p-8 rounded-[2rem] shadow-xl text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Palette className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3">3. Generate & Apply</h3>
          <p className="text-muted-foreground text-sm">Instantly render new color palettes and view AI redesign combinations.</p>
        </motion.div>
      </div>

      <div className="mt-20 flex justify-center">
        <button className="flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full hover:bg-foreground/90 transition-all font-bold text-lg active:scale-95 shadow-2xl">
          <Sparkles className="w-5 h-5" />
          Try it on your room
        </button>
      </div>
    </main>
  );
};
