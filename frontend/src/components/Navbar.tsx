import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, FileText, Settings } from 'lucide-react';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-black text-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8" />
            <span className="text-xl font-bold">DigiLocker</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/documents" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-800 transition">
              <FileText className="h-5 w-5" />
              <span>Documents</span>
            </Link>
            <Link to="/security" className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-gray-800 transition">
              <Settings className="h-5 w-5" />
              <span>Security</span>
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md hover:bg-gray-800 transition">
              About Us
            </Link>
            <Link to="/auth" className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;