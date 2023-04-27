//SPDX-License-Indentifier:MIT

pragma solidity ^0.8.7;

import './PriceConverter.sol';

error NOT_ENOUGH_FUNDS_IN_ACCOUNT();
error FAILED_TO_SEND_ETHER();
error DEPOSIT_MORE_FUNDS();

contract SimpleBank {
    using PriceConverter for uint256;
    
    uint256 immutable i_minimumDepositUsd;
    address[] private s_depositors;
    mapping (address => uint256) s_depositorsToBalance;
    AggregatorV3Interface immutable i_priceFeed;

    constructor(uint256 minimumDepositUsd, address ethUsdPriceFeedAddress) {
        i_minimumDepositUsd = minimumDepositUsd;
        i_priceFeed = AggregatorV3Interface(ethUsdPriceFeedAddress);
    }

    function deposit () public payable {
        uint256 priceInUsd = msg.value.getConversionRate(i_priceFeed);
        if (priceInUsd < i_minimumDepositUsd) revert DEPOSIT_MORE_FUNDS();
        s_depositorsToBalance[msg.sender] += msg.value;
        s_depositors.push(msg.sender);
    }

    function withdraw (uint256 amount) public {
        uint256 balance = s_depositorsToBalance[msg.sender];
        if (balance < amount) revert NOT_ENOUGH_FUNDS_IN_ACCOUNT();
        (bool success, ) = msg.sender.call{value: amount}("");
        if (!success) revert FAILED_TO_SEND_ETHER();
        s_depositorsToBalance[msg.sender] -= amount;
    }

    function getMinimumDepositUsd() public view returns (uint256) {
        return i_minimumDepositUsd;        
    }

    function getDepositor(uint256 index) public view returns (address) {
        return s_depositors[index];
    }

    function getDepositorBalance(address depositorAddress) public view returns (uint256) {
        return s_depositorsToBalance[depositorAddress];
    }
}