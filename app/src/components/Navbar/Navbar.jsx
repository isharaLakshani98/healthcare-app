import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PeopleIcon from '@material-ui/icons/People';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import HelpIcon from '@material-ui/icons/Help';
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';
import DashboardIcon from '@material-ui/icons/Dashboard';

import useStyles from './styles';
import logo from '../../assets/logo.png';

const Navbar = ({ setDrawerState, drawerState }) => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem('profile')));
    const [userType, setUserType] = useState("");
    const [userName, setUserName] = useState("Admin");

    const handleDrawerOpen = () => {
        setDrawerState(true);
    };
    
    const handleDrawerClose = () => {
        setDrawerState(false);
    };

    const logout = () => {
        localStorage.clear();
        history.push('/login');
    };

    useEffect(() => {
        // if (isFirstRender.current) {
        //     isFirstRender.current = false // toggle flag after first render/mounting
        //     return;
        // }

        setUserProfile(JSON.parse(localStorage.getItem('profile')));
        if (userProfile) {
            setUserType(userProfile.position);
            setUserName(userProfile.firstName + " " + userProfile.lastName);
        }
    }, [location]);

    return (
        <div>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    {drawerState ? 
                        <IconButton
                            color="primary"
                            onClick={handleDrawerClose}
                        >
                            <CloseIcon />
                        </IconButton> :
                        <IconButton
                            color="primary"
                            onClick={handleDrawerOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        }
                    <Typography variant="h6" className={classes.title} color="primary">
                       <img src={logo} className={classes.logo} />24Seven HMS
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.profile}>
                        <div className={classes.profileType}>
                            <Typography className={classes.userName} variant="h6">{userName}</Typography>
                            {userType == "doctor" ? 
                                <Typography className={classes.userType} variant="caption" color="primary">Doctor</Typography>: 
                            userType == "pharmacist" ? 
                                <Typography className={classes.userType} variant="caption" color="primary">Pharmacist</Typography>:
                            userType == "accountant" ? 
                                <Typography className={classes.userType} variant="caption" color="primary">Accountant</Typography>:
                            userType == "labAssistant" ? 
                                <Typography className={classes.userType} variant="caption" color="primary">Laboratory Assistant</Typography>:
                            userType == "admin" ?
                                <Typography className={classes.userType} variant="caption" color="primary">Admin</Typography>: null
                            }
                                    
                        </div>
                        <Button variant="contained" className={classes.logout} onClick={logout}>Logout</Button>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer variant="persistent" anchor="left" open={drawerState} className={classes.drawer} classes={{paper: classes.drawerPaper,}}>
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItem component={Link} to="/home" button >
                            <ListItemIcon className={classes.navIcon}><DashboardIcon /></ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem component={Link} to ="/all-appointments" button>
                            <ListItemIcon className={classes.navIcon}><LibraryAddIcon /></ListItemIcon>
                            <ListItemText primary="Channeling Management" />
                        </ListItem>
                        <ListItem component={Link} to ="/all-emp-payment" button>
                            <ListItemIcon className={classes.navIcon}><MonetizationOnIcon /></ListItemIcon>
                            <ListItemText primary="Finance Management" />
                        </ListItem>
                        <ListItem component={Link} to ="/all-reports" button>
                            <ListItemIcon className={classes.navIcon}><YoutubeSearchedForIcon /></ListItemIcon>
                            <ListItemText primary="Laboratory Management" />
                        </ListItem>
                        {userType == "admin" ? 
                        <ListItem component={Link} to="/all-employees" button>
                            <ListItemIcon className={classes.navIcon}><PeopleIcon /></ListItemIcon>
                            <ListItemText primary="Employee Management" />
                        </ListItem> :
                        <></>}
                    </List>
                        <Divider />
                    <List>
                        <ListItem button>
                            <ListItemIcon className={classes.navIcon}><InfoIcon /></ListItemIcon>
                            <ListItemText primary="Abouts Us" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon className={classes.navIcon}><HelpIcon /></ListItemIcon>
                            <ListItemText primary="Help Page" />
                        </ListItem>
                    </List>
                <div className={classes.bottomPush}>
                    <Typography variant="caption" color="inherit" align="right" className={classes.footer}>
                        © 2021 24Seven.com.  All rights reserved.
                    </Typography>
                </div>
                </div>
            </Drawer>
        </div>
    )
}

export default Navbar
