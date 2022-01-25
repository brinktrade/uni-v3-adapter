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

// curl --request GET 'https://ygtmx28c9f.execute-api.us-east-2.amazonaws.com/prod/quote?tokenInAddress=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2&tokenInChainId=1&tokenOutAddress=0x1f9840a85d5af5bf1d1762f925bdaddc4201f984&tokenOutChainId=1&amount=100&type=exactIn'
// {"blockNumber":"14031310","amount":"100","amountDecimals":"0.0000000000000001","quote":"19505","quoteDecimals":"0.000000000000019505","quoteGasAdjusted":"-2895805831913187450","quoteGasAdjustedDecimals":"-2.89580583191318745","gasUseEstimateQuote":"2895805831913206955","gasUseEstimateQuoteDecimals":"2.895805831913206955","gasUseEstimate":"113000","gasUseEstimateUSD":"46.649175","gasPriceWei":"131526532869","route":[[{"type":"v3-pool","address":"0x1d42064Fc4Beb5F8aAF85F4617AE8b3b5B8Bd801","tokenIn":{"chainId":1,"decimals":"18","address":"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","symbol":"WETH"},"tokenOut":{"chainId":1,"decimals":"18","address":"0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984","symbol":"UNI"},"fee":"3000","liquidity":"137961608988051082333636","sqrtRatioX96":"5644462588500707972730144312","tickCurrent":"-52836","amountIn":"100","amountOut":"19505"}]],"routeString":"[V3] 100.00% = WETH -- 0.3% --> UNI","quoteId":"b9da9"}%   