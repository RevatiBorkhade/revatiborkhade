import React, { useState, useEffect } from 'react';
import '../home/home.css';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import Typewriter from './type-writer';


const ParallaxDiv = ({my_profile}) => {
  const [background, setBackground] = useState(0);

  function scroll(elementId) {
    var ele = document.getElementById(elementId);
    ele.scrollIntoView({
      behavior: 'smooth'
    });;
  }

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setBackground(window.scrollY*-0.2);
        } else {
            setBackground(0);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  return (
    <div className="Intro" style={{position:'relative'}}>
                    <img className='intro_image' style={{transform: `translateY(${background}px)`}} src="assets/bg.jpg" alt="" />
                    <div style={{position:'relative',zIndex:'1', width: '100vw', height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h1 className="title_introduction"> <span className='Hi_This_is'>Hi, this is</span> <br />Revati Borkhade</h1>
                        <Typewriter sentences={my_profile} />
                    </div>
                    <div style={{position:'relative',zIndex:'1'}}>
                        <h2>
                            <button onClick={(e)=>{scroll("AboutMe")}} style={{ background: 'transparent', border: 'none' }}><ArrowCircleDownIcon style={{fontSize:'50px'}} /> Know More About Me.</button>
                        </h2>
                    </div>
                </div> 
  );
};

export default ParallaxDiv;
