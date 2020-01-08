import React, { Component } from 'react';
import '../App.css';
import DatePicker from 'react-datepicker';
import Slider from 'react-input-slider';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import flightData from '../data/flights.json';
import "react-datepicker/dist/react-datepicker.css";
import 'react-tabs/style/react-tabs.css';
import Flights from './Flights';


const AppHeader =  {
  backgroundColor: '#222',
  color: 'white',
  display: 'flex',
  height: '55px',
  padding: '0 24px',
  position: 'relative'
}
const Container = {
  position: 'relative',
  width: '100%',
  maxWidth: '960px',
  margin: '0 auto',
  padding: '0 20px',
  boxSizing: 'border-box',
  display: 'flex' 
}
const Navigation = {
   
    justifyContent:'space-between',
    margin: '20px',
    paddingLeft: '30px'
}
const SearchCss = {
  display: 'flex',
  justifyContent: 'space-between',
  border: '1px solid #ccc',
  padding: '10px',
}
const RefineCss = {
	float:'left',
	border:'1px solid #ccc',
	marginTop:'10px',
	padding: '10px',
	width:'-webkit-fill-available'

}

 const LeftColumn =  { width: '30%', marginTop:'25px' }
 const RightColumn ={ width: '67%', marginTop:'5px' }

class Index extends Component {
	constructor(props) {
      super(props);
      this.state = {
	        source: '',
	        destination: '',
	        departureDate: '',
	        arrivalDate: '',
	        fareAmount:5000,
	        passengerCount: '',
	        selectedTab:'',
	        flightData: flightData,
	        filteredData:flightData
    	};

    	//this.handleOriginCity = this.handleOriginCity.bind(this);
    	//this.handleDestinationCity = this.handleDestinationCity.bind(this);
    	//this.handleSliderValue = this.handleSliderValue.bind(this);
    	//this.handleDepartureDate = this.handleDepartureDate.bind(this);
    	 this.handleSelect = this.handleSelect.bind(this);
    }

	handleSliderValue = (value) => { 
		
		this.setState({ fareAmount:value.x});

		 const objToMatch = {
	      source: this.state.source,
	      destination: this.state.destination
	    };

	    let filteredData = this.filterMatchingData(this.state.flightData, objToMatch);
	    filteredData = filteredData.filter( (obj) => {
				return obj.fare.slice(2) < value.x
		});

	    this.setState({
	        filteredData: filteredData
	    });

		
	}

	handleOriginCity = (e) => {
		 const objToMatch = {
	        source: e.target.value
	      };

	      const filteredData = this.filterMatchingData(this.state.flightData, objToMatch);
	      if( filteredData.length !== 0 ) {
	        this.setState({
	          source: e.target.value,
	          filteredData: filteredData
	        });
	      }
	}
	
	handleDestinationCity = (e) => {
		  const destCity = e.target.value ? e.target.value : "";
	      const objToMatch = {
	        source: this.state.source,
	        destination: destCity
	      };

	      const filteredData = this.filterMatchingData(this.state.flightData, objToMatch);

	      if( filteredData.length !== 0) {
	        this.setState({
	          destination: e.target.value,
	          filteredData: filteredData
	        });
	      }
	}

	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state)
		console.log('already filtered')
			
	}

	handleDepartureDate = (date) => {
		
		let today = new Date(date);
		let pDate = today.getTime();
		//let fullDate = today.getDate() + '/' + (today.getMonth() + 1 )+ '/'+ today.getFullYear();
		this.setState({ departureDate: today });

	     const filteredData =  this.state.flightData.filter( (obj) => {
	      		let dep_date = new Date(obj.departure_date);
	      		let dDate = dep_date.getTime();
	      		return pDate === dDate;

	      } )
		  
		  if( filteredData.length !== 0) {
	        this.setState({
	          departureDate: today,
	          filteredData: filteredData
	        });
	      }
	    
	}


  filterMatchingData(arrObj, matchingObj) {
      return arrObj.filter(function (entry) {
          return Object.keys(matchingObj).every(function (key) {
              return (entry[key].toUpperCase().indexOf(matchingObj[key].toUpperCase()) === 0);
          });
      });
  }

 handleSelect(index, last) {
    this.setState({
      selectedTab: index
    });
  }

	render() {
		let sourceCity = this.state.source ? this.state.source : "";
	    let destinationCity = this.state.destination ? this.state.destination : "";
	    let headerElem = "";
	    let departureDate = this.state.departureDate ? "Depart Date: "+this.state.departureDate.toString().slice(4, 15) : "";

	    if(!!sourceCity && !!destinationCity) {
	       headerElem =
	          <div>
	            <h5> {this.state.source.toUpperCase()} > {this.state.destination.toUpperCase()} </h5>
	          </div>
	    }

		return (<div className="App">
			        <div style={AppHeader}>
			          <h2>Flight Search Engine</h2>
			        </div>

			        <div style={Container}>
			          <div style={LeftColumn}>
 <Tabs onSelect={this.handleSelect}>
                <TabList>
                  <Tab>One Way</Tab>
               
                </TabList>
						<TabPanel>
			              <div style={SearchCss}>
		                    <form  onSubmit={this.handleSubmit} >
		                        <div className="form-group">
		                        	<input type="text"  className="form-control" name="source" value={this.state.source}  onChange={this.handleOriginCity} placeholder=" Source City" />
		                        </div>
		                        <div className="form-group">
		                        	<input type="text"  className="form-control"  name="destination"  value={this.state.destination} onChange={this.handleDestinationCity} placeholder="Destination City"/>
		                        </div>
		                        <div className="form-group">
		                        	<DatePicker  className="form-control"
		                            selected={this.state.departureDate}
		                            placeholderText="Departure Date"

		                            onChange={this.handleDepartureDate}
		                                 />
		                         </div>
		                         <div className="form-group">
		                        <input  className="form-control" type="text" value={this.state.passengerCount} placeholder="Passengers"/>
		                        </div>

		                      <input type="submit"  className="btn btn-primary" value="Search" />
		                    </form>
		                  </div>
		                </TabPanel>
</Tabs>
		                  <div>
			                <div style={RefineCss}>
			                  <h5>Refine Flight Search</h5>
			                  <div>{'Rs. ' + this.state.fareAmount}</div>
			                 	<Slider 
							        axis="x"
							        xstep={500}
							        xmin={0}
							        xmax={20000}
							        x={this.state.fareAmount} 
							        onChange={this.handleSliderValue} />
			                </div>
			              </div>


			          </div>
			          <div style={RightColumn}>
			          		<div style={Navigation}> {departureDate} {headerElem}</div>
			  		      <Flights  flights={this.state.filteredData}/>
			          </div>
			        </div>

			    </div> )

	}

}

export default Index