// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DigiLocker {
    struct Document {
        string ipfsHash;
        address owner;
    }

    mapping(bytes32 => Document) private documents;
    mapping(bytes32 => mapping(address => bool)) private accessList;

    event DocumentUploaded(address indexed owner, bytes32 docId, string ipfsHash);
    event AccessGranted(address indexed owner, address indexed user, bytes32 docId);
    event AccessRevoked(address indexed owner, address indexed user, bytes32 docId);

    function uploadDocument(string memory _ipfsHash) public returns (bytes32) {
        bytes32 docId = keccak256(abi.encodePacked(_ipfsHash, msg.sender, block.timestamp));
        require(bytes(documents[docId].ipfsHash).length == 0, "Document already exists");

        documents[docId] = Document({ ipfsHash: _ipfsHash, owner: msg.sender });

        emit DocumentUploaded(msg.sender, docId, _ipfsHash);
        return docId;
    }

    function grantAccess(bytes32 _docId, address _user) public {
        require(documents[_docId].owner == msg.sender, "Only owner can grant access");
        accessList[_docId][_user] = true;

        emit AccessGranted(msg.sender, _user, _docId);
    }

    function revokeAccess(bytes32 _docId, address _user) public {
        require(documents[_docId].owner == msg.sender, "Only owner can revoke access");
        accessList[_docId][_user] = false;

        emit AccessRevoked(msg.sender, _user, _docId);
    }

    function getDocument(bytes32 _docId) public view returns (string memory) {
        require(
            documents[_docId].owner == msg.sender || accessList[_docId][msg.sender],
            "Access denied"
        );
        return documents[_docId].ipfsHash;
    }
}
