const hre = require('hardhat')
const { ethers } = hre
const { expect } = require('chai')
const brinkUtils = require('@brinkninja/utils')
const { randomHex, toChecksumAddress } = require('web3-utils')
const { MAX_UINT_256, BN } = brinkUtils
const snapshotGas = require('./helpers/snapshotGas')
const setupAdapterOwner = require('./helpers/setupAdapterOwner')
const { AlphaRouter } = require("@uniswap/smart-order-router")
const { Token, CurrencyAmount, TradeType } = require('@uniswap/sdk-core')

const DAI_WHALE = '0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0'
const WETH_ADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
const DAI_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f'

// 100000000000000000000 wei 
const ONE_HUNDRED = '100000000000000000000'


const WETH = new Token(
  1,
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  18,
  'WETH',
  'Wrapped Ether'
);

const DAI = new Token(
  1,
  '0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0',
  18,
  'DAI',
  'Dai Stablecoin'
);

const USDC = new Token(
  1,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD//C'
);

describe('uniV3Swap', function () {
  beforeEach(async function () {
    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [DAI_WHALE],
    })
    const daiWhale = await hre.ethers.getSigner(DAI_WHALE)

    const UniV3Adapter = await ethers.getContractFactory('UniV3Adapter')
    this.dai = (await ethers.getContractAt('IERC20', DAI_ADDRESS)).connect(daiWhale)
    this.weth = await ethers.getContractAt('IERC20', WETH_ADDRESS)
    this.accountAddress = '0xa2884fB9F79D7060Bcfaa0e7D8a25b7F725de2fa'
    this.adapterOwner = await setupAdapterOwner()
    this.adapter = (await UniV3Adapter.deploy()).connect(this.adapterOwner)
    await this.adapter.initialize(WETH_ADDRESS)

    // Send DAI to UniV3Adapter
    await this.dai.transfer(this.adapter.address, ONE_HUNDRED)
    
    const router = new AlphaRouter({ chainId: 1, provider: ethers.provider})
    // OR YOU CAN TRY:
    // const router = new AlphaRouter({ chainId: 1, provider: ethers.getDefaultProvider(1, { alchemy: process.env.ALCHEMY_KEY })})
    // This will provide a different error (I beleive no routes available)
    const wethAmount = CurrencyAmount.fromRawAmount(WETH, ONE_HUNDRED);
    const route = await router.route(
      wethAmount,
      USDC,
      TradeType.EXACT_IN
    )
    console.log("DONE")
    console.log(route)
  })

  describe('token to token', function () {
    it('should swap DAI to WETH', async function () {
      const initialDaiBalance = await this.dai.balanceOf(this.adapter.address)
      const initialWethBalance = await this.weth.balanceOf(this.accountAddress)

      // await this.adapter.uniV3Swap(daiToWethCallData, DAI_ADDRESS, ONE_HUNDRED, WETH_ADDRESS, '10', this.accountAddress)

      // const finalDaiBalance = await this.dai.balanceOf(this.adapter.address)
      // const finalWethBalance = await this.weth.balanceOf(this.accountAddress)

      // expect(finalWethBalance.eq(initialWethBalance.add(BN('10')))).to.equal(true)
      // expect(finalDaiBalance.eq(initialDaiBalance.sub(BN(ONE_HUNDRED)))).to.equal(true)
    })
  })
})