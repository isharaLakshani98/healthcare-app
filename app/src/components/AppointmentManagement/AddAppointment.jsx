import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Radio, RadioGroup, FormLabel, TextField, FormControlLabel, Paper, Button, Grid, Typography, Snackbar } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import MuiAlert from '@material-ui/lab/Alert';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

import DateRangeIcon from '@material-ui/icons/DateRange';

import useStyles from './styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// const consultants = [
//     {
//         value: 'default',
//         label: 'Select the name of the Consultant',
//     },
//     {
//       value: 'vinuri',
//       label: 'Vinuri',
//     },
//     {
//       value: 'rikas',
//       label: 'Rikas',
//     },
//     {
//       value: 'tiran',
//       label: 'Tiran',
//     },
//     {
//       value: 'sanda',
//       label: 'Sanda',
//     },
// ];

const apptime = [
    {
        value: 'default',
        label: 'Select time',
    },
    {
      value: '4.00 pm - 4.10 pm',
      label: '4.00 pm - 4.10 pm',
    },
    {
      value: '4.10 pm - 4.20 pm',
      label: '4.10 pm - 4.20 pm',
    },
    {
      value: '4.20 pm - 4.30 pm',
      label: '4.20 pm - 4.30 pm',
    },
    {
      value: '4.30 pm - 4.40 pm',
      label: '4.30 pm - 4.40 pm',
    },
    {
        value: '4.40 pm - 4.50 pm',
        label: '4.40 pm - 4.50 pm',
    },
    {
      value: '4.50 pm - 5.00 pm',
      label: '4.50 pm - 5.00 pm',
    },
];

const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required."),
    lastName: yup.string().required("Last Name is required."),
    email: yup.string().required("Email is required.").email("Enter a valid Email."),
    mobile: yup.string().required("Mobile Number is required.").max(10, "Mobile Number cannot exceed 10 characters."),
    dob: yup.string().required("Date of Birth is required."),
    consultant: yup.string().required("Consultant is required."),
    appdate: yup.string().required("Appointment Date is required."),
    apptime: yup.string().required("Appointment Time is required."),
});

const AddAppointment = () => {
    const classes = useStyles();
    const { control, handleSubmit, reset, formState: { errors } } = useForm(
        {
            resolver: yupResolver(schema),
            reValidateMode: 'onSubmit',
        }

    );
    const [consultant, setConsultant] = React.useState('default');
    const [time, setTime] = React.useState('default');    
    const [gender, setGender] = useState("");
    const [formData, setFormData] = useState([]);
    const [consultants, setConsultants] = useState([]);
    const [successMsg, setSuccessMsg] = useState(false);
    const isFirstRender = useRef(true);

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

    useEffect(() => {
        fetch("http://localhost:5000/api/employee").then(res => {
            if(res.ok){
                return res.json()
            }
        }).then(jsonRes => setConsultants(jsonRes));
    }, []);

    const onSubmit = (data) => {
        console.log(data);
        setFormData({
            firstName : data.firstName,
            lastName : data.lastName,
            email : data.email,
            mobile : data.mobile,
            gender : gender,
            dob : data.dob,
            consultant : data.consultant,
            appdate : data.appdate,
            apptime : data.apptime,
        })
    }

    const submitForm = (data) => {
        axios.post('http://localhost:5000/api/appointment/addApp', data)
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
        setGender(event.target.value);
    };

    const handleConsultant = (event) => {
        setConsultant(event.target.value);
    };

    const handleTime = (event) => {
        setTime(event.target.value);
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
                        <Typography variant="h4" className={classes.pageTitle}>Add New Appointment </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                        <Paper className={classes.paper}>
                            
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="firstName"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth 
                                            label="First Name" 
                                            variant="outlined" 
                                            color="primary" 
                                            {...field}
                                            error={!!errors?.firstName}
                                            helperText={errors?.firstName?.message} 
                                            />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="lastName"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField 
                                                fullWidth label="Last Name" variant="outlined" color="primary" 
                                                {...field}
                                                error={!!errors?.lastName}
                                                helperText={errors?.lastName?.message}  />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="email"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="Email" variant="outlined" color="primary" 
                                            {...field}
                                            error={!!errors?.email}
                                            helperText={errors?.email?.message} />}
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
                                            label="Mobile Number" 
                                            variant="outlined" 
                                            color="primary" 
                                            {...field}
                                            error={!!errors?.mobile}
                                            helperText={errors?.mobile?.message} />}
                                        />
                                    </Grid>
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
                                                    error={!!errors?.dob}
                                                    helperText={errors?.dob?.message}
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
                                            />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="consultant"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField
                                                fullWidth
                                                select
                                                label="Consultant Name"
                                                value={consultant}
                                                onChange={handleConsultant}
                                                variant="outlined"
                                                {...field}
                                                error={!!errors?.consultant}
                                                helperText={errors?.consultant?.message}
                                                >
                                                {consultants.filter(option => option.position.includes('doctor')).map((option) => (
                                                    <MenuItem key={option._id} value={option.firstName}>
                                                        {option.firstName} {option.lastName}
                                                    </MenuItem>
                                                ))}
                                            </CssTextField>}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="appdate"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                                <CssTextField
                                                    fullWidth
                                                    label="Date of Appointment"
                                                    type="date"
                                                    variant="outlined"
                                                    color="primary"
                                                    {...field}
                                                    error={!!errors?.appdate}
                                                    helperText={errors?.appdate?.message}
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
                                            />}
                                        />
                                    </Grid>    
                                    
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="apptime"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField
                                                fullWidth
                                                select
                                                label="Appointment Time"
                                                value={time}
                                                onChange={handleTime}
                                                variant="outlined"
                                                {...field}
                                                error={!!errors?.apptime}
                                                helperText={errors?.apptime?.message}
                                                >
                                                {apptime.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </CssTextField>}
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
                    The form was submitted successfully.
                </Alert>
            </Snackbar>
        </div>
    )
}


export default AddAppointment;
