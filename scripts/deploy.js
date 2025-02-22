const hre = require("hardhat");

async function main() {
  const DigiLocker = await hre.ethers.getContractFactory("DigiLocker");
  const digiLocker = await DigiLocker.deploy();
  await digiLocker.waitForDeployment();

  console.log(`Contract deployed at: ${digiLocker.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
