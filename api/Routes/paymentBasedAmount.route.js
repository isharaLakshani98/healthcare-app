const router = require('express').Router();
const PaymentBased = require('../Models/payment_based_amount');

router.post('/addPaymentBased', async(req, res) => {

    const basedAmount = new PaymentBased({
        userType: req.body.userType,
        basedAmount: req.body.basedAmount,
        otPayment: req.body.otPayment,
    });

    try {
        const savedEmpBasedAmount = await basedAmount.save();
        res.json(savedEmpBasedAmount);
    } catch (err) {
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    }

});

router.route("/allEmpBasedAmount").get((req,res) => {
    
    PaymentBased.find().then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
});

router.post('/OneEmpBasedAmount', async(req, res) => {
    try {
        const empBasedAmount = await PaymentBased.find({userType : req.body.userType});
        res.json({ message:empBasedAmount[0].otPayment+","+empBasedAmount[0].basedAmount});
    } catch (err) {
        res.json({ message: err });
    }
});

router.route("/empBasedAmountDelete/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    PaymentBased.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Emp Based Amount Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});

router.route('/updateEmpBasedAmount').put((req, res)=>{
    const userType = req.body.userType;   
    const basedAmount = req.body.basedAmount;
    const otPayment = req.body.otPayment;

    const empBasedAmount={basedAmount, otPayment}
       const update1 =  PaymentBased.findOneAndUpdate({userType : userType},empBasedAmount).then(() => {       
            res.status(200).send({status :"Emp Based Amount updated"});    
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        });
          
});

module.exports = router;