import { useState, useEffect } from 'react';
import { CameraCapture } from '@/components/CameraCapture';
import { ResultsDashboard } from '@/components/ResultsDashboard';
import type { AnalysisResult } from '@/components/ResultsDashboard';
import { Sparkles, Loader2 } from 'lucide-react';
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
    <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10 w-full">
      <AnimatePresence mode="wait">
        {!imageSrc && !isLoading && (
          <motion.div 
            key="hero"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center py-12 lg:py-24"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 shadow-[0_0_20px_rgba(250,89,105,0.1)]">
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
              Instantly visualize perfect color schemes, architectural styles, and hyper-realistic aesthetic upgrades completely powered by intelligent automation.
            </p>
            
            <div className="relative max-w-3xl mx-auto">
               <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
               <div className="relative">
                 <CameraCapture onCapture={handleCapture} />
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
              <motion.h3 
                key={loadingText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-2xl font-semibold mb-8 text-center text-foreground"
              >
                {loadingText}
              </motion.h3>
            </AnimatePresence>

            <div className="w-full bg-border rounded-full h-1.5 mb-4 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full animate-[progress_2s_ease-in-out_infinite]" style={{ width: '50%' }}></div>
            </div>
          </motion.div>
        )}

        {imageSrc && analysis && !isLoading && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
  );
};
