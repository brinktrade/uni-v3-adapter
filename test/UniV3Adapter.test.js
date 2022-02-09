const hre = require('hardhat')
const { ethers } = hre
const { expect } = require('chai')
const brinkUtils = require('@brinkninja/utils')
const { MAX_UINT_256, BN } = brinkUtils
const setupAdapterOwner = require('./helpers/setupAdapterOwner')
const axios = require('axios');

const DAI_WHALE = '0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0'
const WETH_ADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
const DAI_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f'
const UNI_ADDRESS = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

// 100000000000000000000 wei 
const ONE_HUNDRED = '100000000000000000000'

describe('uniV3Swap', function () {
  beforeEach(async function () {
    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [DAI_WHALE],
    })
    const daiWhale = await hre.ethers.getSigner(DAI_WHALE)
    const UniV3Adapter = await ethers.getContractFactory('UniV3Adapter')
    this.dai = (await ethers.getContractAt('IERC20', DAI_ADDRESS)).connect(daiWhale)
    this.weth = (await ethers.getContractAt('IERC20', WETH_ADDRESS)).connect(daiWhale)
    this.uni = await ethers.getContractAt('IERC20', UNI_ADDRESS)
    this.accountAddress = '0xa2884fB9F79D7060Bcfaa0e7D8a25b7F725de2fa'
    this.adapterOwner = await setupAdapterOwner()
    this.adapter = await UniV3Adapter.deploy()
    await this.adapter.initialize(WETH_ADDRESS)
    await this.dai.transfer(this.adapter.address, ONE_HUNDRED)
    await this.weth.transfer(this.adapter.address, ONE_HUNDRED)
  })

  it('token to weth', async function () {

    const requestString = process.env.UNI_ROUTER_API + 'quote?' +
    'tokenInAddress=' + DAI_ADDRESS + '&' +
    'tokenInChainId=1&' +
    'tokenOutAddress=' + WETH_ADDRESS + '&' +
    'tokenOutChainId=1&' +
    'amount=' + ONE_HUNDRED + '&' +
    'type=exactIn&' +
    'protocols=v2,v3&' +
    'recipient=' + this.adapter.address + '&' +
    'slippageTolerance=20&' +
    'deadline=10800'
    const resp = await axios.get(requestString)
          
    const initialDaiBalance = await this.dai.balanceOf(this.adapter.address)
    const initialWethBalance = await this.weth.balanceOf(this.accountAddress)
    const initialWethOwnerBalance = await this.weth.balanceOf(this.adapterOwner.address)
  
    await this.adapter.uniV3Swap(resp.data.methodParameters.calldata, DAI_ADDRESS, ONE_HUNDRED, WETH_ADDRESS, '10', this.accountAddress)

    const finalDaiBalance = await this.dai.balanceOf(this.adapter.address)
    const finalWethBalance = await this.weth.balanceOf(this.accountAddress)
    const finalWethOwnerBalance = await this.weth.balanceOf(this.adapterOwner.address)

    expect(finalWethOwnerBalance.gt(initialWethOwnerBalance)).to.equal(true)
    expect(finalWethBalance.eq(initialWethBalance.add(BN('10')))).to.equal(true)
    expect(finalDaiBalance.eq(initialDaiBalance.sub(BN(ONE_HUNDRED)))).to.equal(true)
  })

  it('weth to token', async function () {
    const requestString = process.env.UNI_ROUTER_API + 'quote?' +
    'tokenInAddress=' + WETH_ADDRESS + '&' +
    'tokenInChainId=1&' +
    'tokenOutAddress=' + DAI_ADDRESS + '&' +
    'tokenOutChainId=1&' +
    'amount=' + ONE_HUNDRED + '&' +
    'type=exactIn&' +
    'protocols=v2,v3&' +
    'recipient=' + this.adapter.address + '&' +
    'slippageTolerance=20&' +
    'deadline=10800'
    const resp = await axios.get(requestString)
          
    const initialDaiBalance = await this.dai.balanceOf(this.accountAddress)
    const initialWethBalance = await this.weth.balanceOf(this.adapter.address)
    const initialDaiOwnerBalance = await this.dai.balanceOf(this.adapterOwner.address)
  
    await this.adapter.uniV3Swap(resp.data.methodParameters.calldata, WETH_ADDRESS, ONE_HUNDRED, DAI_ADDRESS, '10', this.accountAddress)

    const finalDaiBalance = await this.dai.balanceOf(this.accountAddress)
    const finalWethBalance = await this.weth.balanceOf(this.adapter.address)
    const finalDaiOwnerBalance = await this.dai.balanceOf(this.adapterOwner.address)

    expect(finalDaiOwnerBalance.gt(initialDaiOwnerBalance)).to.equal(true)
    expect(finalWethBalance.eq(initialWethBalance.sub(BN(ONE_HUNDRED)))).to.equal(true)
    expect(finalDaiBalance.eq(initialDaiBalance.add(BN('10')))).to.equal(true)
  })

  it('token to token', async function () {
    const requestString = process.env.UNI_ROUTER_API + 'quote?' +
    'tokenInAddress=' + DAI_ADDRESS + '&' +
    'tokenInChainId=1&' +
    'tokenOutAddress=' + UNI_ADDRESS + '&' +
    'tokenOutChainId=1&' +
    'amount=' + ONE_HUNDRED + '&' +
    'type=exactIn&' +
    'protocols=v2,v3&' +
    'recipient=' + this.adapter.address + '&' +
    'slippageTolerance=20&' +
    'deadline=10800'
    const resp = await axios.get(requestString)
          
    const initialDaiBalance = await this.dai.balanceOf(this.adapter.address)
    const initialUniBalance = await this.uni.balanceOf(this.accountAddress)
    const initialUniOwnerBalance = await this.uni.balanceOf(this.adapterOwner.address)
  
    await this.adapter.uniV3Swap(resp.data.methodParameters.calldata, DAI_ADDRESS, ONE_HUNDRED, UNI_ADDRESS, '10', this.accountAddress)

    const finalDaiBalance = await this.dai.balanceOf(this.adapter.address)
    const finalUniBalance = await this.uni.balanceOf(this.accountAddress)
    const finalUniOwnerBalance = await this.uni.balanceOf(this.adapterOwner.address)

    expect(finalUniOwnerBalance.gt(initialUniOwnerBalance)).to.equal(true)
    expect(finalDaiBalance.eq(initialDaiBalance.sub(BN(ONE_HUNDRED)))).to.equal(true)
    expect(finalUniBalance.eq(initialUniBalance.add(BN('10')))).to.equal(true)
  })

  it('eth to token', async function () {
    const requestString = process.env.UNI_ROUTER_API + 'quote?' +
    'tokenInAddress=' + WETH_ADDRESS + '&' +
    'tokenInChainId=1&' +
    'tokenOutAddress=' + UNI_ADDRESS + '&' +
    'tokenOutChainId=1&' +
    'amount=' + ONE_HUNDRED + '&' +
    'type=exactIn&' +
    'protocols=v2,v3&' +
    'recipient=' + this.adapter.address + '&' +
    'slippageTolerance=20&' +
    'deadline=10800'
    const resp = await axios.get(requestString)

    const initialUniBalance = await this.uni.balanceOf(this.accountAddress)
    const initialUniOwnerBalance = await this.uni.balanceOf(this.adapterOwner.address)

    await this.adapter.uniV3Swap(resp.data.methodParameters.calldata, ETH_ADDRESS, ONE_HUNDRED, UNI_ADDRESS, '10', this.accountAddress, { value: ethers.utils.parseEther("100.0") })

    const finalUniBalance = await this.uni.balanceOf(this.accountAddress)
    const finalUniOwnerBalance = await this.uni.balanceOf(this.adapterOwner.address)

    expect(finalUniOwnerBalance.gt(initialUniOwnerBalance)).to.equal(true)
    expect(finalUniBalance.eq(initialUniBalance.add(BN('10')))).to.equal(true)
  })

  it('token to eth', async function () {
    const requestString = process.env.UNI_ROUTER_API + 'quote?' +
    'tokenInAddress=' + DAI_ADDRESS + '&' +
    'tokenInChainId=1&' +
    'tokenOutAddress=' + WETH_ADDRESS + '&' +
    'tokenOutChainId=1&' +
    'amount=' + ONE_HUNDRED + '&' +
    'type=exactIn&' +
    'protocols=v2,v3&' +
    'recipient=' + this.adapter.address + '&' +
    'slippageTolerance=20&' +
    'deadline=10800'
    const resp = await axios.get(requestString)
          
    const initialDaiBalance = await this.dai.balanceOf(this.adapter.address)
    const initialEthOwnerBalance = await ethers.provider.getBalance(this.adapterOwner.address)
    const initialEthBalance = await ethers.provider.getBalance(this.accountAddress);

    await this.adapter.uniV3Swap(resp.data.methodParameters.calldata, DAI_ADDRESS, ONE_HUNDRED, ETH_ADDRESS, '10', this.accountAddress, { value: ethers.utils.parseEther("100.0") })

    const finalDaiBalance = await this.dai.balanceOf(this.adapter.address)
    const finalEthOwnerBalance = await ethers.provider.getBalance(this.adapterOwner.address)
    const finalEthBalance = await ethers.provider.getBalance(this.accountAddress);

    expect(finalDaiBalance.eq(initialDaiBalance.sub(BN(ONE_HUNDRED)))).to.equal(true)
    expect(finalEthOwnerBalance.gt(initialEthOwnerBalance)).to.equal(true)
    expect(finalEthBalance.eq(initialEthBalance.add(BN('10')))).to.equal(true)
  })

  it('should revert with reason string from swap router', async function () {
    const calldata = '0x5ae401dc00000000000000000000000000000000000000000000000000000000520416d200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000e404e45aaf0000000000000000000000006b175474e89094c44da98b954eedeac495271d0f000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000000000000000000000000000000000000000001f400000000000000000000000002c700918fadc472317d6741d35965deb3a7a4370000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000000000000000000000000000005b22cbfe9af800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'

    await expect(
      this.adapter.uniV3Swap(calldata, DAI_ADDRESS, ONE_HUNDRED, ETH_ADDRESS, '10', this.accountAddress, { value: ethers.utils.parseEther("100.0") })
    ).to.be.revertedWith('Transaction too old')
  })
})
