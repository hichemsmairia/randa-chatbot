import Axios from 'axios';
import React, { setState,Component } from 'react';
import { render } from 'react-dom';
import Map from './Map';

const data = [
  { lat: 33.8439408, lng: 9.400138 }, 
  { lat: 33.8439408, lng: 9.400138 },
  { lat: 33.8439408, lng: 9.400138 },
  { lat: 33.8439408, lng: 9.400138 },
  { lat: 33.8439408, lng: 9.400138 }, 
  { lat: 33.8439408, lng: 9.400138 },
  { lat: 33.8439408, lng: 9.400138 },
  { lat: 33.8439408, lng: 9.400138 },
  { lat: 33.8439408, lng: 9.400138 }, 
  { lat: 33.8439408, lng: 9.400138 },
  { lat: 33.8439408, lng: 9.400138 },  
  { lat: 33.8439408, lng: 9.400138 }
];
class HeatMap extends React.Component {

    constructor() {
        super();
        this.state = {
         data: []
        };
    }
    componentWillMount() {
        Axios.get('/api/dialogflow/users_repartition').then(result=>{
            this.setState({ data: result.data});
            console.log(this.state.data)
            console.log(data)
           
        })  }

    render() {                                    // changing data to this.state.data
        return (
                  
<Map center={{ lat: 33.8439408, lng: 9.400138 }} zoom={6} positions={data} /> 


)
    }
}

export default HeatMap ;