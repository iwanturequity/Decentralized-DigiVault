const hre = require("hardhat");

async function main() {
  const DigiLocker = await hre.ethers.getContractFactory("DigiLocker");
  const digilocker = await DigiLocker.deploy();

  await digilocker.waitForDeployment();

  console.log("DigiLocker deployed to:", await digilocker.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
