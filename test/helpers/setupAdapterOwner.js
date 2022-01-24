const hre = require('hardhat')
const { ethers } = hre
const { UNI_V3_ADAPTER_OWNER } = require('../../constants')

// get adapter owner address from constants, fund it and impersonate it, return it as an ethers.js signer
async function setupAdapterOwner () {
  const [ethStore] = await ethers.getSigners()
  await ethStore.sendTransaction({
    to: UNI_V3_ADAPTER_OWNER,
    value: ethers.BigNumber.from('10000000000000000000000000')
  })
  await hre.network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: [UNI_V3_ADAPTER_OWNER],
  })
  const adapterOwner = await ethers.getSigner(UNI_V3_ADAPTER_OWNER)
  return adapterOwner
}

module.exports = setupAdapterOwner