const mongoose = require('mongoose');

const bank = new mongoose.Schema({
    Name: {type: String,unique: true},
    AccountNumber:{type: String, unique: true },
    Balance:{type:Number,default:0}
});

const Bank = mongoose.model('Bank', bank);

module.exports = Bank;