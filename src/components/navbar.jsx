import React, {useState, useEffect} from 'react';
import { Navbar, Nav, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Make sure you have react-router-dom installed
import "./navbar.css"
function scroll(elementId) {
  var ele = document.getElementById(elementId);
  ele.scrollIntoView({
    behavior: 'smooth'
  });;
}
const NavigationBar = ({ResumeLink}) => {
  const [background, setBackground] = useState(0);
  const [collapsestate, setCollapsestate] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const handleScroll = () => {
        if (window.scrollY > 0) {
            setBackground(window.scrollY*0.003);
        } else {
            setBackground(0);
        }
        const ids= ["AboutMe","Education","Experience","Publications","Projects","Footer"]
        for(var i=0;i<6;i++){
          if(isVisible(ids[i])){
            var item = document.getElementById(i)
            item.classList.add("active");
            for(var j=0;j<6;j++){
              if(j!==i){
                var item = document.getElementById(j)
                item.classList.remove("active");
              }
            }
          }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggle = () => {
      setCollapsestate((prevExpanded) => !prevExpanded);
    };

     const isVisible = (id) => {
      const el = document.getElementById(id);
      if (!el) return false;
    
      const rect = el.getBoundingClientRect();
      const vWidth = window.innerWidth || document.documentElement.clientWidth;
      const vHeight = window.innerHeight || document.documentElement.clientHeight;
      const efp = function (x, y) {
        return document.elementFromPoint(x, y);
      };
    
      // Return false if it's not in the viewport
      if (rect.right < 0 || rect.bottom < 0 || rect.left > vWidth || rect.top > vHeight) {
        return false;
      }
    
      // Return true if any of its four corners are visible
      return (
        el.contains(efp(rect.left, rect.top)) ||
        el.contains(efp(rect.right, rect.top)) ||
        el.contains(efp(rect.right, rect.bottom)) ||
        el.contains(efp(rect.left, rect.bottom))
      );
    };

  return (
    <Navbar expanded={collapsestate} expand='lg' fixed="top"  style={isMobile? (collapsestate?{backgroundColor:'black'}:{backgroundColor:"transparent"}):{backgroundColor:`rgb(0,0,0,${background})`}}>
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={(e)=>toggle()} />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className='page-links' >
          <Nav.Link id = "0" onClick={(e) => { e.preventDefault(); scroll('AboutMe');toggle()}}>About Me</Nav.Link>
          <Nav.Link id = "1" onClick={(e) => { e.preventDefault(); scroll('Education');toggle()}}>Education</Nav.Link>
          <Nav.Link id = "2" onClick={(e) => { e.preventDefault(); scroll('Experience');toggle()}}>Experience</Nav.Link>
          <Nav.Link id = "3" onClick={(e) => { e.preventDefault(); scroll('Publications');toggle()}}>Publications</Nav.Link>
          <Nav.Link id = "4" onClick={(e) => { e.preventDefault(); scroll('Projects');toggle()}}>Projects</Nav.Link>
          <Nav.Link id = "5" onClick={(e) => { e.preventDefault(); scroll('Contact_Me');toggle()}}>Contact Me</Nav.Link>
          <a style={{textDecoration:'none', color:'white', padding:'0.5rem 1rem'}} href={ResumeLink} target='_blank'><p>Download Resume &darr;</p></a>
          <Nav.Link className='mob' as={Link} to="http://www.linkedin.com/in/revatiborkhade"><img src="assets/linkedin.svg" alt="" style={{width:'40px'}}/></Nav.Link>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;