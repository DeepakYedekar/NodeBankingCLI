var readline = require('readline');
require('dotenv').config();
require('./DB/connection');
const Bank = require('./DB/BankSchema');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var recursiveAsyncReadLine = function () {
    rl.question('Command: ', async function (answer) {
        let data = answer.split(' ');
        if (data[0] === 'exit') return rl.close();

        else if (data[0] === 'CREATE') {
            let AccountNumber = data[1], name = data[2];
            let account = await Bank.find({ AccountNumber: AccountNumber });
            if (account.length) {
                console.log('account number is already present');
            } else {
                await Bank.create({ Name: name, AccountNumber: AccountNumber });
            }
            recursiveAsyncReadLine();
        }
        else if (data[0] === 'DEPOSIT') {
            let AccountNumber = data[1], amount = data[2];
            let Account = await Bank.find({ AccountNumber: AccountNumber });
            if (Account.length) {
                let updatedValue = Number(Account[0].Balance) + Number(amount);
                await Bank.findOneAndUpdate({ AccountNumber: AccountNumber }, { Balance: updatedValue });
            }
            recursiveAsyncReadLine();

        } else if (data[0] === 'WITHDRAW') {
            let AccountNumber = data[1], amount = Number(data[2]);
            let Account = await Bank.find({ AccountNumber: AccountNumber });
            if (Number > Number(Account[0].Balance)) console.log('insufficient balance');
            let updatedValue = Number(Account[0].Balance) - amount;
            await Bank.findOneAndUpdate({ AccountNumber: AccountNumber }, { Balance: updatedValue });
            recursiveAsyncReadLine();
        }
        else if (data[0] === 'BALANCE') { 
            let number = data[1];
            let Account = await Bank.find({ AccountNumber: number });
            if (Account) {
                console.log(Account[0].Balance);
            }
            recursiveAsyncReadLine();
        }
        else {
            recursiveAsyncReadLine();
        }
    });
};

recursiveAsyncReadLine();