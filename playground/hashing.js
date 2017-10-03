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

// const jwt = require("jsonwebtoken");

// var jwtData = {
//   id: 10
// };

// var sign = jwt.sign(jwtData, "1234");

// var verify = jwt.verify(sign, "1234");

// console.log(sign);
// console.log(verify);

const bcrypt = require("bcryptjs");
let password = "abcsss";

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

let hashedPass = "$2a$10$yvMpWLxf6tiwztTDQQPFdOOVXlOex7V7Ix.k5jYWtpQ1mDL9H0.ia";
bcrypt.compare(password, hashedPass, (err, res) => {
  console.log(res);
});
