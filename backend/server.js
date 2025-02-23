import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import multer from "multer";
import { ethers } from "ethers";
import fs from "fs";
import { NFTStorage, File } from "nft.storage";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Load Smart Contract ABI from JSON
const contractData = JSON.parse(fs.readFileSync("./DigiLocker.json"));
const contractABI = contractData.abi;

// ✅ Use Infura’s Polygon RPC for Blockchain
const provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL || "https://rpc-amoy.polygon.technology");

// ✅ Initialize NFT.Storage
const nftStorage = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY });

// ✅ Multer for File Uploads (Limit: 10MB)
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

/**
 * ✅ Upload Document to NFT.Storage
 * @param {Buffer} fileBuffer - The file buffer to upload
 * @param {string} fileName - The name of the file
 * @returns {string} The IPFS CID
 */
async function uploadToIPFS(fileBuffer, fileName) {
  try {
    const file = new File([fileBuffer], fileName, { type: "application/octet-stream" });
    const cid = await nftStorage.storeBlob(file);  // ✅ Correct method
    console.log(`✅ NFT.Storage Upload Success! CID: ${cid}`);
    return cid;
  } catch (error) {
    console.error("❌ NFT.Storage Upload Failed:", error);
    throw new Error("NFT.Storage upload failed");
  }
}

// ✅ Upload API (Now Uses NFT.Storage)
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded." });

    console.log(`📤 Uploading ${file.originalname} (${file.mimetype}, ${file.size} bytes) to NFT.Storage...`);

    // ✅ Upload to NFT.Storage
    const cid = await uploadToIPFS(file.buffer, file.originalname);

    console.log(`✅ Successfully uploaded to NFT.Storage: CID = ${cid}`);
    res.json({ ipfsHash: cid });
  } catch (error) {
    console.error("❌ Upload Error:", error);
    res.status(500).json({ error: "Upload failed", details: error.message });
  }
});

// ✅ Blockchain Contract Setup
const contractAddress = "0x02da984E74E2b8c45249a4780F385eC549E84C18";
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

/**
 * ✅ Store IPFS Hash in Smart Contract
 */
app.post("/store", async (req, res) => {
  try {
    const { ipfsHash, category } = req.body;
    if (!ipfsHash || !category) return res.status(400).json({ error: "Missing required parameters." });

    console.log(`📜 Storing Document on Blockchain...`);
    const tx = await contract.uploadDocument(ipfsHash, category);
    await tx.wait();

    console.log(`✅ Blockchain Transaction Successful: TX Hash = ${tx.hash}`);
    res.json({ success: true, message: "Document stored on blockchain", txHash: tx.hash });
  } catch (error) {
    console.error("❌ Blockchain Error:", error);
    res.status(500).json({ error: "Failed to store document", details: error.message });
  }
});

// ✅ Fetch Latest Polygon Block Number
app.get("/blockNumber", async (req, res) => {
  try {
    const blockNumber = await provider.getBlockNumber();
    res.json({ blockNumber });
  } catch (error) {
    console.error("❌ Error fetching block number:", error);
    res.status(500).json({ error: "Failed to fetch block number" });
  }
});

/**
 * ✅ Debugging: Test NFT.Storage Upload
 */
async function testIPFSUpload() {
  try {
    console.log("🔍 Testing NFT.Storage upload...");

    const sampleData = new Blob(["Hello, Decentralized DigiLocker!"], { type: "text/plain" });
    const file = new File([sampleData], "test.txt");

    // ✅ Corrected NFT.Storage Upload Test
    const cid = await nftStorage.storeBlob(file);

    console.log("✅ NFT.Storage Upload Success! CID:", cid);
  } catch (error) {
    console.error("❌ NFT.Storage Upload Failed:", error);
  }
}

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
  testIPFSUpload(); // ✅ Runs NFT.Storage upload test on startup
});
