import React, { useEffect, useState } from 'react';
import {auth} from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../css/login.css'
import '../css/index.css'
import { useNavigate } from 'react-router';
import { Button, TextField } from '@mui/material';


export default function LoginPage(props){
    
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(props.loggedIn){
            navigate('/')
        }
    }, [])
    

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
    const [error , setError] = useState({
        email : false,
        password : false,
        email_helper_text : "",
        password_helper_text : ""
    })


	const handleSubmit = () => {
		// login using firebase
		signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            props.setLoggedIn(true)
            navigate('/')
        })
        .catch((error) => {

            if(error.code == "auth/user-not-found"){
                setError(old => {
                    return ({
                        ...old,
                        email : true,
                        email_helper_text : "Invalid email, user not found"
                    })
                })
            }
            else if (error.code == "auth/wrong-password"){
                setError(old => {
                    return ({
                        ...old,
                        password : true,
                        password_helper_text : "Incorrect password"
                    })
                })
            }
            
        })
	}

	return(
		<div className='login-form-wrapper'>
			
            <h1>Welcome Recruiter</h1>
            <hr/>
            <br/>
            <TextField
                label = "Email"
                variant='outlined'
                fullWidth
                required
                value={email}
                name="email"
                onChange = {(e) => {setEmail(e.target.value.trim())}}
                error = {error.email}
                helperText = {error.email_helper_text}
            />
            <br/><br/>
            <TextField
                label = "Password"
                variant='outlined'
                type='password'
                fullWidth
                required
                value={password}
                name="password"
                onChange = {(e) => {setPassword(e.target.value.trim())}}
                error = {error.password}
                helperText = {error.password_helper_text}
            />	
            <br/><br/>

            {
                email && password 
                ? <Button variant='contained' 
                    type='submit' 
                    size='large' 
                    fullWidth 
                    onClick={handleSubmit}
                  >
                    LOGIN
                </Button>
                
                : <Button variant='contained' 
                    disabled 
                    type='submit' 
                    size='large' 
                    fullWidth 
                >
                    LOGIN
                </Button>
            }
            
            <br/>
		</div>
	)
}