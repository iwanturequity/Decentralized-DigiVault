import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { web3, contract } from './config';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import AuthPage from './pages/AuthPage';
import DocumentManagement from './pages/DocumentManagement';
import UserAccessSecurity from './pages/UserAccessSecurity';

function App() {
  const [account, setAccount] = useState<string | null>(null);
  const [contractAddress, setContractAddress] = useState<string | null>(null);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        if (contract && contract.options && contract.options.address) {
          console.log("✅ Contract Instance:", contract);
          console.log("✅ Contract Address:", contract.options.address);
          setContractAddress(contract.options.address);
        } else {
          console.error("❌ Contract is not initialized properly.");
        }
      } catch (error) {
        console.error("Error connecting to Web3:", error);
      }
    };

    initWeb3();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="text-center text-sm text-gray-600 py-2">
            Connected Account: {account}
          </div>
          {contractAddress && (
            <div className="text-center text-sm text-gray-600 py-2">
              Contract Address: {contractAddress}
            </div>
          )}
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
