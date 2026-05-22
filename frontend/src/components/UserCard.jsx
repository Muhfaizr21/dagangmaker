import React from 'react';

export default function UserCard({ user, onDelete, deletingId }) {
  const isDeleting = deletingId === user.id;
  
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="user-card">
      <div className="user-info">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'hsla(263, 85%, 63%, 0.15)',
            border: '1px solid hsla(263, 85%, 63%, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-primary)',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            fontFamily: 'var(--font-display)'
          }}>
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        </div>
        
        <div className="user-meta">
          <span>Terdaftar: {formatDate(user.created_at)}</span>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
        <button 
          className="btn btn-danger"
          onClick={() => onDelete(user.id)}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <>
              <span className="loader" style={{ width: '12px', height: '12px', borderWidth: '1.5px', marginRight: '6px' }}></span>
              Menghapus...
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
              Hapus
            </>
          )}
        </button>
      </div>
    </div>
  );
}
