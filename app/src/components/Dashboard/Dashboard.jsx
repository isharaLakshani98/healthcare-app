import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Paper, Button, Grid, Typography } from '@material-ui/core/';
import ReactFitText from 'react-fittext';
import Clock from 'react-live-clock';
import "moment-timezone";
import '@natscale/react-calendar/dist/main.css';

import useStyles from './styles';
import logo from '../../assets/logo.png';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';

const Dashboard = ({ setPathName }) => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const isFirstRender = useRef(true);
    const [profile, setProfile] = React.useState();

    useEffect(() => {
        handleDrawerClose();
    }, []);

    useEffect(() => {
        setProfile(localStorage.getItem('profile'));

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (profile === undefined) {
            history.push("/login");
        }
    }, []);

    const handleDrawerClose = () => {
        setPathName(location.pathname);
    };

    return (
        <div>
            <Grid 
                container 
                spacing={3} 
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={12} justifyContent="center" alignItems="center" >
                    <Paper className={classes.paper} style={{ backgroundColor: "#023E8A", color: "#ffffff" }}>
                        <Grid container  direction="row" justifyContent="center" alignItems="center" spacing={3}>
                            <img src={logo} className={classes.logo} />
                            <Typography variant="h2" className={classes.pageTitle}>24Seven hospital management system</Typography>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={6} justifyContent="center" alignItems="center">
                    <Paper className={classes.paper}>
                        <Grid container  direction="row" justifyContent="center" alignItems="center" spacing={3}>
                            <Grid item xs={12}>
                                <ReactFitText compressor={1.8} >
                                    <div className={classes.clock}>
                                        <Clock interval={1000} ticking={true} format={'dddd, MMMM Do, YYYY'} timezone={"Australia/Sydney"} />
                                    </div>
                                </ReactFitText>
                            </Grid>
                            <Grid item xs={12}>
                                <ReactFitText compressor={0.7} >
                                    <div className={classes.clock}>
                                        <Clock format="HH:mm:ss" interval={1000} ticking={true} />
                                    </div>
                                </ReactFitText>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={6} justifyContent="center" alignItems="center">
                    <Paper className={classes.paper} >
                        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    component={Link} to ="/all-appointments"
                                    variant="contained"
                                    size="large"
                                    className={classes.menuButton}
                                    startIcon={<LibraryAddIcon />}
                                >
                                    Channeling Management
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    component={Link} to ="/all-emp-payment"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    className={classes.menuButton}
                                    startIcon={<MonetizationOnIcon />}
                                >
                                    Finance Management
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    component={Link} to ="/all-reports"
                                    variant="contained"
                                    size="large"
                                    className={classes.menuButton}
                                    startIcon={<YoutubeSearchedForIcon />}
                                >
                                    Laboratory Management
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            
        </div>
    )
}

export default Dashboard;
