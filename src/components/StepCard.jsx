import React from 'react';
import { motion } from 'framer-motion';
import { Database, FileText, CheckCircle, ArrowRight } from 'lucide-react';

export default function StepCard({ step, index, totalSteps }) {
  return (
    <motion.div 
      key={step.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="glass-card"
      style={{ padding: '3rem', width: '100%', maxWidth: '800px', margin: '0 auto', position: 'relative' }}
    >
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.75rem', display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, paddingRight: '1rem' }}>
          <span style={{ 
            background: 'var(--color-accent)', 
            color: 'white', 
            width: '40px', height: '40px', 
            borderRadius: '50%', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.25rem', fontWeight: 'bold', flexShrink: 0
          }}>
            {step.id}
          </span>
          {step.title}
        </h2>
        <div style={{ color: 'var(--color-text-muted)', fontWeight: 500, whiteSpace: 'nowrap', fontSize: '1.1rem' }}>
          Step {step.id} of {totalSteps}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {Object.entries(step.data).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center" style={{ 
            background: 'rgba(255,255,255,0.02)', 
            padding: '1.5rem', 
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div className="flex items-center gap-4 text-muted">
              {key.toLowerCase().includes('status') ? <CheckCircle size={20} className="text-accent" /> :
               key.toLowerCase().includes('id') || key.toLowerCase().includes('order') ? <FileText size={20} className="text-accent" /> : 
               <Database size={20} className="text-accent" />}
              <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{key}</span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 500 }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      {step.id < totalSteps && (
        <div style={{ position: 'absolute', bottom: '-40px', left: '50%', transform: 'translateX(-50%)', color: 'var(--color-accent)', opacity: 0.5 }}>
          <ArrowRight size={32} style={{ transform: 'rotate(90deg)' }}/>
        </div>
      )}
    </motion.div>
  );
}
