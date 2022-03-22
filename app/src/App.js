import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';

import { makeStyles } from '@material-ui/core/styles';
import Navbar from './components/Navbar/Navbar';
import { Toolbar } from '@material-ui/core';
import AddEmployee from './components/EmployeeManagement/AddEmployee';
import AllEmployees from './components/EmployeeManagement/AllEmployees';
import AddEmpPayment from './components/EmpPaymentManagement/AddEmpPayment';
import AdminLogin from './components/UserAuth/AdminLogin';
import EmployeeLogin from './components/UserAuth/EmployeeLogin';
import AddReport from './components/LabManagement/AddReport';
import AllReports from './components/LabManagement/AllReports';
import AllEmpPay from './components/EmpPaymentManagement/AllEmpPayments'
import EditReport from './components/LabManagement/EditReport';
import Dashboard from './components/Dashboard/Dashboard';
import AddAppointment from './components/AppointmentManagement/AddAppointment';
import AllAppointments from './components/AppointmentManagement/AllAppointments';
import UpdateAppointment from './components/AppointmentManagement/UpdateAppointment';
import PaymentDetails from './components/EmpPaymentManagement/PaymentDetails';
import Example from './components/Example/Example';
import EmpPaymentDetails from './components/EmpPaymentManagement/EmpPayUpdate';
import NotFound from './components/ErrorPage/NotFound';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
}));

function App() {
  const theme = createTheme({
    palette: {
        primary: {
            main: '#90E0EF',
        },
        secondary: {
            light: '#0066ff',
            main: '#0077B6',
            contrastText: '#000000',
        },
        info: {
          main: '#CAF0F8',
        },
        error: {
          main: '#ff4040',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    spacing: 8,
  });

  const [drawerState, setDrawerState] = React.useState(false);
  const [pathName, setPathName] = React.useState("");
  const classes = useStyles();

  return (
    <Router>
      <ThemeProvider theme={theme}>
            {pathName === "/admin" || pathName === "/login" ?
            <></>:
            <Navbar setDrawerState={setDrawerState} drawerState={drawerState} />}
        <Switch>
          <div className={classes.content} style={{ marginLeft: drawerWidth * drawerState }}>
            <Toolbar /> 
            <Route exact path="/">
                <Dashboard 
                  setDrawerState={setDrawerState}
                  setPathName={setPathName}
                />
            </Route>
            <Route exact path="/home">
                <Dashboard 
                  setDrawerState={setDrawerState}
                  setPathName={setPathName}
                />
            </Route>
            <Route path="/add-employee" exact component={AddEmployee} />
            <Route path="/all-employees" exact component={AllEmployees} />
            <Route path="/add-report" exact component={AddReport} />
            <Route path="/all-reports" exact component={AllReports} />
            <Route path="/edit-reports/:id" exact component={EditReport} />
            <Route path="/add-emp-payment" exact component={AddEmpPayment} />
            <Route path="/all-emp-payment" exact component={AllEmpPay} />
            <Route path="/add-appointment" exact component={AddAppointment} />
            <Route path="/all-appointments" exact component={AllAppointments} />
            <Route path="/update-appointment/:id" exact component={UpdateAppointment} />
            <Route path="/emp-details/:id" exact component={PaymentDetails} />
            <Route path="/example" exact component={Example} />
            <Route path="/emp-update" exact component={EmpPaymentDetails} />
            <Route exact path="/admin">
                <AdminLogin 
                  setDrawerState={setDrawerState}
                  setPathName={setPathName}
                />
            </Route>
            <Route exact path="/login">
                <EmployeeLogin 
                  setDrawerState={setDrawerState}
                  setPathName={setPathName}
                />
            </Route>
          </div>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
