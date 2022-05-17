const router = require('express').Router();
const EmpPayment = require('../Models/EmpPayment');
const Employee = require('../Models/Employee');

router.post('/addEmpPay', async(req, res) => {
    const empPayment = new EmpPayment({
        paymentId:req.body.paymentId,
        employeeId: req.body.empIdNum,
        employeeType: req.body.employeeType,
        employeeName: req.body.employeeName,
        paymentAmount: req.body.paymentAmount,
        paymentType: req.body.paymentType,
        paymentDate: req.body.paymentDate,
        paymentAccount: req.body.paymentAccount,
        description: req.body.description,
        paymentBank: req.body.paymentBank,
    });

    try {
        const savedEmpPay = await empPayment.save();
        res.json(savedEmpPay);
    } catch (err) {
        console.log(err);
    }
});

router.get('/getEmpUserType/:id', async(req,res) => {
    try {
        Employee.find({empID : req.params.id}).then((result) => {
            res.json(result);
        }).catch((err) => {
            console.log(err);
        });
    } catch (err) {
        res.json({ message: err });
    }
});


router.get('/viewEmpPay', async(req, res) => {

 
    EmpPayment.find().then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
});

router.get('/getMaxId', async(req,res) => {
    try {
        var maxId = await EmpPayment.findOne().sort('-paymentId');
        if (maxId == null){
            maxId = 0;
        }
        res.json(maxId);
    }catch (err) {
        res.json({ message: err });
    }
});

router.get('/getPayEmp/:paymentId', async(req,res) => {
    try{
        const payEmp = await EmpPayment.findOne({paymentId:req.params.paymentId});
        res.json(payEmp);
    }catch (err) {
        res.json({ message: err});
    }
});

router.delete('/deleteEmpPay/:paymentId', async(req,res) => {
    try{
        await EmpPayment.findOneAndDelete({paymentId:req.params.paymentId});
                res.status(200).json({
                    message: data
                })
    }
    catch (err){
        res.json({message: err})
    }
});

router.post('/updateEmpPay', async(req,res) => {
    const updatedDetails = {
        paymentId:req.body[0].paymentId,
        employeeId: req.body[0].employeeId,
        employeeType: req.body[0].employeeType,
        employeeName: req.body[0].employeeName,
        paymentAmount: req.body[0].paymentAmount,
        paymentType: req.body[0].paymentType,
        paymentDate: req.body[0].paymentDate,
        paymentAccount: req.body[0].paymentAccount,
        description: req.body[0].description,
        paymentBank: req.body[0].paymentBank,
    };

    try{
        await EmpPayment.findOneAndUpdate({paymentId: req.body[0].paymentId}, updatedDetails,{useFindAndModify: false});
            res.status(200).json({
                message:data
            })
    }
    catch(err){
        res.json({message: err})
    }
});

module.exports = router;