import React, {useState} from 'react';
import './App.css';
import Navbar from './Navbar';
import Start from './Start';
import Explore from './Explore';
import Footer from './Footer';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";


const App = () => {

// we create our customized light and dark themes
const lightTheme = {
    palette: {
       type: "light",
       secondary: {
          main: "#3f51b5"
       },
       text : {
       	primary: '#F7F7F7',
       	secondary: '#28282C'
       }
    }
};

const darkTheme = {
    palette: {
      type: "dark",
      primary: {
      	main: '#32aec7'
      },
      secondary: {
      	main: '#424242'
      },
      text : {
      	primary: '#1A1D1A',
      	secondary: '#F7F7F7'
      }
    }
  };


const [theme, setTheme] = useState(lightTheme); //we start off with the light theme.
const [route, setRoute] = useState('home'); // we start off at the home route.


// this function gets called when the SHOW ME! button is clicked.
const onStart = () => {
	setRoute('explore')
} 

// this function gets called when the 'Avengers' logo on the left of the navbar is clicked.
const onAClick = () => {
	setRoute('home');
}

/* this function gets called when the day/night button is clicked,
	and gets changed depending on the toggle icon on the Navbar */
const toggleTheme = (theme) => { 
	theme === 'light' ? setTheme(lightTheme) : setTheme(darkTheme);
} 


 // this creates a light or dark theme with our customized preferences 
const muiTheme = createMuiTheme(theme); 

    return (
        <MuiThemeProvider theme={muiTheme}>
	        <div style={{backgroundColor: theme.palette.type === 'light' ? '#f7f7f7' : '#292929'}}>
	            <Navbar 
	              onAClick={onAClick} 
	              toggleTheme={toggleTheme} 
	              currentTheme={theme.palette.type} //we pass down the current theme so that
	              									//Navbar knows which icon to render
	            />
	            {route === 'home' ? 
	            	<div className='start'>
		        		<Start onStart={onStart} />
		        	</div>
		        	: 
		        	<div className='explore'>
		        		<Explore />
		        	</div>
	        	}
	            <Footer />
	        </div>
        </MuiThemeProvider>
    )
}

export default App;