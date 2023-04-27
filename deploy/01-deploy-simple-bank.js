const { network } = require('hardhat')
const { networkConfig, developmentChains } = require('../helper-hardhat-config');


module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const minimumDepositUsd = networkConfig[network.config.chainId]['minimumDepositUsd']
    let ethUsdPriceFeedAddress

    if (developmentChains.includes(network.name)) {
        const mockV3aggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = mockV3aggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[network.config.chainId]['ethUsdPriceFeedAddress']
    }
    const args = [minimumDepositUsd, ethUsdPriceFeedAddress]
    await deploy('SimpleBank', {
        from: deployer,
        args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1
    });
};
module.exports.tags = ['all', 'simpleBank'];