// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.5.0;

contract Arithmetic {
    mapping(address => uint256) public balances;
    uint8 public amount;
    address public receiver; //fix address of receiver 

    constructor() public {
        receiver = 0x3D4C1dC19fFAC9D07A541b6F01B1d0Cd150C1626;
    }

    function deposit() public payable{
        balances[msg.sender] += msg.value;
    }

    function batchTransfer(uint cnt, uint8 _value) public {
        amount = uint8(cnt) * _value;
        require(cnt > 0 && cnt <= 20, "Count error");
        require(_value > 0 && balances[msg.sender] >= amount, "Aount error");
        balances[msg.sender] = balances[msg.sender] - amount;//-4X
        for (uint i=0; i < cnt; i++) {
            balances[receiver] = balances[receiver] + _value;//100
            //address(receiver).call.value(_value);
        }
    }
}
