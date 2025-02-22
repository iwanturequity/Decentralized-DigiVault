// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DigiLocker {
    struct Document {
        uint256 id;
        string ipfsHash; // Store IPFS CID instead of full document
        address owner;
        string category;
        uint256 timestamp;
        address[] accessList; // List of users with access
        mapping(address => bool) hasAccess; // Access control mapping
    }

    mapping(uint256 => Document) public documents;
    mapping(address => uint256[]) private userDocuments; // Track documents per user
    uint256 public documentCounter;

    // Events for frontend tracking
    event DocumentAdded(uint256 indexed documentId, address indexed owner, string ipfsHash, string category);
    event AccessGranted(uint256 indexed documentId, address indexed grantee);
    event AccessRevoked(uint256 indexed documentId, address indexed grantee);
    event DocumentAccessed(uint256 indexed documentId, address indexed user);
    event OwnershipTransferred(uint256 indexed documentId, address indexed oldOwner, address indexed newOwner);

    modifier onlyOwner(uint256 _docId) {
        require(documents[_docId].owner == msg.sender, "Not the document owner");
        _;
    }

    modifier hasAccessTo(uint256 _docId) {
        require(
            msg.sender == documents[_docId].owner || documents[_docId].hasAccess[msg.sender],
            "No access to this document"
        );
        _;
    }

    // Upload document (store metadata on-chain)
    function uploadDocument(string memory _ipfsHash, string memory _category) external {
        require(bytes(_ipfsHash).length > 0, "Invalid IPFS hash");

        documentCounter++;
        Document storage doc = documents[documentCounter];

        doc.id = documentCounter;
        doc.ipfsHash = _ipfsHash;
        doc.owner = msg.sender;
        doc.category = _category;
        doc.timestamp = block.timestamp;

        userDocuments[msg.sender].push(documentCounter);

        emit DocumentAdded(documentCounter, msg.sender, _ipfsHash, _category);
    }

    // Grant access to another user
    function grantAccess(uint256 _docId, address _user) external onlyOwner(_docId) {
        require(_user != address(0), "Invalid address");
        require(!documents[_docId].hasAccess[_user], "Access already granted");

        documents[_docId].hasAccess[_user] = true;
        documents[_docId].accessList.push(_user);

        emit AccessGranted(_docId, _user);
    }

    // Revoke access from a user
    function revokeAccess(uint256 _docId, address _user) external onlyOwner(_docId) {
        require(documents[_docId].hasAccess[_user], "User does not have access");

        documents[_docId].hasAccess[_user] = false;

        // Remove the user from accessList array
        address[] storage list = documents[_docId].accessList;
        for (uint256 i = 0; i < list.length; i++) {
            if (list[i] == _user) {
                list[i] = list[list.length - 1];
                list.pop();
                break;
            }
        }

        emit AccessRevoked(_docId, _user);
    }

    // Transfer ownership of a document
    function transferOwnership(uint256 _docId, address _newOwner) external onlyOwner(_docId) {
        require(_newOwner != address(0), "Invalid address");
        require(_newOwner != msg.sender, "You are already the owner");

        address oldOwner = documents[_docId].owner;
        documents[_docId].owner = _newOwner;

        // Update userDocuments mapping
        uint256[] storage oldOwnerDocs = userDocuments[oldOwner];
        uint256[] storage newOwnerDocs = userDocuments[_newOwner];

        for (uint256 i = 0; i < oldOwnerDocs.length; i++) {
            if (oldOwnerDocs[i] == _docId) {
                oldOwnerDocs[i] = oldOwnerDocs[oldOwnerDocs.length - 1];
                oldOwnerDocs.pop();
                break;
            }
        }

        newOwnerDocs.push(_docId);

        emit OwnershipTransferred(_docId, oldOwner, _newOwner);
    }

    // Get a document's metadata (only owner or granted users)
    function getDocument(uint256 _docId) external view hasAccessTo(_docId) returns (string memory, string memory, address, uint256) {
       
        return (
            documents[_docId].ipfsHash,
            documents[_docId].category,
            documents[_docId].owner,
            documents[_docId].timestamp
        );
    }

    // Get documents uploaded by a user
    function getUserDocuments(address _user) external view returns (uint256[] memory) {
        return userDocuments[_user];
    }

    // Get users with access to a specific document
    function getDocumentAccessList(uint256 _docId) external view onlyOwner(_docId) returns (address[] memory) {
        return documents[_docId].accessList;
    }
}
