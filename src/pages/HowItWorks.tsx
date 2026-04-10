import { motion } from 'framer-motion';
import { Camera, Brain, Palette, Sparkles, Layers, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorks = () => {
  return (
    <main className="w-full pb-24">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 pt-40 pb-20 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">The AI Engine Inside.</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Understand how our proprietary multi-modal Gemini integration handles image recognition, lighting mapping, and dynamic visual reconstruction.
          </p>
        </motion.div>
      </section>

      {/* Detailed Steps */}
      <section className="max-w-5xl mx-auto px-6 space-y-32">
        
        {/* Step 1 */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row items-center gap-16">
           <div className="flex-1">
              <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mb-6">
                 <Camera className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-4">1. Environment Digitization</h3>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                 When you upload an image or scan with your live camera, LuminaDesign securely processes the pixel data, balancing shadows, highlights, and contrast dynamically to prepare it for neural ingestion.
              </p>
              <ul className="space-y-3">
                 <li className="flex items-center gap-3 text-sm font-medium"><Sparkles className="w-4 h-4 text-primary" /> Automatic Lens Distortion Correction</li>
                 <li className="flex items-center gap-3 text-sm font-medium"><Sparkles className="w-4 h-4 text-primary" /> Multi-resolution Downsampling</li>
              </ul>
           </div>
           <div className="flex-1 w-full bg-card/50 border border-border/50 rounded-[2rem] aspect-square p-8 shadow-2xl relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
              <div className="w-3/4 h-3/4 bg-black/40 rounded-2xl border border-white/10 backdrop-blur-sm flex items-center justify-center relative shadow-2xl">
                 <div className="absolute inset-x-0 top-1/2 h-0.5 bg-primary/50 animate-[scan_2s_ease-in-out_infinite] shadow-[0_0_20px_rgba(250,89,105,0.8)]"></div>
                 <Layers className="w-20 h-20 text-white/20" />
              </div>
           </div>
        </motion.div>

        {/* Step 2 */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row-reverse items-center gap-16">
           <div className="flex-1">
              <div className="w-16 h-16 bg-secondary/10 border border-secondary/20 rounded-2xl flex items-center justify-center mb-6">
                 <Brain className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-3xl font-bold mb-4">2. Gemini Neural Analysis</h3>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                 The digitized image is sent to our serverless backend where Gemini 2.5 Pro analyzes the room's core architecture, structural integrity, and current color palette.
              </p>
              <div className="p-4 bg-black/40 border border-border/50 rounded-xl font-mono text-xs text-primary/80 mb-6">
                 {`{\n  "analysis": {\n    "architecture": "Minimalist Loft",\n    "lighting_score": 0.85,\n    "detected_colors": ["#1A1A1A", "#F3F4F6"]\n  }\n}`}
              </div>
           </div>
           <div className="flex-1 w-full bg-card/50 border border-border/50 rounded-[2rem] aspect-square p-8 shadow-2xl relative flex items-center justify-center">
              <div className="w-full grid grid-cols-2 gap-4">
                 <div className="h-24 bg-border/40 rounded-xl animate-pulse delay-75"></div>
                 <div className="h-24 bg-border/40 rounded-xl animate-pulse delay-150"></div>
                 <div className="h-24 bg-border/40 rounded-xl animate-pulse delay-200"></div>
                 <div className="h-24 bg-border/40 rounded-xl animate-pulse delay-300"></div>
              </div>
           </div>
        </motion.div>

        {/* Step 3 */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row items-center gap-16">
           <div className="flex-1">
              <div className="w-16 h-16 bg-pink-500/10 border border-pink-500/20 rounded-2xl flex items-center justify-center mb-6">
                 <Palette className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-3xl font-bold mb-4">3. Generative Rendering</h3>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                 Based on the analysis, we generate highly accurate hex palettes and allow you to request a completely rendered visual alteration maintaining room boundaries.
              </p>
              <ul className="space-y-3">
                 <li className="flex items-center gap-3 text-sm font-medium"><RefreshCw className="w-4 h-4 text-pink-500" /> Image-to-Image Pipeline</li>
                 <li className="flex items-center gap-3 text-sm font-medium"><RefreshCw className="w-4 h-4 text-pink-500" /> Pre-computed CSS Variables</li>
              </ul>
           </div>
           <div className="flex-1 w-full bg-card/50 border border-border/50 rounded-[2rem] aspect-square shadow-2xl p-6">
              <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[1.5rem] opacity-80 mix-blend-overlay hover:opacity-100 transition-opacity"></div>
           </div>
        </motion.div>

      </section>

      {/* Footer CTA */}
      <div className="mt-32 text-center">
        <Link to="/" className="inline-flex items-center gap-2 bg-foreground text-background px-10 py-5 rounded-full hover:bg-foreground/90 transition-all font-bold text-xl active:scale-95 shadow-2xl">
          <Sparkles className="w-6 h-6" />
          Test the Engine Now
        </Link>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0%, 100% { top: 10%; }
          50% { top: 90%; }
        }
      `}} />
    </main>
  );
};
