pragma solidity ^0.4.0;

contract Calc{
  
  uint count;

  
  function add(uint a, uint b) returns(uint){
    count++;
    return a + b;
  }

  
  function getCount() constant returns (uint){
    return count;
  }
}
