import Arweave from "arweave";
import CryptoJS from "crypto-js";

// Initialize Arweave connection
const arweave = Arweave.init({
    host: "arweave.net",
    protocol: "https",
    port: 443,
});

// Encrypt the file before uploading
const encryptFile = async (file: File, secretKey: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === "string") {
                const encryptedData = CryptoJS.AES.encrypt(reader.result, secretKey).toString();
                resolve(encryptedData);
            } else {
                reject(new Error("File reading failed"));
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};


// Upload encrypted file to Arweave
export const uploadToArweave = async (file: File, walletKey: any, secretKey: string): Promise<string | null> => {
    try {
        const encryptedData = await encryptFile(file, secretKey);

        // Create transaction with encrypted data
        const transaction = await arweave.createTransaction({ data: encryptedData }, walletKey);
        transaction.addTag("Content-Type", "text/plain");

        // Sign and send transaction
        await arweave.transactions.sign(transaction, walletKey);
        const response = await arweave.transactions.post(transaction);

        if (response.status === 200) {
            console.log("File uploaded to Arweave:", `https://arweave.net/${transaction.id}`);
            return `https://arweave.net/${transaction.id}`;
        } else {
            console.error("Upload failed:", response);
            return null;
        }
    } catch (error) {
        console.error("Error uploading to Arweave:", error);
        return null;
    }
};

// Function to decrypt file
export const decryptFile = (encryptedData: string, secretKey: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};
