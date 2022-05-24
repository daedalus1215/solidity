const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const config = require("./deploy-config.js");

const provider = new HDWalletProvider(
  config.mnemonicPhrase,
  // remember to change this to your own phrase!
  'https://rinkeby.infura.io/v3/24cfda321bbf4cb082f3b8d9e86887d6',

);
const web3 = new Web3(provider);

const deploy = async () => {
  web3.eth.getBlock("latest", false, (error, result) => {
    console.log('gasLimit', result.gasLimit)
    // => 8000029
  });

  
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '30000000', from: accounts[3] });

    console.log('interface', interface);
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
