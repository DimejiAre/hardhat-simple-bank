const { DECIMALS, INITIAL_ANSWER } = require('../helper-hardhat-config');

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const args = [DECIMALS, INITIAL_ANSWER]
    log("Deploying Mocks.... ")
    await deploy('MockV3Aggregator', {
        from: deployer,
        args,
        log: true,
    });
    log("<----------------------------------->")
};
module.exports.tags = ['all', 'mocks'];