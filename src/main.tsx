import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { HowItWorks } from './pages/HowItWorks'
import { Styles } from './pages/Styles'
import { ProSettings } from './pages/ProSettings'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative overflow-hidden">
        {/* Background ambient gradients shared across all pages */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-20 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-[100px] rounded-full mix-blend-screen" />
        </div>
        
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/styles" element={<Styles />} />
          <Route path="/pro-settings" element={<ProSettings />} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
)
