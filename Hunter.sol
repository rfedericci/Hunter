// SPDX-License-Identifier: MIT

pragma solidity ^0.7.5;
//import "../Openzeppelin/contracts/token/ERC20/ERC20.sol";


//contract Hunter is ERC20
contract Hunter
{
    uint TimeCreation = block.timestamp;
    address payable public Keeper;
    mapping(address => uint8) Clues_Hunters;
    mapping(address => uint) Timer_Hunters;
    address[] public list_hunters;
    //uint public maggot =  address(this).balance;
    bytes32[] answers = [keccak256(abi.encode("start")),
    keccak256(abi.encode("Reponse1")), //Will be the answer of the 1st enigma
    keccak256(abi.encode("Reponse2")), //Will be the answer of the 2nd enigma
    keccak256(abi.encode("Reponse3")), //Will be the answer of the 3rd enigma
    keccak256(abi.encode("Reponse4")), //Will be the answer of the 4th enigma
    keccak256(abi.encode("Reponse5"))]; //Will be the answer of the 5th enigma
   
    //constructor() payable public ERC20("HunterCoin", "HTC")
    constructor() payable public
    {
        Keeper = msg.sender;
    }
   
    modifier onlyByOwner()
    {    
    require(msg.sender == Keeper);
    _;
    }
   
    modifier onlyAfterYear()
    {
    require(block.timestamp - TimeCreation > 32000000);
    _;
    }
   
   
    modifier cantbekeeper()
    {
    require(msg.sender != Keeper);
    _;
    }
   
    modifier isnotenought()
    {
    require(msg.value >= 0.01 ether); //Amount to pay to be registered as hunter
    _;
    }
   
    modifier needtowait()
    {
    require(block.timestamp - Timer_Hunters[msg.sender] >= 43200); //One anwser can be subimitted every 12hours
    _;
    }
   
    modifier existinghunter()
    {
    require(Clues_Hunters[msg.sender] == 1);
    _;
    }
   
    modifier notexistinghunter()
    {
    require(Clues_Hunters[msg.sender] == 0);
    _;
    }
   
    function killitself() onlyByOwner onlyAfterYear public
   {
    selfdestruct(Keeper);
   }
   
   receive() external payable{}
   fallback() external {}
   
    function Submit_answer(string memory mystring) needtowait existinghunter payable public
    {
    Timer_Hunters[msg.sender] = block.timestamp;
        bytes32 hash = keccak256(abi.encode(mystring));
        bytes32 right_answer = answers[Clues_Hunters[msg.sender]];
        if (hash == right_answer){Clues_Hunters[msg.sender] += 1;}
        if (Clues_Hunters[msg.sender] == 6){msg.sender.transfer(address(this).balance);} //Once the 5th enigma is resolbed the total amounf of ether is transfered to the hunter
    }
   
    function balance() public view returns(uint)
    {
        return address(this).balance;
    }
   
   
    function Add_hunter() cantbekeeper isnotenought notexistinghunter payable public
    {
        Timer_Hunters[msg.sender] = block.timestamp;
        Clues_Hunters[msg.sender] = 1;
        list_hunters.push(msg.sender);
    }
   
    function clue() public view returns(uint8)
    {
        return Clues_Hunters[msg.sender];
    }
   
    function hunters() public view returns(uint)
    {
        return list_hunters.length;
    }
   
   
}
