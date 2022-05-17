const router = require('express').Router();
let employee_bank_Account = require('../models/employee_bank_Account');
const timestamp = require('time-stamp');

router.route('/addBankAccount').post((req,res) => {
    
    const empId = req.body.empId;
    const accountNumber = req.body.accountNumber;
    const bankName = req.body.bankName;
    const branch = req.body.branch;
    const timeStamp = timestamp('YYYY/MM/DD:mm:ss')

    const newBankAccount = new employee_bank_Account({empId, accountNumber, bankName,branch,  timeStamp});

    newBankAccount.save()
        .then(() => res.json('Bank Account Adding Success!'))
        .catch(err => res.status(400).json('Error: '+err));
});
  
router.post('/OneUserBankAccount', async(req, res) => {
    try {
        const empBankAccount = await employee_bank_Account.find({empId : req.body.empId});
        res.json({ message:empBankAccount[0].bankName+","+empBankAccount[0].branch+","+empBankAccount[0].accountNumber});
    } catch (err) {
        res.json({ message: err });
    }
});

router.route("/allEmpBankAccount").get((req,res) => {
    
    employee_bank_Account.find().then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
});

router.route("/deleteBankAccount/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    employee_bank_Account.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Bank Account Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});
router.route("/editBankAccount/:BankAccountHolder").put(async (req, res) => {
 
    const editBankAccount = {
        accountNumber: req.body.accountNumber,
        bankName: req.body.bankName,
        branch: req.body.branch
    }

    employee_bank_Account.findOneAndUpdate({empId : req.params.BankAccountHolder},editBankAccount)
    .then(() => {
        res.status(200).send({status :"Bank Account Edit"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Edit Data",error: err.message});
    });
});

module.exports = router;