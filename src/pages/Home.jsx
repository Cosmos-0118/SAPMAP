import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, Factory, PackageSearch, ArrowRight } from 'lucide-react';
import { modulesData } from '../data/modules';

const iconMap = {
  Truck: Truck,
  Factory: Factory,
  PackageSearch: PackageSearch
};

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div className="flex flex-col items-center justify-center" style={{ minHeight: '100vh', padding: '4rem 1.5rem', width: '100%' }}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center flex flex-col items-center"
        style={{ width: '100%', maxWidth: '1200px', marginBottom: '3rem' }}
      >
        <div style={{ background: 'white', padding: '1rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}>
          <img 
            src="/Royalenfield.jpg" 
            alt="Royal Enfield Logo" 
            style={{ height: '80px', objectFit: 'contain' }} 
          />
        </div>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>SAP <span className="text-accent">MAP</span> Explorer</h1>
        <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Interactive business process flows based on Dallas case study scenarios. Select a module to begin.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex"
        style={{ gap: '2rem', flexWrap: 'wrap', justifyItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '1200px' }}
      >
        {Object.values(modulesData).map((mod) => {
          const IconComponent = iconMap[mod.icon];
          return (
            <motion.div key={mod.id} variants={itemVariants}>
              <Link to={`/module/${mod.id}`} style={{ display: 'block' }}>
                <div className="glass-card flex flex-col" style={{ padding: '2rem', width: '320px', minHeight: '380px', height: '100%', transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden', textAlign: 'left' }}>
                  <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05, transform: 'scale(3)' }}>
                    <IconComponent size={64} />
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem', color: 'var(--color-accent)' }}>
                    <IconComponent size={48} />
                  </div>
                  
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{mod.title}</h2>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', flexGrow: 1 }}>{mod.description}</p>
                  
                  <div className="flex items-center text-accent" style={{ fontWeight: 600, marginTop: 'auto', gap: '0.5rem' }}>
                    Explore Process <ArrowRight size={20} />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
