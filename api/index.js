const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//Import Routes
const employeeRoute = require('./Routes/employee.route');
const labreportsRoute = require('./Routes/labreports.route');
const empPaymentRoute = require('./Routes/empPayments.route');
// const authRoute = require('./Routes/auth.route');
const appointmentRoute = require('./Routes/appointment.route');

//Route Middlewares
app.use('/api/employee', employeeRoute);
app.use('/api/labreports', labreportsRoute);
app.use('/api/empPay', empPaymentRoute);
app.use('/api/user', authRoute);
app.use('/api/appointment', appointmentRoute);

mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true })
    .then((result) => console.log('connected to database'))
    .catch((err) => console.log(err));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));