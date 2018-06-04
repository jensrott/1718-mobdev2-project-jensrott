import React, { Component } from 'react';


/* Not the most clean code but I tryed ;) */
class ProfileMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_address: [],
      destination_address: [],
      rows: [],
    };
  }

  componentDidMount() {
    const { start, end } = this.props; // The start and end location
    
    fetch(
      `/api/v1/profile/matrix/${start}/${end}` // Communicates with the backend, the parameters are the property of the component
    )
      .then(res => res.json())
      .then(data => {
        this.setState(
          {
            start_address: data.origin_addresses,
            destination_address: data.destination_addresses,
            rows: data.rows,
          }
        );
        console.log(data.origin_addresses)
        console.log(data.destination_addresses);
        console.log(data.rows);
      }).catch(err => console.log(err));
  }
  

  render() {
    const { start_address, destination_address, rows } = this.state;

    const startAddress = start_address.map((start, index) => (
      <div key={index}>
        <p>{start}</p>
      </div>
    ));

    const destinationAddress = destination_address.map((destination, index) => (
      <div key={index}>
        <p>{destination}</p>
      </div>
    ));
    console.log(distanceData);
    const distanceData = rows.map((data, index) => (
      <div key={index}>
      
        <p>{data.elements[index].distance.text}</p>
        
        {console.log(data.elements[index].distance.text)}
      </div>
    ));
  
    return (
      <div>
        {/* Here we will consume to google maps api to , distance between two points */}
        {distanceData}
        {startAddress}
        {destinationAddress}
        
        
      </div>
    );
  }
}

export default ProfileMaps;
