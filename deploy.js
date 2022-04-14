const HDWalletProvider = require('@truffle/hdwallet-provider');
const { mnemonic, providerUrl } = require('./deploy-config.json');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    mnemonic, // address with the ether to deploy contract
    providerUrl
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(interface)) //interface is the "ABI"
    .deploy({data: bytecode, arguments: ['Initial Message in our contract!']})
    .send({gas: '1000000', from: accounts[0]}) // 1m gas, and assuming first account in list is used to deploy our contract.

    console.log('address our contract is deployed to: ', result.options.address);
}

deploy();