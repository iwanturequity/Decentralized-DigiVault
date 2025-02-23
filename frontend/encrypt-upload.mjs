import { create } from "ipfs-http-client";
import fs from "fs";
import crypto from "crypto";


// Connect to your local IPFS node
const ipfs = create({ host: "localhost", port: "5001", protocol: "http" });

const encryptFile = (filePath, password) => {
  const fileData = fs.readFileSync(filePath);
  const cipher = crypto.createCipher("aes-256-cbc", password);
  let encryptedData = cipher.update(fileData);
  encryptedData = Buffer.concat([encryptedData, cipher.final()]);
  return encryptedData;
};

const uploadToIPFS = async (encryptedData) => {
  const { cid } = await ipfs.add(encryptedData);
  return cid.toString();
};

const main = async () => {
  const filePath =  "C:/Users/sujal/Downloads/Sujal Verma_offer_letter.pdf";; // Change this
  const password = "SUJALVEERsv$1"; // Change this

  console.log("Encrypting file...");
  const encryptedData = encryptFile(filePath, password);

  console.log("Uploading encrypted file to IPFS...");
  const ipfsHash = await uploadToIPFS(encryptedData);

  console.log("Encrypted file uploaded! IPFS Hash:", ipfsHash);
};

main().catch(console.error);
