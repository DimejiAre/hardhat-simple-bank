const { network } = require('hardhat')
const { networkConfig, developmentChains } = require('../helper-hardhat-config');
const { verify } = require('../utils/verify')

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
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
    log("Deploying SimpleBank contract...")
    const simpleBank = await deploy('SimpleBank', {
        from: deployer,
        args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1
    });
    log("<-------------------->")

    log("verifying....")
    if (!developmentChains.includes(network.name)) {
        await verify(simpleBank.address,args)
    }
};
module.exports.tags = ['all', 'simpleBank'];