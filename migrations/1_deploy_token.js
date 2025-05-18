const MyToken = artifacts.require("MyToken");

module.exports = function (deployer) {
  const initialSupply = 1000000; // Example initial supply
  deployer.deploy(MyToken, initialSupply);
}; 