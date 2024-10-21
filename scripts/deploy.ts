const { ethers } = require("hardhat");

async function main() {
  // 部署 Weenus Token 合约
  const WeenusToken = await ethers.getContractFactory("WeenusToken");
  const weenusToken = await WeenusToken.deploy();
  await weenusToken.waitForDeployment();  // ethers v6 中使用 waitForDeployment
  console.log("WeenusToken deployed to:", weenusToken.target);  // ethers v6 使用 target 获取地址

  // 部署 Weenus Faucet 合约
  const WeenusFaucet = await ethers.getContractFactory("WeenusFaucet");
  const weenusFaucet = await WeenusFaucet.deploy(weenusToken.target);  // ethers v6 target 替代 address
  await weenusFaucet.waitForDeployment();
  console.log("WeenusFaucet deployed to:", weenusFaucet.target);

  // 设置 Faucet 合约为 WeenusToken 合约的授权铸造者
  await weenusToken.setFaucet(weenusFaucet.target);
  console.log("Faucet address set in WeenusToken");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
