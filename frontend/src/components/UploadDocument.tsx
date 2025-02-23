import React, { useState } from "react";
import Arweave from "arweave";
import CryptoJS from "crypto-js";

const arweave = Arweave.init({
    host: "arweave.net",
    protocol: "https",
    port: 443,
});

const encryptFile = async (file: File, secretKey: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === "string") {
                console.log("File Read Successfully:", reader.result); // Debugging
                const encryptedData = CryptoJS.AES.encrypt(reader.result, secretKey).toString();
                console.log("Encrypted Data:", encryptedData); // Debugging
                resolve(encryptedData);
            } else {
                reject(new Error("File reading failed"));
            }
        };
        reader.onerror = (error) => {
            console.error("FileReader Error:", error);
            reject(error);
        };
        reader.readAsDataURL(file);
    });
};

const uploadToArweave = async (encryptedData: string, walletKey: any): Promise<string | null> => {
    try {
        const transaction = await arweave.createTransaction({ data: encryptedData }, walletKey);
        transaction.addTag("Content-Type", "text/plain");
        await arweave.transactions.sign(transaction, walletKey);
        const response = await arweave.transactions.post(transaction);
        
        if (response.status === 200) {
            console.log("File uploaded successfully!");
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

const UploadDocument: React.FC = () => {
    const [arweaveUrl, setArweaveUrl] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [walletKey, setWalletKey] = useState<any>(null);
    const [file, setFile] = useState<File | null>(null);

    const loadWalletKey = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            alert("No wallet key file selected.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                if (e.target?.result) {
                    const key = JSON.parse(e.target.result as string);
                    console.log("Wallet Key Loaded:", key);
                    setWalletKey(key);
                    alert("Wallet key loaded successfully!");
                }
            } catch (error) {
                console.error("Invalid Wallet Key File:", error);
                alert("Invalid wallet key file. Please upload the correct Arweave key.");
            }
        };
        reader.readAsText(file);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files?.[0] || null);
    };

    const handleUploadClick = async () => {
        if (!file || !walletKey) {
            alert("Please select a file and load your Arweave wallet key.");
            return;
        }

        const secretKey = "your-secret-key";
        const encryptedData = await encryptFile(file, secretKey);
        const arweaveURL = await uploadToArweave(encryptedData, walletKey);

        if (arweaveURL) {
            console.log("Arweave File URL:", arweaveURL);
            setArweaveUrl(arweaveURL);
        }
    };

    return (
        <div>
            <h2>Upload and Encrypt Document</h2>
            <input type="file" onChange={handleFileChange} />
            <input type="file" accept=".json" onChange={loadWalletKey} placeholder="Load Arweave Wallet Key" />
            <input
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <button onClick={handleUploadClick}>Upload to Arweave</button>
            {arweaveUrl && (
                <p>
                    File uploaded successfully: <a href={arweaveUrl} target="_blank" rel="noopener noreferrer">View File</a>
                </p>
            )}
        </div>
    );
};

export default UploadDocument;