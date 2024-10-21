import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    // 从命令行获取参数 (第 2 个参数是地址)
    const accountAddress = process.env.RECEIVER_ADDRESS;
    if (!accountAddress) {
        console.error("Account address not provided. Please pass it as a command line argument.");
        process.exit(1);
    }

    // 从 .env 文件中读取私钥
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
        console.error("Private key not provided in the .env file.");
        process.exit(1);
    }

    // 使用私钥创建签名者
    const provider = ethers.provider;  // 使用 Hardhat 的 provider
    const signer = new ethers.Wallet(privateKey, provider);

    console.log("Using account:", signer.address);
    console.log("Claiming tokens for:", accountAddress);

    // Faucet 合约地址
    const faucetAddress = "0x4dE1B3A8b7f07e979D0efa8944d940A8e22ad510"; // 替换成正确的 Faucet 合约地址

    // 获取 WeenusFaucet 合约实例
    const faucetContract = await ethers.getContractAt("WeenusFaucet", faucetAddress, signer);

    try {
        // 调用 claimTokensForAddress 方法领取代币
        const tx = await faucetContract.claimTokensForAddress(accountAddress);
        console.log("Transaction hash:", tx.hash);

        // 等待交易完成
        await tx.wait();
        console.log("Tokens claimed successfully for:", accountAddress);
    } catch (error) {
        console.error("Error while claiming tokens:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
