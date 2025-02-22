import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Lock, FileText, Users } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold">
              Secure Your Digital Legacy
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Store, manage, and share your important documents with confidence using our decentralized platform.
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                to="/auth" 
                className="bg-white text-black px-8 py-3 rounded-md hover:bg-gray-200 transition"
              >
                Get Started
              </Link>
              <Link 
                to="/about" 
                className="border border-white px-8 py-3 rounded-md hover:bg-white hover:text-black transition"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            <div className="text-center space-y-4">
              <Shield className="h-12 w-12 mx-auto text-black" />
              <h3 className="text-2xl font-semibold">Secure Storage</h3>
              <p className="text-gray-600">
                Your documents are encrypted and stored across a decentralized network.
              </p>
            </div>
            <div className="text-center space-y-4">
              <Lock className="h-12 w-12 mx-auto text-black" />
              <h3 className="text-2xl font-semibold">Access Control</h3>
              <p className="text-gray-600">
                Manage who can view and access your documents with granular permissions.
              </p>
            </div>
            <div className="text-center space-y-4">
              <FileText className="h-12 w-12 mx-auto text-black" />
              <h3 className="text-2xl font-semibold">Easy Sharing</h3>
              <p className="text-gray-600">
                Share documents securely with other users or organizations.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of users who trust DigiLocker with their important documents.
            </p>
            <Link 
              to="/auth" 
              className="inline-block bg-white text-black px-8 py-3 rounded-md hover:bg-gray-200 transition"
            >
              Create Your Account
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;