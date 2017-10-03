const { SHA256 } = require("crypto-js");

// var message = "I am user number 3";
// var hash = SHA256(message).toString();

// console.log(message);
// console.log(hash);

// const data = {
//   id: 4
// };

// const token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + "somestring").toString()
// };

const jwt = require("jsonwebtoken");

var jwtData = {
  id: 10
};

var sign = jwt.sign(jwtData, "1234");

var verify = jwt.verify(sign, "1234");

console.log(sign);
console.log(verify);
