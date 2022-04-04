const { ethers } = require('hardhat')
const snapshot = require('snap-shot-it')
const { expect } = require('chai')
const deploySaltedBytecode = require('@brinkninja/core/test/helpers/deploySaltedBytecode')
const { UNI_V3_ADAPTER, UNI_V3_ADAPTER_02 } = require('../constants')

describe('UniV3Adapter.sol', function () {
  it('deterministic address check', async function () {
    const UniV3Adapter = await ethers.getContractFactory('UniV3Adapter')
    const address = await deploySaltedBytecode(UniV3Adapter.bytecode, [], [])
    console.log(address)
    snapshot(address)
    expect(address, 'Deployed account address and UNI_V3_ADAPTER constant are different').to.equal(UNI_V3_ADAPTER)
  })
})

describe('UniV3Adapter02.sol', function () {
  it('deterministic address check', async function () {
    const UniV3Adapter02 = await ethers.getContractFactory('UniV3Adapter02')
    const address = await deploySaltedBytecode(UniV3Adapter02.bytecode, [], [])
    console.log(address)
    snapshot(address)
    expect(address, 'Deployed account address and UNI_V3_ADAPTER_02 constant are different').to.equal(UNI_V3_ADAPTER_02)
  })
})
