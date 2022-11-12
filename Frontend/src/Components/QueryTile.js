import React, { useState } from 'react';
import '../css/index.css'
import '../css/listings.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';


export default function QueryTile(props){
	
//	const[query, setQuery] = useState("")
	const[job_type, setJob_type] = useState("All")
	const[experience, setExperience] = useState("All")
	const[location, setLocation] = useState("All")

	const handleSubmit= ()=>{
		// form the query then set it to the original get_query via props
		let query = "https://mn3avl.deta.dev/job_openings/?"

		let one= ""
		let two =""
		let three = ""

		//http://localhost:8000/job_openings/? one=value1& two=value2& three=value3

		one = job_type === "All" ? "" : `type=${job_type}&`  
		two = experience === "All" ? "" : `experience=${experience}&`
		three = location === "All" ? "" : `location=${location}`
		
		query = query + one + two + three
		
		if(query[query.length - 1] == '&' || query[query.length - 1] == '?')
			query = query.substring(0,query.length-1)

		props.setGetQuery(query)
	}


	return(
		<div className='query-tile-wrapper'>
			<h3>Filter Options</h3>
			<hr/>
			<br/>
			<FormControl sx={{ minWidth: 300 }} >
				<InputLabel id="demo-simple-select-label">Location</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={location}
					name="location"
					label="Location"
					onChange={(e) => {setLocation(e.target.value)}}
					
				>
					<MenuItem value={"All"}>All</MenuItem>
					<MenuItem value={"Mumbai"}>Mumbai</MenuItem>
					<MenuItem value={"Bangalore"}>Bangalore</MenuItem>
					<MenuItem value={"Ahemdabad"}>Ahemdabad</MenuItem>
					<MenuItem value={"Pune"}>Pune</MenuItem>
				</Select>
			</FormControl>
			<br/>

			<FormControl sx={{ minWidth: 300 }}>
				<InputLabel id="demo-simple-select-label">Experience</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={experience}
					name="experience"
					label="Experience"
					onChange={(e) => {setExperience(e.target.value)}}
					
				>
					<MenuItem value={"All"}>All</MenuItem>
					<MenuItem value={"0-1 years"}>0-1 years</MenuItem>
					<MenuItem value={"2-5 years"}>2-5 years</MenuItem>
					<MenuItem value={"6-12 years"}>6-12 years</MenuItem>
					<MenuItem value={"12+ years"}>12+ years</MenuItem>
				</Select>
			</FormControl>
			<br/>

			<FormControl sx={{ minWidth: 300 }}>
				<InputLabel id="demo-simple-select-label">Job Type</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={job_type}
					name="job_type"
					label="Job Type*"
					onChange={(e) => {setJob_type(e.target.value)}}
					required
				>
					<MenuItem value={"All"}>All</MenuItem>
					<MenuItem value={"Full time"}>Full Time</MenuItem>
					<MenuItem value={"Part Time"}>Part Time</MenuItem>
					<MenuItem value={"Internship"}>Internship</MenuItem>
				</Select>
			</FormControl>
			
			<br/>
			<Button variant='contained' onClick={handleSubmit} >Filter Listings</Button>
		</div>
	)
}