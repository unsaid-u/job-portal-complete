import {  Tooltip } from '@mui/material';
import React from 'react';
import '../css/index.css'

export default function GoToTop(){
	let mybutton = document.getElementById("btn-back-to-top");

	// When the user scrolls down 20px from the top of the document, show the button
	
	function scrollFunction() {
		if (
			document.body.scrollTop > 20 ||
			document.documentElement.scrollTop > 20
			) {
				mybutton.style.display = "block";
			} else {
				mybutton.style.display = "none";
			}
		}
		// When the user clicks on the button, scroll to the top of the document
	window.onscroll = function () {
		scrollFunction();
	};
	
	function backToTop() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}

	//mybutton.addEventListener("click", backToTop);

	
	return(
		
		
		<Tooltip title='Go to top'>
			<button 
				onClick={backToTop}>
				<img src={require('../top.png')} id="btn-back-to-top" />
			</button>
		</Tooltip>
	)
}