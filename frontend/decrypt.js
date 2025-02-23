const fs = require("fs");
const crypto = require("crypto");

const decryptFile = (encryptedData, password) => {
  const decipher = crypto.createDecipher("aes-256-cbc", password);
  let decryptedData = decipher.update(encryptedData);
  decryptedData = Buffer.concat([decryptedData, decipher.final()]);
  return decryptedData;
};

const main = () => {
  const encryptedPath = "C:/Users/sujal/Downloads/Sujal Verma_offer_letter.pdf"; // Change this
  const password = "SUJALVEERsv$1"; // Use the same key

  console.log("Decrypting file...");
  const encryptedData = fs.readFileSync(encryptedPath);
  const decryptedData = decryptFile(encryptedData, password);

  fs.writeFileSync("decrypted_document.pdf", decryptedData);
  console.log("Decryption complete! Saved as decrypted_document.pdf");
};

main();
