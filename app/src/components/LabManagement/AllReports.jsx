import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import { TextField, Paper, Button, Grid, Typography, IconButton, Table, TableBody, TableContainer, TableFooter, TablePagination, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import Pdf from "react-to-pdf";
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MuiTableCell from "@material-ui/core/TableCell";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SearchBar from "material-ui-search-bar";

import GetAppIcon from '@material-ui/icons/GetApp';
import PageviewIcon from '@material-ui/icons/Pageview';
import AddIcon from '@material-ui/icons/Add';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

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

const AllReports = () => {
    const classes = useStyles();
    const history = useHistory();
    const [openModal, setOpenModal] = React.useState(false);
    const [openModalReports, setOpenModalReports] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [opendlt, setOpendlt] = React.useState(false);
    const [reports, setReports] = React.useState([]);
    const [selectedDate, setSelectedDate] = React.useState(
        currentYear.toString() + "-" + currentMonth
    );
    const [reportData, setReportData] = React.useState([]);
    const [filteredReports, setFilteredReports] = React.useState([]);
    const [selectedItem, setSelectedItem] = React.useState("");
    const [successMsg, setSuccessMsg] = useState(false);
    const [rows, setRows] = useState([]);
    const [searched, setSearched] = useState("");
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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, reports.length - page * rowsPerPage);

    useEffect(() => {
        fetch("http://localhost:5000/api/labreports").then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(jsonRes => setReports(jsonRes));
    }, [selectedItem])

    const handleClickOpen = (row) => {
        setOpendlt(true);
        setSelectedItem(row._id);
    };

    useEffect(() => {
        setRows(reports);
    }, [reports]);

    const requestSearch = (searchedVal) => {
        const filteredRows = reports.filter((row) => {
            return row.fullname.toLowerCase().includes(searchedVal.toString().toLowerCase());
        });
        setRows(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    const handleEditPage = (row) => {
        history.push(`/edit-reports/${row._id}`);
    };

    const deleteItem = () => {
        fetch(`http://localhost:5000/api/labreports/labdelete/${selectedItem}`, { method: 'DELETE' })
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
        setReportData(row);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleDownloadReports = () => {
        const selectedYear = selectedDate.split("-")[0];
        const selectedMonth = selectedDate.split("-")[1];

        const filteredReportsArr = reports.filter(
            (report) => {
                const arr = report.datecollected.split("-");
                return arr[1] == selectedMonth && arr[0] == selectedYear;
            }
        );
        setFilteredReports(filteredReportsArr);
        setOpenModalReports(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setOpenModalReports(false);
    };

    const labReportsByMonthBody = (
        <Fade in={openModalReports}>
            <div>
                <div ref={refPrintFiltered}>
                    <Grid container spacing={3} className={classes.modelPaper2}>
                        <Grid item xs={12}>
                            <Paper className={classes.paperTitle}>
                                <Typography variant="h4" className={classes.pageTitle}>Lab Reports - {selectedDate}</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table className={classes.table}>
                                    <TableBody>
                                        {filteredReports.length == 0 ? 
                                            <TableRow component={Paper} className={classes.paper}>
                                                There are no records available for this month.
                                            </TableRow> : 
                                        
                                        <TableRow component={Paper} className={classes.paper}>
                                            <TableCell component="th" className={classes.tableth}>
                                                Report ID
                                            </TableCell>
                                            <TableCell component="th" className={classes.tableth}>
                                                Full Name
                                            </TableCell>
                                            <TableCell component="th" className={classes.tableth}>
                                                Gender
                                            </TableCell>
                                            <TableCell component="th" className={classes.tableth}>
                                                Mobile Number
                                            </TableCell>
                                            <TableCell component="th" className={classes.tableth}>
                                                Date Collected
                                            </TableCell>
                                            <TableCell component="th" className={classes.tableth}>
                                                Hemoglobin
                                            </TableCell>
                                            <TableCell component="th" className={classes.tableth}>
                                                RBC
                                            </TableCell>
                                            <TableCell component="th" className={classes.tableth}>
                                                HCT
                                            </TableCell>
                                            <TableCell component="th" className={classes.tableth}>
                                                WBC
                                            </TableCell>
                                            <TableCell component="th" className={classes.tableth}>
                                                PLT
                                            </TableCell>
                                        </TableRow> }
                                        <br />
                                        {(filteredReports
                                        ).map((row) => (
                                            <>
                                                <TableRow key={row.name} className={classes.tableRow}>
                                                    <TableCell component="th" scope="row">
                                                        {row._id}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {row.fullname}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {row.gender}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {row.mobile}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {row.datecollected}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {row.hemoglobin}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {row.rbc}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {row.hct}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {row.wbc}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {row.plt}
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
                {filteredReports.length != 0 ? 
                <Pdf targetRef={refPrintFiltered} filename={selectedDate + " Blood Reports.pdf"} options={options} scale="0.66">
                    {({ toPdf }) => (
                        <Button onClick={toPdf} variant="contained" className={classes.dialogBtnBlue} startIcon={<GetAppIcon />}>Download Report</Button>
                    )}
                </Pdf> : null }
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
                                <Typography variant="h6" id="transition-modal-title" className={classes.reportTitle}>Blood Report</Typography>
                            </Paper>
                            <table className={classes.table}>
                                <tr style={{ fontSize: "18px", color: "#0077B6" }}>
                                    <td className={classes.trReport}>Report ID</td>
                                    <td className={classes.trReport}>{reportData._id}</td>
                                </tr>
                                <tr>
                                    <td className={classes.trReport}>Full Name</td>
                                    <td>{reportData.fullname}</td>
                                    <td className={classes.trReport}>Gender</td>
                                    <td>{reportData.gender}</td>
                                </tr>
                                <tr>
                                    <td className={classes.trReport}>Email</td>
                                    <td>{reportData.email}</td>
                                    <td className={classes.trReport}>Mobile Number</td>
                                    <td>{reportData.mobile}</td>
                                </tr>
                                <tr>
                                    <td className={classes.trReport}>Date of Birth</td>
                                    <td>{reportData.dob}</td>
                                    <td className={classes.trReport}>Date Collected</td>
                                    <td>{reportData.datecollected}</td>
                                </tr>
                            </table>
                            <Paper className={classes.paperSubTitle}>
                                <Typography variant="body2" id="transition-modal-title" className={classes.reportSubTitle}>Complete Blood Count</Typography>
                            </Paper>
                            <table className={classes.table}>
                                <tr>
                                    <td className={classes.trReport}>Test Name</td>
                                    <td className={classes.trReport}>Result</td>
                                    <td className={classes.trReport}>Normal Range</td>
                                    <td className={classes.trReport}>Units</td>
                                </tr>
                                <tr>
                                    <td>Hemoglobin</td>
                                    <td>{reportData.hemoglobin}</td>
                                    <td>11.0 - 16.0</td>
                                    <td>g/dL</td>
                                </tr>
                                <tr>
                                    <td>RBC</td>
                                    <td>{reportData.rbc}</td>
                                    <td>3.5 - 5.50</td>
                                    <td>10^6/uL</td>
                                </tr>
                                <tr>
                                    <td>HCT</td>
                                    <td>{reportData.hct}</td>
                                    <td>37.0 - 50.0</td>
                                    <td>%</td>
                                </tr>
                                <tr>
                                    <td>MCV</td>
                                    <td>{reportData.mcv}</td>
                                    <td>82 - 95</td>
                                    <td>fl</td>
                                </tr>
                                <tr>
                                    <td>MCH</td>
                                    <td>{reportData.mch}</td>
                                    <td>27 - 31</td>
                                    <td>pg</td>
                                </tr>
                                <tr>
                                    <td>MCHC</td>
                                    <td>{reportData.mchc}</td>
                                    <td>32.0 - 36.0</td>
                                    <td>g/dL</td>
                                </tr>
                                <tr>
                                    <td>RDW-CV</td>
                                    <td>{reportData.rdwcv}</td>
                                    <td>11.5 - 14.5</td>
                                    <td>%</td>
                                </tr>
                                <tr>
                                    <td>RDW-SD</td>
                                    <td>{reportData.rdwsd}</td>
                                    <td>35 - 56</td>
                                    <td>fl</td>
                                </tr>
                                <tr>
                                    <td>WBC</td>
                                    <td>{reportData.wbc}</td>
                                    <td>4.5 - 11</td>
                                    <td>10^3/uL</td>
                                </tr>
                                <tr>
                                    <td>NEU%</td>
                                    <td>{reportData.neu}</td>
                                    <td>40 - 70</td>
                                    <td>%</td>
                                </tr>
                                <tr>
                                    <td>LYM%</td>
                                    <td>{reportData.lym}</td>
                                    <td>20 - 45</td>
                                    <td>%</td>
                                </tr>
                                <tr>
                                    <td>MON%</td>
                                    <td>{reportData.mon}</td>
                                    <td>2 - 10</td>
                                    <td>%</td>
                                </tr>
                                <tr>
                                    <td>EOS%</td>
                                    <td>{reportData.eos}</td>
                                    <td>1 - 6</td>
                                    <td>%</td>
                                </tr>
                                <tr>
                                    <td>BAS%</td>
                                    <td>{reportData.bas}</td>
                                    <td>0 - 2</td>
                                    <td>%</td>
                                </tr>
                                <tr>
                                    <td>LYM#</td>
                                    <td>{reportData.lym2}</td>
                                    <td>1.5 - 4.0</td>
                                    <td>10^3/uL</td>
                                </tr>
                                <tr>
                                    <td>GRA#</td>
                                    <td>{reportData.gra}</td>
                                    <td>2.0 - 7.5</td>
                                    <td>10^3/uL</td>
                                </tr>
                                <tr>
                                    <td>PLT</td>
                                    <td>{reportData.plt}</td>
                                    <td>150 - 450</td>
                                    <td>10^3/uL</td>
                                </tr>
                                <tr>
                                    <td>ESR</td>
                                    <td>{reportData.esr}</td>
                                    <td>Up to 15</td>
                                    <td>mm/hr</td>
                                </tr>
                            </table>
                        </Grid>
                    </Grid>
                </div>
                <Pdf targetRef={refPrint} filename={reportData._id + " blood report.pdf"}>
                    {({ toPdf }) => (
                        <Button onClick={toPdf} variant="contained" className={classes.dialogBtnBlue} startIcon={<GetAppIcon />}>Download Report</Button>
                    )}
                </Pdf>
            </div>
        </Fade>
    );

    return (
        <div style={{ overflow: "hidden" }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paperTitle}>
                        <Typography variant="h4" className={classes.pageTitle}>All Reports</Typography>
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
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button component={Link} to="/add-report" fullWidth variant="contained" startIcon={<AddIcon />} color="secondary" className={classes.submitbtn}>
                            Add New Blood Report
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table className={classes.table}>
                            <TableBody>
                                <TableRow component={Paper} className={classes.paper}>
                                    <TableCell component="th" className={classes.tableth}>
                                        Report ID
                                    </TableCell>
                                    <TableCell component="th" className={classes.tableth}>
                                        Full Name
                                    </TableCell>
                                    <TableCell component="th" className={classes.tableth}>
                                        Gender
                                    </TableCell>
                                    <TableCell component="th" className={classes.tableth}>
                                        Email
                                    </TableCell>
                                    <TableCell component="th" className={classes.tableth}>
                                        Mobile Number
                                    </TableCell>
                                    <TableCell component="th" className={classes.tableth}>
                                        Date of Birth
                                    </TableCell>
                                    <TableCell component="th" className={classes.tableth}>
                                        Date Collected
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
                                                {row.fullname}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.gender}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.email}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.mobile}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.dob}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.datecollected}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Button variant="contained" color="secondary" className={classes.tableBtn} onClick={() => handleOpenModal(row)}>
                                                    View
                                                </Button>
                                                <Button onClick={() => handleEditPage(row)} variant="contained" color="secondary" className={classes.tableBtn}>
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
                                        colSpan={8}
                                        style={{ borderBottom: "none" }}
                                        count={reports.length}
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
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={2}>
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
                        <Grid item xs={12} sm={3}>
                            <Grid container spacing={1}>
                                <Grid>
                                    <IconButton variant="contained" color="secondary" className={classes.filterbtn} onClick={() => handleDownloadReports()}>
                                        <PageviewIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
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
                open={openModalReports}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {labReportsByMonthBody}
            </Modal>
            <Snackbar open={successMsg} autoHideDuration={6000} onClose={handleSuccessMsg} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleSuccessMsg} severity="error" color="error" className={classes.cookieAlertError}>
                    Lab report successfully deleted.
                </Alert>
            </Snackbar>
        </div>
    )
}

export default AllReports;
