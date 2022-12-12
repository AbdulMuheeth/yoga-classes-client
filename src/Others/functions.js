import { findAllByTestId } from "@testing-library/react";
import axios from "axios";

export const checkLoginValidatity =  () =>{
    if(localStorage.getItem('loggedin')){
        const id = localStorage.getItem('id');
        if (id!=''){
            return(true);
        }
        else{
            return false;//user not loggedin
        }
    }
    else{
        return false;
    }
}

export const userDetails = async (setDetails) =>{
    if(checkLoginValidatity()){
        // localStorage.
        const id=localStorage.getItem('id');
        let response = {};
        await axios.post('http://localhost:9000/verify',{id:id}).then(res=>{
            // console.log(res);
            if(!res.data){
                console.log('invalid');
                return false;
            }
            // console.log(res.data);
            setDetails(res.data);
            response = {...(res.data)};
        })
        // return(response);
    }
    else{
        console.log('user is not loggedIN');
        
    }
}

export const checkPaymentValidity = (setPaymentDetails) => {
    
    const details = userDetails(setPaymentDetails);
    console.log(" inside payment verify");
    // return true;
}