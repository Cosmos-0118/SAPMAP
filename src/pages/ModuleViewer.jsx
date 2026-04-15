import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { modulesData } from '../data/modules';
import StepCard from '../components/StepCard';

export default function ModuleViewer() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const moduleData = modulesData[moduleId];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (!moduleData) {
      navigate('/');
    }
  }, [moduleData, navigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIndex, moduleData]);

  if (!moduleData) return null;

  const totalSteps = moduleData.steps.length;
  const currentStep = moduleData.steps[currentStepIndex];

  const goToNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(curr => curr + 1);
    }
  };

  const goToPrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(curr => curr - 1);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ 
        padding: '1.5rem', 
        borderBottom: '1px solid var(--color-border)',
        background: 'rgba(15, 17, 21, 0.8)',
        backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 10
      }}>
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s', height: '24px' }}>
              <Home size={20} style={{ display: 'block' }} /> 
              <span style={{ fontWeight: 500, lineHeight: 1, transform: 'translateY(1px)' }}>Home</span>
            </Link>
            <div style={{ width: '1px', height: '24px', background: 'var(--color-border)' }}></div>
            <h1 style={{ fontSize: '1.5rem', margin: 0, lineHeight: 1, display: 'flex', alignItems: 'center', height: '24px' }}>{moduleData.title}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div style={{ background: 'var(--color-bg-card)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-xl)', fontWeight: 600 }}>
              {currentStepIndex + 1} / {totalSteps}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container flex flex-col items-center justify-center" style={{ flexGrow: 1, padding: '4rem 1.5rem', position: 'relative' }}>
        
        {/* Navigation Buttons Helper */}
        <div style={{ position: 'absolute', top: '2rem', left: '1.5rem', right: '1.5rem', display: 'flex', justifyContent: 'space-between', zIndex: 0, opacity: 0.3, pointerEvents: 'none' }}>
           <div className="flex items-center gap-2"><ArrowLeft size={24}/> Arrow Key Left</div>
           <div className="flex items-center gap-2">Arrow Key Right <ArrowLeft size={24} style={{ transform: 'rotate(180deg)' }}/></div>
        </div>

        <div style={{ width: '100%', position: 'relative', zIndex: 1 }}>
          <AnimatePresence mode="wait">
            <StepCard 
              key={`step-${currentStep.id}`} 
              step={currentStep} 
              index={currentStepIndex} 
              totalSteps={totalSteps} 
            />
          </AnimatePresence>
        </div>

        {/* Manual Controls */}
        <div className="flex gap-4 mt-8" style={{ marginTop: '4rem' }}>
          <button 
            className="btn btn-outline" 
            onClick={goToPrev} 
            disabled={currentStepIndex === 0}
            style={{ opacity: currentStepIndex === 0 ? 0.3 : 1, cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer' }}
          >
            <ChevronLeft size={20} /> Previous
          </button>
          <button 
            className="btn btn-primary" 
            onClick={goToNext} 
            disabled={currentStepIndex === totalSteps - 1}
            style={{ opacity: currentStepIndex === totalSteps - 1 ? 0.3 : 1, cursor: currentStepIndex === totalSteps - 1 ? 'not-allowed' : 'pointer' }}
          >
            Next <ChevronRight size={20} />
          </button>
        </div>

      </main>

      {/* Progress Bar */}
      <div style={{ width: '100%', height: '4px', background: 'var(--color-bg-card)', position: 'fixed', bottom: 0, left: 0 }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
          transition={{ duration: 0.3 }}
          style={{ height: '100%', background: 'var(--color-accent)', boxShadow: 'var(--shadow-glow)' }}
        />
      </div>
    </div>
  );
}
