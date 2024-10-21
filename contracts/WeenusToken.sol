// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WeenusToken is ERC20 {
    address public faucet;

    constructor() ERC20("Weenus", "WEENUS") {
        _mint(msg.sender, 1000000 * 10 ** decimals()); // 初始发行 100 万个 Weenus token
    }

    modifier onlyFaucet() {
        require(msg.sender == faucet, "Only faucet can mint");
        _;
    }

    function setFaucet(address _faucet) external {
        require(faucet == address(0), "Faucet already set");
        faucet = _faucet;
    }

    function mint(address to, uint256 amount) external onlyFaucet {
        _mint(to, amount);
    }
}
