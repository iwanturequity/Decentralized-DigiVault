import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import AuthPage from './pages/AuthPage';
import DocumentManagement from './pages/DocumentManagement';
import UserAccessSecurity from './pages/UserAccessSecurity';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/documents" element={<DocumentManagement />} />
            <Route path="/security" element={<UserAccessSecurity />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;