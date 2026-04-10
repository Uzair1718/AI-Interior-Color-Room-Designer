import { useState } from 'react';
import { CameraCapture } from '@/components/CameraCapture';
import { ResultsDashboard } from '@/components/ResultsDashboard';
import type { AnalysisResult } from '@/components/ResultsDashboard';
import { Sparkles, Loader2, PaintBucket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCapture = async (src: string) => {
    setImageSrc(src);
    setIsLoading(true);

    try {
      // In development, you might be running netlify dev. 
      // Replace this with your actual Netlify function URL if different.
      const response = await fetch('/.netlify/functions/analyze_room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageBase64: src }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }

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
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(102,252,241,0.2)]">
              <PaintBucket className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Lumina<span className="text-primary">Design</span></h1>
              <p className="text-xs text-muted-foreground hidden sm:block">AI Interior & Color Architecture</p>
            </div>
          </div>
          <a href="#" className="hidden sm:flex text-sm text-textMain hover:text-primary transition-colors items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Try Pre-made Styles
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!imageSrc && !isLoading && (
            <motion.div 
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16"
            >
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                Redefine Your Space <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Intelligently.
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                Upload a photo of your room to receive bespoke color palettes, layout recommendations, and a complete design breakdown powered by advanced AI.
              </p>
              
              <CameraCapture onCapture={handleCapture} />
              
              <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <span className="text-2xl">📸</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">1. Snap & Upload</h3>
                  <p className="text-muted-foreground text-sm">Take a wide-angle shot of any room in your house.</p>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4 mx-auto">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">2. AI Analysis</h3>
                  <p className="text-muted-foreground text-sm">Our Gemini model extracts structural & lighting details instantly.</p>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">3. Curated Colors</h3>
                  <p className="text-muted-foreground text-sm">Receive architectural-grade color schemes tailored for the space.</p>
                </div>
              </div>
            </motion.div>
          )}

          {isLoading && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse blur-3xl"></div>
                <Loader2 className="w-16 h-16 text-primary animate-spin relative z-10" />
              </div>
              <h3 className="text-2xl font-semibold mt-8 mb-2">Analyzing Architecture & Lighting</h3>
              <p className="text-muted-foreground animate-pulse">Extracting color schemes and design patterns...</p>
            </motion.div>
          )}

          {imageSrc && analysis && !isLoading && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
               <ResultsDashboard 
                  imageSrc={imageSrc} 
                  analysis={analysis} 
                  onReset={handleReset} 
               />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
