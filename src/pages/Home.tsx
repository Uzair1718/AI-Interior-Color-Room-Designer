import { useState, useEffect } from 'react';
import { CameraCapture } from '@/components/CameraCapture';
import { ResultsDashboard } from '@/components/ResultsDashboard';
import type { AnalysisResult } from '@/components/ResultsDashboard';
import { Sparkles, Loader2, Zap, Palette, Brush, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Home = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Analyzing your room...');

  useEffect(() => {
    if (!isLoading) return;
    const texts = [
      'Scanning architectural layout...',
      'Analyzing lighting and style...',
      'Curating elegant color palettes...',
      'Finalizing design recommendations...',
    ];
    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % texts.length;
      setLoadingText(texts[step]);
    }, 2500);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleCapture = async (src: string) => {
    setImageSrc(src);
    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/analyze_room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: src }),
      });

      if (!response.ok) throw new Error('Failed to analyze image');
      
      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error(error);
      alert('Error analyzing room. Please try again.');
      setImageSrc(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setImageSrc(null);
    setAnalysis(null);
  };

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-16 relative z-10 min-h-[90vh] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!imageSrc && !isLoading && (
            <motion.div 
              key="hero"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 shadow-sm">
                <Sparkles className="w-4 h-4" />
                <span>Next-Gen AI Interior Intelligence</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
                Design Your Room <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-600 to-secondary animate-gradient-x">
                  With Precision AI.
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-16 leading-relaxed font-light">
                Instantly visualize perfect color schemes, architectural styles, and hyper-realistic aesthetic upgrades directly inside your browser. No software required.
              </p>
              
              <div className="relative max-w-3xl mx-auto mb-20 z-20">
                 <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[2.5rem] blur-xl opacity-20 pointer-events-none"></div>
                 <div className="relative">
                   <CameraCapture onCapture={handleCapture} />
                 </div>
              </div>

              {/* Transformation Demonstration */}
              <div className="max-w-5xl mx-auto mt-24 mb-10 opacity-90 relative z-10">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">What You Can Expect</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Before Image */}
                  <div className="relative rounded-[2rem] overflow-hidden aspect-video shadow-2xl border border-white/10 group cursor-pointer">
                    <img src="/demo-before.png" alt="Original Room" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-xs font-semibold text-white/90 shadow-lg">
                      Before: Standard Room
                    </div>
                  </div>
                  {/* After Image */}
                  <div className="relative rounded-[2rem] overflow-hidden aspect-video shadow-[0_0_50px_rgba(250,89,105,0.15)] border border-primary/30 group cursor-pointer">
                    <img src="/demo-after.png" alt="AI Redesigned Room" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-primary/80 backdrop-blur-md rounded-full border border-white/20 text-xs font-bold text-white shadow-lg flex items-center gap-2">
                       <Sparkles className="w-3 h-3" />
                       After: AI Luxury Rendering
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-center gap-4">
                  <div className="h-px bg-border/60 flex-1"></div>
                  <p className="text-sm text-muted-foreground italic px-4">Actual result mapped dynamically using generative architectural preservation.</p>
                  <div className="h-px bg-border/60 flex-1"></div>
                </div>
              </div>
            </motion.div>
          )}

          {isLoading && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex flex-col items-center justify-center py-40 max-w-lg mx-auto w-full"
            >
              <div className="relative mb-12">
                <div className="absolute inset-0 bg-primary/30 blur-[40px] rounded-full animate-pulse"></div>
                <Loader2 className="w-20 h-20 text-primary animate-spin relative z-10" />
              </div>
              <AnimatePresence mode="wait">
                <motion.h3 key={loadingText} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-2xl font-semibold mb-8 text-center text-foreground">
                  {loadingText}
                </motion.h3>
              </AnimatePresence>
              <div className="w-full bg-border rounded-full h-1.5 mb-4 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full animate-[progress_2s_ease-in-out_infinite]" style={{ width: '50%' }}></div>
              </div>
            </motion.div>
          )}

          {imageSrc && analysis && !isLoading && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
               <ResultsDashboard imageSrc={imageSrc} analysis={analysis} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Feature Grid / Marketing Section (Only show if not analyzing) */}
      {!imageSrc && !isLoading && (
        <>
          <section className="py-24 bg-card/10 border-t border-border/40 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h3 className="text-3xl font-bold mb-4">Enterprise-Grade Design Tools</h3>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Utilized by architecture firms and interior designers to rapidly prototype concepts.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: <Zap className="w-8 h-8 text-secondary" />, title: "Lightning Fast Render", desc: "Our clustered GPU architecture returns photorealistic generated designs in under 4 seconds." },
                  { icon: <Palette className="w-8 h-8 text-primary" />, title: "Precision Hex Tracking", desc: "Instantly copy exact manufacturer hex codes from the mathematically extracted color palettes." },
                  { icon: <Brush className="w-8 h-8 text-pink-500" />, title: "Style Preservation", desc: "AI intelligently maps to your existing structural boundaries seamlessly, retaining windows and doors." }
                ].map((feat, i) => (
                  <div key={i} className="bg-card/40 border border-border/50 p-8 rounded-[2rem] hover:shadow-xl transition-all">
                    <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center mb-6 shadow-sm">{feat.icon}</div>
                    <h4 className="text-xl font-bold mb-3">{feat.title}</h4>
                    <p className="text-muted-foreground">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Social Proof */}
          <section className="py-24 max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-2xl font-semibold mb-12">Powering Over 50,000+ Room Transformations</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['Vogue Living', 'Architectural Digest', 'Dwell', 'Elle Decor'].map((brand, i) => (
                <div key={i} className="px-8 py-4 bg-card/30 border border-border/80 rounded-xl text-lg font-bold opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer">
                  {brand}
                </div>
              ))}
            </div>
          </section>

          {/* Simple Footer */}
          <footer className="border-t border-border/40 py-12 px-6 text-center text-muted-foreground bg-card/10">
             <div className="flex items-center justify-center gap-2 mb-4">
               <img src="/logo.png" className="w-6 h-6 rounded-md grayscale" />
               <span className="font-bold tracking-tight">LuminaDesign Inc.</span>
             </div>
             <p className="text-sm">© 2026 LuminaDesign. All rights reserved. Designed with AI.</p>
          </footer>
        </>
      )}
    </main>
  );
};
