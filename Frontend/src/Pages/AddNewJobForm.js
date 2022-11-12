import React, { useState , useEffect} from 'react';
import { Button, TextField } from '@mui/material';
import { Container } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router';

export default function AddNewJobForm(props){
	
	const navigate = useNavigate()

	useEffect(()=>{
        if(!props.loggedIn){
            navigate('/')
        }
    }, [])

	if(!props.loggedIn)
		navigate('/login')

	const [job, setJob] = useState({
		title : "",
		department : "",
		location : "",
		experience : "",
		job_type : "",
		responsibilities : "",
		requirements : ""
	})

	const handleChange = (e)=>{
		setJob(oldJob => {
			const {name, value} = e.target	// destructuring
			
			return({
				...oldJob,
				[name] : value
			}) 
		})
	}

	

	const handleSubmit = async(e) => {
		e.preventDefault()
		console.log("submitted")
	
		const requestOptions = {
			method: 'POST',
            mode : 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ 
				'title' : job.title,
				'department' : job.department,
				'experience' : job.experience,
				'location' : job.location,
				'job_type' : job.job_type,
				'responsibilities' : job.responsibilities,
				'requirements' : job.requirements  
			})
		}

		await fetch('https://mn3avl.deta.dev/job_openings/add_opening',requestOptions)
		.then(() => {
			setJob({
				title : "",
				department : "",
				location : "",
				experience : "",
				job_type : "",
				responsibilities : "",
				requirements : ""
			})
		})
		.then(() => navigate('/'))

		
	}

	return(
		
		<Container maxWidth='lg'>
			<h1>Add a new Job Opening</h1>
			<br/>	
				{/* add onSubmit to the form */}
			<form autoComplete='off'>
				<TextField
					label = "Job Title"
					variant='outlined'
					fullWidth
					required
					value={job.title}
					name ="title"
					onChange = {handleChange}
				/>
				<br/><br/>
				<FormControl sx={{ m: 1, minWidth: 250 }}>
					<InputLabel id="demo-simple-select-label">Department *</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={job.department}
						name="department"
						label="Department*"
						onChange={handleChange}
						required
					>
						{/* add departments */}
						<MenuItem value={"Design"}>Design</MenuItem>
						<MenuItem value={"Founder"}>Founder</MenuItem>
						<MenuItem value={"Business"}>Business</MenuItem>
						<MenuItem value={"Engineering"}>Engineering</MenuItem>
						<MenuItem value={"Human Resources"}>Human Resources</MenuItem>
						<MenuItem value={"Training"}>Training</MenuItem>
						<MenuItem value={"Finance"}>Finance</MenuItem>
						<MenuItem value={"Marketing"}>Marketing</MenuItem>
						
					</Select>
				</FormControl>

				<FormControl sx={{ m: 1, minWidth: 250 }}>
					<InputLabel id="demo-simple-select-label">Location *</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={job.location}
						name="location"
						label="Location*"
						onChange={handleChange}
						required
					>
						{/* add loactions */}
						<MenuItem value={"Mumbai"}>Mumbai</MenuItem>
						<MenuItem value={"Bangalore"}>Bangalore</MenuItem>
						<MenuItem value={"Ahemdabad"}>Ahemdabad</MenuItem>
						<MenuItem value={"Pune"}>Pune</MenuItem>
					</Select>
				</FormControl>

				<FormControl sx={{ m: 1, minWidth: 250 }}>
					<InputLabel id="demo-simple-select-label">Experience *</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={job.experience}
						name="experience"
						label="Experience*"
						onChange={handleChange}
						required
					>
						{/* add Experience values */}
						<MenuItem value={"0-1 years"}>0-1 years</MenuItem>
						<MenuItem value={"2-5 years"}>2-5 years</MenuItem>
						<MenuItem value={"6-12 years"}>6-12 years</MenuItem>
						<MenuItem value={"12+ years"}>12+ years</MenuItem>
					</Select>
				</FormControl>

				<FormControl sx={{ m: 1, minWidth: 250 }}>
					<InputLabel id="demo-simple-select-label">Job Type *</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={job.job_type}
						name="job_type"
						label="Job Type*"
						onChange={handleChange}
						required
					>
						{/* add job types */}
						<MenuItem value={"Full time"}>Full Time</MenuItem>
						<MenuItem value={"Part Time"}>Part Time</MenuItem>
						<MenuItem value={"Internship"}>Internship</MenuItem>
					</Select>
				</FormControl>
				<br/><br/>
				<TextField
					id="outlined-multiline-static"
					label="Roles and Responsibilities"
					multiline
					rows={7}
					helperText = "Enter in points for better presentation"
					fullWidth
					required
					value={job.responsibilities}
					name="responsibilities"
					onChange = {handleChange}
        		/>
				<br/><br/>
				<TextField
					id="outlined-multiline-static"
					label="Requirements"
					multiline
					rows={7}
					helperText = "Enter in points for better presentation"
					fullWidth
					required
					value={job.requirements}
					name="requirements"
					onChange = {handleChange}
        		/>

				<br/><br/>
				
				{
					job.title && job.department && job.experience && job.job_type && job.location && job.requirements && job.responsibilities
					? <Button variant="contained" type='submit' fullWidth size="large" onClick={handleSubmit}>SUBMIT</Button>
					: <Button variant="contained" type='submit' fullWidth size="large" disabled>SUBMIT</Button> 
				}
				
			</form>
		</Container>
	)
}

/*
	JobID - auto generated
textfield	
	job title
	
dropdown	
	department - 
	team*
	location
	type
	experience

textfield - list -- ??
	roles & responsibilities
	requirements

*/ 