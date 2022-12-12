import axios from 'axios';
import {useEffect, useState} from  'react';
import { Navigate } from 'react-router-dom';
import {checkLoginValidatity, checkPaymentValidity, userDetails} from '../Others/functions';
import './PaymentComponet.css';

const PaymentComponent = (props) => {

    const [cardNumber,setCardNumber] = useState('');
    const [month,setMonth] = useState('');
    const [year,setYear] = useState('');
    const [cvv,setCvv] = useState('');
    const [surname,setSurname] = useState('');
    const[paymentDetails,setPaymentDetails] = useState({});
    const [redirect,setRedirect] = useState(false);
    
    useEffect(()=>{
        
        userDetails(setPaymentDetails);
        const date = new Date(paymentDetails.lastPaymentDate);
        
        const currrentMonth = (new Date()).getMonth();
        const lastPaymentDate  = paymentDetails.lastPaymentDate;
        const nextMonthSlot = paymentDetails.nextMonthSlot;
        const nextMonth = paymentDetails.nextMonth;

        if (nextMonthSlot !== '')
        {
            const paymentMonth = new Date(lastPaymentDate).getMonth()
            if(!(currrentMonth>paymentMonth) || (paymentMonth==12&&currrentMonth==1))
            {
                // console.log("this months payment is already done");
                alert("this months payment is already done");
                setRedirect(true );
                
            }
        }
        
        

    },[])

    const handleCardNumber = (event) => {
        setCardNumber(event.target.value);
    }
    const handleMonth = (event) => {
        setMonth(event.target.value);
    }
    const handleYear = (event) => {
        setYear(event.target.value);
    }
    const handleCvv = (event) => {
        setCvv(event.target.value);
    }
    const handleSurname = (event) => {
        setSurname(event.target.value);
    }

    const validatePayment = () => {
       
        let invalid = false;
        
        
        if(!(cardNumber.length>=8 && cardNumber.length <= 19)){
            alert('Card Number Should contain aleast 8 digits');
            invalid = true;
        }
        else if(!(+month>=1 && +month <= 12)){
            alert('Month should be between 1 to 12');
            invalid = true;
        }
        else if(!(+year>=1980 && +year <= 2050)){
            alert('Year should be between 1980 to 2050');
            invalid = true;
        }
        else if(surname.length<2){
            alert('name must be aleast 2 Characters long');
            invalid = true;
        }
        
        return invalid;
    }

    const completePayment = (event) => {

        event.preventDefault();
        if(!validatePayment())
        {
            alert('payment Successfull');
            const id = localStorage.getItem('id');
            axios.post('http://localhost:9000/verify/completePayment',{id:id,date:new Date().toISOString()}).then(res=>{
                console.log(res);
            });
        }

        
    }

    const form = (
        <div className='Container'>
        <h1>Amout to be Paid: 150</h1>
            <h3>Card Details</h3> <br/>
            <form onSubmit={completePayment}>
                <div>
                    <input type="number" name="cardNumber" onChange={handleCardNumber} value={cardNumber} placeholder="Card Number"/>
                </div>
                <div>
                    <input type="number" name="month" min={1} max={12} onChange={handleMonth} value={month} placeholder="month"/>
                    <input type="number" name="year" min={1980} max={2050} onChange={handleYear} value={year} placeholder="Year"/>
                    <span><input type="number" name="cvv" onChange={handleCvv} value={cvv} placeholder="CVV"/></span>
                </div>
                <div>
                    <input type="text" name="surname" onChange={handleSurname} value={surname} placeholder="Surname"/>
                </div>
                <br/>
                <input type="submit"/>
            </form>
        
        </div>
    );

    return(
        <>
            {
                redirect ? <Navigate to="/userProfile" /> : form
            }
            
        </>
    )
}

export default PaymentComponent;