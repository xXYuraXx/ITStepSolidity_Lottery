import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const ganacheAccounts = [
  process.env.GANACHE_PRIVATE_KEY_1,
  process.env.GANACHE_PRIVATE_KEY_2,
  process.env.GANACHE_PRIVATE_KEY_3,
].filter((account): account is string => Boolean(account));

const config: HardhatUserConfig = {
  solidity: "0.8.13",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ganache: {
      url: process.env.GANACHE_RPC_URL || "http://127.0.0.1:7545",
      accounts: ganacheAccounts,
    },
    // sepolia: {
    //   url: process.env.SEPOLIA_URL,
    //   accounts: [process.env.SEPOLIA_PRIVATE_KEY || ""],
    // },
  },
};

export default config;