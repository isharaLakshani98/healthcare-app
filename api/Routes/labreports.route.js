const router = require('express').Router();
const LabReports = require('../Models/LabReports');

router.post('/', async(req, res) => {

    const labReports = new LabReports({
        fullname: req.body.fullname,
        email: req.body.email,
        mobile: req.body.mobile,
        dob: req.body.dob,
        gender: req.body.gender,
        datecollected: req.body.datecollected,
        hemoglobin: req.body.hemoglobin,
        rbc: req.body.rbc,
        hct: req.body.hct,
        mcv: req.body.mcv,
        mch: req.body.mch,
        mchc: req.body.mchc,
        rdwcv: req.body.rdwcv,
        rdwsd: req.body.rdwsd,
        wbc: req.body.wbc,
        neu: req.body.neu,
        lym: req.body.lym,
        mon: req.body.mon,
        eos: req.body.eos,
        bas: req.body.bas,
        lym2: req.body.lym2,
        gra: req.body.gra,
        plt: req.body.plt,
        esr: req.body.esr,
    });

    try {
        const savedReport = await labReports.save();
        res.json(savedReport);
    } catch (err) {
        res.json({ message: err });
    }

});

router.get('/', async(req, res) => {

    try {
        const labreports = await LabReports.find();
        res.json(labreports);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/labfind/:id', async(req, res) => {
    try {
        const labreport = await LabReports.findById(req.params.id);
        res.json(labreport);
    } catch (err) {
        res.json({ message: err });
    }
});

router.delete('/labdelete/:id', async(req, res) => {

    LabReports.deleteOne({ _id: req.params.id })
        .then(thing => res.status(200).send(thing))
        .catch(error => res.status(400).send({ error: error.message }));

});

router.put('/labupdate/:id', async(req, res) => {

    try {
        const savedReport = await LabReports.findOneAndUpdate({ _id: req.params.id }, req.body, { useFindAndModify: false, new: true });
        res.json(savedReport);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;