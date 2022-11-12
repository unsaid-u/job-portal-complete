import React, {useState} from "react"
import { Button, Chip, IconButton } from "@mui/material"
import { useNavigate } from "react-router"
import '../css/index.css'
import '../css/listing_panel.css'
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessCenterTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// rang-rogan

export default function JobListingPanel(props) {
	const navigate = useNavigate()

	const [open, setOpen] = useState(false);

  	const handleClickOpen = () => {
		setOpen(true);
  	}

  	const handleClose = () => {
		setOpen(false);
  	}

	const handleDelete= async() =>{
		await fetch(`https://mn3avl.deta.dev/job_openings/delete/${props.id}`, {
			method: 'DELETE',
			mode : 'cors'
		})

		handleClose()
		props.setDeleted(old => !old)
	}

	return (
	<>
		<div className="job-listing-panel-wrapper"  >
			<div className="left-side" onClick={() => {navigate(`/${props.id}`)}}>
				<h2>{props.title}</h2>
				<div className="left-side-bottom">
					<span><BusinessCenterTwoToneIcon/> <label>{props.department}</label></span>
					<span><LocationOnTwoToneIcon/> <label>{props.location}</label> </span>
					<span><AccessTimeTwoToneIcon/> <label>{props.experience}</label> </span>
					
				</div>
			</div>
			<div className="right-side">
				<Chip label={props.job_type}/>
				{
					props.showDelete && 
					<IconButton>
						<DeleteTwoToneIcon fontSize="large" onClick={handleClickOpen}/>
					</IconButton>
				}
			</div>
	
		</div>

		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Are you sure you want to delete this opening?"}
				</DialogTitle>
				
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						On clicking yes, the job opening ({props.title}) will be permanently deleted
					</DialogContentText>
				</DialogContent>
				
				<DialogActions>
					<Button onClick={handleClose}>No</Button>
					<Button onClick={handleDelete} autoFocus>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	</>
	)
}



  
	

