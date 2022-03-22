import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    pageTitle: {
        fontWeight: 800,
        fontSize: 280,
        color: '#0077B6',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    button: {
        fontWeight: 600,
        fontSize: 36,
        color: "#023e8a",
    },
    paperSubTitle: {
        color: '#ffffff',
        fontWeight: 600,
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
}));