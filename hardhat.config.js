require('dotenv').config()
require('@nomiclabs/hardhat-ethers')

const chai = require('chai')
const { solidity } = require('ethereum-waffle')
chai.use(solidity)

const { ALCHEMY_URL } = process.env
if (!ALCHEMY_URL) {
  throw new Error(`ALCHEMY_URL required, add to .env file`)
}

const compilerSettings = {
  optimizer: {
    enabled: true,
    runs: 800
  },
  metadata: { bytecodeHash: 'none' }
}

module.exports = {
  networks: {
    hardhat: {
      accounts: {
        accountsBalance: '1000000000000000000000000000', // 1 billion ETH
        mnemonic: 'myth version trip movie key power unhappy benefit hip sad account copper'
      },
      allowUnlimitedContractSize: true,
      forking: {
        url: ALCHEMY_URL,
        blockNumber: 13779923
      }
    }
  },
  solidity: {
    compilers: [
      {
        version: '0.8.10',
        settings: compilerSettings
      }
    ]
  }
}