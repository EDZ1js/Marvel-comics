import React, {Component} from 'react';
import { TextField , Button , Typography , Snackbar } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MuiAlert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';
import './Explore.css';



class Explore extends Component {
	constructor() {
		super()
		this.state = { /* we keep the example in the character state so that it renders Spider-Man
			automatically and then change it when the user searches for another */
			character : { 
				name: 'Spider-Man',
				description: 'Bitten by a radioactive spider, high school student Peter Parker '+
					'gained the speed, strength and powers of a spider. Adopting the name Spider-Man, '+
					'Peter hoped to start a career using his new abilities.'+
					'Taught that with great power comes great responsibility,'+
					' Spidey has vowed to use his powers to help people.',
				imgUrl: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg'
			},
			suggestions: [], // suggestions start as empty array
			searchfield: '', // the searchfield starts as an empty string.
			apiKey: '1b33aae1c94e204e36b497ddc773f761',
			open: false //If there's an error with the results, this will change to open 
						//and a Snackbar will appear at the bottom and stay there for 4 seconds.
		}
	}

// this changes the searchfield state depending on what the user types then comes a callback function
onSearchChange = (event) => {
	const { apiKey } = this.state;
	this.setState({searchfield: event.target.value} , () => { 
		const { searchfield } = this.state;
/*since the API that we're getting the data from has a rate limit, we'll start making requests for
suggestions when searchfield changes while the range of the characters is 3-8 */
		if (searchfield.length >=3 && searchfield.length <=8) {	
			fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchfield}&apikey=${apiKey}`)
			.then(response => response.json())
			.then(data => {
				this.setState({suggestions: data.data.results})
			})
			.catch(err => console.log(err))
		} else if (searchfield === '') { //when searhfield is empty, get rid of the suggestions.
			this.setState({suggestions: []})
		}
	})
};


// this function gets called when an option is selected from the Autocomplete options or user clicks the button
fetchData = () => { 
	const { searchfield , apiKey, hash} = this.state;
	fetch(`https://gateway.marvel.com/v1/public/characters?name=${searchfield}&apikey=${apiKey}`)
		.then(response => response.json()).then(data => {
			this.setState({character: {
				name : data.data.results[0].name,
				description : data.data.results[0].description,
				imgUrl: data.data.results[0].thumbnail.path+'.jpg'
			}})
	}).catch(err => this.noResult()); /* if there's no results, it won't find a name
		 so this will catch this 'error' and display an error Snackbar */
}

onOptionSelect = (event , value) => {
	/* when you press 'x', there's no option selected anymore so the value is null
in the case where value is not null => (it exists), we'll update the searchfield with the option selected
and then directly fetch that character */
	if (value) { 
		this.setState({searchfield: value.name}, () => {
			this.fetchData();
		})
	} else { // when 'x' is pressed, we clear out the suggestions.
		this.setState({suggestions: []});
	}
}

noResult = () => {
	this.setState({open: true})
}

// this function gets called every time the snackbar exits (4 seconds after it appears)
handleClose = (event, reason) => { 
    if (reason === 'clickaway') { //if u don't want the user to be able to remove the Snackbar by clicking away
      return;
    }
    this.setState({open: false})
};


	render() {
		const { character , suggestions , searchfield , open } = this.state;

		return (
			<div className='box'>
				<div className='info'>
					<img src={character.imgUrl} alt=''
					 	 width='200px' height='150px'/>
					<Typography variant="h4" color='textPrimary' style={{fontFamily:'Algerian'}}>
	        			{character.name}
	     			</Typography> 	 
				</div>
				<Typography variant="h6" color="textSecondary" 
				style={{padding: '1.2rem',fontFamily:'Consolas',lineHeight:'1.3'}}>
					{character.description}
				</Typography>
				<div className='bottom'>
					<Autocomplete 
						autoSelect={true}
						autoHighlight={true}
						id="combo-box-demo" 
						options={suggestions} 
						getOptionLabel={option => option.name}
						clearOnEscape={true}
						style={{width:250,color:'#F7F7F7'}}
						onChange={this.onOptionSelect}
						renderInput={params => <TextField {...params}
								value={searchfield}
						        label="Search characters"
						        placeholder="Example: Spider-Man"
						        id="filled-size-small"
						        variant="filled"
						        size="small"
						        color="secondary"
						        onChange={this.onSearchChange} //when the input changes it updates the searchfield state
						    				   />}
					/>
					<Button variant="contained" 
					 		color="secondary" 
					 		endIcon={<SearchIcon />} 
					 		style={{marginLeft:'10px',marginTop:'5px'}}
					 		onClick={() => this.fetchData()}> Search	        			
	      			</Button>
      			</div>
      			<Snackbar anchorOrigin={{vertical: 'bottom',horizontal:'left'}} open={open} 
      					  autoHideDuration={4000} onClose={this.handleClose} >
			        <MuiAlert severity="error" elevation={15} variant="filled" onClose={this.handleClose}>
			          There's no result found!
			        </MuiAlert>
      			</Snackbar>	
			</div>
		);
	}
}

export default Explore;