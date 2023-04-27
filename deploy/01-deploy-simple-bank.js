const { network } = require('hardhat')
const { networkConfig } = require('../helper-hardhat-config');


module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const minimumDepositUsd = networkConfig[network.config.chainId]['minimumDepositUsd']
    const args = [minimumDepositUsd]
    await deploy('SimpleBank', {
        from: deployer,
        args,
        log: true,
    });
};
module.exports.tags = ['all', 'simpleBank'];