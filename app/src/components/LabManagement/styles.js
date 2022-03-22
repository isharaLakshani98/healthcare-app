import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    pageTitle: {
        fontWeight: 800,
        color: '#ffffff',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    paperTitle: {
        backgroundColor: '#023e8a',
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    paperSubTitle: {
        backgroundColor: '#0077B6',
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    paper: {
        backgroundColor: '#ffffff',
        padding: theme.spacing(5),
        marginBottom: theme.spacing(2),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        color: '#6e6e6e',
    },
    submitbtn: {
        backgroundColor: '#023e8a',
        color: '#ffffff',
        padding: "15px",
    },
    resetbtn: {
        backgroundColor: '#6e6e6e',
        color: '#ffffff',
        padding: "15px",
    },
    note: {
        padding: "10px",
        color: "#0077B6",
        fontWeight: "500"
    },
    tableRow: {
        backgroundColor: "#ffffff",
        marginBottom: "50px",
    },
    table: {
        minWidth: 500,
        border: "none",
    },
    tableth: {
        color: "#0077B6",
        fontWeight: "500",
    },
    tableBtnRed: {
        marginRight: "20px",
        padding: "8px",
        color: "#ffffff",
        backgroundColor: "#ff4040",
        '&:hover': {
            backgroundColor: "#7d0000",
        },
    },
    tableBtn: {
        marginRight: "20px",
        padding: "8px",
        color: "#ffffff",
    },
    paginationBtn: {
        backgroundColor: "#0077B6",
        padding: "3px",
        color: "#ffffff",
        margin: "3px",
        '&:hover': {
            backgroundColor: "#023E8A",
        },
    },
    dialogBox: {
        backgroundColor: '#ffffff',
        padding: theme.spacing(5),
    },
    dialogContent: {
        color: "#2b2b2b",
        fontWeight: "500",
    },
    dialogBtn: {
        marginRight: "5px",
        padding: "8px",
        color: "#ffffff",
        backgroundColor: "#828282",
        '&:hover': {
            backgroundColor: "#2b2b2b",
        },
    },
    dialogBtnBlue: {
        padding: "10px",
        float: "right",
        color: "#ffffff",
        backgroundColor: "#0077B6",
        '&:hover': {
            backgroundColor: "#023E8A",
        },
    },
    dialogBtnRed: {
        padding: "8px",
        color: "#ffffff",
        backgroundColor: "#ff4040",
        '&:hover': {
            backgroundColor: "#7d0000",
        },
    },
    sectionHeader: {
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
        margin: "10px",
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modelPaper: {
        width: "800px",
        maxHeight: "100vh",
        overflowY: 'scroll',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #0077B6',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    reportTitle: {
        fontWeight: 800,
        color: '#ffffff',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    trReport: {
        fontWeight: 600,
    },
    table: {
        width: "100%",
        borderSpacing: "10px"
    },
    reportSubTitle: {
        fontWeight: 600,
        color: '#ffffff',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    errorMessage: {
        color: "#ff0000",
        fontSize: "15px",
    },
    cookieAlert: {
        width: "800px",
        color: "#0077B6",
        fontSize: 18,
        "& .MuiAlert-icon": {
            fontSize: 24
        }
    },
    cookieAlertError: {
        width: "800px",
        color: "#ffffff",
        fontSize: 18,
        "& .MuiAlert-icon": {
            fontSize: 24
        }
    }
}));