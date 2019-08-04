 solidity ^0.5.9;

 

contract OpenNigeria {


    uint contractBalance; 
    
    struct  Investor {
        string investorName; // needed for KYC
        bool investorExists;
        uint investorBalance;
        uint investorONTokens;
    }

    struct  Coder {
        string UrlGithub;
        bool coderExists;
    }

    struct Proposal {
        uint projectId;
        uint projectTarget; // sum they want to raise
        string proposalHash; // file of full proposal
        string imageUrl; // image of proposal
        bool proposalExists; 
    }
    
    struct Investment {
        uint investment;
        address investor;
        address payable coder ;
        bool investmentExists;
        bool investmentSettled;
    }

    mapping (address => Investor) public Investors;
    mapping (address => Coder) public Coders;
    mapping (address => Proposal) public Proposals; // one coder for demo - coder maps to proposal
    mapping (uint => Investment) public Investments; // one coder for demo - coder maps to proposal
    
    uint lastProjectId;
    
 
    
    function addProposal(
               
                       string memory proposalHash,
                       string memory imageUrl, 
                       uint projectTarget
    ) public {
      //  require (!creatorRecords[creatorAddress].exists);
        lastProjectId++;
        Proposals[msg.sender].projectId=lastProjectId;
        Proposals[msg.sender].projectTarget=projectTarget;
        Proposals[msg.sender].proposalHash=proposalHash;
        Proposals[msg.sender].imageUrl=imageUrl;
        Proposals[msg.sender].proposalExists=true;
    }    

    
    function addCoder(  
                        string memory UrlGithub
                      
    ) public {
      //  require (!creatorRecords[creatorAddress].exists);
        Coders[msg.sender].UrlGithub=UrlGithub;
        Coders[msg.sender].coderExists=true;
    }    

    function addInvestor(  
                        string memory investorName
    ) public {
      //  require (!creatorRecords[creatorAddress].exists);
        Investors[msg.sender].investorName=investorName;
        Investors[msg.sender].investorExists=true;
    }  

// investor pays into the contract
    function deposit(uint projectId, address coder) public payable {
      
            contractBalance += msg.value;
            Investors[msg.sender].investorBalance += msg.value;
            Investors[msg.sender].investorONTokens += msg.value;
            Investments[projectId].investor = msg.sender;
            Investments[projectId].coder = address(uint160(coder));
            Investments[projectId].investmentExists = true;
            Investments[projectId].investmentSettled = false;
            Investments[projectId].investment=msg.value;
   
       
    }
 // based on a notary account - machine based account
 // no security for demo
    function settle(uint projectId) public payable {
            contractBalance -= Investments[projectId].investment;
            Investors[msg.sender].investorBalance += msg.value;
            Investments[projectId].coder.transfer(Investments[projectId].investment);
            Investments[projectId].investmentExists = true;
            Investments[projectId].investmentSettled = true;
            
       
    }

}
