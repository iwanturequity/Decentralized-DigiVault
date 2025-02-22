import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, History, Settings, Key, User, Bell } from 'lucide-react';

const UserAccessSecurity = () => {
  const [activeTab, setActiveTab] = useState('access');

  const renderContent = () => {
    switch (activeTab) {
      case 'access':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-medium mb-4">Access Control</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Key className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <User className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="font-medium">Device Management</p>
                      <p className="text-sm text-gray-500">Manage connected devices</p>
                    </div>
                  </div>
                  <button className="text-sm text-gray-600 hover:text-black">Manage</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'history':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-medium mb-4">Transaction History</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((transaction) => (
                  <div key={transaction} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <History className="h-6 w-6 text-gray-400" />
                      <div>
                        <p className="font-medium">Document Access</p>
                        <p className="text-sm text-gray-500">{new Date().toLocaleString()}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">IP: 192.168.1.{transaction}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-medium mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Bell className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="font-medium">Security Notifications</p>
                      <p className="text-sm text-gray-500">Get alerts for suspicious activities</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Shield className="h-6 w-6 text-gray-400" />
                    <div>
                      <p className="font-medium">Password Settings</p>
                      <p className="text-sm text-gray-500">Change password and security questions</p>
                    </div>
                  </div>
                  <button className="text-sm text-gray-600 hover:text-black">Update</button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
      >
        <h1 className="text-3xl font-bold">User Access & Security</h1>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: 'access', name: 'Access Control', icon: Shield },
                { id: 'history', name: 'Transaction History', icon: History },
                { id: 'settings', name: 'Settings', icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab.id
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserAccessSecurity;