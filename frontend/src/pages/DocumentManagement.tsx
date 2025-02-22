import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Share2, Eye } from 'lucide-react';

const DocumentManagement = () => {
  const [activeTab, setActiveTab] = useState('upload');

  const renderContent = () => {
    switch (activeTab) {
      case 'upload':
        return (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-gray-600">
                Drag and drop your files here, or click to select files
              </p>
              <button className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900">
                Select Files
              </button>
            </div>
          </div>
        );
      case 'view':
        return (
          <div className="space-y-6">
            {[1, 2, 3].map((file) => (
              <div key={file} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <FileText className="h-8 w-8 text-gray-400" />
                  <div>
                    <h3 className="font-medium">Document {file}.pdf</h3>
                    <p className="text-sm text-gray-500">Added on {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                <button className="text-gray-600 hover:text-black">
                  <Eye className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        );
      case 'share':
        return (
          <div className="space-y-6">
            {[1, 2].map((file) => (
              <div key={file} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-8 w-8 text-gray-400" />
                    <h3 className="font-medium">Document {file}.pdf</h3>
                  </div>
                  <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900">
                    Share
                  </button>
                </div>
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Shared with:</h4>
                  <div className="flex space-x-2">
                    {[1, 2].map((user) => (
                      <div key={user} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        user{user}@example.com
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
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
        <h1 className="text-3xl font-bold">Document Management</h1>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: 'upload', name: 'Upload', icon: Upload },
                { id: 'view', name: 'View Files', icon: Eye },
                { id: 'share', name: 'Share', icon: Share2 },
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

export default DocumentManagement;