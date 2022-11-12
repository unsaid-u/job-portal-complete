import { Button, Chip, Container } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/index.css'
import '../css/jd.css'
import CreateIcon from '@mui/icons-material/Create';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessCenterTwoTone';
import { useEffect } from 'react';
import ApplicationTile from '../Components/ApplicationTile';
import GoToTop from '../Components/GoToTop';



export default function JobDescription(props){
    const {jobID} = useParams()
    const navigate = useNavigate()
    const [job, setJob] = useState({})
    const [applications, setApplications] = useState([])

    const[appDeleled, setAppDeleted] = useState(false)  // dependency for useEffect 

    const get_job = async()=> {
        const response = await fetch(`https://mn3avl.deta.dev/job_openings/${jobID}`)
        const data = await response.json()
        setJob(data)
    }

	const get_applications = async ()=>{
		const response = await fetch(`https://mn3avl.deta.dev/applications/${jobID}`)
		const data = await response.json()
		//console.log(data)
		setApplications(data)
	}

    useEffect(()=>{
        get_job()
        get_applications()
        
    }, [appDeleled])

    return(
        <Container maxWidth='lg'>
            <div className='title'>
                <h1>{job.title}</h1>
                <div>
                    <Button 
                        variant='contained'
                        size="large"
                        onClick={()=>{navigate(`/apply/${job.job_id}`)}}
                        endIcon={<CreateIcon/>}
                    >APPLY</Button>
                </div>
            </div>
           <br/>
            <span>
                <Chip icon={<BusinessCenterTwoToneIcon/>} label={job.department} style={{marginLeft : "10px"}}/>
                <Chip icon={<LocationOnTwoToneIcon/>} label={job.location} style={{marginLeft : "10px"}}/>
                <Chip icon={<AccessTimeTwoToneIcon/>} label={job.experience} style={{marginLeft : "10px"}}/>
            </span>

            <br/><br/>
            <div className='about size'>
                <p>
                Fynd is India’s largest omnichannel platform and multi-platform tech company with expertise in retail tech and products in AI, ML, big data ops, gaming+crypto, image editing and learning space.<br/>

                Founded in 2012 by 3 IIT Bombay alumni: Farooq Adam, Harsh Shah and Sreeraman MG.<br/>

                We are headquartered in Mumbai and are a company of more than 750 people. Fynd has 1000+ brands under management, more than 10k stores and servicing 23k + pin codes.<br/>

                Everybody these days is making products, everyone is hiring technology ninjas! We aren’t looking for ninjas, samurais or warriors, we are looking for YOU:<br/>
                </p>
                <ul className='lists'>
                    <li>If you know the difference between worKING and work-eh-ing</li>
                    <li>You know when to stop, how to unwind and take a breakk!</li>
                    <li>Unafraid to ask for help & unashamed to ask again</li>
                    <li>If you are good at what you do & acknowledge when you mess up (We all mess up some time)</li>
                    <li>You learn, execute, learn again and talk about the insights you gained</li>
                </ul>
                <p>Then YOU are the chosen one that we are looking for….</p>
            </div>
            <br/>

            <h2>Responsibilities</h2>
            <div style={{whiteSpace : 'pre-wrap'}} className='lists size'>
                {job.responsibilities}
            </div>
            <br/>

            <h2>Requirements</h2>
            <div style={{whiteSpace : 'pre-wrap'}} className='lists size'>
                {job.requirements}
            </div>
            <br/><br/>
            
            {props.loggedIn && 
                <div >
                    <h1>Applications List</h1>
                    <p id='subtext'><i>As a recuriter you can review applications, change their status and also delete them</i></p>
                    <br/>
                    <hr/>
                    <br/>
                    {    
                        applications.length > 0 
                        ? applications.map(item =>{
                            return(
                                <ApplicationTile
                                    key = {item.app_id}
                                    app_id = {item.app_id}
                                    current_title = {item.current_title}
                                    experience = {item.experience}
                                    current_org = {item.current_org}
                                    status = {item.status}
                                    job_id = {item.job_id}
                                    name = {item.name}
                                    cv = {item.cv}
                                    email = {item.email}
                                    setAppDeleted = {setAppDeleted}
                                />
                            )    
                        })
                        : <p>No applications for this job opening</p>
                    }
                </div>
            }

            <GoToTop/>  
        </Container>    
    )
}