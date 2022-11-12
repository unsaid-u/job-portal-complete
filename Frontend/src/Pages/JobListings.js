import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import JobListingPanel from "../Components/JobListingPanel";
import '../css/index.css'
import '../css/listings.css'
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useNavigate } from "react-router-dom";
import { Chip, useThemeProps } from "@mui/material";
import QueryTile from "../Components/QueryTile";
import GoToTop from "../Components/GoToTop";

export default function JobListings(props) {
	const navigate = useNavigate()
	// fetch job listings
	const [jobs, setJobs] = useState([])
	const [deleting, setDeleting] = useState(false)
	const [showDelete, setShowDelete] = useState(false)
	const [deleted, setDeleted] = useState(false)
	const [getQuery, setGetQuery] = useState("https://mn3avl.deta.dev/job_openings")

	const get_openings = async ()=> {
		const response = await fetch(getQuery)
		const openings = await response.json()
		setJobs(openings)
	}


	useEffect(()=>{
		get_openings()
	}, [deleted, getQuery])	// add getQuery to the dependencies
	

  return (
	<Container maxWidth="xl" >
		<h1>Job Openings</h1>
		<br/>
        <div className="listings-wrapper">
			<div className="listing-left-side">
				
				{
					jobs.map(item => 
						<JobListingPanel 
							key = {item.job_id} 
							id = {item.job_id}
							job_type = {item.job_type}
							title = {item.title}
							department = {item.department}
							location = {item.location}
							experience = {item.experience}
							showDelete = {showDelete}
							setDeleted = {setDeleted}
						/>
					)

				}
			</div>
		
			<div className="listing-right-side">

				<QueryTile setGetQuery={setGetQuery}/>
				<br/>
				{ props.loggedIn && 
				<>	
					<div className="add-opening-box" onClick={() => {navigate('/new-opening')}}>
						<p>As a recuriter you can add new openings</p>
						<Chip icon={<AddCircleTwoToneIcon />} label="Click here to add" clickable/>
					</div>
					<br/>
					<div className="add-opening-box" >
						<p>As a recuriter you can delete openings</p>
						{
							!deleting 
							? <Chip icon={<DeleteTwoToneIcon />} label="Click here to delete" clickable onClick = {() => {setShowDelete(true); setDeleting(true)}}/>
							: <Chip icon={<DeleteTwoToneIcon />} label="Finish deleting" clickable onClick={() => {setShowDelete(false); setDeleting(false); }}/>
						}
					</div>
				</>
				}
			</div>
		</div>
		<GoToTop/>
	</Container>
  );
}

/**/