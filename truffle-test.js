let Hunter = artifacts.require("./Hunter.sol");
let HunterInstance;

contract('The hunter contract', function (accounts) {
 
//Positive Test 1a
it("1a) The hunter contract has been deployed", function() {
return Hunter.deployed().then(function (instance) {
HunterInstance = instance;
//assert(HunterInstance !== undefined, 'Ballot contract should be defined');
});
});  

//Positive Test 1b
it("1b) Once deployed, 0.1 ether is sent by keeper to the contract", async () => {
    web3.eth.sendTransaction({from: accounts[0], to: HunterInstance.address, value: "100000000000000000", gasPrice: 100000});
        });
       
        const Expected_value_0 = web3.utils.toBN("100000000000000000");
        //Positive Test 1c
it("1c) We check that the new balance is equal to 0.1 ether", () => {
return HunterInstance.balance().then(function(result){
  expect(result).to.eql(Expected_value_0);
});
});

//Negative Test 2
  it("2) A request to register a new hunter has been made from the keeper, it should failed cause not allowed", () => {
  //return HunterInstance.Add_hunter({from: accounts[0]}).then(assert.fail).catch(function(error){
    return HunterInstance.Add_hunter().catch(function(error){
error.message;
      });
    });    
   
    //Positive Test 3a
it("3a) A request to register a new hunter has been made from a new address, 0.1eth sent", function() {
return HunterInstance.Add_hunter({from: accounts[1], value: "100000000000000000", gasPrice: 100000}).then(function(result){
expect(result.toString()).to.not.be.equal("error");
});
});
   
//Positive Test 3b
it("3b) the length of the hunter list should be 1, a hunter has been regiesterd", function() {
return HunterInstance.hunters().then(function(result){
expect(result.toString()).to.be.equal("1");
});
});

   
    const Expected_value_1 = web3.utils.toBN("200000000000000000");
    //Positive Test 3c
it("3c) We check that the new balance is equal to 0.2 ether", () => {
return HunterInstance.balance().then(function(result){
  expect(result).to.eql(Expected_value_1);
});
});

//Negative Test 4a
  it("4a) A request to register a new hunter has been made from a new accounts, but only 0.00001 ether has been sent. It should not be accepted", () => {
  return HunterInstance.Add_hunter({from: accounts[2], value: "10000000000000", gasPrice: 100000}).catch(function(error){
error.message;
      });
    });    
   
    //Negative Test 4b
it("4b) the length of the hunter list should not be 2, previous request has been rejected", function() {
return HunterInstance.hunters().then(function(result){
expect(result.toString()).to.not.be.equal("2");
});
});

   
    //Positive Test 5a
it("5a) The registered hunter check his level", function() {
return HunterInstance.clue({from: accounts[1]}).then(function(result){
expect(result.toString()).to.be.equal("1");
});
});


const Fun_1 = web3.utils.sha3("Submit_answer")
const Ans_1 = web3.utils.asciiToHex("Reponse1")
//Positive Test 5b
it("5b) The registered hunter send the 1st correct answer", async () => {
    web3.eth.sendTransaction({from: accounts[1], to: HunterInstance.address, value: "0", gasPrice: 100000, data:Fun_1});
        });

//Positive Test 5c
it("5c) The hunter check his level, it's 2", function() {
return HunterInstance.clue({from: accounts[1]}).then(function(result){
expect(result.toString()).to.be.equal("2");
});
});

//Positive Test 5d
it("5b) The registered hunter send the 2nd correct answer, expect error cause time delay not elapsed", function() {
return HunterInstance.Submit_answer({from: accounts[1], data :"Reponse2"}).catch(function(error){
error.message;
});
});
       


  
