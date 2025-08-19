import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

function AppContent() {
  const { user } = useAuth();
  
  return user ? <Dashboard /> : <LoginForm />;
}

function App() {
  return (
    <AuthProvider>
      <div className="font-sans antialiased">
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;