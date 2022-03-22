import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Radio, RadioGroup, FormLabel, TextField, FormControlLabel, Paper, Button, Grid, Typography, Divider, Snackbar } from '@material-ui/core/';
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';

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


const UpdateAppointment = (id) => {
    const classes = useStyles();
    const history = useHistory();
    const isFirstRender = useRef(true);
    const { control, handleSubmit, setValue, formState: { errors } } = useForm();
    const [gender, setGender] = useState("");
    const [consultant, setConsultant] = React.useState('default');
    const [time, setTime] = React.useState('default');
    const selectedId = id.match.params.id;
    const [consultants, setConsultants] = useState([]);
    const [successMsg, setSuccessMsg] = useState(false);
    const [formData, setFormData] = useState([]);
    const [appointment, setAppointment] = React.useState({});


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
        },
        input: {
          color: "#1a1a1a"
        }
    })(TextField);

    useEffect(() => {
        fetchReport();
    }, []);

    useEffect(() => {
        fetch("http://localhost:5000/api/employee").then(res => {
            if(res.ok){
                return res.json()
            }
        }).then(jsonRes => setConsultants(jsonRes));
    }, []);

    const fetchReport = async() => {
        const response = await fetch(`http://localhost:5000/api/appointment/appfind/${selectedId}`);
        const data = await response.json();
        setAppointment(data);
    }

    // console.log(appointment);

    useEffect(() => {
        setValue('_id', appointment._id || '');
        setValue('firstName', appointment.firstName || '');
        setValue('lastName', appointment.lastName || '');
        setValue('email', appointment.email || '');
        setValue('mobile', appointment.mobile || '');
        setValue('dob', appointment.dob || '');
        setValue('appdate', appointment.appdate || '');
        setValue('dob', appointment.dob || '');
        setValue('apptime', appointment.apptime || '');
        setValue('consultant', appointment.consultant || '');
        setTime(appointment.apptime || '');
        setConsultant(appointment.consultant || '');
        setGender(appointment.gender);
    }, [appointment]);

    const UpdateAppointment = (data) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                mobile: data.mobile,
                gender: gender,
                dob: data.dob,
                consultant: data.consultant,
                appdate: data.appdate,
                apptime: data.apptime,
            })
        };
        
        fetch(`http://localhost:5000/api/appointment/appupdate/${selectedId}`, requestOptions)
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            setSuccessMsg(true);
            history.push("/all-appointments");
        })
        .catch(error => {
            console.log(error);
            console.error('There was an error!', error);
        });
    };
    
    const onSubmit = (data) => {
        UpdateAppointment(data);
    };

    const handleRadioChange = (event) => {
        setGender(event.target.value, console.log(gender));
    };

    const handleConsultant = (event) => {
        setConsultant(event.target.value, console.log(consultant));
    };

    const handleTime = (event) => {
        setTime(event.target.value, console.log(time));
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
                        <Typography variant="h4" className={classes.pageTitle}>Edit Appointment Details</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                        <Paper className={classes.paper}>
                            
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="_id"
                                            control={control}
                                            render={({ field }) => 
                                            <CssTextField disabled fullWidth label="Appointment ID" variant="outlined" color="primary" {...field} />}
                                            defaultValue={appointment._id}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="firstName"
                                            control={control}
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="First Name" variant="outlined" color="primary" {...field} />}
                                            defaultValue={appointment.firstName}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="lastName"
                                            control={control}
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="Last Name" variant="outlined" color="primary" {...field} />}
                                            defaultValue={appointment.lastName}
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
                                            name="email"
                                            control={control}
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="Email" variant="outlined" color="primary" {...field} />}
                                            defaultValue={appointment.email}
                                        />
                                    </Grid> 
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="mobile"
                                            control={control}
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="Mobile Number" variant="outlined" color="primary" {...field} />}
                                            defaultValue={appointment.mobile}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="dob"
                                            control={control}
                                            defaultValue={appointment.dob}
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
                                            />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="consultant"
                                            control={control}
                                            defaultValue={appointment.consultant}
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
                                            defaultValue={appointment.appdate}
                                            render={({ field }) => 
                                                <CssTextField
                                                    fullWidth
                                                    label="Date of Appointment"
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
                                            />}
                                        />
                                    </Grid>    
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="apptime"
                                            control={control}
                                            defaultValue={appointment.apptime}
                                            render={({ field }) => 
                                            <CssTextField
                                                fullWidth
                                                select
                                                label="Appointment Time"
                                                value={time}
                                                onChange={handleTime}
                                                {...field}
                                                variant="outlined"
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
                                <Button component={Link} to="/all-appointments" fullWidth variant="contained" className={classes.resetbtn}>
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

export default UpdateAppointment
