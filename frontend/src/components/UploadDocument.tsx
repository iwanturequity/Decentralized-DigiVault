import React, { useState } from "react";
import { getEthereumContract } from "../blockchain";

const UploadDocument: React.FC = () => {
    const [ipfsHash, setIpfsHash] = useState("");
    const [category, setCategory] = useState("");

    const uploadDocument = async () => {
        const contract = await getEthereumContract();
        if (!contract) return;

        try {
            const tx = await contract.uploadDocument(ipfsHash, category);
            await tx.wait();
            alert("Document uploaded successfully!");
        } catch (error) {
            console.error("Error uploading document:", error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Enter IPFS Hash"
                value={ipfsHash}
                onChange={(e) => setIpfsHash(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <button onClick={uploadDocument}>Upload Document</button>
        </div>
    );
};

export default UploadDocument;
