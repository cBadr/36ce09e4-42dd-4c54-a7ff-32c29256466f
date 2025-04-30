
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import './App.css';

// الصفحات
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import CreateCampaign from './pages/CreateCampaign';
import NotFound from './pages/NotFound';

// المكونات
import AuthProvider from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* الصفحات العامة */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* الصفحات المحمية التي تتطلب مصادقة */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
          <Route path="/campaigns/create" element={<ProtectedRoute><CreateCampaign /></ProtectedRoute>} />
          
          {/* صفحة 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        <Toaster />
        <SonnerToaster position="top-center" />
      </AuthProvider>
    </Router>
  );
}

export default App;
