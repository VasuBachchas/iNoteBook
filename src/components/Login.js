import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const Login = (props) => {
    const [cred,setCred]=useState({email:"",password:""})
    let history=useNavigate();
    const onchange=(e)=>{
        setCred({...cred,[e.target.name]:e.target.value});
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email:cred.email, password:cred.password}) // body data type must match "Content-Type" header
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            //redirect
            localStorage.setItem('token',json.authtoken);
            props.showAlert("Logged In Successfully!" ,"success")
            history("/")
        }
        else{
            props.showAlert("Invalid Credentials!" ,"danger")
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control my-2" id="email" name="email" aria-describedby="emailHelp" value={cred.email} onChange={onchange} placeholder="Enter email"/>
                        
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" value={cred.password} class="form-control my-2" id="password" onChange={onchange} placeholder="Password"/>
                </div>
                <button type="submit" class="btn btn-primary my-2" >Submit</button>
            </form>
        </div>
    )
}

export default Login
