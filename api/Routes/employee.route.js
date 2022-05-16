const router = require('express').Router();
const Employee = require('../Models/Employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var generator = require('generate-password');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nyx.devsolutions@gmail.com',
        pass: 'nyxdevsolutions2021'
    }
});


router.post('/', async(req, res) => {

    //Checking if the user is already in the database
    const emailExist = await Employee.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    //Generate Password

    // var password = generator.generate({
    //     length: 8,
    //     numbers: true
    // });

    var empID = 0;
    var query = Employee.find();
    
    query.count(function (err, count) {
        if (err) console.log(err)
        else {
            console.log("Count is", count);
            empID = count + 1;
        }
    });

    var password = "12345678";

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const employee = new Employee({
        empID: empID,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        mobile: req.body.mobile,
        address1: req.body.address1,
        address2: req.body.address2,
        gender: req.body.gender,
        dob: req.body.dob,
        marital: req.body.marital,
        position: req.body.position,
        hiredate: req.body.hiredate,
    });

    try {
        const savedEmp = await employee.save();
        res.json(savedEmp);

        //Sending email
        var mailBody =
            `<h4>Hello ${employee.firstName},</h4>
    <p>Your Employee ID is <b>${savedEmp._id}</b> and your password is <b>${password}</b>. Thank you for joining with us.</p>`

        var mailOptions = {
            from: "nyx.devsolutions@gmail.com",
            to: employee.email,
            subject: "Welcome to 24Seven HMS",
            html: mailBody
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent : " + info.response);
            }
        });
    } catch (err) {
        res.json({ message: err });
    }

});

router.get('/', async(req, res) => {

    try {
        const employee = await Employee.find();
        res.json(employee);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/empfind/:id', async(req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        res.json(employee);
    } catch (err) {
        res.json({ message: err });
    }
});

router.put('/empupdate/:id', async(req, res) => {

    try {
        const savedEmployee = await Employee.findOneAndUpdate({ _id: req.params.id }, req.body, { useFindAndModify: false, new: true });
        res.json(savedEmployee);
    } catch (err) {
        res.json({ message: err });
    }
});

router.delete('/empdelete/:id', async(req, res) => {

    // try {
    //     const employee = await Employee.findOne({ _id: req.params.id });
    //     res.json(employee);
    // } catch (err) {
    //     res.json({ message: err });
    // }
    Employee.deleteOne({ _id: req.params.id })
        .then(thing => res.status(200).send(thing))
        .catch(error => res.status(400).send({ error: error.message }));

});

router.get('/allcounts', async(req, res) => {

    try {
        const doctorcount = await Employee.countDocuments({ position: 'doctor' });
        const pharmacistcount = await Employee.countDocuments({ position: 'pharmacist' });
        const accountantcount = await Employee.countDocuments({ position: 'accountant' });
        const assistantcount = await Employee.countDocuments({ position: 'labAssistant' });
        var arr = {
            "doctorcount": doctorcount,
            "pharmacistcount": pharmacistcount,
            "accountantcount": accountantcount,
            "assistantcount": assistantcount
        };
        res.json(arr);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/getEmpByName/:firstName', async(req,res) => {
    try{
        const empByName = await Employee.findOne({firstName:req.params.firstName});
        res.json(empByName);
    }catch (err) {
        res.json({ message: err});
    }
});

module.exports = router;