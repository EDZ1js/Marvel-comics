import React from 'react';
import { Typography , Link } from '@material-ui/core';

const styles = {
	textAlign : 'center',
	padding: '0.7rem 0',
	backgroundColor: '#F1F2F1',
	color: '#e80500'
}


const Footer = () => {
	return (
		<Typography variant="body1" style={styles}>
     		 Data provided by Marvel. © 2020 <Link href='https://developer.marvel.com' target='_blank'>
     		 									 Marvel
     		 								 </Link>
    	</Typography>

		)
}


export default Footer;