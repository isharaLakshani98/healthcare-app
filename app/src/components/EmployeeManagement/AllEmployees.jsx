import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import axios from 'axios';
import Pdf from "react-to-pdf";
import { useForm, Controller } from "react-hook-form";
import { TextField, Paper, Button, Grid, Typography, IconButton, Table, TableBody, TableContainer, TableFooter, TablePagination, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MuiTableCell from "@material-ui/core/TableCell";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SearchBar from "material-ui-search-bar";
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

import SearchIcon from '@material-ui/icons/Search';
import GetAppIcon from '@material-ui/icons/GetApp';
import AddIcon from '@material-ui/icons/Add';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PageviewIcon from '@material-ui/icons/Pageview';

import useStyles from './styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const refPrint = React.createRef();
const refPrintFiltered = React.createRef();

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
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page" className={classes1.paginationBtn}>
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

let currentDate = new Date();
let currentMonth = parseInt(currentDate.getMonth() + 1).toString();
currentMonth = currentMonth.length == 1 ? "0" + currentMonth : currentMonth;
let currentYear = currentDate.getFullYear();

const AllEmployees = () => {
    const classes = useStyles();
    const history = useHistory();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [opendlt, setOpendlt] = React.useState(false);
    const [employees, setEmployees] = React.useState([]);
    const [employeeData, setEmployeeData] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState("");
    const [rows, setRows] = useState([]);
    const [allCount, setAllCount] = React.useState(
        {
            doctorcount: 0,
            pharmacistcount: 0,
            assistantcount: 0,
            accountantcount: 0
        }
    );
    const [successMsg, setSuccessMsg] = useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [openModalEmployee, setOpenModalEmployee] = React.useState(false);
    const [openModalEmployeeMonth, setOpenModalEmployeeMonth] = React.useState(false);
    const [filteredEmployees, setFilteredEmployees] = React.useState([]);
    const [searched, setSearched] = useState("");
    const [selectedDate, setSelectedDate] = React.useState(
        currentYear.toString() + "-" + currentMonth
    );

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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, employees.length - page * rowsPerPage);

    useEffect(() => {
        fetch("http://localhost:5000/api/employee").then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => setEmployees(jsonRes));
    }, [selectedItem]);

    useEffect(() => {
        setRows(employees);
    }, [employees]);

    useEffect(() => {
        fetch("http://localhost:5000/api/employee/allcounts").then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => setAllCount(jsonRes));
    }, []);

    const requestSearch = (searchedVal) => {
        const filteredRows = employees.filter((row) => {
            return row.position.toLowerCase().includes(searchedVal.toString().toLowerCase());
        });
        setRows(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    const handleClickOpen = (row) => {
        setOpendlt(true);
        setSelectedItem(row._id);
    };

    const handleEditPage = (row) => {
        history.push(`/edit-employee/${row._id}`);
    };

    const deleteItem = () => {
        fetch(`http://localhost:5000/api/employee/empdelete/${selectedItem}`, { method: 'DELETE' })
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                setSuccessMsg(true);
                setSelectedItem("");
                handleClose();
            })
            .catch(error => {
                console.log(error);
                console.error('There was an error!', error);
            });
    };

    const handleSuccessMsg = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }

        setSuccessMsg(false);
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

    const handleOpenModal = (row) => {
        setOpenModal(true);
        // console.log(row);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleOpenModalEmployee = (row) => {
        setOpenModalEmployee(true);
        console.log(row);
        setEmployeeData(row);
    };

    const handleCloseModalEmployee = () => {
        setOpenModalEmployee(false);
        setOpenModalEmployeeMonth(false);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleDownloadReports = () => {
        const selectedYear = selectedDate.split("-")[0];
        const selectedMonth = selectedDate.split("-")[1];

        const filteredReportsArr = employees.filter(
            (report) => {
                const arr = report.hiredate.split("-");
                return arr[1] == selectedMonth && arr[0] == selectedYear;
            }
        );
        setFilteredEmployees(filteredReportsArr);
        setOpenModalEmployeeMonth(true);
    };

    const employeesByMonthBody = (
        <Fade in={openModalEmployeeMonth}>
            <div>
                <div ref={refPrintFiltered}>
                    <Grid container spacing={3} className={classes.modelPaper}>
                        <Grid item xs={12}>
                            <Paper className={classes.paperTitle}>
                                <Typography variant="h4" className={classes.pageTitle}>Employee Report - {selectedDate}</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table className={classes.table}>
                                    <TableBody>
                                        {filteredEmployees.length == 0 ?
                                            <TableRow component={Paper} className={classes.paper}>
                                                There are no records available for this month.
                                            </TableRow> :

                                            <TableRow component={Paper} className={classes.paper}>
                                                <TableCell component="th" className={classes.tableth}>
                                                    Employee ID
                                                </TableCell>
                                                <TableCell component="th" className={classes.tableth}>
                                                    Full Name
                                                </TableCell>
                                                <TableCell component="th" className={classes.tableth}>
                                                    Mobile Number
                                                </TableCell>
                                                <TableCell component="th" className={classes.tableth}>
                                                    Date Hired
                                                </TableCell>
                                                <TableCell component="th" className={classes.tableth}>
                                                    Email
                                                </TableCell>
                                                <TableCell component="th" className={classes.tableth}>
                                                    Date of Birth
                                                </TableCell>
                                            </TableRow>}
                                        <br />
                                        {(filteredEmployees
                                        ).map((row) => (
                                            <>
                                                <TableRow key={row.name} className={classes.tableRow}>
                                                    <TableCell component="th" scope="row">
                                                        {row._id}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {row.firstName} {row.lastName}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {row.mobile}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {row.hiredate}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {row.email}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {row.dob}
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        ))}
                                    </TableBody>

                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>

                </div>
                {filteredEmployees.length != 0 ?
                    <Pdf targetRef={refPrintFiltered} filename={selectedDate + " Employee Reports.pdf"} options={options} scale="0.9">
                        {({ toPdf }) => (
                            <Button onClick={toPdf} variant="contained" className={classes.dialogBtnBlue} startIcon={<GetAppIcon />}>Download Report</Button>
                        )}
                    </Pdf> : null}
            </div>
        </Fade>
    );

    const modalBody = (
        <Fade in={openModal}>
            <div>
                <div ref={refPrint}>
                    <Grid container spacing={3} className={classes.modelPaper}>
                        <Grid item xs={12}>
                            <Paper className={classes.paperTitle}>
                                <Typography variant="h4" className={classes.pageTitle}>All Employees</Typography>
                            </Paper>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableBody>
                                    <TableRow component={Paper} className={classes.paper}>
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
                                            Email
                                        </TableCell>
                                        <TableCell component="th" className={classes.tableth}>
                                            Mobile Number
                                        </TableCell>
                                    </TableRow> <br />
                                    {employees.map((row) => (
                                        <>
                                            <TableRow key={row.name} className={classes.tableRow}>
                                                <TableCell component="th" scope="row">
                                                    {row._id}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.firstName} {row.lastName}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.position}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.email}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.mobile}
                                                </TableCell>
                                            </TableRow>
                                            <br />
                                        </>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Grid item xs={12}>
                            <Paper className={classes.paperTitle}>
                                <Typography variant="body2" className={classes.pageTitle}>All Employees Count : {employees.length}</Typography>
                            </Paper>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs>
                                <Typography variant="body2" display="inline" className={classes.count}>Doctors Count : {allCount.doctorcount}</Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="body2" display="inline" className={classes.count}>Pharmacists Count : {allCount.pharmacistcount}</Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="body2" display="inline" className={classes.count}>Accountacts Count : {allCount.accountantcount}</Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="body2" display="inline" className={classes.count}>Assistants Count : {allCount.assistantcount}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                <Pdf targetRef={refPrint} filename={"All Employees Report.pdf"} options={options} scale="0.9">
                    {({ toPdf }) => (
                        <Button onClick={toPdf} variant="contained" className={classes.dialogBtnBlue} startIcon={<GetAppIcon />}>Download Report</Button>
                    )}
                </Pdf>
            </div>
        </Fade>
    );

    const modalBodyEmployee = (
        <Fade in={openModalEmployee}>
            <div>
                <div ref={refPrint}>
                    <Grid container spacing={3} className={classes.modelPaper}>
                        <Grid item xs={12}>
                            <Paper className={classes.paperTitle}>
                                <Typography variant="h6" id="transition-modal-title" className={classes.pageTitle}>Employee Report</Typography>
                            </Paper>
                            <table className={classes.table}>
                                {/* <tr style={{ fontSize: "18px", color: "#0077B6" }}>
                                    <td className={classes.trReport}>Report ID</td>
                                    <td className={classes.trReport}>{employeeData._id}</td>
                                </tr> */}
                                <tr>
                                    <td className={classes.trReport} style={{ fontWeight: 600 }}>Full Name</td>
                                    <td>{employeeData.firstName} {employeeData.lastName}</td>
                                    <td className={classes.trReport}>Gender</td>
                                    <td>{employeeData.gender}</td>
                                </tr>
                                <tr>
                                    <td className={classes.trReport}>Email</td>
                                    <td>{employeeData.email}</td>
                                    <td className={classes.trReport}>Mobile Number</td>
                                    <td>{employeeData.mobile}</td>
                                </tr>
                                <tr>
                                    <td className={classes.trReport}>Date of Birth</td>
                                    <td>{employeeData.dob}</td>
                                    <td className={classes.trReport}>Date Collected</td>
                                    <td>{employeeData.datecollected}</td>
                                </tr>
                            </table>
                        </Grid>
                    </Grid>
                </div>
                <Pdf targetRef={refPrint} filename={employeeData._id + " employee report.pdf"}>
                    {({ toPdf }) => (
                        <Button onClick={toPdf} variant="contained" className={classes.dialogBtnBlue} startIcon={<GetAppIcon />}>Download Report</Button>
                    )}
                </Pdf>
            </div>
        </Fade>
    );

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paperTitle}>
                        <Typography variant="h4" className={classes.pageTitle}>All Employees</Typography>
                    </Paper>
                </Grid>
                <Grid container spacing={3} justifyContent="flex-end" alignItems="center" style={{ padding: "12px" }}>
                    <Grid item xs={12} sm={4}>
                        <SearchBar
                            cancelOnEscape
                            value={searched}
                            onChange={(searchVal) => requestSearch(searchVal)}
                            onCancelSearch={() => cancelSearch()}
                        />
                        {/* <CssTextField
                            fullWidth
                            label="Search Records"
                            variant="outlined"
                            color="primary"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton type="submit" aria-label="search">
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            value={searched}
                            onChange={(searchVal) => requestSearch(searchVal)}
                            onCancelSearch={() => cancelSearch()}
                        /> */}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button component={Link} to="/add-employee" fullWidth variant="contained" startIcon={<AddIcon />} color="secondary" className={classes.submitbtn}>
                            Add New Employee
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table className={classes.table}>
                            <TableBody>
                                <TableRow component={Paper} className={classes.paper}>
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
                                        Email
                                    </TableCell>
                                    <TableCell component="th" className={classes.tableth}>
                                        Mobile Number
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
                                        <TableRow key={row.name} className={classes.tableRow}>
                                            <TableCell component="th" scope="row">
                                                {row._id.substring(0, 6)}...
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.firstName} {row.lastName}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.position}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.email}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.mobile}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Button variant="contained" color="secondary" className={classes.tableBtn} onClick={() => handleOpenModalEmployee(row)}>
                                                    View
                                                </Button>
                                                <Button variant="contained" color="secondary" className={classes.tableBtn} onClick={() => handleEditPage(row)}>
                                                    Edit
                                                </Button>
                                                <Button variant="contained" className={classes.tableBtnRed} onClick={() => handleClickOpen(row)}>
                                                    Remove
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
                                        style={{ borderBottom: "none" }}
                                        count={employees.length}
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
            </Grid>
            <Dialog
                open={opendlt}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Paper className={classes.dialogBox}>
                    <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}><DeleteForeverIcon style={{ fontSize: "100px", color: "#ff4040" }} /></DialogTitle>
                    <DialogContent style={{ textAlign: "center" }}>
                        <DialogContentText id="alert-dialog-description" className={classes.dialogContent}>
                            Are you sure you want to<br /> permanetly delete this record?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{ justifyContent: "center" }}>
                        <Button onClick={handleClose} variant="contained" color="secondary" className={classes.dialogBtn}>
                            Cancel
                        </Button>
                        <Button onClick={deleteItem} variant="contained" className={classes.dialogBtnRed} autoFocus>
                            Yes, Delete it
                        </Button>
                    </DialogActions>
                </Paper>
            </Dialog>
            <Snackbar open={successMsg} autoHideDuration={6000} onClose={handleSuccessMsg} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleSuccessMsg} severity="error" color="error" className={classes.cookieAlertError}>
                    Employee record successfully deleted.
                </Alert>
            </Snackbar>
            <Grid container spacing={1} justifyContent="space-between">
                <Grid item xs={12} sm={5}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={4}>
                            <CssTextField
                                fullWidth
                                label="Download reports by month"
                                type="month"
                                variant="outlined"
                                color="primary"
                                value={selectedDate}
                                onChange={handleDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <IconButton variant="contained" color="secondary" className={classes.filterbtn} onClick={() => handleDownloadReports()}>
                                <PageviewIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={12} sm={3}>
                    <Button onClick={() => handleOpenModal()} variant="contained" className={classes.dialogBtnBlue} >View Full Report</Button>
                </Grid>
            </Grid>
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
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openModalEmployee}
                onClose={handleCloseModalEmployee}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {modalBodyEmployee}
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openModalEmployeeMonth}
                onClose={handleCloseModalEmployee}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {employeesByMonthBody}
            </Modal>
        </div>
    )
}

export default AllEmployees;
