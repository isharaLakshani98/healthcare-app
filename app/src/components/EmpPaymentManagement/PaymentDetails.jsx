import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import PropTypes from 'prop-types';
import { TextField, Paper,Box,Modal, Button, Grid, Typography, IconButton, Table, TableBody, TableContainer, TableFooter, TablePagination, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle  } from '@material-ui/core/';
import useStyles from './styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateRangeIcon from '@material-ui/icons/DateRange';

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

const employeeFD = [
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
    { "empID" : "0001", "firstName" : "Minerva", "lastName" : "McGonagall", "position" : "Doctor", "paymentAmt" : "Rs.80000.00", "paymentType" : "Visa", "paymentDate" : "22.10.2021"},
];

const PaymentDetails = () => {
    
    const classes = useStyles();
    const { empDetails } = useParams();
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
    const [successMsg, setSuccessMsg] = useState(true);

    const [gender, setGender] = useState("");

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
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

    const history = useHistory()
    const [opendlt, setOpendlt] = React.useState(false);
    const [empPayment, setEmpPayment] = React.useState([]);
    const [paymentId, setPaymentId] = useState("");
    const [formData, setFormData] = useState([]);
    const [empByName, setEmpByName] = useState([]);
    const [employeeNames,setEmployeeNames] = useState([]);

    const { id } = useParams();

    const handleClickOpen = () => {
        setOpendlt(true);
        setPaymentId(id);
    };
    
    const handleClose = () => {
        setOpendlt(false);
        history.push('/all-emp-payment')
    };

    const [open, setOpen] = React.useState(false);
    const handleOpenUpdate = () => setOpen(true);
    const handleCloseUpdate = () => setOpen(false);

    useEffect(() => {
        fetch("http://localhost:5000/api/empPay/getPayEmp/"+id).then(res => {
            if(res.ok){
                return res.json()
            }
        }).then(jsonRes =>{
            setEmpPayment(jsonRes);
            const firstName = jsonRes.employeeName;
            //console.log(firstName)
            
            fetch("http://localhost:5000/api/employee/getEmpByName/" + firstName)
            .then(res => {
                if(res.ok){
                    return res.json()
                }
            })
            .then(jsonresponse => {
                setEmpByName(jsonresponse);
                //console.log(jsonresponse)

                fetch("http://localhost:5000/api/employee").then(res => {
                if(res.ok){
                    return res.json()
                }
                }).then(jsonRes => setEmployeeNames(jsonRes));
            })
        });

    }, [])

    const deletePayment = () => {
        console.log(paymentId)
        axios
        .delete("http://localhost:5000/api/empPay/deleteEmpPay/" + paymentId)
        .then((res) => {
            if(res.status == 200){
                console.log("Payment Deleted Successfully");
            }
        })
        .catch((err) => {
            console.log(err)
        })

        handleClose();
    }
    const onSubmit = (data) => {
        // setFormData({
        //     paymentId:paymentId,
        //     employeeId: '1',
        //     employeeType: data.empType,
        //     employeeName: data.employee,
        //     paymentAmount: data.payAmount,
        //     paymentType: data.payType,
        //     paymentDate: data.payDate,
        //     paymentAccount: data.payAccount,
        //     description: data.description,
        //     paymentBank: data.bank,
        // })

        const dataFromForm =  [{
            paymentId:id,
            employeeId: '1',
            employeeType: data.empType,
            employeeName: data.employee,
            paymentAmount: data.payAmount,
            paymentType: data.payType,
            paymentDate: data.payDate,
            paymentAccount: data.payAccount,
            description: data.description,
            paymentBank: data.bank,
          }]

        console.log(dataFromForm)

        axios
        .post("http://localhost:5000/api/empPay/updateEmpPay", dataFromForm)
        .then((res) => {
            if(res.status == 200){
                console.log("Payment Updated Successfully");
                history.push('/all-emp-payment');
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const submitForm = (data) => {
        reset({
            keepErrors: true,
        });
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
                        <Typography variant="h4" className={classes.pageTitle}>Payment Details</Typography>
                        <Typography variant="h5" className={classes.pageTitleEID}>Item ID :{id}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.detailsPaper}>
                        <h2 style={{marginBottom:10,marginTop:10,marginLeft:10}}>Employee Details</h2>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography  variant="h6">First Name : <span style={{color:'#023e8a'}}>{empByName.firstName}</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Last Name : <span style={{color:'#023e8a'}}>{empByName.lastName}</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Email : <span style={{color:'#023e8a'}}>{empByName.email}</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Mobile Number : <span style={{color:'#023e8a'}}>{empByName.mobile}</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Address 1 : <span style={{color:'#023e8a'}}>{empByName.address1}</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Address 2 : <span style={{color:'#023e8a'}}>{empByName.address2}</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Gender : <span style={{color:'#023e8a'}}>{empByName.gender}</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Marital Status : <span style={{color:'#023e8a'}}>{empByName.marital}</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Date of Birth : <span style={{color:'#023e8a'}}>{empByName.dob}</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Position/Job Title : <span style={{color:'#023e8a'}}>{empByName.position}</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:20,marginLeft:30}}>
                            <Typography variant="h6">Date of Hire : <span style={{color:'#023e8a'}}>{empByName.hiredate}</span></Typography>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.detailsPaper}>
                        <h2 style={{marginBottom:10,marginTop:10,marginLeft:10}}>Payment Details</h2>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography  variant="h6">Payment Date : <span style={{color:'#023e8a'}}>{empPayment.paymentDate}</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Payment Amount : <span style={{color:'#023e8a'}}>{empPayment.paymentAmount}</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Payment Type : <span style={{color:'#023e8a'}}>{empPayment.paymentType}</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Payment Account : <span style={{color:'#023e8a'}}>{empPayment.paymentAccount}</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Payment Bank : <span style={{color:'#023e8a'}}>{empPayment.paymentBank}</span></Typography>
                        </Grid>
                        <Grid item xs={12} style={{marginBottom:10,marginLeft:30}}>
                            <Typography variant="h6">Description : <span style={{color:'#023e8a'}}>{empPayment.description}</span></Typography>
                        </Grid>
                    </Paper>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" className={classes.detailsUpdateBtn} onClick={handleOpenUpdate}>
                        Update Payment Details
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" className={classes.detailsDeleteBtn} onClick={handleClickOpen}>
                        Delete Payment
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Dialog
                open={opendlt}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Paper className={classes.dialogBox}>
                    <DialogTitle id="alert-dialog-title" style={{ textAlign:"center" }}><DeleteForeverIcon style={{ fontSize: "100px", color: "#ff4040" }} /></DialogTitle>
                    <DialogContent style={{ textAlign:"center" }}> 
                        <DialogContentText id="alert-dialog-description" className={classes.dialogContent}>
                            Are you sure you want to<br /> permanetly delete this record?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{ justifyContent:"center" }}>
                        <Button onClick={handleClose} variant="contained"color="secondary" className={classes.dialogBtn}>
                            Cancel
                        </Button>
                        <Button onClick={deletePayment} variant="contained" className={classes.dialogBtnRed} autoFocus>
                            Yes, Delete it
                        </Button>
                    </DialogActions>
                </Paper>
            </Dialog>

            <div>
                <Modal
                    open={open}
                    onClose={handleCloseUpdate}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} style={{width:800}}>
                    <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paperTitle}>
                        <Typography variant="h4" className={classes.pageTitle}>Update Employee Payment Details</Typography>
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
                                            defaultValue = {empPayment.employeeType}
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
                                            defaultValue = {empPayment.employeeName}
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
                                            defaultValue = {empPayment.paymentAmount}
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="Payment Amount" variant="outlined" color="primary"
                                            error={!!errors?.payAmount}
                                            helperText={errors?.payAmount?.message} 
                                            {...field} />}
                                        />
                                    </Grid> 
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="payType"
                                            control={control}
                                            defaultValue = {empPayment.paymentType}
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
                                            defaultValue = {empPayment.paymentDate}
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
                                            defaultValue = {empPayment.paymentAccount}
                                            render={({ field }) => 
                                            <CssTextField fullWidth label="Payment Account" variant="outlined" color="primary" 
                                            error={!!errors?.payAccount}
                                            helperText={errors?.payAccount?.message}
                                            {...field} />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Controller
                                            name="description"
                                            control={control}
                                            defaultValue = {empPayment.description}
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
                                            defaultValue = {empPayment.paymentBank}
                                            render={({ field }) => 
                                            <CssTextField  fullWidth label="Payment Bank" variant="outlined" color="primary"
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
                                <Button type="reset" fullWidth variant="contained" className={classes.resetbtn}
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
                                    Update
                                </Button>
                            </Grid>
                        </Grid> 
                    </form>
                </Grid>
            </Grid>  
                    </Box>
                </Modal>
            </div>
            {/* component={Link} to={'/emp-update' + empPayment} */}
        </div>
    )
}

export default PaymentDetails
