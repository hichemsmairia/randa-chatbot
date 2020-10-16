import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../_actions/authActions";
import '../Sections/section.css'
import { Button, Icon } from 'antd';




class Deconnection extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
    const { user } = this.props.auth;
return (
      <div style={{paddingTop:"10px"}} >
        
  <Button type="primary"            
              onClick={this.onLogoutClick} 
              style={{float:"right" }}     >
               <i class="fa fa-fw fa-user"></i>
                se deconnecter : 
               {user.name.split(" ")[0]}
              </Button>
              </div>
      
    );
  }
}
Deconnection.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Deconnection);