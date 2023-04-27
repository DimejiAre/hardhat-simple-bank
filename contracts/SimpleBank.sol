//SPDX-License-Indentifier:MIT

pragma solidity ^0.8.7;

error NOT_ENOUGH_FUNDS_IN_ACCOUNT();
error FAILED_TO_SEND_ETHER();

contract SimpleBank {
    uint256 immutable i_minimumDepositUsd;
    address[] private s_depositors;
    mapping (address => uint256) s_depositorsToBalance;

    constructor(uint256 minimumDepositUsd) {
        i_minimumDepositUsd = minimumDepositUsd * 1e18;
    }

    function deposit () public payable {
        s_depositorsToBalance[msg.sender] += msg.value;
        s_depositors.push(msg.sender);
    }

    function withdraw (uint256 amount) public {
        uint256 balance = s_depositorsToBalance[msg.sender];
        if (amount < balance) revert NOT_ENOUGH_FUNDS_IN_ACCOUNT();
        (bool success, ) = msg.sender.call{value: amount}("");
        if (!success) revert FAILED_TO_SEND_ETHER();
        s_depositorsToBalance[msg.sender] -= amount;
    }

    function checkBalance(address depositorAddress) public view returns (uint256) {
        return s_depositorsToBalance[depositorAddress];
    }

    function getMinimumDepositUsd() public view returns (uint256) {
        return i_minimumDepositUsd;        
    }
}