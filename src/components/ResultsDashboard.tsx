import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Sparkles, AlertCircle, CheckCircle2, Image as ImageIcon, Loader2 } from 'lucide-react';

interface Palette {
  name: string;
  colors: string[];
  description: string;
}

export interface AnalysisResult {
  room_type: string;
  lighting: string;
  current_colors: string[];
  furniture_style: string;
  design_style_detected: string;
  issues: string[];
  suggested_palettes: Palette[];
  recommendations: string[];
}

interface ResultsDashboardProps {
  imageSrc: string;
  analysis: AnalysisResult;
  onReset: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ imageSrc, analysis, onReset }) => {
  const [isRedesigning, setIsRedesigning] = useState(false);
  const [redesignedImage, setRedesignedImage] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
  };

  const handleRedesign = async (paletteName: string) => {
    setIsRedesigning(true);
    setRedesignedImage(null);
    try {
      const response = await fetch('/.netlify/functions/redesign_room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imageSrc,
          style: analysis.design_style_detected,
          palette: paletteName,
        })
      });
      const data = await response.json();
      if (data.urls && data.urls.length > 0) {
        setRedesignedImage(data.urls[0]); // using the first mocked/generated URL
      }
    } catch (e) {
      console.error(e);
      alert('Failed to generate redesign.');
    } finally {
      setIsRedesigning(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-6xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      <div className="lg:col-span-1 space-y-6">
        <motion.div variants={item} className="bg-card rounded-2xl overflow-hidden border border-border shadow-lg">
          <img src={imageSrc} alt="Original Room" className="w-full h-auto object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Room Analysis
            </h3>
            <ul className="space-y-3 text-sm mt-4 text-muted-foreground">
              <li className="flex justify-between items-center bg-background px-4 py-2 rounded-lg">
                <span className="font-medium text-foreground">Room Type:</span> 
                <span className="capitalize">{analysis.room_type}</span>
              </li>
              <li className="flex justify-between items-center bg-background px-4 py-2 rounded-lg">
                <span className="font-medium text-foreground">Style Detected:</span> 
                <span className="capitalize">{analysis.design_style_detected}</span>
              </li>
              <li className="flex justify-between items-center bg-background px-4 py-2 rounded-lg">
                <span className="font-medium text-foreground">Lighting:</span> 
                <span>{analysis.lighting}</span>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-card p-6 rounded-2xl border border-border shadow-lg">
          <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-destructive" />
            Detected Issues
          </h4>
          <ul className="space-y-2">
            {analysis.issues.map((issue, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                {issue}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={item} className="bg-card p-6 rounded-2xl border border-border shadow-lg">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            Recommendations
          </h3>
          <ul className="space-y-3">
            {analysis.recommendations.map((rec, idx) => (
              <li key={idx} className="text-sm bg-background p-3 rounded-lg text-muted-foreground border border-border">
                {rec}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="lg:col-span-2 space-y-8">
        <motion.div variants={item}>
          <h2 className="text-2xl font-bold mb-6">Suggested Color Palettes & Redesign</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analysis.suggested_palettes.map((palette, pIdx) => (
              <div key={pIdx} className="bg-card flex flex-col p-6 rounded-2xl border border-border hover:border-primary/50 transition-colors shadow-lg group">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-foreground">{palette.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-2 min-h-[40px]">{palette.description}</p>
                <div className="flex gap-2 h-20 mb-6 rounded-xl overflow-hidden shadow-inner">
                  {palette.colors.map((color, cIdx) => (
                    <div 
                      key={cIdx} 
                      className="flex-1 relative group/color cursor-pointer transition-all hover:flex-[1.5]"
                      style={{ backgroundColor: color }}
                      onClick={() => handleCopy(color)}
                    >
                      <div className="absolute inset-0 bg-black/0 group-hover/color:bg-black/20 flex flex-col items-center justify-center opacity-0 group-hover/color:opacity-100 transition-all">
                        <Copy className="w-4 h-4 text-white mb-1 drop-shadow-md" />
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleRedesign(palette.name)}
                  disabled={isRedesigning}
                  className="mt-auto w-full py-3 bg-background border border-border rounded-xl text-sm font-medium hover:bg-secondary hover:text-secondary-foreground transition-colors flex items-center justify-center gap-2"
                >
                  <ImageIcon className="w-4 h-4" />
                  Redesign in this Style
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {isRedesigning && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-card border border-border rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-lg"
            >
              <div className="relative mb-6">
                 <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse blur-2xl"></div>
                 <Loader2 className="w-12 h-12 text-primary animate-spin relative z-10" />
              </div>
              <h3 className="text-xl font-bold">Generating AI Redesign...</h3>
              <p className="text-muted-foreground text-sm mt-2">Merging architecture with new color profiles</p>
            </motion.div>
          )}

          {redesignedImage && !isRedesigning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card p-2 rounded-2xl border border-border shadow-2xl"
            >
               <div className="relative group rounded-xl overflow-hidden">
                 <img src={redesignedImage} alt="AI Redesigned Room" className="w-full h-auto object-cover rounded-xl" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div className="text-white">
                      <span className="bg-primary px-3 py-1 text-xs font-bold uppercase rounded-full mb-2 inline-block shadow-md">
                         AI Generated Concept
                      </span>
                      <h4 className="text-xl font-bold mt-1">Stunning New Look</h4>
                    </div>
                 </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={item} className="flex justify-center pt-8">
          <button 
            onClick={onReset}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors font-medium shadow-lg shadow-primary/20"
          >
            Design Another Room
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
