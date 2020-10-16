import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Deconnection from '../../Chatbot/Sections/Deconnection'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MenuIcon from '@material-ui/icons/Menu';
import './Navbar.css'



class Navbar extends React.Component  {
 
  render () {
    const { user } = this.props.auth;

    return (

<div class="navbar" >
  <a  href="/"><i class="fa fa-fw fa-home"></i> Home</a>
  <a href="#"><i class="fa fa-fw fa-facebook"></i> Facebook </a>
  <a href="#"><i class="fa fa-fw fa-instagram"></i> Instagram</a>
      <Deconnection />
 </div>
     
    

    )
  }

 
}

Navbar.propTypes = {
 
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ // function name = () => {} // chnuwa bech nhz  store bdhabt (m state mta3 store)
  auth: state.auth

});

export default connect(mapStateToProps)(Navbar);



