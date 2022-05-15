import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Radio, RadioGroup, FormLabel, TextField, FormControlLabel, Paper, Button, Grid, Typography, Divider, Snackbar } from '@material-ui/core/';
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
<<<<<<< Updated upstream
=======
import format from 'date-fns/format';
import moment from "moment";
>>>>>>> Stashed changes

import DateRangeIcon from '@material-ui/icons/DateRange';

import useStyles from './styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const schema = yup.object().shape({
    fullname: yup.string().required("Patient Name is required."),
    email: yup.string().email("Enter a valid Email."),
<<<<<<< Updated upstream
    mobile: yup.string().required("Mobile Number is required.").max(10, "Mobile Number cannot exceed 10 characters."),
    dob: yup.string().required("Date of Birth is required."),
    datecollected: yup.string().required("Date Collected is required."),
    hemoglobin: yup.number().typeError('You must enter a number').required(),
    rbc: yup.number().typeError('You must enter a number'),
    hct: yup.number().typeError('You must enter a number'),
    mcv: yup.number().typeError('You must enter a number'),
    mch: yup.number().typeError('You must enter a number'),
    mchc: yup.number().typeError('You must enter a number'),
    rdwcv: yup.number().typeError('You must enter a number'),
    rdwsd: yup.number().typeError('You must enter a number'),
    wbc: yup.number().typeError('You must enter a number'),
    neu: yup.number().typeError('You must enter a number'),
    lym: yup.number().typeError('You must enter a number'),
    mon: yup.number().typeError('You must enter a number'),
    eos: yup.number().typeError('You must enter a number'),
    bas: yup.number().typeError('You must enter a number'),
    lym2: yup.number().typeError('You must enter a number'),
    gra: yup.number().typeError('You must enter a number'),
    plt: yup.number().typeError('You must enter a number'),
    esr: yup.number().typeError('You must enter a number'),
=======
    mobile: yup.string().matches(/^([+]\d{2})?\d{10}$/, "That doesn't look like a phone number"),
    // mobile: yup.number().typeError('Enter a valid number').required("Mobile Number is required.").max(10, "Mobile Number cannot exceed 10 characters.").min(8, 'Enter a valid number'),
    dob: yup.date().max(moment().add(1, "m").toDate(), "Future date not allowed").required("Date of Birth is required.").typeError("That doesn't look like a date"),
    datecollected: yup.date().max(moment().add(1, "m").toDate(), "Future date not allowed").min(new Date(Date.now() -2678400000), "Date cannot be in the past").required("Date Collected is required.").typeError("That doesn't look like a date"),
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
>>>>>>> Stashed changes
});

const AddReport = () => {
    const classes = useStyles();
    const { control, handleSubmit, reset, formState: { errors }  } = useForm(
        {
            resolver: yupResolver(schema),
            reValidateMode: 'onSubmit',
        }
    );
    const [gender, setGender] = useState("male");
    const [successMsg, setSuccessMsg] = useState(false);
    const [formData, setFormData] = useState([]);
    const isFirstRender = useRef(true);
<<<<<<< Updated upstream
=======
    const [eventDate, setEventDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const maxDate = format(new Date(), "yyyy-MM-dd");
>>>>>>> Stashed changes

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
          '& .MuiInputBase-input':{
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
        if (isFirstRender.current) {
            isFirstRender.current = false // toggle flag after first render/mounting
            return;
        }

        submitForm(formData);
    }, [formData])

    const onSubmit = (data) => {
        setFormData({
            fullname: data.fullname,
            email: data.email,
            mobile: data.mobile,
            dob: data.dob,
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
    }

    const submitForm = (data) => {
        axios.post('http://localhost:5000/api/labreports', data)
        .then((response) => {
          console.log(response);
          setSuccessMsg(true);
          reset({
            keepErrors: true,
          });
        }).catch((err) => {
          console.log(err);
        })
    }

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
                        <Typography variant="h4" className={classes.pageTitle}>Add New Blood Report</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                        <Paper className={classes.paper}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="fullname"
                                            control={control}
                                            defaultValue=""
                                            render={({ field, formState }) => 
                                            <CssTextField 
                                                fullWidth 
                                                label="Patient Name" 
                                                variant="outlined" 
                                                color="primary" 
                                                {...field}
                                                error={!!errors?.fullname}
                                                helperText={errors?.fullname?.message}
                                                
                                            />}
                                        />
                                    </Grid>
                                    {/* <p>{errors}</p> */}
                                    <Grid item xs={12} sm={6}>
                                        <FormLabel component="legend" className={classes.radioGoupLabel}>Gender</FormLabel>
                                        <RadioGroup aria-label="gender" name="gender" row value={gender} onChange={handleRadioChange}>
                                            <FormControlLabel value="male" control={<Radio className={classes.radioGoup} />} label="Male" className={classes.radioGoup} />
                                            <FormControlLabel value="female" control={<Radio className={classes.radioGoup} />} label="Female" className={classes.radioGoup} />
                                            <FormControlLabel value="other" control={<Radio className={classes.radioGoup} />} label="Other" className={classes.radioGoup} />
                                        </RadioGroup>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <Controller
                                            name="email"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField 
                                                fullWidth 
                                                label="Patient Email" 
                                                variant="outlined" 
                                                color="primary" 
                                                {...field}
                                                error={!!errors?.email}
                                                helperText={errors?.email?.message} 
                                            />}
                                        />
                                    </Grid> 
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="mobile"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField 
                                                fullWidth 
                                                label="Patient Mobile Number" 
                                                variant="outlined" 
                                                color="primary" 
                                                {...field} 
                                                error={!!errors?.mobile}
                                                helperText={errors?.mobile?.message} 
                                            />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="dob"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                                <CssTextField
                                                    fullWidth
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
                                                    error={!!errors?.dob}
                                                    helperText={errors?.dob?.message} 
                                            />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="datecollected"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                                <CssTextField
                                                    fullWidth
                                                    label="Date Collected"
                                                    type="date"
                                                    variant="outlined"
                                                    color="primary"
                                                    // value={eventDate}
                                                    // onChange={(e) => setEventDate(e.target.value)}
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
                                                    error={!!errors?.datecollected}
                                                    helperText={errors?.datecollected?.message}
                                            />}
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
                                            <Divider style={{ backgroundColor: '#6e6e6e' , height: "3px" }}  />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="hemoglobin"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="Hemoglobin*" variant="outlined" color="primary" {...field}  error={!!errors?.hemoglobin} helperText={errors?.hemoglobin?.message} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="rbc"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="RBC*" variant="outlined" color="primary" {...field} error={!!errors?.rbc} helperText={errors?.rbc?.message} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="hct"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="HCT*" variant="outlined" color="primary" {...field} error={!!errors?.hct} helperText={errors?.hct?.message} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="mcv"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="MCV" variant="outlined" color="primary" {...field} error={!!errors?.mcv} helperText={errors?.mcv?.message} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="mch"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="MCH" variant="outlined" color="primary" {...field} error={!!errors?.mch} helperText={errors?.mch?.message} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="mchc"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="MCHC" variant="outlined" color="primary" {...field} error={!!errors?.mchc} helperText={errors?.mchc?.message} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="rdwcv"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="RDW-CV" variant="outlined" color="primary" {...field} error={!!errors?.rdwcv} helperText={errors?.rdwcv?.message} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="rdwsd"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="RDW-SD" variant="outlined" color="primary" {...field} error={!!errors?.rdwsd} helperText={errors?.rdwsd?.message} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="wbc"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="WBC*" variant="outlined" color="primary" {...field} error={!!errors?.wbc} helperText={errors?.wbc?.message} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="neu"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="NEU%" variant="outlined" color="primary" {...field} error={!!errors?.neu} helperText={errors?.neu?.message} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="lym"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="LYM%" variant="outlined" color="primary" {...field} error={!!errors?.lym} helperText={errors?.lym?.message} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="mon"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="MON%" variant="outlined" color="primary" {...field} error={!!errors?.mon} helperText={errors?.mon?.message} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="eos"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="EOS%" variant="outlined" color="primary" {...field} error={!!errors?.eos} helperText={errors?.eos?.message} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="bas"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="BAS%" variant="outlined" color="primary" {...field} error={!!errors?.bas} helperText={errors?.bas?.message} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="lym2"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="LYM#" variant="outlined" color="primary" {...field} error={!!errors?.lym2} helperText={errors?.lym2?.message} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="gra"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="GRA#" variant="outlined" color="primary" {...field} error={!!errors?.gra} helperText={errors?.gra?.message} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="plt"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="PLT*" variant="outlined" color="primary" {...field} error={!!errors?.plt} helperText={errors?.plt?.message} />}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Controller
                                            name="esr"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="ESR" variant="outlined" color="primary" {...field} error={!!errors?.esr} helperText={errors?.esr?.message} />}
                                        />
                                    </Grid>
                                </Grid>
                        </Paper>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={3}>
                                <Button 
                                    type="reset" 
                                    fullWidth 
                                    variant="contained" 
                                    className={classes.resetbtn}
                                    onClick={() => {
                                        reset({
                                          keepErrors: true,
                                        });
                                      }}
                                >
                                    Reset
                                </Button>
                            </Grid>    
                            <Grid item xs={12} sm={9}>
                                <Button 
                                    type="submit" 
                                    fullWidth 
                                    variant="contained" 
                                    color="secondary" 
                                    className={classes.submitbtn}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid> 
                    </form>
                </Grid>
            </Grid>
            <Snackbar open={successMsg} autoHideDuration={6000} onClose={handleSuccessMsg} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleSuccessMsg} severity="success" color="info" className={classes.cookieAlert}>
                    The form was submitted successfully.
                </Alert>
            </Snackbar>
        </div>
    )
}

export default AddReport;
