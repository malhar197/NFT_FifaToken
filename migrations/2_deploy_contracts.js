const FifaToken = artifacts.require("FifaToken");

module.exports = function(deployer) {
  deployer.deploy(FifaToken);
};