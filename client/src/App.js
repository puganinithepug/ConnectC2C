import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Pages
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import ServiceResults from './pages/ServiceResults';
import FindYourService from './pages/FindYourService';
import TopPerformingPartners from './pages/TopPerformingPartners';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Reviews from './pages/Reviews';
import Membership from './pages/Membership';
import About from './pages/About';
import Contact from './pages/Contact';
import PostingBoard from './pages/PostingBoard';
import Messages from './pages/Messages';
import MessageDetail from './pages/MessageDetail';
import NotFound from './pages/NotFound';

// Components
import Navbar from './components/Navbar';

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <main className={isAuthenticated ? 'pt-20' : ''}>
        <Routes>
          {!isAuthenticated ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/search" element={<FindYourService />} />
              <Route path="/services/results" element={<ServiceResults />} />
              <Route path="/partners" element={<TopPerformingPartners />} />
              <Route path="/profile" element={

