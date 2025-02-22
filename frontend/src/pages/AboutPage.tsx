import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Lock, Zap } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="space-y-20 py-20">
      {/* Hero Section */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h1 className="text-5xl font-bold">About DigiLocker</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing document management through decentralized technology, 
              making it more secure, accessible, and efficient than ever before.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-300">
                At DigiLocker, we believe everyone deserves access to secure, reliable 
                document storage and management. Our mission is to provide a decentralized 
                platform that puts you in control of your digital assets while ensuring 
                the highest levels of security and privacy.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-gray-800 rounded-lg">
                <Shield className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-semibold">Security First</h3>
              </div>
              <div className="text-center p-6 bg-gray-800 rounded-lg">
                <Users className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-semibold">User Control</h3>
              </div>
              <div className="text-center p-6 bg-gray-800 rounded-lg">
                <Lock className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-semibold">Privacy</h3>
              </div>
              <div className="text-center p-6 bg-gray-800 rounded-lg">
                <Zap className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-semibold">Innovation</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-12"
          >
            <h2 className="text-3xl font-bold">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((member) => (
                <div key={member} className="space-y-4">
                  <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto overflow-hidden">
                    <img 
                      src={`https://source.unsplash.com/random/300x300?portrait&${member}`} 
                      alt="Team member" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">Team Member {member}</h3>
                  <p className="text-gray-600">Position</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;