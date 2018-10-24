const abiDecoder = require('abi-decoder');
const Web3 = require('web3');
const erc20Abi = require('./abis/AbiErc20.json');
const erc20SummarLogicAbi = require('./abis/AbiErc20SummaryLogic.json');

const decodeErc20Transfer = async (rawData) => {
    abiDecoder.addABI(erc20Abi);
    const decodedData = abiDecoder.decodeMethod(rawData);
    console.log(decodedData);
}

const balancesForAddress = async (address) => {
    const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/'));
    const logic = await new web3.eth.Contract(erc20SummarLogicAbi, '0x000003Ed2eB44CdeD8AdE31c01dda60dA466b2D1');
    const result = await logic.methods.erc20BalanceForAddress(address).call();

    for (i = 0; i < result['0'].length; i++) { 
        let float = '0.0';
        if(result['1'][i] > 0) {
            float = result['1'][i].substr(0, result['1'][i].length - result['2'][i]) + '.' + result['1'][i].substr(result['1'][i].length - result['2'][i]);
        }
        console.log('Has balance ' + float + ' for Erc20 contract ' + result['0'][i]);
    }
}

decodeErc20Transfer('0xa9059cbb000000000000000000000000ec6632f2bf8ec15e1266599c25117a34ac37bb87000000000000000000000000000000000000000000000002c1bb54833b835800');
balancesForAddress('0x5894110995b8c8401bd38262ba0c8ee41d4e4658');
