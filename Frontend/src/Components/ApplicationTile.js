import React, { useState } from "react";
import {  Button, Chip } from "@mui/material";
import "../css/index.css";
import "../css/application.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CancelIcon from "@mui/icons-material/Cancel";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Zoom from '@mui/material/Zoom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";

export default function ApplicationTile(props) {
	
	const navigate = useNavigate()
	const [showStatusDropdown, setShowStatusDropdown] = useState(false);
	const [status, setStatus] = useState("");
	const [open, setOpen] = useState(false);

  	const handleClickOpen = () => {
		setOpen(true);
  	}

  	const handleClose = () => {
		setOpen(false);
  	}
	
	const deleteApplication = async() => {
		await fetch(`https://mn3avl.deta.dev/applications/delete/${props.app_id}`,{method:'DELETE', mode:'cors'})
		handleClose()
		props.setAppDeleted(old => !old)
		
	};

	
	const changeStatus = async() => {
		// PUT request in db
		console.log(JSON.stringify({
			'new_status' : status
		}))
		await fetch(`https://mn3avl.deta.dev/applications/status/${props.app_id}`,{
			method : 'PUT',
			mode : 'cors',
			headers: { 'Content-Type': 'application/json' },
			body : JSON.stringify({
				'new_status' : status
			})
		})
		setShowStatusDropdown(false)
		props.setAppDeleted(old => {return(!old)})
	};

	return (
		<div className="candidate-tile-wrapper">
			<div className="candidate-tile-1">
				<small>{props.app_id}</small>
				<p id="name">{props.name}</p>
				<p>{props.email}</p>
				
			</div>

			<div className="candidate-tile-2">
				<span className="spans">{props.current_title} @ {props.current_org} </span>
				<p><b>{props.experience} years</b></p>

			</div>
			<Chip label={props.status} size="large" className="candidate-tile-3"/>

			
			<div className="side-options candidate-tile-4">
				<Tooltip title="View CV" TransitionComponent={Zoom}>
  					<IconButton >
					  <a href={props.cv} target="_blank"><AttachmentIcon /></a>
					</IconButton>
				</Tooltip>

				<Tooltip title="Change Status" TransitionComponent={Zoom}>
  					<IconButton onClick={() => setShowStatusDropdown(true)}>
					  <ChangeCircleIcon />
					</IconButton>
				</Tooltip>
		
				{showStatusDropdown && (
					<>
						<FormControl sx={{ width: 150, marginLeft: "5px" }}>
							<InputLabel id="demo-simple-select-label">Status</InputLabel>
							<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={status}
							label="Status"
							onChange={(e) => setStatus(e.target.value)}
							required
							size="small"
							>
							{/* add departments */}
							<MenuItem value={"Review"}>Review</MenuItem>
							<MenuItem value={"Online Assessment"}>Online Assessment</MenuItem>
							<MenuItem value={"F2F"}>F2F</MenuItem>
							<MenuItem value={"Onboarding"}>Onboarding</MenuItem>
							</Select>
						</FormControl>
						<CheckCircleIcon onClick={changeStatus} />
						<CancelIcon onClick={() => setShowStatusDropdown(false)} />
					</>
				)}

				<br />

				<Tooltip title="Delete" TransitionComponent={Zoom}>
  					<IconButton onClick={handleClickOpen}>
					  <DeleteForeverIcon />
					</IconButton>
				</Tooltip>
			</div>	

			<div>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						{"Are you sure you want to delete this application?"}
					</DialogTitle>
					
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Application ({props.app_id}) will be deleted.
						</DialogContentText>
					</DialogContent>
					
					<DialogActions>
						<Button onClick={handleClose}>No</Button>
						<Button onClick={deleteApplication} autoFocus>
							Yes
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</div>
	);
}


