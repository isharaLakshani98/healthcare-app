import React, {useState,useEffect,useRef} from 'react'
import { useForm, Controller } from "react-hook-form";
import { useLocation, useHistory } from 'react-router-dom';
import { FormLabel, TextField, FormControlLabel, Paper, Button, Grid, Typography } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import DateRangeIcon from '@material-ui/icons/DateRange';

import useStyles from './styles';

const schema = yup.object().shape({
    empType: yup.string().required("Select Employee Type"),
    employee: yup.string().required("Select Employee"),
    payAmount: yup.string().required("Payment Amount is required."),
    payType: yup.string().required("Payment Type is required."),
    payDate: yup.string().required("Payment Date is required."),
    payAccount: yup.string().required('You must enter a Account Number'),
    bank: yup.string().required('You must enter a Bank'),
    description: yup.string().required('You must enter a Description'),
});

const empTypes = [
    {
        value: 'default',
        label: 'Select the Employee Type',
    },
    {
      value: 'Doctor',
      label: 'Doctor',
    },
    {
      value: 'Pharmacist',
      label: 'Pharmacist',
    },
    {
      value: 'Reciptionist',
      label: 'Reciptionist',
    },
    {
      value: 'Lab Assistant',
      label: 'Lab Assistant',
    },
];


const payTypes = [
    {
        value: 'default',
        label: 'Select the payment Type',
    },
    {
      value: 'Visa',
      label: 'Visa',
    },
    {
      value: 'MasterCard',
      label: 'MasterCard',
    },
    {
      value: 'Paypal',
      label: 'Paypal',
    },
];

const AddEmpPayment = () => {
    const classes = useStyles();
    const { control, handleSubmit, reset, formState: { errors }  } = useForm(
        {
            resolver: yupResolver(schema),
            reValidateMode: 'onSubmit',
        }
    );
    const [empType, setEmpType] = React.useState('default');
    const [position, setPosition] = React.useState('default');
    const [employee, setEmployee] = React.useState('default');
    const [payType, setPayType] = React.useState('default');
    const [formData, setFormData] = useState([]);
    const isFirstRender = useRef(true);
    const [nextId, setNextId] = useState("");
    const [employeeNames,setEmployeeNames] = useState([]);

    const [gender, setGender] = useState("");
    const history = useHistory();

    const CssTextField = withStyles({
        root: {
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
          '& .MuiInputBase-input':{
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

    useEffect(() => {
      fetch("http://localhost:5000/api/employee").then(res => {
        if(res.ok){
            return res.json()
        }
      }).then(jsonRes => setEmployeeNames(jsonRes));

        getMaxId();

        if (isFirstRender.current) {
            isFirstRender.current = false // toggle flag after first render/mounting
            return;
        }
       
        submitForm(formData);
    }, [formData])

    const getMaxId = () => {
        axios
        .get("http://localhost:5000/api/empPay/getMaxId")
        .then((response) => {
          if(response.data.paymentId == null)
          {
            setNextId(1);
          }else{
            console.log(response.data.paymentId);
            setNextId(response.data.paymentId + 1);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const onSubmit = (data) => {

        var codeId = document.getElementById("payId").value

        setFormData({
            paymentId:nextId,
            employeeId: '1',
            employeeType: data.empType,
            employeeName: data.employee,
            paymentAmount: data.payAmount,
            paymentType: data.payType,
            paymentDate: data.payDate,
            paymentAccount: data.payAccount,
            description: data.description,
            paymentBank: data.bank,
        })
    }

    const submitForm = (data) => {
        axios.post('http://localhost:5000/api/empPay/addEmpPay', data)
        .then((response) => {
          console.log(response);
          history.push('/all-emp-payment');
          reset({
            keepErrors: true,
          });
        }).catch((err) => {
          console.log(err);
        })
    }

    
    const [empJobTitle,setempJobTitle] = useState("");
    const [mobile,setempmobile] = useState("");
    const [OTHours,setOTHours] = useState("");
    const [totalSalary,settotalSalary] = useState(0);

    const [BasicSalary,setBasicSalary] = useState("");
    const [OTSalaryPerHour,setOTSalaryPerHour] = useState("");

    const [AllUserBasedAmount,setAllUserBasedSalary] = useState([]);
    const [OneUserBasedalary,setOneUserBasedSalary] = useState([]);
    const [AllEmpBankAccounts,setAllEmpBankAccounts] = useState([]);

    const [addBankName, setaddBankName] = useState("");
    const [addBranch, setaddBranch] = useState("");
    const [addAccount, setaddAccount] = useState("");
    const [employeeName, setemployeeName] = useState("");

    async function handleEmpName (event){
      const arrEmpName = event.split("-");
      setempJobTitle(arrEmpName[1]);
      setempmobile(arrEmpName[2]);
      setemployeeName(arrEmpName[3]+" "+arrEmpName[4]);

      const userType  = arrEmpName[1];
      let item = {userType};
      
      let result = await fetch("http://localhost:5000/api/paymentBasedAmount/OneEmpBasedAmount", {
        method: 'POST',
        headers:{
           "Content-Type" : "application/json",
           "Accept" : "application/json"
        },
        body:JSON.stringify(item)
     });
     result = await result.json();
    

     const arrResult = JSON.stringify(result.message).split(",");
     setBasicSalary(arrResult[1].slice(0, -1));
     setOTSalaryPerHour(arrResult[0].substring(1));

     const empId  = arrEmpName[0];
     setemployeeId(arrEmpName[0]);
     let items = {empId};
     let result2 = await fetch("http://localhost:5000/api/emp_bank_Account/OneUserBankAccount", {
       method: 'POST',
       headers:{
          "Content-Type" : "application/json",
          "Accept" : "application/json"
       },
       body:JSON.stringify(items)
    });
    result2 = await result2.json();
 
    const arrResult2 = JSON.stringify(result2.message).split(",");
    setaddAccount(arrResult2[2].slice(0, -1));
    setaddBankName(arrResult2[0].substring(1));
    setaddBranch(arrResult2[1]);


  };


  function handleOTHours (event){
      setOTHours(event);
      settotalSalary(parseInt(BasicSalary)+parseInt((OTSalaryPerHour*event)));
  };



    useEffect(() => {
              axios.get('http://localhost:5000/api/paymentBasedAmount/allEmpBasedAmount')
              .then(res => setAllUserBasedSalary(res.data))
              .catch(error => console.log(error));
    },[]); 
    
    useEffect(() => {
              axios.get('http://localhost:5000/api/emp_bank_Account/allEmpBankAccount')
              .then(res => setAllEmpBankAccounts(res.data))
              .catch(error => console.log(error));
    },[]);

    const [userType, setuType] = useState("");
    const [basedAmount, setBasedSalary] = useState("");
    const [otPayment, setOtPayment] = useState("");
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");

    const [BankAccountHolder, setBankAccountHolder] = useState("");
    const [employeeId, setemployeeId] = useState("");
    const [branch, setBanch] = useState("");

    const [salaryButtonStatus, setsalaryButtonStatus] = useState("Add");
    function addBasedPayment(e){
      e.preventDefault();

      if(salaryButtonStatus === "Add"){
        const userBasedSalaryDetails ={userType, basedAmount, otPayment}
  
        axios.post("http://localhost:5000/api/paymentBasedAmount/addPaymentBased",userBasedSalaryDetails).then(() =>{
  
        Swal.fire({  
          title: "Success!",
          text: "User Based Salary Adding Success!",
          icon: 'success',
          confirmButtonText: "OK",
          type: "success"}).then(okay => {
          if (okay) {
            axios.get('http://localhost:5000/api/paymentBasedAmount/allEmpBasedAmount')
            .then(res => setAllUserBasedSalary(res.data))
            .catch(error => console.log(error));
          }
        });
  
        
      }).catch((err)=>{
  
          Swal.fire({  
          title: "Error!",
          text: userType+" Based Salary Already Added",
          icon: 'error',
          confirmButtonText: "OK",
          type: "success"})
      })
    } else{
          e.preventDefault();
          const updateEmpBasedAmount ={userType,basedAmount , otPayment}
          
          axios.put("http://localhost:5000/api/paymentBasedAmount/updateEmpBasedAmount",updateEmpBasedAmount).then(() =>{

          Swal.fire({  
          title: "Success!",
          text: userType+" Based Salary Already Updating Success!",
          icon: 'success',
          confirmButtonText: "OK",
          type: "success"}).then(okay => {
          if (okay) {
            setuType("");
            setBasedSalary("");
            setOtPayment("");
            setsalaryButtonStatus("Add");
            axios.get('http://localhost:5000/api/paymentBasedAmount/allEmpBasedAmount')
            .then(res => setAllUserBasedSalary(res.data))
            .catch(error => console.log(error));
          }
          });

          
      }).catch((err)=>{

            Swal.fire({  
            title: "Error!",
            text:  userType+" Based Salary Already Updating Not Success!",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
      }
    }

    function deleteUserBasedSalary(id){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are You Sure?',
        text: "Do You Want To Delete User Based Salary?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete("http://localhost:5000/api/paymentBasedAmount/empBasedAmountDelete/"+id).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Data Deleting Success.",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                  if (okay) {
                    setuType("");
                    setBasedSalary("");
                    setOtPayment("");
                    setsalaryButtonStatus("Add");
                    axios.get('http://localhost:5000/api/paymentBasedAmount/allEmpBasedAmount')
                    .then(res => setAllUserBasedSalary(res.data))
                    .catch(error => console.log(error));
                  }
                });
    
        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Data Deleting Not Success.",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
        })
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Deleting cancel',
            'error'
          )
        }
      })
    }
    function deleteAccount(id){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are You Sure?',
        text: "Do You Want To Delete Bank Account?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete("http://localhost:5000/api/emp_bank_Account/deleteBankAccount/"+id).then(() =>{
            Swal.fire({  
                title: "Success!",
                text: "Bank Account Deleting Success.",
                icon: 'success',
                confirmButtonText: "OK",
                type: "success"}).then(okay => {
                  if (okay) {
                    setBankAccountHolder("");
                    setBankName("");
                    setBanch("");
                    setAccountNumber("");
                    setsalaryButtonStatus("Add");
                    axios.get('http://localhost:5000/api/emp_bank_Account/allEmpBankAccount')
                    .then(res => setAllEmpBankAccounts(res.data))
                    .catch(error => console.log(error));
                  }
                });
    
        }).catch((err)=>{
            Swal.fire({  
                title: "Error!",
                text: "Account Deleting Not Success.",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"})
        })
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Deleting cancel',
            'error'
          )
        }
      })
    }

    function editUserBasedSalary(_id ,userType,basedAmount ,otPayment  ){
      setuType(userType);
      setBasedSalary(basedAmount);
      setOtPayment(otPayment);
      setsalaryButtonStatus("Edit");
    }

    function clean(){
      setuType("");
      setBasedSalary("");
      setOtPayment("");
      setsalaryButtonStatus("Add");
    }

    function addBankAccount(e){

      if(salaryButtonStatus === "Add"){

      e.preventDefault();
      const empId = BankAccountHolder;
      const addAccount ={empId
        ,accountNumber
        ,bankName
        ,branch}
  
        axios.post("http://localhost:5000/api/emp_bank_Account/addBankAccount",addAccount).then(() =>{
  
        Swal.fire({  
          title: "Success!",
          text: "Bank Account Adding Success!",
          icon: 'success',
          confirmButtonText: "OK",
          type: "success"}).then(okay => {
          if (okay) {
            setBankAccountHolder("");
            setBankName("");
            setBanch("");
            setAccountNumber("");
            setsalaryButtonStatus("Add");
            axios.get('http://localhost:5000/api/emp_bank_Account/allEmpBankAccount')
            .then(res => setAllEmpBankAccounts(res.data))
            .catch(error => console.log(error));
          }
        });
  
        
        }).catch((err)=>{
    
            Swal.fire({  
            title: "Error!",
            text: "Bank Account Adding Not Success",
            icon: 'error',
            confirmButtonText: "OK",
            type: "success"})
        })
       }else{
            e.preventDefault();
            const editBankAccount ={accountNumber,bankName , branch}
            
            axios.put("http://localhost:5000/api/emp_bank_Account/editBankAccount/"+BankAccountHolder,editBankAccount).then(() =>{

            Swal.fire({  
            title: "Success!",
            text: "Bank Account Updating Success.",
            icon: 'success',
            confirmButtonText: "OK",
            type: "success"}).then(okay => {
            if (okay) {
              setBankAccountHolder("");
              setBankName("");
              setBanch("");
              setAccountNumber("");
              setsalaryButtonStatus("Add");
              axios.get('http://localhost:5000/api/emp_bank_Account/allEmpBankAccount')
              .then(res => setAllEmpBankAccounts(res.data))
              .catch(error => console.log(error));
            }
            });

            
        }).catch((err)=>{

              Swal.fire({  
              title: "Error!",
              text:   "Bank Account Updating Not Success.",
              icon: 'error',
              confirmButtonText: "OK",
              type: "success"})
          })
       }
    }


    function paySalary(e){
      e.preventDefault();
      
      const paymentId=  parseInt((new Date()).getTime());
      const employeeType= empJobTitle;
      const paymentAmount= totalSalary;
      const paymentType= "Bank Payment";
      const description= employeeName+" salary sent.";
      
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      const paymentDate= mm + '/' + dd + '/' + yyyy;
      const paymentAccount= addAccount;
      const paymentBank= addBankName+" - "+addBranch;

      const empIdNum = parseInt(employeeId);

      const addEmpPay ={paymentId ,empIdNum
        ,employeeType
        ,employeeName
        ,paymentAmount
        ,paymentType
        ,paymentDate
        ,paymentAccount
        ,description
        ,paymentBank}
  
        axios.post("http://localhost:5000/api/empPay/addEmpPay",addEmpPay).then(() =>{
  
        Swal.fire({  
          title: "Success!",
          text: "Salary sending Success!",
          icon: 'success',
          confirmButtonText: "OK",
          type: "success"}).then(okay => {
          if (okay) {
            window.location.href = "/all-emp-payment";

          }
        });
  
        
    }).catch((err)=>{
  
          Swal.fire({  
          title: "Error!",
          text: "Salary sending Not Success!",
          icon: 'error',
          confirmButtonText: "OK",
          type: "success"})
      })
    }

    function editAccount(_id ,empId,accountNumber ,bankName,branch  ){
      setBankAccountHolder(empId);
      setBankName(bankName);
      setBanch(branch);
      setAccountNumber(accountNumber);
      setsalaryButtonStatus("Edit");
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paperTitle}>
                        <Typography variant="h4" className={classes.pageTitle}>Add Employee Payment Details</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                        <Paper className={classes.paper}>   
                            <div className="mb-4 text-end">
                              <button className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">Payment Setting <i class="bi bi-gear-wide-connected"></i></button>&nbsp;&nbsp;&nbsp;
                              <button className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#bankAccounts">Employee Bank Accounts <i class="bi bi-gear-wide-connected"></i></button>
                            </div>
                            <div class="modal fade" id="bankAccounts" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog modal-dialog-centered modal-xl">
                                <div class="modal-content">
                                  <div class="modal-header bg-dark">
                                    <h5 class="modal-title text-white" id="exampleModalLabel">Employee Bank Accounts</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div class="modal-body">
                                  <div className="bg-light mt-4 mb-3 p-3">
                                    <div class="row g-3">
                                        <div class="col">
                                            <label >Select Employee</label>
                                            <select class="form-select" value={BankAccountHolder}  onChange={(e) =>{
                                                setBankAccountHolder(e.target.value);
                                            }}>
                                              <option selected>Select Employee</option>
                                              {employeeNames.map((employeeName,key) => (
                                                <option value={employeeName.empID}>{employeeName.firstName} {employeeName.lastName}</option>
                                              ))}
                                            </select> 
                                        </div>
                                        <div class="col">
                                          <label >Bank</label>
                                          <input class="form-control" list="bankList" value={bankName} onChange={(e) =>{
                                                  setBankName(e.target.value);
                                          }}/>
                                          <datalist id="bankList">
                                            <option value="Amana Bank"/>
                                            <option value="Bank of Ceylon"/>
                                            <option value="Bank of China"/>
                                            <option value="Cargills Bank"/>
                                            <option value="Citibank"/>
                                            <option value="Commercial Bank of Ceylon"/>
                                            <option value="Deutsche Bank"/>
                                            <option value="DFCC Bank"/>
                                            <option value="HBL Pakistan"/>
                                            <option value="Hatton National Bank"/>
                                            <option value="Indian Bank"/>
                                            <option value="Indian Overseas Bank"/>
                                            <option value="MCB Bank"/>
                                            <option value="National Development Bank"/>
                                            <option value="Nations Trust Bank"/>
                                            <option value="Pan Asia Banking Corporation"/>
                                            <option value="People's Bank"/>
                                            <option value="Public Bank Berhad"/>
                                            <option value="Sampath Bank"/>
                                            <option value="Seylan Bank"/>
                                            <option value="Standard Chartered Bank"/>
                                            <option value="State Bank of India"/>
                                            <option value="Hong Kong and Shanghai Banking Corporation (HSBC)"/>
                                            <option value="Union Bank of Colombo"/>
                                            <option value="National Savings Bank"/>
                                            <option value="Regional Development Bank"/>
                                            <option value="Sri Lanka Savings Bank"/>
                                            <option value="Housing Development Finance Corporation Bank of Sri Lanka (HDFC)"/>
                                            <option value="Sanasa Development Bank"/>
                                          </datalist>
                                        </div>
                                        <div class="col">
                                          <label >Branch</label>
                                          <input class="form-control"  value={branch} onChange={(e) =>{
                                              setBanch(e.target.value);
                                          }}/>
                                        </div>
                                        <div class="col">
                                          <label >Account Number</label>
                                          <input type="number" class="form-control"  value={accountNumber} onChange={(e) =>{
                                              setAccountNumber(e.target.value);
                                          }}/>
                                        </div>
                                        <div class="col">
                                          <label >&nbsp;</label>
                                          <button type="button" class="btn btn-primary btn-sm mt-4" onClick={addBankAccount}>{salaryButtonStatus}</button>&nbsp;&nbsp;
                                          <button type="button" class="btn btn-dark btn-sm  mt-4" onClick={clean}>Clean</button>
                                        </div>
                                        <table class="table table-hover">
                                              <thead>
                                                <tr className="bg-dark">
                                                  <th className="text-white fw-normal">Employee ID</th>
                                                  <th className="text-white fw-normal">Bank Name</th>
                                                  <th className="text-white fw-normal">Bank Branch</th>
                                                  <th className="text-white fw-normal">Action</th>
                                                </tr>
                                              </thead>
                                              <tbody className="bg-white">
                                                  {AllEmpBankAccounts.map((AllEmpBankAccount,key) => (
                                                  <tr>
                                                    <td className="text-capitalize">{AllEmpBankAccount.empId}</td>
                                                    <td>{AllEmpBankAccount.bankName}</td>
                                                    <td>{AllEmpBankAccount.branch}</td>
                                                    <td>
                                                    <button type="button" class="btn btn-outline-danger btn-sm d-letter-spacing shadow-0" onClick={()=>deleteAccount(AllEmpBankAccount._id)}><i class="bi bi-archive-fill"></i></button>&nbsp;&nbsp;
                                                    <button type="button" class="btn btn-outline-success btn-sm d-letter-spacing shadow-0" onClick={()=>editAccount(AllEmpBankAccount._id ,AllEmpBankAccount.empId,AllEmpBankAccount.accountNumber ,AllEmpBankAccount.bankName,AllEmpBankAccount.branch  )}><i class="bi bi-pen"></i></button>&nbsp;&nbsp;
                                                    </td>
                                                  </tr>
                                                  ))}
                                            </tbody>
                                        </table>
                                        
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog modal-dialog-centered modal-xl">
                                <div class="modal-content">
                                  <div class="modal-header bg-dark">
                                    <h5 class="modal-title text-white" id="exampleModalLabel">Payment Setting</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div class="modal-body">
                                    <div className="bg-light mt-4 mb-3 p-3">
                                    <div class="row g-3">
                                        <div class="col">
                                          <label >User Type</label>
                                          <select type="text" value={userType} class="form-select bg-white" onChange={(e) =>{
                                              setuType(e.target.value);
                                          }}>
                                              <option value="">Select User Type</option>
                                              <option value="doctor">Doctor</option>
                                              <option value="pharmacist">Pharmacist</option>
                                              <option value="reciptionist">Reciptionist</option>
                                              <option value="accountant">Accountant</option>
                                              <option value="labAssistant">Lab Assistant</option>
                                          </select>
                                        </div>
                                        <div class="col">
                                          <label >Base Payment</label>
                                          <input type="text" value={basedAmount} class="form-control bg-white"  onChange={(e) =>{
                                              setBasedSalary(e.target.value);
                                          }}/>
                                        </div>
                                        <div class="col">
                                          <label >OT Payment (Per Hour)</label>
                                          <input type="text" value={otPayment} class="form-control bg-white" onChange={(e) =>{
                                              setOtPayment(e.target.value);
                                          }}/>
                                        </div>
                                        <div class="col">
                                          <label >&nbsp;</label>
                                          <button type="button" class="btn btn-primary btn-sm mt-4" onClick={addBasedPayment}>{salaryButtonStatus}</button>&nbsp;&nbsp;
                                          <button type="button" class="btn btn-dark btn-sm  mt-4" onClick={clean}>Clean</button>
                                        </div>
                                      </div>
                                    </div>
                                    <table class="table table-hover">
                                      <thead>
                                        <tr className="bg-dark">
                                          <th className="text-white fw-normal">User Type</th>
                                          <th className="text-white fw-normal">Base Payment</th>
                                          <th className="text-white fw-normal">OT Payment (Per Hour)</th>
                                          <th className="text-white fw-normal">Action</th>
                                        </tr>
                                      </thead>
                                      <tbody className="bg-light">
                                            {AllUserBasedAmount.map((UserBasedAmount,key) => (
                                            <tr>
                                              <td className="text-capitalize">{UserBasedAmount.userType}</td>
                                              <td>Rs.{UserBasedAmount.basedAmount}.00</td>
                                              <td>Rs.{UserBasedAmount.otPayment}.00</td>
                                              <td>
                                              <button type="button" class="btn btn-outline-danger btn-sm d-letter-spacing shadow-0" onClick={()=>deleteUserBasedSalary(UserBasedAmount._id)}><i class="bi bi-archive-fill"></i></button>&nbsp;&nbsp;
                                              <button type="button" class="btn btn-outline-success btn-sm d-letter-spacing shadow-0" onClick={()=>editUserBasedSalary(UserBasedAmount._id ,UserBasedAmount.userType,UserBasedAmount.basedAmount ,UserBasedAmount.otPayment  )}><i class="bi bi-pen"></i></button>&nbsp;&nbsp;
                                              </td>
                                            </tr>
                                            ))}
                                      </tbody>
                                    </table>
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" class="btn btn-dark btn-sm" data-bs-dismiss="modal">Close</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="row bg-light">
                              <h4 className="text-center text-uppercase pt-5  text-muted"> Employee Salary Calculator</h4>
                              <div class="col-sm-6 ">
                                <div class="card p-3  bg-light border-0">
                                  <div className="row pt-3">
                                        <div className="col">
                                            <label >Select Employee</label>
                                            <select class="form-select"  onChange={(e) =>{
                                                handleEmpName(e.target.value);
                                            }}>
                                              <option selected>Select Employee</option>
                                              {employeeNames.map((employeeName,key) => (
                                                <option value={employeeName.empID+"-"+employeeName.position+"-"+employeeName.mobile+"-"+employeeName.firstName+"-"+employeeName.lastName}>{employeeName.firstName} {employeeName.lastName}</option>
                                              ))}
                                            </select>   
                                        </div>
                                        <div className="col">
                                             <label >Job Title</label>
                                             <input type="text " value={empJobTitle} class="form-control text-capitalize" />
                                        </div>
                                  </div>
                                  <div className="row pt-3">
                                        <div className="col">
                                             <label >Employee Mobile</label>
                                             <input type="text" value={mobile} class="form-control" />
                                        </div>
                                  </div>
                                  
                                  <div className="row pt-3">
                                        <div className="col">
                                             <label >Basic Salary</label>
                                             <input type="text"  value={BasicSalary} class="form-control" />
                                        </div>
                                        <div className="col">
                                             <label >OT Salary (Per Hours)</label>
                                             <input type="text" class="form-control"  value={OTSalaryPerHour} />
                                        </div>
                                        <div className="col">
                                             <label >OT Hours</label>
                                             <input type="text" class="form-control"  onChange={(e) =>{
                                                handleOTHours(e.target.value);
                                            }}/>
                                        </div>
                                  </div>
                                  <div className="pt-5">
                                    <h1 className="text-center"><span  style={{fontSize: '30px'}}>RS.</span> {totalSalary}.00</h1>
                                    <h6 className="text-center" style={{lineHeight: '10px'}}>Net Salary</h6>
                                  </div>
                                  <br/>
                                </div>
                              </div>
                              <div class="col-sm-6">
                                <div class="card p-3 bg-light border-0">
                                    <div className="row pt-3">
                                        <div className="col ">
                                             <label >Bank</label>
                                             <input type="text " value={addBankName}  class="form-control text-capitalize" />
                                        </div>
                                    </div>
                                    <div className="row pt-3 ">
                                        <div className="col ">
                                             <label >Branch</label>
                                             <input type="text " value={addBranch}  class="form-control text-capitalize" />
                                        </div>
                                    </div>
                                    <div className="row pt-3">
                                        <div className="col ">
                                             <label >Account</label>
                                             <input type="text "  value={addAccount} class="form-control text-capitalize" />
                                        </div>
                                    </div>
                                    <br/>
                                    <Grid container spacing={3}>
                                      <Grid item xs={12} sm={3}>
                                          <Button type="reset" fullWidth variant="contained" 
                                          className={classes.resetbtn}
                                          onClick={() => {
                                            reset({
                                              keepErrors: true,
                                            });
                                          }}>
                                              Reset
                                          </Button>
                                      </Grid>    
                                      <Grid item xs={12} sm={9}>
                                          <Button type="button" onClick={paySalary} fullWidth variant="contained" color="secondary" className={classes.submitbtn}>
                                              Submit
                                          </Button>
                                      </Grid>
                                      <Grid hidden='ture' item xs={12}>
                                          <h1 id="payId" name="payId">{nextId}</h1>
                                      </Grid>
                                  </Grid> 
                                  </div>
                              </div>
                            </div>
                        </Paper>
                        <Typography variant="body2" className={classes.note} gutterBottom>
                            Note : Payment Account will be auto-generated from the given details by the Employee
                        </Typography>
                        
                    </form>
                </Grid>
            </Grid>    
        </div>
    )
}

export default AddEmpPayment
