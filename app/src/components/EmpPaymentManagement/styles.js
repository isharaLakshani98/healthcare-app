import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    pageTitle: {
        fontWeight: 800,
        color: '#ffffff',
        textAlign: 'left',
        textTransform: 'uppercase',
    },
    pageTitleEID: {
        fontWeight: 800,
        color: '#ffffff',
        textAlign: 'right',
        textTransform: 'uppercase',
        marginTop:-40,
        padding:5
    },
    paperTitle: {
        backgroundColor: '#023e8a',
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
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
        width:"300px",
        marginLeft:"-2px"
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
    dialogBtnRed: {
        padding: "8px",
        color: "#ffffff",
        backgroundColor: "#ff4040",
        '&:hover': {
            backgroundColor: "#7d0000",
        },
    },
    detailsPaper: {
        backgroundColor:"#ffffff"
    },
    detailsUpdateBtn: {
        padding: "8px",
        width:500,
        color: "#ffffff",
        backgroundColor: "#CFC6AC",
        marginBottom:30,
        marginTop:70,
        marginLeft:50,
        '&:hover': {
            backgroundColor: "#948A6C",
        },
    },
    detailsDeleteBtn: {
        padding: "8px",
        width:500,
        marginLeft:50,
        color: "#ffffff",
        backgroundColor: "#ff4040",
        '&:hover': {
            backgroundColor: "#7d0000",
        },
    },
    ReportBtn: {
        marginLeft: "-15px",
        padding: "8px",
        color: "#ffffff",
        float: 'right',
        //marginTop:-40,
        backgroundColor: "#5E452C",
        '&:hover': {
            backgroundColor: "#3C2004",
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modelPaper: {
        width: "1200px",
        maxHeight: "100vh",
        padding: "10px",
        overflowY: 'scroll',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #0077B6',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    reciptModelSub:{
        fontWeight: 500,
        color: '#000000',
        textAlign: 'left'  
    },
    ReportReciptBtn:{
        marginRight:"-500px",
        marginTop:"-50px",
        padding: "8px",
        color: "#ffffff",
        float: 'right',
        //marginTop:-40,
        backgroundColor: "#5E452C",
        '&:hover': {
            backgroundColor: "#3C2004",
        },
    }
}));