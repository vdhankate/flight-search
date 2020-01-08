import React from 'react';
import Flight from './Flight';

const FlightsCss =  {
  margin: '0',
  padding: '0',
  listStyle: 'none',
  marginBottom: '20px',
}

const NoFlightCss = {
	border:'1px solid #CCC',
	height:'150px',
	marginLeft:'50px'
}
const LableCss = {
	padding:'10px'
}

const  Flights = ({ flights }) => {
  let length = flights.length;
  if(length > 0) {
    return (
      <ul>
        {flights.map( (flight) => {
        	
	         return <li style={FlightsCss} key={flight.flight_id} >
	            <Flight item={flight} />
	          </li>
          	}
        )}
      </ul>
    );
  } else {
    return (
      <div style={NoFlightCss}>
        <div style={LableCss}>
        	<h5>Oops!!! No flights found.</h5>
        </div>
      </div>
    );
  }

}

export default Flights;