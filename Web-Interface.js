var A;
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/42ee8532413f4c9b93840672260234bf"));

web3.eth.getBlockNumber().then(async function(result){console.log(result);}); // ici result me retourne ne entier. Je veuix que cet entier soit ensuite injecté dans la variable A
web3.eth.getBlock(9271021).then(async function(result){console.log(result);}); // 92711021 serait ici la Variable A, resilt retournera un autre entier que j'aimerais utiliser dans la suite du soft
console.log(A);
