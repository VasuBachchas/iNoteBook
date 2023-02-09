import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
    const [cred, setCred] = useState({ name: "", email: "", password: "", cpassword: "" })
    let history = useNavigate();
    const onchange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = cred;
        const response = await fetch("http://localhost:8000/api/auth/createUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password }) // body data type must match "Content-Type" header
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Account Successfully Created!" ,"success")
            history("/")
        }
        else {
            props.showAlert("Invalid Credentials!" ,"danger")
        }


    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" name="name" class="form-control my-2" onChange={onchange} id="text" placeholder="Name" />
                </div>
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" name="email" class="form-control my-2" onChange={onchange} id="email" aria-describedby="emailHelp" placeholder="Enter email" />

                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" class="form-control my-2" id="password" onChange={onchange} placeholder="Password" />
                </div>
                <div class="form-group">
                    <label for="cpassword">Confirm Password</label>
                    <input type="password" name="cpassword" onChange={onchange} class="form-control my-2" id="cpassword" placeholder="Confirm Password" />
                </div>

                <button type="submit" class="btn btn-primary my-2">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
