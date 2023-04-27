const { run } = require('hardhat')

async function verify(contractAddress, args) {
    await run("verify:verify", {
        address: contractAddress,
        constructorArguments: args,
    });
}

module.exports = { verify }