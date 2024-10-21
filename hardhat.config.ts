import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

// 加载 .env 文件中的环境变量
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",  // 你可以根据你的需求修改 Solidity 版本
  networks: {
    lumia: {
      url: "https://testnet-rpc.lumia.org",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],  // 使用 .env 中的 PRIVATE_KEY
    }
  },
  paths: {
    sources: "./contracts", // Solidity 合约目录
    tests: "./test",        // 测试文件目录
    cache: "./cache",       // 缓存目录
    artifacts: "./artifacts" // 生成的合约文件
  },
  mocha: {
    timeout: 20000 // Mocha 测试的超时时间
  }
};

export default config;
