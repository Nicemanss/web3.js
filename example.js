#!/usr/bin/env node
/*
Usage:
- Make sure NodeJS is installed (sudo apt-get install nodejs)
- Execute the example by typing: node example.js
*/

var node = "https://node.myhpbwallet.com"
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider(node));

function showAccounts() {
  web3.hpb.getAccounts((err, accounts) => {
    if (err != null) {
      console.log("There was an error fetching HPB accounts on the HPB Sync Node ("+node+")");
      return;
    }

    if (accounts.length == 0) {
      console.log("Couldn't find any accounts on the HPB Sync Node ("+node+")");
      return;
    }
    callback(accounts);
  });
}

function callback(accounts){
  for(var i=0; i<accounts.length; i++) {
    console.log('Address: ' + accounts[i]);
    var balance = web3.hpb.getBalance(accounts[i]);
    balance = web3.fromWei(balance, 'ether');
    console.log('Balance: ' + balance + ' HPB');
  }
}

console.log("Account(s) available on the HPB Sync Node ("+node+")");
showAccounts();
