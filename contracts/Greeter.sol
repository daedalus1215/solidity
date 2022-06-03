pragma solidity >=0.8.14;

contract Greeter {
    string private _greeting = "Hello World!";
    address private _owner;

    constructor() public {
        _owner = msg.sender;
    }
    function greet() external view returns (string memory) {
        return _greeting;
    }

    function setGreeting(string calldata greeting) external onlyOwner {
        _greeting = greeting;
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Ownable: caller is not the owner");
        _;
    }

    function sender() public view returns (address) {
        return msg.sender;
    }

    function owner() public view returns (address) {
        return _owner;
    }
}
