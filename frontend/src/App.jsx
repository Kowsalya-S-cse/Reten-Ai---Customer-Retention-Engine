import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Database from './pages/Database';
import Playbook from './pages/Playbook';
import Settings from './pages/Settings';
import Financials from './pages/Financials';
import Sidebar from './components/Sidebar';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      {isAuthenticated && <Sidebar setAuth={setIsAuthenticated} />}
      <main style={{ marginLeft: isAuthenticated ? '280px' : '0', transition: 'margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Login setAuth={setIsAuthenticated} />
            } 
          />
          <Route 
            path="/analytics" 
            element={
              isAuthenticated ? <Analytics /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/financials" 
            element={
              isAuthenticated ? <Financials /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? <Dashboard setAuth={setIsAuthenticated} /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/database" 
            element={
              isAuthenticated ? <Database /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/playbook" 
            element={
              isAuthenticated ? <Playbook /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/settings" 
            element={
              isAuthenticated ? <Settings /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/" 
            element={<Navigate to="/login" />} 
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
