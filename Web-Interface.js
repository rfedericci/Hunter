var A;
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/42ee8532413f4c9b93840672260234bf"));

async function LatestBlock() {
    let BlockNum =  await web3.eth.getBlockNumber().then(async function(result){return result;});
    return BlockNum;
};
LatestBlock();

async function DatafromBlock() {
    let BlockNum = await LatestBlock();
    let DataBlock = await web3.eth.getBlock(BlockNum).then(async function(result){return result;});
    console.log(DataBlock);
    return DataBlock;
};
DatafromBlock();

