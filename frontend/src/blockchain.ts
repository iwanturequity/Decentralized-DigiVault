import { ethers } from "ethers";
import { CONTRACT_ADDRESS, RPC_URL } from "./config";
import contractABI from "./DigiLockerABI.json"; // ✅ Correct path

export const getEthereumContract = async () => {
    if (!window.ethereum) {
        alert("Please install MetaMask!");
        return null;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);

    return contract;
};
