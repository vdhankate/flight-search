import React from 'react';

const Item =  {
  display: 'flex',
  justifyContent: 'space-between',
  border: '1px solid #ccc',
  padding: '10px',
  margin: '10px',
}

const FareCss = {
  textAlign: 'left',
  fontSize: '18px',
  color: '#000',
  marginBottom: '15px',
  fontWeight:'bold'
}
const flightNumberCss = {
	 fontSize: '12px',
}
const BoxCss = {
	border:'1px solid #000',
	height: '100px',
    marginBottom: '5px'
}

const Flight = ({ item }) => { 
  return (<div style={Item}>
		    <div className="Item-left">
		        <div style={FareCss}>{item.fare}</div>
		        <div style={flightNumberCss}>{item.flight_id}</div>
		        <div>{item.source_code} > {item.destination_code} </div>
		        <div>Depart: {item.departs_at}</div>
		        <div>Arrive: {item.arrives_at}</div>
		    </div>

		    <div>
		    	<div style={BoxCss}></div>
		      	<button className="btn btn-secondary" onClick={item.onClickHandler} type="submit">
		        	Book this flight
		      	</button>
		    </div>
  		</div>
)

}
export default Flight;