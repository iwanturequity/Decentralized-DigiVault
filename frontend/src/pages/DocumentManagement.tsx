import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Upload, Share2, Eye } from "lucide-react";
import UploadDocument from "../components/UploadDocument";
import { getEthereumContract } from "../blockchain";

const DocumentManagement = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [documents, setDocuments] = useState<{ id: number; ipfsHash: string; category: string; timestamp: number }[]>([]);
  const [sharedDocuments, setSharedDocuments] = useState<{ id: number; ipfsHash: string; category: string }[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const contract = await getEthereumContract();
      if (!contract) return;

      try {
        const docCount = await contract.documentCounter();
        const userAddress = await window.ethereum.request({ method: "eth_accounts" }).then((accounts) => accounts[0]);
        
        const docArray = [];
        const sharedArray = [];
        for (let i = 1; i <= docCount; i++) {
          const doc = await contract.getDocument(i);
          const hasAccess = await contract.getDocumentAccessList(i);
          
          if (doc[2].toLowerCase() === userAddress.toLowerCase()) {
            docArray.push({
              id: i,
              ipfsHash: doc[0],
              category: doc[1],
              timestamp: Number(doc[3]) * 1000,
            });
          } else if (hasAccess.includes(userAddress)) {
            sharedArray.push({
              id: i,
              ipfsHash: doc[0],
              category: doc[1],
            });
          }
        }

        setDocuments(docArray);
        setSharedDocuments(sharedArray);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "upload":
        return (
          <div className="space-y-6">
            <UploadDocument />
          </div>
        );

      case "view":
        return (
          <div className="space-y-6">
            {documents.length === 0 ? (
              <p className="text-gray-500">No documents found.</p>
            ) : (
              documents.map((doc) => (
                <div key={doc.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-8 w-8 text-gray-400" />
                    <div>
                      <h3 className="font-medium">Document {doc.id} - {doc.category}</h3>
                      <p className="text-sm text-gray-500">Added on {new Date(doc.timestamp).toLocaleDateString()}</p>
                      <a
                        href={`https://ipfs.io/ipfs/${doc.ipfsHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View Document
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        );

      case "share":
        return (
          <div className="space-y-6">
            {sharedDocuments.length === 0 ? (
              <p className="text-gray-500">No shared documents found.</p>
            ) : (
              sharedDocuments.map((doc) => (
                <div key={doc.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-8 w-8 text-gray-400" />
                      <h3 className="font-medium">Shared Doc {doc.id} - {doc.category}</h3>
                    </div>
                    <a
                      href={`https://ipfs.io/ipfs/${doc.ipfsHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Document
                    </a>
                  </div>
                </div>
              ))
            )}
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
                { id: "upload", name: "Upload", icon: Upload },
                { id: "view", name: "View Files", icon: Eye },
                { id: "share", name: "Share", icon: Share2 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab.id
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }
                  `}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">{renderContent()}</div>
        </div>
      </motion.div>
    </div>
  );
};

export default DocumentManagement;
