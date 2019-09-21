pragma solidity ^0.5.0;

contract Escrow{
    struct user{
        uint balence;
        uint start;
        string nm;
        mapping(string=>string) signs;
    }
    address public escrow;
    mapping(address=>user) public deposits;
    uint public fund;
    address[] accounts;
    mapping(string =>address) public hashaccounts;
    constructor (uint fee) public {
        escrow=msg.sender;
        fund=fee;
    }
    
    function deposit(string memory n) public payable{
       assert(deposits[msg.sender].balence != fund);
        assert(msg.value==fund);
       if(deposits[msg.sender].balence!=fund && msg.value==fund){
            deposits[msg.sender].balence=fund;
            deposits[msg.sender].start=now;
            createAccount(n);
        }
    }
    function cancle() public{
        require(now > deposits[msg.sender].start+365 days,"not reached maturity");
        if(deposits[msg.sender].balence==fund && now > deposits[msg.sender].start + 365 days){
            refund();    
        }
    }
    function gotAccount()public view returns(bool){
        if(deposits[msg.sender].balence==0){
            return false;
        }else{
            return true;
        }
    }
    function refund() private{
        if(msg.sender.send((deposits[msg.sender].balence*99))){
            deposits[msg.sender].balence=fund-1;
        }
    }
    
    function createAccount(string memory s) private{
        deposits[msg.sender].nm=s;
        accounts.push(msg.sender);
    }
    
    function storeSign(string memory hash,string memory sign) public{
        require(deposits[msg.sender].balence==fund,"not valid account");
        deposits[msg.sender].signs[hash]=sign;
        hashaccounts[hash]=msg.sender;
    }
    function getSign(string memory hash)public view returns(string memory){
        return deposits[hashaccounts[hash]].signs[hash];
    }
    function getAccountName(address add)public view returns(string memory){
        return deposits[add].nm;
    }
    function getTotalAccounts() public view returns(uint){
        return accounts.length;
    }
}