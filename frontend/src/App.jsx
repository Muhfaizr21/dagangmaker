import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import UserForm from './components/UserForm';
import UserCard from './components/UserCard';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [serverOnline, setServerOnline] = useState(false);
  
  // Custom alert state
  const [alert, setAlert] = useState(null);

  const triggerAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (response.ok) {
        const result = await response.json();
        setUsers(result.data || []);
        setServerOnline(true);
      } else {
        setServerOnline(false);
        triggerAlert('Gagal memuat daftar pengguna dari server.', 'error');
      }
    } catch (error) {
      setServerOnline(false);
      triggerAlert('Tidak dapat terhubung ke server backend.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (userData, successCallback) => {
    setFormLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        triggerAlert('Pengguna baru berhasil ditambahkan!');
        fetchUsers();
        if (successCallback) successCallback();
      } else {
        triggerAlert(result.message || 'Gagal menambahkan pengguna.', 'error');
      }
    } catch (error) {
      triggerAlert('Gagal menghubungi server.', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    setDeletingId(id);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (response.ok && result.success) {
        triggerAlert('Pengguna berhasil dihapus.');
        fetchUsers();
      } else {
        triggerAlert(result.message || 'Gagal menghapus pengguna.', 'error');
      }
    } catch (error) {
      triggerAlert('Gagal menghubungi server.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="app-container">
      {/* 1. Header Navigation */}
      <Navbar serverOnline={serverOnline} />
      
      {/* 2. Global Dynamic Alert Banner */}
      {alert && (
        <div className={`full-width alert alert-${alert.type}`}>
          {alert.type === 'success' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          )}
          <span>{alert.message}</span>
        </div>
      )}

      {/* 3. Left Side: Registration Form */}
      <div>
        <UserForm onSubmit={handleAddUser} loading={formLoading} />
      </div>

      {/* 4. Right Side: List of Users */}
      <div className="glass-panel">
        <h2 className="section-title">Daftar Pengguna ({users.length})</h2>
        
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : users.length === 0 ? (
          <div className="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Tidak ada pengguna ditemukan</p>
            <p style={{ fontSize: '0.85rem' }}>Silakan gunakan formulir di sebelah kiri untuk mendaftarkan pengguna baru.</p>
          </div>
        ) : (
          <div className="user-grid">
            {users.map((user) => (
              <UserCard 
                key={user.id} 
                user={user} 
                onDelete={handleDeleteUser} 
                deletingId={deletingId} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
