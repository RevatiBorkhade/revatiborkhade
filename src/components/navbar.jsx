import React from 'react';
import { Navbar, Nav, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Make sure you have react-router-dom installed
import "./navbar.css"
function scroll(elementId) {
  var ele = document.getElementById(elementId);
  ele.scrollIntoView({
    behavior: 'smooth'
  });;
}
const NavigationBar = () => {
  
  return (
    <Navbar expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className='page-links' >
          <Nav.Link onClick={(e) => { e.preventDefault(); scroll('AboutMe');}}>About Me</Nav.Link>
          <Nav.Link onClick={(e) => { e.preventDefault(); scroll('Education');}}>Education</Nav.Link>
          <Nav.Link onClick={(e) => { e.preventDefault(); scroll('Experience');}}>Experience</Nav.Link>
          <Nav.Link onClick={(e) => { e.preventDefault(); scroll('Publication');}}>Publications</Nav.Link>
          <Nav.Link onClick={(e) => { e.preventDefault(); scroll('Projects');}}>Projects</Nav.Link>
          <Nav.Link onClick={(e) => { e.preventDefault(); scroll('Contact_Me');}}>Contact Me</Nav.Link>
          {/* <Nav.Link as={Link} to="#Education">Education</Nav.Link>
          <Nav.Link as={Link} to="#Publications">Publications</Nav.Link>
          <Nav.Link as={Link} to="#Projects">Projects</Nav.Link>
          <Nav.Link as={Link} to="#Contact_Me">Contact Me</Nav.Link> */}
        </Nav>
        <div className='ext_links'>
          <Nav.Link className='mob' as={Link} to="https://www.instagram.com/haveyoumetreva/"><img src="assets/insta.svg" alt="" style={{width:'40px'}}/></Nav.Link>
          <Nav.Link className='mob' as={Link} to="http://www.linkedin.com/in/revatiborkhade"><img src="assets/linkedin.svg" alt="" style={{width:'40px'}}/></Nav.Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;