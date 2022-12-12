import axios from 'axios';
import md5 from 'md5';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const LoginComponent = () => {


    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');


    useEffect(()=>{
        console.log(localStorage.getItem('loggedin'));
        console.log(localStorage.getItem('id'));
        if (localStorage.getItem('loggedin')){
            console.log("hi")
            if(localStorage.getItem('id'))
            {
                console.log("hi");
                <Navigate to="/userProfile"/>
            }
        }
    },[])

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    
    const validateSubmit = (event) => {
        
        const validEmailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        let invalid = false;
        
        if(!validEmailRegex.test(email)){
            alert('invalid email');
            invalid = true;
        } 
        else if(password.length < 6){
            alert('password must be aleast 2 Characters long');
            invalid = true;
        }
        
        return invalid;
    }
    
    const verifyUser = (user) => {
        axios.post('http://localhost:9000/login',user).then(res=>{
            console.log(res.data.userexists)
            if(res.data.userexists){
                const response = res.data;
                localStorage.setItem("id",response.id);
                localStorage.setItem("loggedin",response.userexists);
            }
            else
            {
                alert("Invalid User");
            }
        })
    }

    const handleSubmit = (event) => {

        // event.preventDefault();
        if(validateSubmit(event))
        {   
            return;
        }

        const user = { email:email,password:md5(password)}

        // post request to verify the user credentials
        verifyUser(user)
    
    }

    const LoginForm = (
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="text" name="email" placeholder='Email' value={email} onChange={handleEmail}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePassword}/>
                </div>
                <input type="submit" name="submit"/>
            </form>
    )

    return(
        <>
        {
            (localStorage.getItem('loggedin')&&localStorage.getItem('id'))?<Navigate to="/userProfile"/>: LoginForm

        }
            
        </>
    )
}

export default LoginComponent;