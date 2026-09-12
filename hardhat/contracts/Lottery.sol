// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Lottery {
    struct Participant {
        address payable addr;
        string username;
    }

    Participant public winner;
    Participant[] public members;
    address public manager;

    constructor() {
        manager = msg.sender;
    }

    function isManager() public view returns (bool) {
        return manager == msg.sender;
    }

    function join(string calldata _username) public payable returns (bool) {
        require(msg.value == 1 ether, "Please pay 1 ETH for join!");
        require(bytes(_username).length > 0, "Username cannot be empty");

        members.push(Participant({
            addr: payable(msg.sender),
            username: _username
        }));
        
        return true;
    }

    function getMembersCount() public view returns (uint256) {
        return members.length;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function random() private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.difficulty,
                        msg.sender
                    )
                )
            ) % members.length;
    }

    function getWinner() public returns (Participant memory) {
        require(isManager(), "You cannot roll the drum!");
        require(members.length > 0, "No participants in lottery!");

        uint256 index = random();
        winner = members[index];

        (bool success, ) = winner.addr.call{value: getBalance()}("");
        require(success, "Transfer failed");

        delete members;

        return winner;
    }
}