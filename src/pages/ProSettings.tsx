import { Settings, Sliders, Zap, Lock } from 'lucide-react';

export const ProSettings = () => {
  return (
    <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 relative z-10 w-full">
      <div className="mb-12">
        <h2 className="text-4xl font-extrabold tracking-tight mb-4 flex items-center gap-3">
          <Settings className="w-10 h-10 text-primary" />
          Pro Settings
        </h2>
        <p className="text-xl text-muted-foreground">Advanced rendering controls for LuminaDesign Pro members.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-card/40 backdrop-blur-xl border border-border/40 p-8 rounded-[2rem] shadow-lg flex items-start gap-6">
          <div className="p-4 bg-primary/10 rounded-2xl">
            <Sliders className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Lighting Intensity Control</h3>
            <p className="text-muted-foreground text-sm mb-4">Adjust the virtual ambient light exposure before passing the image to the AI render engine.</p>
            <div className="h-2 bg-border rounded-full overflow-hidden w-full max-w-sm">
              <div className="h-full bg-primary/40 w-1/3"></div>
            </div>
            <p className="text-xs text-primary mt-3 font-semibold uppercase tracking-wider flex items-center gap-1"><Lock className="w-3 h-3" /> Requires Pro</p>
          </div>
        </div>

        <div className="bg-card/40 backdrop-blur-xl border border-border/40 p-8 rounded-[2rem] shadow-lg flex items-start gap-6">
          <div className="p-4 bg-secondary/10 rounded-2xl">
            <Zap className="w-8 h-8 text-secondary" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">High-Fidelity Rendering (4K)</h3>
            <p className="text-muted-foreground text-sm mb-4">Bypass standard generation algorithms and use our ultra-realistic compute clusters.</p>
            <button className="px-4 py-2 bg-secondary/20 text-secondary rounded-lg text-sm font-bold opacity-50 cursor-not-allowed">Enable 4K Mode</button>
            <p className="text-xs text-secondary mt-3 font-semibold uppercase tracking-wider flex items-center gap-1"><Lock className="w-3 h-3" /> Requires Pro</p>
          </div>
        </div>
      </div>
    </main>
  );
};
