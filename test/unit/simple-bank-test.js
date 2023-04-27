const { deployments, getNamedAccounts, network } = require('hardhat')
const { assert } = require('chai')
const { networkConfig } = require('../../helper-hardhat-config')

describe("SimpleBank", function () {
    let deployer, simpleBank
    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        simpleBank = await ethers.getContract('SimpleBank', deployer)
    })

    describe("constructor", function () {
        it("sets minimumDepositInUsd", async function () {
            const expectedMinimumDepositUsd = (networkConfig[network.config.chainId]['minimumDepositUsd'] * 1e18).toString()
            const miminimumDepositUsd = (await simpleBank.getMinimumDepositUsd()).toString()
            assert.equal(miminimumDepositUsd, expectedMinimumDepositUsd)
        })
    })
})