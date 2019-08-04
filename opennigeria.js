



contractAddress = "0xae921f5a8d9d121aed91144978e966b9743c8d72"


abi = [ { "constant": false, "inputs": [ { "name": "UrlGithub", "type": "string" } ], "name": "addCoder", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "investorName", "type": "string" } ], "name": "addInvestor", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "proposalHash", "type": "string" }, { "name": "imageUrl", "type": "string" }, { "name": "projectTarget", "type": "uint256" } ], "name": "addProposal", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "projectId", "type": "uint256" }, { "name": "coder", "type": "address" } ], "name": "deposit", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "projectId", "type": "uint256" } ], "name": "settle", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "Coders", "outputs": [ { "name": "UrlGithub", "type": "string" }, { "name": "coderExists", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "projectId", "type": "uint256" } ], "name": "getProjectDetails", "outputs": [ { "name": "", "type": "uint256" }, { "name": "", "type": "string" }, { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "Investments", "outputs": [ { "name": "investment", "type": "uint256" }, { "name": "investor", "type": "address" }, { "name": "coder", "type": "address" }, { "name": "investmentExists", "type": "bool" }, { "name": "investmentSettled", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "Investors", "outputs": [ { "name": "investorName", "type": "string" }, { "name": "investorExists", "type": "bool" }, { "name": "investorBalance", "type": "uint256" }, { "name": "investorONTokens", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "ProposalIndexes", "outputs": [ { "name": "coder", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "Proposals", "outputs": [ { "name": "projectId", "type": "uint256" }, { "name": "projectTarget", "type": "uint256" }, { "name": "proposalHash", "type": "string" }, { "name": "imageUrl", "type": "string" }, { "name": "proposalExists", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" } ]


web3x = new Web3(web3.currentProvider);
web3x.eth.defaultAccount = web3x.eth.accounts[0];
contract = web3x.eth.contract(abi);
var instanceContract = contract.at(contractAddress);

function showProposals() {
 console.log("hello")
	projectid=1;
 instanceContract.getProjectDetails( projectid, function(error, result){
    if(!error)
    {
     //   $("#myBalance").html('My Balance  ' + result.c[0]);
	target = result[0].c[0];
	hash = result[1];
	imageurl = result[2];
                   document.getElementById("projectAmount").innerHTML=target + " DAI";
	    document.getElementById("projectLink").href = "http://54.173.250.212/"+ hash + ".pdf"
	    document.getElementById("projectLink").innerHTML = "Project " + projectid;
	    document.getElementById("projectimage").src = imageurl;
        console.log(result);
    }
    else {
     //   $("#myBalance").html('My Balance '  );
        console.error(error);
      }
    });
}
