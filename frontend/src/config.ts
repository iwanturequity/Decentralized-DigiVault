export const CONTRACT_ADDRESS = "0x1aD4aDC9E5E30AF889A18DBe15E970780857784d"; // Your deployed contract address
export const RPC_URL = "http://127.0.0.1:8545"; // Local blockchain

import Web3 from "web3";
import contractABI from "./digilockerabi.json"; // Ensure this path is correct

// Check if Web3 is already injected (e.g., MetaMask), otherwise use local provider
const web3Provider = window.ethereum
  ? new Web3(window.ethereum)
  : new Web3(new Web3.providers.HttpProvider(RPC_URL));

export const web3 = web3Provider;
export const contract = new web3.eth.Contract(contractABI.abi, CONTRACT_ADDRESS);

// Make web3 & contract available in the browser console for debugging
(window as any).web3 = web3;
(window as any).contract = contract;
