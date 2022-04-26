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
import moment from 'moment';

import DateRangeIcon from '@material-ui/icons/DateRange';

import useStyles from './styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const marital = [
    {
        value: 'default',
        label: 'Select the marital status',
    },
    {
      value: 'single',
      label: 'Single',
    },
    {
      value: 'married',
      label: 'Married',
    },
    {
      value: 'widowed',
      label: 'Widowed',
    },
    {
      value: 'divorced',
      label: 'Divorced',
    },
];

const positions = [
    {
        value: 'default',
        label: 'Select the position/job title',
    },
    {
      value: 'doctor',
      label: 'Doctor',
    },
    {
      value: 'pharmacist',
      label: 'Pharmacist',
    },
    {
      value: 'accountant',
      label: 'Accountant',
    },
    {
      value: 'labAssistant',
      label: 'Laboratory Assistant',
    },
];

const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required."),
    lastName: yup.string().required("Last Name is required."),
    email: yup.string().required("Email is required.").email("Enter a valid Email."),
    mobile: yup.number().typeError('Enter a valid number.').required("Mobile Number is required."),
    address1: yup.string().required("Address is required."),
    dob: yup.date().max(moment().add(1,"m").toDate(), "Future Date not Allowed.").required("Date of Birth is required.").typeError("Invalid Date"),
    position: yup.string().required("Position is required."),
    hiredate: yup.string().required("Hire Date is required."),
});

const AddEmployee = () => {
    const classes = useStyles();
    const { control, handleSubmit, reset, formState: { errors }  } = useForm(
        {
            resolver: yupResolver(schema),
            reValidateMode: 'onSubmit',
        }
    );
    const [maritalStatus, setMaritalStatus] = React.useState('default');
    const [position, setPosition] = React.useState('default');
    const [example, setExample] = React.useState("saSAS");
    const [successMsg, setSuccessMsg] = useState(false);
    const [gender, setGender] = useState("");
    const [formData, setFormData] = useState([]);
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

    const onSubmit = (data) => {
        setFormData({
            firstName : data.firstName,
            lastName : data.lastName,
            email : data.email,
            mobile : data.mobile,
            address1 : data.address1,
            address2 : data.address2,
            gender : gender,
            dob : data.dob,
            marital : data.marital,
            position : data.position,
            hiredate : data.hiredate,
        })
    }

    const submitForm = (data) => {
        axios.post('http://localhost:5000/api/employee', data)
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

    const handleMaritalStatus = (event) => {
        setMaritalStatus(event.target.value, console.log(maritalStatus));
    };

    const handlePosition = (event) => {
        setPosition(event.target.value, console.log(position));
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
                        <Typography variant="h4" className={classes.pageTitle}>Add New Employee</Typography>
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
                                            <CssTextField 
                                                fullWidth 
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
                                                fullWidth 
                                                label="Last Name" 
                                                variant="outlined" 
                                                color="primary"
                                                {...field}
                                                error={!!errors?.lastName} 
                                                helperText={errors?.lastName?.message} 
                                            />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="email"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField 
                                                fullWidth 
                                                label="Email" 
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
                                                label="Mobile Number" 
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
                                            name="address1"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField 
                                                fullWidth 
                                                label="Address 1" 
                                                variant="outlined" 
                                                color="primary" 
                                                {...field}
                                                error={!!errors?.address1} 
                                                helperText={errors?.address1?.message}
                                            />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="address2"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="Address 2" variant="outlined" color="primary" {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormLabel component="legend" className={classes.radioGoupLabel}>Gender</FormLabel>
                                        <RadioGroup aria-label="gender" name="gender" row value={gender} onChange={handleRadioChange} error={!!errors?.gender} helperText={errors?.gender?.message}>
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
                                            name="marital"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField
                                                fullWidth
                                                select
                                                label="Marital Status"
                                                value={maritalStatus}
                                                onChange={handleMaritalStatus}
                                                variant="outlined"
                                                {...field}
                                                >
                                                {marital.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </CssTextField>}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="position"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField
                                                fullWidth
                                                select
                                                label="Position/Job Title"
                                                value={position}
                                                onChange={handlePosition}
                                                variant="outlined"
                                                error={!!errors?.position} 
                                                helperText={errors?.position?.message}
                                                {...field}
                                                >
                                                {positions.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </CssTextField>}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="hiredate"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                                <CssTextField
                                                    fullWidth
                                                    label="Date of Hire"
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
                                                    error={!!errors?.hiredate} 
                                                    helperText={errors?.hiredate?.message}
                                            />}
                                        />
                                    </Grid>
                                </Grid>
                        </Paper>
                        <Typography variant="body2" className={classes.note} gutterBottom>
                            Note : Employee ID and a temporary password will be auto-generated and send to the employee's email.
                        </Typography>
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

export default AddEmployee;
