const Zer0NFT = artifacts.require("Zer0NFT");

module.exports = async function (deployer) {
  await deployer.deploy(Zer0NFT);
};
