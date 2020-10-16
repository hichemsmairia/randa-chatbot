import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../_actions/authActions";
import classnames from "classnames";
import ParticlesBg from 'particles-bg'

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      lat: 0 ,
     lng : 0
    }
    
    this.randa=this.randa.bind(this)   
  }


  randa = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({lat:position.coords.latitude});
      this.setState({lng:position.coords.longitude});
console.log(position)
    });
  }
  

  componentDidMount() {

    
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    this.randa()
  };



  
onSubmit = e => {
    e.preventDefault();

   
    
const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
     lat:this.state.lat,
     lng:this.state.lng
       
    };
this.props.registerUser(newUser, this.props.history); 
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
      
        <img src=""></img>
        <h2>Créer un compte </h2>
        

        <form noValidate onSubmit={this.onSubmit} id="form-login" >
          <div class="form-element form-stack">
            <label for="username-login" class="form-label">Nom d'utilisateur</label>
            <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name 
                  })}
                />

    <div className="error">
                  {errors.name}
                                 </div> 
          </div>
          <div class="form-element form-stack">
            <label for="password-login" class="form-label">Addresse e-mail </label>
            <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
    
    
     <div className="error">
                  {errors.email}
                  
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

<div className="error">  {errors.password2}</div>

          
          </div>
          <div class="form-element form-stack">
            <label for="password-login" class="form-label"> Confimez votre mot de passe  </label>
            <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2 || errors.passwordincorrect
                  })}
                />
<div className="error">{errors.password2}</div>

          <div class="form-element form-submit">
            <button id="logIn" type="submit" class="login" onClick="submit" name="login">Se connecter </button>
            
          </div>
          </div>
        </form>
        <div >
        <Link to="/login" style={{"font-size":"12px"}} name="login">Deja un membre ? connectez vous dés maintenant </Link>
      </div>
      <a href="/auth/google" class="button">
          <div>
            <span class="svgIcon t-popup-svg">
              <svg
                class="svgIcon-use"
                width="25"
                height="37"
                viewBox="0 0 25 25"
              >
                <g fill="none" fill-rule="evenodd">
                  <path
                    d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                    fill="#34A853"
                  />
                  <path
                    d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                    fill="#EA4335"
                  />
                </g>
              </svg>
       </span>
     <span class="button-label">Se connecter avec vote compte Google</span>
   </div>
</a>
      </div>
    </div>
    
  </div>
</div>



</div>
  
      
      
            
         
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
