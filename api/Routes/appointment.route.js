const router = require('express').Router();
const Appointment = require('../Models/Appointment');

router.post('/addApp', async(req, res) => {

    const appointment = new Appointment({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        gender: req.body.gender,
        dob: req.body.dob,
        consultant: req.body.consultant,
        appdate: req.body.appdate,
        apptime: req.body.apptime,
    });

    try {
        const savedApp = await appointment.save();
        res.json(savedApp);
    } catch (err) {
        res.json({ message: err });
    }

});

router.get('/', async(req, res) => {

    try {
        const appointment = await Appointment.find();
        res.json(appointment);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/appfind/:id', async(req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        res.json(appointment);
    } catch (err) {
        res.json({ message: err });
    }
});

router.delete('/appdelete/:id', async(req, res) => {

    Appointment.deleteOne({ _id: req.params.id })
        .then(thing => res.status(200).send(thing))
        .catch(error => res.status(400).send({ error: error.message }));

});

router.put('/appupdate/:id', async(req, res) => {

    try {
        const savedAppointment = await Appointment.findOneAndUpdate({ _id: req.params.id }, req.body, { useFindAndModify: false, new: true });
        res.json(savedAppointmet);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;