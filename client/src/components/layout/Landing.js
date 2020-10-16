import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Landing.css'
import YouTube from 'react-youtube';




// Made by Yago Estévez (Twitter: @yagoestevez.com)


/***********************
  Menu Component
 ***********************/
const opts = {
  height: '190',
  width: '440',
  playerVars: {
    autoplay: 1,
  },
};
const Menu = props => {
  return (
    <div className={`menu-container ${props.showMenu}`}>
      <div className="overlay" />
      <div className="menu-items">
        <ul>
        <li>
            <a href="#welcome-section" onClick={props.toggleMenu}>
              se connectez / créer un compte
            </a>
          </li>
          <li>

            
            <a href="#about" onClick={props.toggleMenu}>
              A propos
            </a>
          </li>
          
          <li>
            <a href="#contact" onClick={props.toggleMenu}>
              Contacter Nous
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};


/***********************
  Nav Component
 ***********************/

const Nav = props => {
  return (
    <React.Fragment>
      <nav id="navbar">
        <div className="nav-wrapper">
          <Link onClick={()=>window.location.reload()} to="/">
          <p className="brand">
            PharmaShop 
  <strong>{"     "}  ChatBot</strong>
          </p>
          </Link>
          <a
            onClick={props.toggleMenu}
            className={props.showMenu === 'active' ? 'menu-button active' : 'menu-button'}
          >
            <span />
          </a>
        </div>
      </nav>
    </React.Fragment>
  );
};



/***********************
  Header Component
 ***********************/

const Header = props => {
  return (
    <header id="welcome-section">
      <div className="forest" />
      <div className="silhouette" />
      <div className="moon" />
      <div className="container">
        <h1>
          <span className="line">PharmaShop</span>
          <span className="line"> </span>
          <span className="line">
            <span className="color">+++</span> ChatBot
            <span className="color">+++</span>
          </span>
        </h1>
        <div className="buttons">
          <Link to="/login">Se connecter</Link>
          <Link to="/register">Creer un compte</Link>
        </div>
        <br/>
        <br/>
        <br/>
        <YouTube videoId="VGKh1mmaoYg" opts={opts}  />
      </div>

      
    </header>
  );
};


/***********************
  About Component
 ***********************/

const About = props => {
  return (
    <section id="about">
      <div className="wrapper">
        <article>
          <div className="title">
            <h3>Who's this guy?</h3>
            <p className="separator" />
          </div>
          <div className="desc full">
            <h4 className="subtitle">bla bla bla bla </h4>
            <p>
              I am a web developer and UX designer based in the beautiful west coast of Spain,
              Galicia.
            </p>
            <p>
              I really enjoy solving problems as well as making things pretty and easy to use. I
              can't stop learning new things; the more, the better. I also love photography, a hobby
              I'm taking along since the good old film cameras. Oh, and rice with milk; I have a
              passion for rice with milk!
            </p>
          </div>
          
        </article>
      </div>
    </section>
  );
};




const Contact = props => {
  return (
    <section id="contact">
      <div className="container">
        <div className="heading-wrapper">
          <div className="heading">
            <p className="title">
              Want to <br />
              contact me?
            </p>
            <p className="separator" />
            <p className="subtitle">
              Please, use the form below or send an email to {''}
              <span className="mail">
                web
                <i className="fas fa-at at" />
                yagoestevez
                <i className="fas fa-circle dot" />
                com
              </span>
              :
            </p>
          </div>
        </div>
        <form id="contact-form" action="#">
          <input placeholder="Name" name="name" type="text" required />
          <input placeholder="Email" name="email" type="email" required />
          <textarea placeholder="Message" type="text" name="message" />
          <input className="button" id="submit" value="Submit" type="submit" />
        </form>
      </div>
    </section>
  );
};



/***********************
  Footer Component
 ***********************/

const Footer = props => {
  return (
    <footer>
      <div className="wrapper">
        <h3>Merci pour votre visite</h3>
        <p>© {new Date().getFullYear()} PharmaShop-ChatBot </p>
      </div>
    </footer>
  );
};




/***********************
  Social Links Component
 ***********************/





/***********************
  Main Component
 ***********************/

class Landing extends React.Component {
  state = {
    menuState: false
  };

  toggleMenu = () => {
    this.setState(state => ({
      menuState: !state.menuState
        ? 'active'
        : state.menuState === 'deactive'
          ? 'active'
          : 'deactive'
    }));
  };

  render() {
    return (
      <React.Fragment>
        <Menu toggleMenu={this.toggleMenu} showMenu={this.state.menuState} />
        <Nav toggleMenu={this.toggleMenu} showMenu={this.state.menuState} />
        <Header />
        <About />
        
        <Contact />
        <Footer />
      </React.Fragment>
    );
  }

  componentDidMount() {
    const navbar = document.querySelector('#navbar');
    const header = document.querySelector('#welcome-section');
    const forest = document.querySelector('.forest');
    const silhouette = document.querySelector('.silhouette');
    let forestInitPos = -300;

    window.onscroll = () => {
      let scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

      if (scrollPos <= window.innerHeight) {
        silhouette.style.bottom = `${parseInt(scrollPos / 6)}px`;
        forest.style.bottom = `${parseInt(forestInitPos + scrollPos / 6)}px`;
      }

      if (scrollPos - 100 <= window.innerHeight)
        header.style.visibility = header.style.visibility === 'hidden' && 'visible';
      else header.style.visibility = 'hidden';

      if (scrollPos + 100 >= window.innerHeight) navbar.classList.add('bg-active');
      else navbar.classList.remove('bg-active');
    };

    (function navSmoothScrolling() {
      const internalLinks = document.querySelectorAll('a[href^="#"]');
      for (let i in internalLinks) {
        if (internalLinks.hasOwnProperty(i)) {
          internalLinks[i].addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(internalLinks[i].hash).scrollIntoView({
              block: 'start',
              behavior: 'smooth'
            });
          });
        }
      }
    })();
  }
}

export default Landing ; 
