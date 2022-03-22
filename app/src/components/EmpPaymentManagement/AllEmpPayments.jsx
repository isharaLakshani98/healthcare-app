import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { useForm, Controller } from "react-hook-form";
import { TextField, Paper, Button, Grid, Typography, IconButton, Table, TableBody, TableContainer, TableFooter, TablePagination, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle  } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MuiTableCell from "@material-ui/core/TableCell";

import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SearchBar from "material-ui-search-bar";
import Pdf from "react-to-pdf";
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import GetAppIcon from '@material-ui/icons/GetApp';
import axios from 'axios';

import useStyles from './styles';

const refPrint = React.createRef();

const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const classes1 = useStyles();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          className={classes1.paginationBtn}
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page"  className={classes1.paginationBtn}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          className={classes1.paginationBtn}
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          className={classes1.paginationBtn}
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

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

const AllEmpPayments = () => {
    const classes = useStyles();
    const { control, handleSubmit, reset } = useForm();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [opendlt, setOpendlt] = React.useState(false);
    const [empPayments, setEmpPayments] = React.useState([]);
    const [paymentId, setPaymentId] = useState("");
    const [searched, setSearched] = useState("");
    const [rows, setRows] = useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [paymentData, setPaymentData] = React.useState([]);

    const options = {
        orientation: 'landscape',
    };

    const CssTextField = withStyles({
        root: {
          '& .MuiInputBase-root': { 
            backgroundColor: '#ffffff',
           },
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

    const TableCell = withStyles({
        root: {
          borderBottom: "none"
        }
    })(MuiTableCell);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, employeeFD.length - page * rowsPerPage);

    useEffect(() => {
        fetch("http://localhost:5000/api/empPay/viewEmpPay").then(res => {
            if(res.ok){
                return res.json()
            }
        }).then(jsonRes => setEmpPayments(jsonRes));

    }, [])

    useEffect(() => {
        setRows(empPayments)
    }, [empPayments])

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

    const handleClickOpen = (payId) => {
        setOpendlt(true);
        setPaymentId(payId);
    };

    const handleClose = () => {
        setOpendlt(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const requestSearch = (searchedVal) => {
        const filteredRows = empPayments.filter((row) => {
          return row.employeeName.toLowerCase().includes(searchedVal.toString().toLowerCase());
        });
        setRows(filteredRows);
    };
    
    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    const handleOpenModal = (row) => {
        setOpenModal(true);
        // console.log(row);
        setPaymentData(row);
    };
    
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const modalBody = (
        <Fade in={openModal}>
            <div>
                <div ref={refPrint}>
                    <Grid container spacing={3} className={classes.modelPaper}>
                        <Grid item xs={12}>
                            <Paper className={classes.paperTitle}>
                                <Typography variant="h6" id="transition-modal-title" style={{color:'#ffffff'}}>Payment Recipt</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h7" id="paymentId" className={classes.reciptModelSub}><b>Payment ID :</b> {paymentData.paymentId}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h7" id="paymentDate" className={classes.reciptModelSub}><b>Payment Date :</b> {paymentData.paymentDate}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h7" id="fullName" className={classes.reciptModelSub}><b>Employee Name :</b> {paymentData.employeeName}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h7" id="empType" className={classes.reciptModelSub}><b>Employee Type :</b> {paymentData.employeeType}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h7" id="paymentDesc" className={classes.reciptModelSub}><b>Payment Description :</b> {paymentData.description}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h7" id="paymentAcc" className={classes.reciptModelSub}><b>Payment Account :</b> {paymentData.paymentAccount}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h7" id="paymentType" className={classes.reciptModelSub}><b>Payment Type :</b> {paymentData.paymentType}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h7" id="paymentAmount" className={classes.reciptModelSub} style={{fontSize:30}}><b>Payment Amount : Rs.</b> {paymentData.paymentAmount}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h7" id="paymentAmount" className={classes.reciptModelSub} style={{fontSize:12,marginLeft:350}}><b>Copyright © 2021 24Seven HMS.All rights reserved.</b></Typography>
                        </Grid>
                        
                    </Grid>
                </div>
                <Grid item xs={6} >
                        <Pdf targetRef={refPrint} filename={paymentData.paymentId + "PaymentRecipt.pdf"} options={options} scale="0.8">
                            {({toPdf}) => (
                                <Button onClick={toPdf} variant="contained" className={classes.ReportReciptBtn} startIcon={<GetAppIcon />}>Download Recipt</Button>
                            )}
                        </Pdf>
                        </Grid>
            </div>
        </Fade>
    )

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paperTitle}>
                        <Typography variant="h4" className={classes.pageTitle}>All Employee Payments</Typography>
                    </Paper>
                </Grid>
                <Grid container spacing={3} justifyContent="flex-end" alignItems="center" style={{ padding: "12px",marginLeft:"-95px" }}>
                    <Grid item xs={12} sm={4}>
                        <SearchBar
                            cancelOnEscape
                            value={searched}
                            onChange={(searchVal) => requestSearch(searchVal)}
                            onCancelSearch={() => cancelSearch()}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button component={Link} to ="/add-emp-payment" fullWidth variant="contained" startIcon={<AddIcon />} color="secondary" className={classes.submitbtn}>
                            Add New Employee Payment
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                        <TableContainer>
                            <Table className={classes.table}>
                                <TableBody>
                                    <TableRow component={Paper} className={classes.paper}>
                                        <TableCell component="th" className={classes.tableth} style={{ width: 100 }}>
                                            Payment ID
                                        </TableCell>
                                        <TableCell component="th" className={classes.tableth}>
                                            Employee ID
                                        </TableCell>
                                        <TableCell component="th" className={classes.tableth}>
                                            Full Name
                                        </TableCell>
                                        <TableCell component="th" className={classes.tableth}>
                                            Position/Job Title
                                        </TableCell>
                                        <TableCell component="th" className={classes.tableth}>
                                            Payment Amount 
                                        </TableCell>
                                        <TableCell component="th" className={classes.tableth}>
                                            Payment Description 
                                        </TableCell>
                                        <TableCell component="th" className={classes.tableth}>
                                            Payment Type
                                        </TableCell>
                                        <TableCell component="th" className={classes.tableth}>
                                            Payment Date
                                        </TableCell> 
                                        <TableCell component="th" className={classes.tableth}>
                                            Actions
                                        </TableCell>
                                    </TableRow> <br />
                                    {(rowsPerPage > 0
                                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : rows
                                    ).map((row) => (
                                        <>
                                        <TableRow key={row.paymentId} className={classes.tableRow}>
                                            <TableCell component="th" scope="row" style={{ width: 100 }}>
                                                {row.paymentId}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row.employeeId}
                                            </TableCell>
                                            <TableCell component={Link} to={'/emp-details/' + row.employeeId} align="left">
                                                {row.employeeName}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.employeeType}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.paymentAmount}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.description}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.paymentType}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.paymentDate}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Button component={Link} to={'/emp-details/' + row.paymentId} variant="contained" color="secondary" className={classes.tableBtn}>
                                                    Update
                                                </Button>
                                                <Button variant="contained" className={classes.tableBtnRed} onClick={() => handleClickOpen(row.paymentId)}>
                                                    Remove
                                                </Button>
                                                <Button variant="contained" className={classes.ReportBtn} onClick={() => handleOpenModal(row)}>
                                                    Recipt
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <br />
                                        </>
                                    ))}

                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={6}
                                        style={{ borderBottom:"none" }}
                                        count={employeeFD.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: { 'aria-label': 'rows per page' },
                                            native: true,
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                </Grid>
                {/* <Grid item xs={12}>
                <Button variant="contained" color="secondary" className={classes.ReportBtn}>
                    Generate Report
                </Button>
                </Grid> */}
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
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
               {modalBody}
            </Modal>
        </div>
    )
}

export default AllEmpPayments