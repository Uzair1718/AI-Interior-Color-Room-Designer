import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Sparkles, AlertCircle, CheckCircle2, Image as ImageIcon, Loader2, ArrowLeftRight } from 'lucide-react';

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
  const [sliderPos, setSliderPos] = useState(50);

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
        setRedesignedImage(data.urls[0]);
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
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full relative"
    >
      {/* Premium Dashboard Layout */}
      <div className="flex items-center justify-between mb-12 border-b border-border/50 pb-6">
         <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Your Architecture Palette</h2>
            <p className="text-muted-foreground mt-1">AI-driven analysis complete.</p>
         </div>
         <button 
            onClick={onReset}
            className="px-6 py-2.5 bg-card border border-border/60 text-foreground rounded-full hover:bg-secondary/10 hover:text-secondary hover:border-secondary transition-all font-medium text-sm flex items-center gap-2 shadow-sm"
          >
            Start New Room
            <Sparkles className="w-4 h-4" />
          </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: Visuals */}
        <div className="xl:col-span-7 flex flex-col gap-8">
           <motion.div variants={item} className="bg-card/40 backdrop-blur-3xl rounded-[2rem] border border-border/50 p-2 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              
              {!redesignedImage ? (
                <div className="relative rounded-[1.8rem] overflow-hidden bg-black/20 aspect-video">
                  <img src={imageSrc} alt="Original Room" className="w-full h-full object-cover opacity-90 transition-opacity" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-xs font-semibold text-white/90">
                     Original Capture
                  </div>
                </div>
              ) : (
                <div className="relative rounded-[1.8rem] overflow-hidden bg-black/20 aspect-video select-none touch-none"
                     onMouseMove={(e) => {
                       const rect = e.currentTarget.getBoundingClientRect();
                       const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                       setSliderPos((x / rect.width) * 100);
                     }}
                     onTouchMove={(e) => {
                       const rect = e.currentTarget.getBoundingClientRect();
                       const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
                       setSliderPos((x / rect.width) * 100);
                     }}>
                  
                  {/* Underneath: Original */}
                  <img src={imageSrc} alt="Original Room" className="absolute inset-0 w-full h-full object-cover" />
                  
                  {/* Overlaid: AI Redesign with clip-path */}
                  <img 
                    src={redesignedImage} 
                    alt="AI Redesigned Room" 
                    className="absolute inset-0 w-full h-full object-cover" 
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                  />

                  {/* Slider Line */}
                  <div className="absolute inset-y-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize flex items-center justify-center -ml-0.5" style={{ left: `${sliderPos}%` }}>
                     <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg border border-gray-200 pointer-events-none">
                       <ArrowLeftRight className="w-4 h-4" />
                     </div>
                  </div>

                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-xs font-semibold text-white/90">
                     After Redesign
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-xs font-semibold text-white/90">
                     Before
                  </div>
                </div>
              )}
           </motion.div>

           <AnimatePresence>
            {isRedesigning && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-card/50 backdrop-blur-xl border border-primary/20 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary/5"></div>
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse blur-2xl"></div>
                    <Loader2 className="w-10 h-10 text-primary animate-spin relative z-10" />
                  </div>
                  <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Generating AI Render...</h3>
                  <p className="text-muted-foreground text-sm mt-3">Synthesizing lighting, geometry, and your chosen palette into a hyper-realistic preview.</p>
                </motion.div>
            )}
           </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Data */}
        <div className="xl:col-span-5 space-y-6">
          <motion.div variants={item} className="grid grid-cols-2 gap-4">
              <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-5 shadow-lg">
                 <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Architecture</p>
                 <p className="font-medium text-foreground capitalize text-lg">{analysis.room_type}</p>
                 <p className="text-sm text-primary font-medium mt-1 uppercase tracking-wider text-[10px]">{analysis.design_style_detected}</p>
              </div>
              <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-5 shadow-lg">
                 <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">Lighting</p>
                 <p className="font-medium text-foreground text-base leading-snug">{analysis.lighting}</p>
              </div>
          </motion.div>

          <motion.div variants={item} className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-3xl p-6 shadow-lg">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              AI Directives & Layout
            </h4>
            <ul className="space-y-3">
              {analysis.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
                  <span className="text-sm text-foreground/90 leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={item} className="bg-[#1A1523]/40 border border-destructive/20 rounded-3xl p-6 shadow-lg backdrop-blur-xl">
             <h4 className="text-sm font-semibold uppercase tracking-wider text-destructive mb-3 flex items-center gap-2">
               <AlertCircle className="w-4 h-4" />
               Identified Contradictions
             </h4>
             <ul className="space-y-2">
               {analysis.issues.map((issue, idx) => (
                 <li key={idx} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                   <span className="text-destructive/60">-</span> {issue}
                 </li>
               ))}
             </ul>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM STRIP: Palettes */}
      <motion.div variants={item} className="mt-16">
        <div className="flex items-center gap-4 mb-8">
           <h2 className="text-2xl font-bold">Curated Color Profiles</h2>
           <div className="h-px bg-border flex-1"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analysis.suggested_palettes.map((palette, pIdx) => (
            <div key={pIdx} className="bg-card/60 backdrop-blur-2xl flex flex-col p-8 rounded-[2rem] border border-border/60 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(250,89,105,0.05)] transition-all duration-300 group">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-foreground tracking-tight">{palette.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground/90 mb-8 line-clamp-2 min-h-[40px] leading-relaxed font-light">{palette.description}</p>
              
              <div className="flex gap-2 h-24 mb-8 rounded-2xl overflow-hidden shadow-inner p-1 bg-background/50 border border-border/30">
                {palette.colors.map((color, cIdx) => (
                  <div 
                    key={cIdx} 
                    className="flex-1 rounded-xl relative group/color cursor-pointer transition-all duration-300 hover:flex-[1.8] shadow-sm border border-black/10"
                    style={{ backgroundColor: color }}
                    onClick={() => handleCopy(color)}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover/color:bg-black/20 flex flex-col items-center justify-center opacity-0 group-hover/color:opacity-100 transition-all rounded-xl">
                      <Copy className="w-4 h-4 text-white mb-1 drop-shadow-md" />
                      <span className="text-[10px] font-mono text-white/90 drop-shadow-md uppercase">{color}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => handleRedesign(palette.name)}
                disabled={isRedesigning}
                className="mt-auto w-full py-3.5 bg-background border border-border/80 rounded-xl text-sm font-semibold hover:bg-foreground hover:text-background transition-all flex items-center justify-center gap-2 group-hover:border-primary/30"
              >
                <ImageIcon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                Render in {palette.name}
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
