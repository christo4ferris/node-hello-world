var myContract;
function getContract() {
  if (typeof window.web3 !== "undefined" && typeof window.web3.currentProvider !== "undefined") {
      var web3 = new Web3(window.web3.currentProvider);
    } else {
      var web3 = new Web3();
    }
  web3.setProvider(new web3.providers.HttpProvider("http://localhost:5000"));
  var account = web3.eth.accounts[ 0 ];
  var address = "86a33d389dd38e10970847ed75331d43f320c93b";
  var votingABI = [{
  "constant": false,
  "inputs": [
    {
      "name": "to",
      "type": "address"
    }
  ],
  "name": "delegate",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "voter",
      "type": "address"
    }
  ],
  "name": "giveRightToVote",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "name": "proposalNames",
      "type": "bytes32[]"
    }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "constructor"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "proposal",
      "type": "uint256"
    }
  ],
  "name": "vote",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "chairperson",
  "outputs": [
    {
      "name": "",
      "type": "address"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "proposals",
  "outputs": [
    {
      "name": "name",
      "type": "bytes32"
    },
    {
      "name": "voteCount",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "",
      "type": "address"
    }
  ],
  "name": "voters",
  "outputs": [
    {
      "name": "weight",
      "type": "uint256"
    },
    {
      "name": "voted",
      "type": "bool"
    },
    {
      "name": "delegate",
      "type": "address"
    },
    {
      "name": "vote",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "winnerName",
  "outputs": [
    {
      "name": "winnerName_",
      "type": "bytes32"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "winningProposal",
  "outputs": [
    {
      "name": "winningProposal_",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}
];
  var VotingContract = web3.eth.contract(votingABI);
  myContract = VotingContract.at(address);
}
function voteA() {
  myContract.vote('0');
}
function voteB() {
  myContract.vote('0');
}
function getResults() {
  getContract();
  var optionA = myContract.proposals('0').toString();
  var optionB = myContract.proposals('1').toString();
  document.getElementById('opta').innerText = optionA;
  document.getElementById('optb').innerText = optionB;
}
