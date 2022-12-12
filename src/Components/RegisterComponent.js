import axios from 'axios';
import md5 from 'md5';
import {useState,useEffect} from 'react';
import { Navigate } from 'react-router-dom';

const RegisterComponent = () => {

    useEffect(()=>{
        axios.get('http://localhost:9000/register').then(res=>{
            console.log(res.data);
        });
    },[])

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [slot,setSlot] = useState('');
    const [age,setAge] = useState(0);


    const handleName = (event)=>{
        setName(event.target.value);
    }
    const handleEmail = (event)=>{
        setEmail(event.target.value);
    }
    const handlePassword = (event)=>{
        setPassword(event.target.value);
    }
    const handleSlot = (event)=>{
        setSlot(event.target.value);
    }
    const handleAge = (event)=>{
        setAge(+event.target.value);
    }

    const validateSubmit = (event) => {
        
        const validEmailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        let invalid = false;
        
        
        if(name.length < 2){
            alert('name must be aleast 2 Characters long');
            invalid = true;
        }
        else if(age<=65 && age>=  18)
        {
            alert('invalid email');
            invalid = true;
        }
        else if(!validEmailRegex.test(email)){
            alert('invalid email');
            invalid = true;
        } 
        else if(password.length < 6){
            alert('password must be aleast 2 Characters long');
            invalid = true;
        }

        return invalid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateSubmit(event))
        {
            return;
        }
        const PostObj = {
            name:event.target.name.value,
            email:event.target.email.value,
            password:md5(event.target.password.value),
            slot:event.target.slot.value
        };
        
        axios.post('http://localhost:9000/register',PostObj).then(res=>{
            console.log(res);
        })

    }
        
    const RegisterForm = (
        
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input type="text" name="email" placeholder='Email' value={email} onChange={handleEmail}/>
            </div>
            <div>
                <label>FullName</label>
                <input type="text" name="name" min={18} max={65} value={name} onChange={handleName}/>
            </div>
            <div>
                <label>Age</label>
                <input type="number" name="age" value={age} onChange={handleAge}/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={handlePassword}/>
            </div>
            <div>
                <label>Select</label>
                <select name="slot" onChange={handleSlot} value={slot}>
                    <option value="6-7">6 to 7am</option>
                    <option value="7-8">7 to 8am</option>
                    <option value="8-9">8 to 9am</option>
                    <option value="5-6">5 to 6pm</option>
                </select>
            </div>
            <input type="submit" name="submit"/>
        </form>
        
    )


    return(
        <>
        {/* hi */}
            {localStorage.getItem('id')&&localStorage.getItem("loggedin")? <Navigate to="/userProfile"/> : RegisterForm}
        </>
    )
}

export default RegisterComponent;