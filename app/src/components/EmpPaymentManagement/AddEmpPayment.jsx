import React, {useState,useEffect,useRef} from 'react'
import { useForm, Controller } from "react-hook-form";
import { useLocation, useHistory } from 'react-router-dom';
import { FormLabel, TextField, FormControlLabel, Paper, Button, Grid, Typography } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import axios from 'axios';

import DateRangeIcon from '@material-ui/icons/DateRange';

import useStyles from './styles';

const schema = yup.object().shape({
    empType: yup.string().required("Select Employee Type"),
    employee: yup.string().required("Select Employee"),
    payAmount: yup.string().required("Payment Amount is required."),
    payType: yup.string().required("Payment Type is required."),
    payDate: yup.string().required("Payment Date is required."),
    payAccount: yup.string().required('You must enter a Account Number'),
    bank: yup.string().required('You must enter a Bank'),
    description: yup.string().required('You must enter a Description'),
});

const empTypes = [
    {
        value: 'default',
        label: 'Select the Employee Type',
    },
    {
      value: 'Doctor',
      label: 'Doctor',
    },
    {
      value: 'Pharmacist',
      label: 'Pharmacist',
    },
    {
      value: 'Reciptionist',
      label: 'Reciptionist',
    },
    {
      value: 'Lab Assistant',
      label: 'Lab Assistant',
    },
];

const employees = [
    {
        value: 'default',
        label: 'Select the Employee',
    },
    {
      value: 'Tiran Hettiarachchi',
      label: 'Tiran Hettiarachchi',
    },
    {
      value: 'Vinuri Galagoda',
      label: 'Vinuri Galagoda',
    },
    {
      value: 'Dananjaya Sadakelum',
      label: 'Dananjaya Sadakelum',
    },
    {
      value: 'Mohomad Rikas',
      label: 'Mohomad Rikas',
    },
];

const payTypes = [
    {
        value: 'default',
        label: 'Select the payment Type',
    },
    {
      value: 'Visa',
      label: 'Visa',
    },
    {
      value: 'MasterCard',
      label: 'MasterCard',
    },
    {
      value: 'Paypal',
      label: 'Paypal',
    },
];

const AddEmpPayment = () => {
    const classes = useStyles();
    const { control, handleSubmit, reset, formState: { errors }  } = useForm(
        {
            resolver: yupResolver(schema),
            reValidateMode: 'onSubmit',
        }
    );
    const [empType, setEmpType] = React.useState('default');
    const [position, setPosition] = React.useState('default');
    const [employee, setEmployee] = React.useState('default');
    const [payType, setPayType] = React.useState('default');
    const [formData, setFormData] = useState([]);
    const isFirstRender = useRef(true);
    const [nextId, setNextId] = useState("");
    const [employeeNames,setEmployeeNames] = useState([]);

    const [gender, setGender] = useState("");
    const history = useHistory();

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
      fetch("http://localhost:5000/api/employee").then(res => {
        if(res.ok){
            return res.json()
        }
      }).then(jsonRes => setEmployeeNames(jsonRes));

        getMaxId();

        if (isFirstRender.current) {
            isFirstRender.current = false // toggle flag after first render/mounting
            return;
        }
       
        submitForm(formData);
    }, [formData])

    const getMaxId = () => {
        axios
        .get("http://localhost:5000/api/empPay/getMaxId")
        .then((response) => {
          if(response.data.paymentId == null)
          {
            setNextId(1);
          }else{
            console.log(response.data.paymentId);
            setNextId(response.data.paymentId + 1);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const onSubmit = (data) => {

        var codeId = document.getElementById("payId").value

        setFormData({
            paymentId:nextId,
            employeeId: '1',
            employeeType: data.empType,
            employeeName: data.employee,
            paymentAmount: data.payAmount,
            paymentType: data.payType,
            paymentDate: data.payDate,
            paymentAccount: data.payAccount,
            description: data.description,
            paymentBank: data.bank,
        })
    }

    const submitForm = (data) => {
        axios.post('http://localhost:5000/api/empPay/addEmpPay', data)
        .then((response) => {
          console.log(response);
          history.push('/all-emp-payment');
          reset({
            keepErrors: true,
          });
        }).catch((err) => {
          console.log(err);
        })
    }

    const handleEmpType = (event) => {
        setEmpType(event.target.value, console.log(empType));
    };

    const handleEmployee = (event) => {
        setEmployee(event.target.value, console.log(employee));
    };

    const handlePayType = (event) => {
        setPayType(event.target.value, console.log(payType));
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paperTitle}>
                        <Typography variant="h4" className={classes.pageTitle}>Add Employee Payment Details</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                        <Paper className={classes.paper}>   
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="empType"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField
                                                fullWidth
                                                select
                                                label="Employee Type"
                                                value={empType}
                                                onChange={handleEmpType}
                                                variant="outlined"
                                                error={!!errors?.empType}
                                                helperText={errors?.empType?.message}
                                                {...field}
                                                >
                                                {empTypes.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </CssTextField>}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="employee"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField
                                                fullWidth
                                                select
                                                label="Select Employee"
                                                value={employee}
                                                onChange={handleEmployee}
                                                variant="outlined"
                                                error={!!errors?.employee}
                                                helperText={errors?.employee?.message}
                                                {...field}
                                                // error={!!errors?.employee}
                                                // helperText={errors?.employee?.message}
                                                >
                                                {employeeNames.map((empNames) => (
                                                    <MenuItem key={empNames._id} value={empNames.firstName}>
                                                        {empNames.firstName} {empNames.lastName}
                                                    </MenuItem>
                                                ))}
                                            </CssTextField>}
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="payAmount"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField 
                                            fullWidth label="Payment Amount" 
                                            variant="outlined" 
                                            color="primary"
                                            error={!!errors?.payAmount}
                                            helperText={errors?.payAmount?.message} 
                                            {...field} />}
                                        />
                                    </Grid> 
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="payType"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField
                                                fullWidth
                                                select
                                                label="Payment Type"
                                                value={payType}
                                                onChange={handlePayType}
                                                variant="outlined"
                                                error={!!errors?.payType}
                                                helperText={errors?.payType?.message}
                                                {...field}
                                                // error={!!errors?.payType}
                                                // helperText={errors?.payType?.message} 
                                                >
                                                {payTypes.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </CssTextField>}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="payDate"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                                <CssTextField
                                                    fullWidth
                                                    label="Payment Date"
                                                    type="date"
                                                    variant="outlined"
                                                    color="primary"
                                                    error={!!errors?.payDate}
                                                    helperText={errors?.payDate?.message} 
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
                                            name="payAccount"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField 
                                            fullWidth 
                                            label="Payment Account" 
                                            variant="outlined" 
                                            color="primary" 
                                            error={!!errors?.payAccount}
                                            helperText={errors?.payAccount?.message} 
                                            {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="description"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <TextField
                                                id="outlined-multiline-static"
                                                label="Description"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                defaultValue=""
                                                color="primary"
                                                variant="outlined"
                                                error={!!errors?.description}
                                                helperText={errors?.description?.message} 
                                                {...field}
                                            />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="bank"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => 
                                            <CssTextField  
                                            fullWidth 
                                            label="Payment Bank" 
                                            variant="outlined" 
                                            color="primary" 
                                            error={!!errors?.bank}
                                            helperText={errors?.bank?.message}
                                            {...field} />}
                                        />
                                    </Grid>        
                                </Grid>
                        </Paper>
                        <Typography variant="body2" className={classes.note} gutterBottom>
                            Note : Payment Account will be auto-generated from the given details by the Employee
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={3}>
                                <Button type="reset" fullWidth variant="contained" 
                                className={classes.resetbtn}
                                onClick={() => {
                                  reset({
                                    keepErrors: true,
                                  });
                                }}>
                                    Reset
                                </Button>
                            </Grid>    
                            <Grid item xs={12} sm={9}>
                                <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submitbtn}>
                                    Submit
                                </Button>
                            </Grid>
                            <Grid hidden='ture' item xs={12}>
                                <h1 id="payId" name="payId">{nextId}</h1>
                            </Grid>
                        </Grid> 
                    </form>
                </Grid>
            </Grid>    
        </div>
    )
}

export default AddEmpPayment
