// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./WeenusToken.sol";

contract WeenusFaucet {
    WeenusToken public weenusToken;
    uint256 public constant TOKEN_AMOUNT = 10 * 10 ** 18; // 每次领取 10 个 Weenus token

    constructor(address _weenusToken) {
        weenusToken = WeenusToken(_weenusToken);
    }

    function claimTokensForAddress(address recipient) external {
        weenusToken.mint(recipient, TOKEN_AMOUNT); // 直接铸造代币并发放
    }
}
