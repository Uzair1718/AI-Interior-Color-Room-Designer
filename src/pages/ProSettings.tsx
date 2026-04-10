import { useState } from 'react';
import { Settings, Sliders, Zap, Lock, Save, Moon, Sun, Monitor, AlertCircle } from 'lucide-react';

export const ProSettings = () => {
  const [intensity, setIntensity] = useState(50);
  const [is4K, setIs4K] = useState(false);
  const [theme, setTheme] = useState('System');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1500);
  };

  return (
    <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 relative z-10 w-full min-h-screen">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4 flex items-center gap-3">
            <Settings className="w-10 h-10 text-primary" />
            Workspace Preferences
          </h2>
          <p className="text-xl text-muted-foreground">Configure your rendering parameters and studio interface.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full hover:bg-foreground/90 transition-all font-bold disabled:opacity-50"
        >
          {isSaving ? <span className="animate-pulse">Saving...</span> : saved ? <span className="text-green-500 flex items-center gap-1"><Check className="w-4 h-4"/> Saved</span> : <><Save className="w-4 h-4" /> Save Config</>}
        </button>
      </div>

      <div className="space-y-8">
        
        {/* Render Engine Configuration */}
        <div className="bg-card/40 backdrop-blur-xl border border-border/40 p-8 rounded-[2rem] shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Zap className="w-40 h-40" />
          </div>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-border/30 pb-4">
            <Sliders className="w-5 h-5 text-primary" /> 
            AI Render Engine
          </h3>
          
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-2">
                <label className="font-semibold text-sm">Ambient Lighting Intensity</label>
                <span className="text-sm font-mono text-muted-foreground">{intensity}%</span>
              </div>
              <p className="text-muted-foreground text-xs mb-4">Adjust the virtual ambient light exposure before passing the image to the AI render engine.</p>
              <input 
                type="range" 
                min="0" max="100" 
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-border rounded-full appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground uppercase font-bold mt-2">
                <span>Dark / Moody</span>
                <span>Overexposed / Bright</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-border/50">
              <div>
                <h4 className="font-bold text-sm">High-Fidelity Rendering (4K)</h4>
                <p className="text-muted-foreground text-xs mt-1">Bypass standard generation algorithms and use our ultra-realistic compute clusters.</p>
              </div>
              <button 
                onClick={() => setIs4K(!is4K)}
                className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 ${is4K ? 'bg-primary' : 'bg-muted'}`}
              >
                <span className={`w-6 h-6 bg-white rounded-full transition-all shadow-md ${is4K ? 'translate-x-6' : 'translate-x-0'}`}></span>
              </button>
            </div>
            {is4K && (
              <div className="flex items-start gap-3 p-4 border border-secondary/30 bg-secondary/10 text-secondary rounded-xl text-sm font-medium">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>4K Rendering is extremely compute-intensive. Generation time will increase by approximately 15-20 seconds per request.</p>
              </div>
            )}
          </div>
        </div>

        {/* UI Theme */}
        <div className="bg-card/40 backdrop-blur-xl border border-border/40 p-8 rounded-[2rem] shadow-lg">
           <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-border/30 pb-4">
            <Monitor className="w-5 h-5 text-primary" /> 
            Studio Interface
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Light', icon: <Sun className="w-5 h-5" /> },
              { name: 'Dark', icon: <Moon className="w-5 h-5" /> },
              { name: 'System', icon: <Monitor className="w-5 h-5" /> }
            ].map(t => (
              <button 
                key={t.name}
                onClick={() => setTheme(t.name)}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all ${
                  theme === t.name ? 'border-primary bg-primary/10 text-primary' : 'border-border/50 hover:bg-card/80 text-muted-foreground'
                }`}
              >
                {t.icon}
                <span className="font-bold text-sm tracking-wide">{t.name}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
};

// Hack for the missing Check icon in the exact scope above without making another block
function Check({className}:any) { return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>; }
