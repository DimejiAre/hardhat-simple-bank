//SPDX-License-Indentifier:MIT

pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getConversionRate(uint256 amount, AggregatorV3Interface priceFeed) internal view returns (uint256){
        uint256 decimals = uint256(priceFeed.decimals());
        decimals = 18 - decimals;
        (,int256 answer,,,) = priceFeed.latestRoundData();
        uint256 ethUsdPrice = uint256(answer) * 10**decimals;
        return (amount * ethUsdPrice) / 1e18;
    }
}