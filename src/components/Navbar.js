import React from 'react';
import { AppBar , Toolbar , Link } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import './Navbar.css';
import avengers from '../logos/avengers.png'


const Navbar = ({onAClick , toggleTheme , currentTheme}) => {
	
	return (
	      <AppBar position="static" color='secondary'>
	        <Toolbar>
	          <IconButton edge="start" onClick={onAClick}>
	            <img src={avengers} alt='' height='40px'/>
	          </IconButton>
	           <div style={{marginLeft: 'auto'}}>
	           		{ currentTheme === 'light'
		          ? <IconButton color="inherit" onClick={() => toggleTheme('dark')}>
		            <Brightness4Icon />
		          </IconButton>
		          : <IconButton color="inherit" onClick={() => toggleTheme('light')}>
		            <Brightness7Icon />
		          </IconButton>
		          	}
		          <IconButton color="inherit">
		       	  	<Link href="https://github.com/EDZ1js" target="_blank" color='inherit'>
						<GitHubIcon />
					</Link>
		          </IconButton>
		       </div>
	        </Toolbar>
	      </AppBar>
	)
}

export default Navbar;