require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const account = process.env.DEPLOYER_SIGNER_PRIVATE_KEY;
const endpoint = process.env.INFURA_ENDPOINT;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks:{
    ropsten:{
      url: endpoint,
      accounts:[account]
    }
  }
};
