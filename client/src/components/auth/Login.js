import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../_actions/authActions";
import classnames from "classnames";
import ParticlesBg from 'particles-bg'
import './Login.scss'
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }


  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); 
    }
if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const userData = {
      email: this.state.email,
      password: this.state.password
    };
this.props.loginUser(userData); 
  };
render() {
    const { errors } = this.state;
return (


<div>
<div id="back">
  <canvas id="canvas" class="canvas-back"></canvas>
  <div class="backRight">    
  </div>
  <div class="backLeft">
  </div>
</div>
<ParticlesBg type="thick" bg={true} />

<div id="slideBox">
  <div class="topLayer">
    <div class="left">
     
    </div>
    <div class="right">
      <div class="content">
      
      <img 
      src="https://www.pharma-shop.tn/themes/default-bootstrap/img/logo.png"
      alt="new"
      style={{width:"420px",height:"120px"}}
      />
      
       
        <h2>Se connecter</h2>
        

        <form noValidate onSubmit={this.onSubmit} id="form-login" >
          <div class="form-element form-stack">
            <label for="username-login" class="form-label">Addresse E-mail</label>
            <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <div className="error">
                  {errors.email}
                  {errors.emailnotfound}
                </div>
          </div>
          <div class="form-element form-stack">
            <label for="password-login" class="form-label">Mot de passe </label>
            <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <div className="error">
                  {errors.password}
                  {errors.passwordincorrect}
                </div>
          </div>
          <div class="form-element form-submit">
            <button id="logIn" type="submit" class="login" onClick="submit" name="login">Se connecter </button>
            
          </div>
        </form>
        <div >
        <Link to="/register" style={{"font-size":"12px"}}  name="login">Pas un membre ? Créer un compte maintenant </Link>
        
      </div>
      </div>
    </div>
  </div>
</div>



</div>
  
      
      
            
         
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);