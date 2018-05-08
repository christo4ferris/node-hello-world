var myContract;
function getAccountAddress(){
    var name = "ETHAccount=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    console.log("Failed to get ethereum account address. Please login")
    return;

}

function getContract() {
  console.log("Getting the Contract")
  if (typeof window.web3 !== "undefined" && typeof window.web3.currentProvider !== "undefined") {
      var web3 = new Web3(window.web3.currentProvider);
    } else {
      var web3 = new Web3();
    }
  web3.setProvider(new web3.providers.HttpProvider("http://localhost:5000"));
  var account = getAccountAddress();
  web3.eth.defaultAccount = '0x' + account;
  console.log("Account " + account)
  var address = "86a33d389dd38e10970847ed75331d43f320c93b"

  console.log("Got address: " + address)
  var votingABI = [
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
    }
  ];
  var VotingContract = web3.eth.contract(votingABI);
  myContract = VotingContract.at(address);
  return myContract;
}

function voteA() {
  var myContract = getContract();
  myContract.vote('0');
  window.location.href = 'results.html';
}

function voteB() {
  var myContract = getContract();
  myContract.vote('0');
  window.location.href = 'results.html';
}

function getResults() {
  var myContract = getContract();
  var optionA = myContract.proposals(0).toString();
  var valA = parseInt(optionA.substring(optionA.indexOf(',') +1));
  var optionB = myContract.proposals(1).toString();
  var valB = parseInt(optionB.substring(optionB.indexOf(',') + 1));
  var tot = valA + valB;
  var perA = (valA / tot) * 100;
  var perB = (valB / tot) * 100;
  document.getElementById('opta').innerText = valA.toString();
  document.getElementById('opta').style.width = perA.toString() + '%';
  document.getElementById('optb').innerText = valB.toString();
  document.getElementById('optb').style.width = perB.toString() + '%';
}
