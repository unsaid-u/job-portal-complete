import React, {useState}from 'react';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import NavBar from './Components/NavBar';
import AddNewJobForm from './Pages/AddNewJobForm';
import ApplyJobForm from './Pages/ApplyJobForm';
import JobDescription from './Pages/JobDescription';
import JobListings from './Pages/JobListings';
import Login from './Pages/Login'

export default function App(){
	const [loggedIn, setLoggedIn] = useState(false)

	return(
		<HashRouter>
			<Routes>
				<Route path='/' element={<NavBar loggedIn={loggedIn} setLoggedIn = {setLoggedIn}/>}>
					<Route index element={<JobListings loggedIn={loggedIn} />}/>
					<Route path='/login' element={<Login loggedIn={loggedIn} setLoggedIn = {setLoggedIn}/>}/>
					<Route path='/:jobID' element={<JobDescription loggedIn={loggedIn} />}/>
					<Route path='/apply/:jobID' element={<ApplyJobForm/>}/>
					<Route path='/new-opening' element={<AddNewJobForm loggedIn={loggedIn} />} />
				</Route>
			</Routes>
		</HashRouter>
	)
}