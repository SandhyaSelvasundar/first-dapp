web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[],"name":"totalDonationReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint8"}],"name":"Donate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"DonationReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"}]')
DonatingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = DonatingContract.at('0x3749037655e43c49cd3249f3efdc5f53dab84765');

function Donate() {
  DonationValue = $("#DonationValue").val();
  contractInstance.Donate(DonationValue, {from: web3.eth.accounts[0]}, function() {
    $("#ledgerValue").html(contractInstance.DonationReceived.call().toString());
  });
  $.ajax({ 
    url: './api/insertValue.php',
    data: {"value": DonationValue},
    type: 'post',
    success: function(result)
    {
      $.ajax({url:'./api/fetchValue.php',data: {},type: 'GET',success: function(result){$("#dbValue").html(result);}});
    }
  });
}

$(document).ready(function() {
  let val = contractInstance.DonationReceived.call().toString();
  $("#ledgerValue").html(val);


  $.ajax({ 
      url: './api/fetchValue.php',
      data: {},
      type: 'GET',
      success: function(result)
      {
        $("#dbValue").html(result);
      }
  });


});
