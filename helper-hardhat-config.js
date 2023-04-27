const networkConfig = {
    31337: {
        minimumDepositUsd: "50"
    },
    11155111: {
        minimumDepositUsd: "50",
        ethUsdPriceFeedAddress: "0x694AA1769357215DE4FAC081bf1f309aDC325306"
    }
}

const developmentChains = ["hardhat", "localhost"]

const DECIMALS = 8
const INITIAL_ANSWER = 2000

module.exports = { networkConfig, developmentChains, DECIMALS, INITIAL_ANSWER }