import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        backgroundColor: '#023E8A',
        padding: theme.spacing(5),
        marginBottom: theme.spacing(2),
        width: 500,
        textAlign: "center",
    },
    pageTitle: {
        fontWeight: 600,
        color: '#ffffff',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: "25px"
    },
    logo: {
        marginBottom: "15px",
        height: "170px",
    },
    lockIcon: {
        fontSize: "70px",
        fontWeight: 600,
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: "15px"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        color: '#6e6e6e',
    },
    submitbtn: {
        backgroundColor: '#ffffff',
        color: '#023e8a',
        padding: "15px",
        marginBottom: "15px",
        marginTop: "25px",
        '&:hover': {
            backgroundColor: "#cccccc",
        },
    },
    visibilityBtn: {
        color: '#cccccc',
    },
    errorMsg: {
        color: "#ff0000",
        marginLeft: 10,
    },
}));