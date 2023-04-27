const { deployments, getNamedAccounts, network, ethers } = require('hardhat')
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

    describe("deposit", function () {
        let depositValue
        beforeEach(async function(){
            depositValue = ethers.utils.parseEther("0.1")
            const tx = await simpleBank.deposit({value: depositValue})
            await tx.wait(1)
        })
        it("saves the depositors address", async function () {
            const depositor = await simpleBank.getDepositor(0)
            assert.equal(depositor, deployer)
        })
        it("adds deposit value to the depositors balance", async function () {
            const depositorsBalance = await simpleBank.getDepositorBalance(deployer)
            assert.equal(depositorsBalance.toString(), depositValue.toString())
        })
    })

    describe("withdraw", function () {
        let depositValue, withdrawValue
        beforeEach(async function(){
            depositValue = ethers.utils.parseEther("0.5")
            const depositTx = await simpleBank.deposit({value: depositValue})
            await depositTx.wait(1)
            withdrawValue = ethers.utils.parseEther("0.2")
            const withdrawTx = await simpleBank.withdraw(withdrawValue)
            await withdrawTx.wait(1)
        })
        it("debits the depositors balance", async function () {
            const depositorsBalance = await simpleBank.getDepositorBalance(deployer)
            const balance = depositValue.sub(withdrawValue)
            assert.equal(depositorsBalance.toString(), balance.toString())
        })
    })
})