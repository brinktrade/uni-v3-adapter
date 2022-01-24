const fs = require('fs')
const constants = require('./constants')

const contracts = [
  ['./artifacts/contracts/adapter/UniV3Adapter.sol/UniV3Adapter.json', constants.UNI_V3_ADAPTER]
]

function generateInterface () {
  let contractsJSON = {}
  for (let i in contracts) {
    const [path, address] = contracts[i]
    const { contractName, abi, bytecode, deployedBytecode } = require(path)
    contractsJSON[contractName] = { address, abi, bytecode, deployedBytecode }
  }
  console.log('Writing index.js file...')
  fs.writeFileSync('./index.js', `module.exports = ${JSON.stringify(contractsJSON, null, 2)}\n`)
  console.log('done')
  console.log()
}

generateInterface()