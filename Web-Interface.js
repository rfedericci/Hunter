var A;
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/42ee8532413f4c9b93840672260234bf"));

//web3.eth.getBlockNumber().then(async function(result){console.log(result);});
//web3.eth.getBlock(9271021).then(async function(result){console.log(result);});
  

const PromiseLatestBlock = Promise.resolve(web3.eth.getBlockNumber().then(async function(result){return result;}));
PromiseLatestBlock.then((value) => {console.log(value);});

ValuePromiseLatestBlock = PromiseLatestBlock.then((value) => {return value;});

web3.eth.getBlock(PromiseLatestBlock.then((value) => {return value;})).then(async function(result){console.log(result);});
