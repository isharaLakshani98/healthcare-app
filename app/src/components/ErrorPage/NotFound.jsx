import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Paper, Button, Grid, Typography } from '@material-ui/core/';
import "moment-timezone";
import '@natscale/react-calendar/dist/main.css';

import useStyles from './styles';
import logo from '../../assets/logo.png';

const NotFound = ({ setPathName }) => {
    const classes = useStyles();
    const location = useLocation();

    // useEffect(() => {
    //     handleDrawerClose();
    // }, []);

    // const handleDrawerClose = () => {
    //     setPathName(location.pathname);
    // };

    return (
        <div>
            <Grid 
                container 
                spacing={6} 
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={12} justifyContent="center" alignItems="center" >
                    <Typography variant="h1" align="center" className={classes.pageTitle}>404</Typography>
                    <Typography variant="h1" align="center" className={classes.paperSubTitle}>OOPS! PAGE NOT FOUND</Typography>
                    
                </Grid>
                    <Button component={Link} to="/home" className={classes.button}>Go to Dashboard</Button>
            </Grid>
        </div>
    )
}

export default NotFound;
