const hre = require('hardhat')
const { ethers } = hre
const { expect } = require('chai')
const brinkUtils = require('@brinkninja/utils')
const { randomHex, toChecksumAddress } = require('web3-utils')
const { MAX_UINT_256, BN } = brinkUtils
const snapshotGas = require('./helpers/snapshotGas')
const setupAdapterOwner = require('./helpers/setupAdapterOwner')

const DAI_WHALE = '0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0'
const WETH_ADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
const DAI_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f'

// 100000000000000000000 wei 
const ONE_HUNDRED = '100000000000000000000'

describe('uniV3Swap', function () {

    
})