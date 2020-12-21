const TestMinter = artifacts.require("TestMinter");

module.exports = function(deployer) {
  deployer.deploy(TestMinter);
};