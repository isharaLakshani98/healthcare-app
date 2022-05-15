import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Radio, RadioGroup, FormLabel, TextField, FormControlLabel, Paper, Button, Grid, Typography, Divider, Snackbar } from '@material-ui/core/';
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import format from 'date-fns/format';
import moment from "moment";

import DateRangeIcon from '@material-ui/icons/DateRange';

import useStyles from './styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

const schema = yup.object().shape({
    fullname: yup.string().required("Patient Name is required."),
    email: yup.string().email("Enter a valid Email."),
    mobile: yup.string().matches(/^([+]\d{2})?\d{10}$/, "That doesn't look like a phone number"),
    dob: yup.date().max(moment().add(1, "m").toDate(), "Future date not allowed").required("Date of Birth is required.").typeError("That doesn't look like a date"),
    hemoglobin: yup.number().transform((currentValue, originalValue) => {
        return originalValue === '' ? null : currentValue;
    }).nullable().typeError('You must enter a number').required("This field is required."),
    rbc: yup.number().transform((currentValue, originalValue) => {
        return originalValue === '' ? null : currentValue;
    }).nullable().typeError('You must enter a number').required("This field is required."),
    plt: yup.number().transform((currentValue, originalValue) => {
        return originalValue === '' ? null : currentValue;
    }).nullable().typeError('You must enter a number').required("This field is required."),
    wbc: yup.number().transform((currentValue, originalValue) => {
        return originalValue === '' ? null : currentValue;
    }).nullable().typeError('You must enter a number').required("This field is required."),
    hct: yup.number().transform((currentValue, originalValue) => {
        return originalValue === '' ? null : currentValue;
    }).nullable().typeError('You must enter a number').required("This field is required."),
    mcv: yup.number().transform((currentValue, originalValue) => {
        return originalValue === '' ? null : currentValue;
    }).nullable().typeError('You must enter a number'),
    mch: yup.number().transform((currentValue, originalValue) => {
        return originalValue === '' ? null : currentValue;
    }).nullable().typeError('You must enter a number'),
    mchc: yup.number().transform((currentValue, originalValue) => {
        return originalValue === '' ? null : currentValue;
    }).nullable().typeError('You must enter a number'),
    rdwcv: yup.number().transform((currentValue, originalValue) => {
        return originalValue === '' ? null : currentValue;
    }).nullable().typeError('You must enter a number'),
    rdwsd: yup.number().transform((currentValue, originalValue) => {
        return originalValue === '' ? null : currentValue;
    }).nullable().typeError('You must enter a number'),
    neu: yup.number().transform((currentValue, originalValue) => {
        return originalValue === '' ? null : currentValue;
    }).nullable().typeError('You must enter a number'),
    lym: yup.number().transform((currentValue, originalValue) => {
        return originalValue === '' ? null : currentValue;
    }).nullable().typeError('You must enter a number'),
    mon: yup.number().transform((currentValue, originalValue) => {
        return originalValue === '' ? null : currentValue;
    }).nullable().typeError('You must enter a number'),
    eos: yup.number().transform((currentValue, originalValue) => {
        return originalValue === '' ? null : currentValue;
    }).nullable().typeError('You must enter a number'),
    bas: yup.number().transform((currentValue, originalValue) => {
        return originalValue === '' ? null : currentValue;
    }).nullable().typeError('You must enter a number'),
    lym2: yup.number().transform((currentValue, originalValue) => {
        return originalValue === '' ? null : currentValue;
    }).nullable().typeError('You must enter a number'),
    gra: yup.number().transform((currentValue, originalValue) => {
        return originalValue === '' ? null : currentValue;
    }).nullable().typeError('You must enter a number'),
    esr: yup.number().transform((currentValue, originalValue) => {
        return originalValue === '' ? null : currentValue;
    }).nullable().typeError('You must enter a number'),
});

const EditReport = (id) => {
    const classes = useStyles();
    const history = useHistory();
    const isFirstRender = useRef(true);
    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm(
        {
            resolver: yupResolver(schema),
            reValidateMode: 'onSubmit',
        }
    );
    const [gender, setGender] = useState("");
    const [report, setReport] = React.useState({});
    const selectedId = id.match.params.id;
    const [successMsg, setSuccessMsg] = useState(false);
    const [formData, setFormData] = useState([]);

    const CssTextField = withStyles({
        root: {
            '& .MuiInputLabel-root': {
                color: '#6e6e6e',
            },
            '& .MuiTextField-root': {
                color: '#6e6e6e',
            },
            '& .MuiFormHelperText-root': {
                color: '#6e6e6e',
            },
            '& label.Mui-focused': {
                color: '#6e6e6e',
            },
            '& .MuiInputBase-input': {
                color: '#1a1a1a',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: '#6e6e6e',
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: '#6e6e6e',
                },
                '&:hover fieldset': {
                    borderColor: '#0077B6',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#0077B6',
                },
            },
            "& .MuiFormHelperText-root": {
                color: "#ff0000",
            },
        },
        input: {
            color: "#1a1a1a"
        }
    })(TextField);

    useEffect(() => {
        fetchReport();
        // if (isFirstRender.current) {
        //     isFirstRender.current = false;
        //     return;
        // }
    }, []);

    useEffect(() => {
        setValue('_id', report._id || '');
        setValue('fullname', report.fullname || '');
        setValue('email', report.email || '');
        setValue('mobile', report.mobile || '');
        setValue('dob', report.dob || '');
        setValue('hemoglobin', report.hemoglobin || '');
        setValue('rbc', report.rbc || '');
        setValue('hct', report.hct || '');
        setValue('mcv', report.mcv || '');
        setValue('mch', report.mch || '');
        setValue('mchc', report.mchc || '');
        setValue('rdwcv', report.rdwcv || '');
        setValue('rdwsd', report.rdwsd || '');
        setValue('wbc', report.wbc || '');
        setValue('neu', report.neu || '');
        setValue('lym', report.lym || '');
        setValue('mon', report.mon || '');
        setValue('eos', report.eos || '');
        setValue('bas', report.bas || '');
        setValue('lym2', report.lym2 || '');
        setValue('gra', report.gra || '');
        setValue('plt', report.plt || '');
        setValue('esr', report.esr || '');
        setGender(report.gender);
    }, [report]);

    const fetchReport = async () => {
        const response = await fetch(`http://localhost:5000/api/labreports/labfind/${selectedId}`);
        const data = await response.json();
        setReport(data);
    }

    const updateReport = (data) => {
        
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fullname: data.fullname,
                email: data.email,
                mobile: data.mobile,
                dob: formatDate(data.dob),
                gender: gender,
                datecollected: data.datecollected,
                hemoglobin: data.hemoglobin,
                rbc: data.rbc,
                hct: data.hct,
                mcv: data.mcv,
                mch: data.mch,
                mchc: data.mchc,
                rdwcv: data.rdwcv,
                rdwsd: data.rdwsd,
                wbc: data.wbc,
                neu: data.neu,
                lym: data.lym,
                mon: data.mon,
                eos: data.eos,
                bas: data.bas,
                lym2: data.lym2,
                gra: data.gra,
                plt: data.plt,
                esr: data.esr,
            })
        };

        fetch(`http://localhost:5000/api/labreports/labupdate/${selectedId}`, requestOptions)
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                setSuccessMsg(true);
                history.push("/all-reports");
            })
            .catch(error => {
                console.log(error);
                console.error('There was an error!', error);
            });
    };

    const onSubmit = (data) => {
        console.log("Submit btn clicked!..");
        updateReport(data);
    };

    const handleRadioChange = (event) => {
        setGender(event.target.value, console.log(gender));
    };

    const handleSuccessMsg = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }

        setSuccessMsg(false);
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paperTitle}>
                        <Typography variant="h4" className={classes.pageTitle}>Edit Blood Report</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                        <Paper className={classes.paper}>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    {/* <CssTextField fullWidth name="_id" defaultValue={report._id} label="Report ID" variant="outlined" color="primary" {...register("_id")} /> */}
                                    <Controller
                                        name="_id"
                                        control={control}
                                        render={({ field }) =>
                                            <CssTextField fullWidth label="Report ID" variant="outlined" color="primary" {...field} />}
                                        defaultValue={report._id}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="fullname"
                                        control={control}
                                        render={({ field }) =>
                                            <CssTextField fullWidth label="Patient Name" variant="outlined" color="primary" {...field} error={!!errors?.fullname} helperText={errors?.fullname?.message} />}
                                        defaultValue={report.fullname}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormLabel component="legend" className={classes.radioGoupLabel}>Gender</FormLabel>
                                    <RadioGroup aria-label="gender" name="gender" row defaultValue={report.gender} value={gender} onChange={handleRadioChange}>
                                        <FormControlLabel value="male" control={<Radio className={classes.radioGoup} />} label="Male" className={classes.radioGoup} />
                                        <FormControlLabel value="female" control={<Radio className={classes.radioGoup} />} label="Female" className={classes.radioGoup} />
                                        <FormControlLabel value="other" control={<Radio className={classes.radioGoup} />} label="Other" className={classes.radioGoup} />
                                    </RadioGroup>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field }) =>
                                            <CssTextField fullWidth label="Patient Email" variant="outlined" color="primary" {...field} error={!!errors?.email} helperText={errors?.email?.message} />}
                                        defaultValue={report.email}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="mobile"
                                        control={control}
                                        render={({ field }) =>
                                            <CssTextField fullWidth label="Patient Mobile Number" variant="outlined" color="primary" {...field} error={!!errors?.mobile} helperText={errors?.mobile?.message} />}
                                        defaultValue={report.mobile}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Controller
                                        name="dob"
                                        control={control}
                                        render={({ field }) =>
                                            <CssTextField
                                                fullWidth
                                                defaultValue={report.dob}
                                                label="Date of Birth"
                                                type="date"
                                                variant="outlined"
                                                color="primary"
                                                {...field}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <DateRangeIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                error={!!errors?.dob} helperText={errors?.dob?.message} />}
                                        defaultValue={report.dob}
                                    />
                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    className={classes.sectionHeader}
                                >
                                    <Grid item xs={12} sm={2}>
                                        <Typography variant="body1" className={classes.note} >Complete Blood Count</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={10}>
                                        <Divider style={{ backgroundColor: '#6e6e6e', height: "3px" }} />
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Controller
                                        name="hemoglobin"
                                        control={control}
                                        render={({ field }) =>
                                            <CssTextField fullWidth label="Hemoglobin" variant="outlined" color="primary" {...field} error={!!errors?.hemoglobin} helperText={errors?.hemoglobin?.message} />}
                                        defaultValue={report.hemoglobin}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Controller
                                        name="rbc"
                                        control={control}
                                        render={({ field }) =>
                                            <CssTextField fullWidth label="RBC" variant="outlined" color="primary" {...field} error={!!errors?.rbc} helperText={errors?.rbc?.message} />}
                                        defaultValue={report.rbc}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Controller
                                        name="hct"
                                        control={control}
                                        render={({ field }) =>
                                            <CssTextField fullWidth label="HCT" variant="outlined" color="primary"  {...field} error={!!errors?.hct} helperText={errors?.hct?.message} />}
                                        defaultValue={report.hct}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Controller
                                        name="mcv"
                                        control={control}
                                        render={({ field }) =>
                                            <CssTextField fullWidth label="MCV" variant="outlined" color="primary" {...field} error={!!errors?.mcv} helperText={errors?.mcv?.message} />}
                                        defaultValue={report.mcv}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Controller
                                        name="mch"
                                        control={control}
                                        render={({ field }) =>
                                            <CssTextField fullWidth label="MCH" variant="outlined" color="primary"  {...field} error={!!errors?.mch} helperText={errors?.mch?.message} />}
                                        defaultValue={report.mch}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Controller
                                        name="mchc"
                                        control={control}
                                        render={({ field }) =>
                                            <CssTextField fullWidth label="MCHC" variant="outlined" color="primary" {...field} error={!!errors?.mchc} helperText={errors?.mchc?.message} />}
                                        defaultValue={report.mchc}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Controller
                                        name="rdwcv"
                                        control={control}
                                        render={({ field }) =>
                                            <CssTextField fullWidth label="RDW-CV" variant="outlined" color="primary"  {...field} error={!!errors?.rdwcv} helperText={errors?.rdwcv?.message} />}
                                        defaultValue={report.rdwcv}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Controller
                                        name="rdwsd"
                                        control={control}
                                        render={({ field }) =>
                                            <CssTextField fullWidth label="RDW-SD" variant="outlined" color="primary"  {...field} error={!!errors?.rdwsd} helperText={errors?.rdwsd?.message} />}
                                        defaultValue={report.rdwsd}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Controller
                                        name="wbc"
                                        control={control}
                                        render={({ field }) =>
                                            <CssTextField fullWidth label="WBC" variant="outlined" color="primary"  {...field} error={!!errors?.wbc} helperText={errors?.wbc?.message} />}
                                        defaultValue={report.wbc}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Controller
                                        name="neu"
                                        control={control}
                                        render={({ field }) =>
                                            <CssTextField fullWidth label="NEU%" variant="outlined" color="primary" {...field} error={!!errors?.neu} helperText={errors?.neu?.message} />}
                                        defaultValue={report.neu}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Controller
                                        name="lym"
                                        control={control}
                                        render={({ field }) =>
                                            <CssTextField fullWidth label="LYM%" variant="outlined" color="primary"  {...field} error={!!errors?.lym} helperText={errors?.lym?.message} />}
                                        defaultValue={report.lym}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Controller
                                        name="mon"
                                        control={control}
                                        render={({ field }) =>
                                            <CssTextField fullWidth label="MON%" variant="outlined" color="primary"  {...field} error={!!errors?.mon} helperText={errors?.mon?.message} />}
                                        defaultValue={report.mon}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Controller
                                        name="eos"
                                        control={control}
                                        render={({ field }) =>
                                            <CssTextField fullWidth label="EOS%" variant="outlined" color="primary"  {...field} error={!!errors?.eos} helperText={errors?.eos?.message} />}
                                        defaultValue={report.eos}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Controller
                                        name="bas"
                                        control={control}
                                        render={({ field }) =>
                                            <CssTextField fullWidth label="BAS%" variant="outlined" color="primary" {...field} error={!!errors?.bas} helperText={errors?.bas?.message} />}
                                        defaultValue={report.bas}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Controller
                                        name="lym2"
                                        control={control}
                                        render={({ field }) =>
                                            <CssTextField fullWidth label="LYM#" variant="outlined" color="primary"  {...field} error={!!errors?.lym2} helperText={errors?.lym2?.message} />}
                                        defaultValue={report.lym2}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Controller
                                        name="gra"
                                        control={control}
                                        render={({ field }) =>
                                            <CssTextField fullWidth label="GRA#" variant="outlined" color="primary"  {...field} error={!!errors?.gra} helperText={errors?.gra?.message} />}
                                        defaultValue={report.gra}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Controller
                                        name="plt"
                                        control={control}
                                        render={({ field }) =>
                                            <CssTextField fullWidth label="PLT" variant="outlined" color="primary"  {...field} error={!!errors?.plt} helperText={errors?.plt?.message} />}
                                        defaultValue={report.plt}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Controller
                                        name="esr"
                                        control={control}
                                        render={({ field }) =>
                                            <CssTextField fullWidth label="ESR" variant="outlined" color="primary"  {...field} error={!!errors?.esr} helperText={errors?.esr?.message} />}
                                        defaultValue={report.esr}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={3}>
                                <Button component={Link} to="/all-reports" fullWidth variant="contained" className={classes.resetbtn}>
                                    Back
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submitbtn}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
            <Snackbar open={successMsg} autoHideDuration={6000} onClose={handleSuccessMsg} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleSuccessMsg} severity="success" color="info" className={classes.cookieAlert}>
                    The form was updated successfully.
                </Alert>
            </Snackbar>
        </div>
    )
}

export default EditReport;
