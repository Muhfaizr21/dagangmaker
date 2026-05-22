import React, { useState } from 'react';

export default function UserForm({ onSubmit, loading }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    
    onSubmit({ name, email, password }, () => {
      // Success callback resets form values
      setName('');
      setEmail('');
      setPassword('');
    });
  };

  return (
    <div className="glass-panel">
      <h2 className="section-title">Tambah Pengguna</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Nama Lengkap</label>
          <input
            id="name"
            type="text"
            className="form-input"
            placeholder="Masukkan nama lengkap..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="email">Alamat Email</label>
          <input
            id="email"
            type="email"
            className="form-input"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="password">Kata Sandi</label>
          <input
            id="password"
            type="password"
            className="form-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={loading || !name || !email || !password}
        >
          {loading ? (
            <>
              <span className="loader" style={{ width: '16px', height: '16px', borderWidth: '2px', marginRight: '8px' }}></span>
              Memproses...
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Simpan Pengguna
            </>
          )}
        </button>
      </form>
    </div>
  );
}
