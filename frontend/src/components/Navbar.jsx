import React from 'react';

export default function Navbar({ serverOnline }) {
  return (
    <header className="full-width glass-panel" style={{ 
      padding: '16px 28px', 
      marginBottom: '10px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      borderRadius: 'var(--radius-md)' 
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
          width: '36px',
          height: '36px',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          color: 'white',
          fontSize: '1.2rem',
          boxShadow: 'var(--shadow-glow)'
        }}>
          D
        </div>
        <div>
          <h1 style={{ 
            fontSize: '1.25rem', 
            fontFamily: 'var(--font-display)', 
            fontWeight: 800, 
            background: 'linear-gradient(90deg, #fff, var(--text-secondary))', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent' 
          }}>
            DagangMaker
          </h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Admin Dashboard</p>
        </div>
      </div>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px', 
        fontSize: '0.8rem', 
        fontWeight: 600, 
        background: 'hsla(0, 0%, 100%, 0.03)', 
        padding: '6px 14px', 
        borderRadius: '20px', 
        border: '1px solid var(--glass-border)' 
      }}>
        <span style={{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: serverOnline ? 'var(--color-success)' : 'var(--color-danger)',
          boxShadow: serverOnline ? '0 0 10px var(--color-success)' : '0 0 10px var(--color-danger)',
          transition: 'var(--transition-smooth)'
        }}></span>
        <span style={{ color: serverOnline ? 'var(--color-success)' : 'var(--color-danger)' }}>
          API: {serverOnline ? 'ONLINE' : 'OFFLINE'}
        </span>
      </div>
    </header>
  );
}
