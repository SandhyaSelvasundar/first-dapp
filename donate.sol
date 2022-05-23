//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract Donating {
  
  uint8 public DonationReceived;
  
  function totalDonationReceived() public view returns (uint8) {
    return DonationReceived;
  }

  function Donate(uint8 amount) public {
    DonationReceived += amount;
  }
}