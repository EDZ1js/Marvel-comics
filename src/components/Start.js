import React from 'react';
import { Button } from '@material-ui/core';
import marvel from '../logos/marvel.png';
import './Start.css';


const Start = ({onStart}) => {

   return (
      <div className="parent">
      	<img src={marvel} alt='' className="img"/>
      	<div> 
      	     <h2 style={{color: "#2196f3"}}>A simple app that lets you explore your favourite 
      			Marvel comics characters and their origin stories!
      		</h2>
      		<Button 
	      		variant="contained" 
	      		color="primary" 
	      		style={{padding: '0.7rem 1rem', margin: '1rem 0'}}
	      		onClick={onStart}>SHOW ME!
	           </Button>
      	</div>
      </div>
   )
}

export default Start;