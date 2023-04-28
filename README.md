# Hardhat Simple Bank

This project is a smart contract that implements the functionality of a simple bank. 

- [Hardhat Simple Bank](#hardhat-simple-bank)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Quickstart](#quickstart)
- [Usage](#usage)
  - [Testing](#testing)
    - [Test Coverage](#test-coverage)
- [Deployment to a testnet or mainnet](#deployment-to-a-testnet-or-mainnet)
- [Thank you!](#thank-you)

This project is apart of the Hardhat FreeCodeCamp video.

# Getting Started

## Requirements

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Nodejs](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started/install)

## Quickstart

```
git clone https://github.com/DimejiAre/hardhat-simple-bank
cd hardhat-simple-bank
yarn
```

# Usage

Deploy:

```
yarn hardhat deploy
```

## Testing

```
yarn hardhat test
```

### Test Coverage

```
yarn hardhat coverage
```

# Deployment to a testnet or mainnet

1. Setup environment variables

- `PRIVATE_KEY`
- `SEPOLIA_RPC_URL`
- `ETHERSCAN_API_KEY`

2. Get testnet ETH

[faucets.chain.link](https://faucets.chain.link/)

3. Deploy

```
yarn hardhat deploy --network sepolia
```

# Thank you!