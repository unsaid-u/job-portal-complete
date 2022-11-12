import { Button } from '@mui/material';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import '../css/nav.css'
import { auth } from '../firebase';
import '../css/index.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';


export default function NavBar(props){

	const navigate = useNavigate()

	const [open, setOpen] = useState(false);

  	const handleClickOpen = () => {
		setOpen(true);
  	}

  	const handleClose = () => {
		setOpen(false);
  	}

	const handleLogout = ()=>{
		signOut(auth)
		props.setLoggedIn(false)
		handleClose()
	}

	
	return(
		<>
			<div className='nav-bar'>
				<div><img src={require('../fynd_logo.png')} id="logo"/></div>
				<div>
					{
						props.loggedIn 
						? <span> {auth.currentUser.email}  | <Button variant='outlined' endIcon ={<LockOpenTwoToneIcon/>} onClick={handleClickOpen}>Logout</Button></span> 
						: <Button variant='outlined' endIcon={<LockTwoToneIcon/>}  onClick={()=> {navigate('/login')}}>Login</Button>
					}
				</div>
			</div>
			<br/>

			<div>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						{"Are you sure you want to Logout?"}
					</DialogTitle>
					
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							You will be logged out.
						</DialogContentText>
					</DialogContent>
					
					<DialogActions>
						<Button onClick={handleClose}>No</Button>
						<Button onClick={handleLogout} autoFocus>
							Yes
						</Button>
					</DialogActions>
				</Dialog>
			</div>
			
			<Outlet/>
			
			<br/>
			<br/>
		</>
	)
}