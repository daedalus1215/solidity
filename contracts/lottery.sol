pragma solidity ^0.4.17;

/**
* Creating a Lottrery contract. where player 1 and player 2 can send ether into a contract. As soon as they do this, they will be considered a player of the game. 
* The ether they send will be added to a prize pool of sorts.
* Third party will come in and tell the contract to pick a winner. At this point the contract will look at the two players and send the prize pool to the winner.
*/
contract Lottery {
    address public manager;
    address[] public players;// create dynamic array that only accepts addresses

    function Lottery() public {
        manager = msg.sender; // Grab the sender's address
    }

    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
}