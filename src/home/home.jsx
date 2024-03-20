import React, { useState, useContext,useRef, useEffect } from "react";
import "./home.css";
import NavigationBar from "../components/navbar";
import Typewriter from './../components/type-writer';
import { Row, Col, Form, Button,Carousel } from "react-bootstrap";
import Preloader from "../components/preloader";

const Home = () => {
    const [isloaded, setisloaded] = useState(false);
    const [my_profile, setmy_profile] = useState([]);
    const [projects, setprojects] = useState([]);
    const [experience, setexperience] = useState([]);
    const [education, seteducatione] = useState([]);
    const [publications, setpublications] = useState([]);
    const [selectedJob, setSelectedJob] = useState([]);
    const [mailSent, setmailSent] = useState(false)
    const [exp, setexp] = useState("")
    const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % 3); // Assuming you have 3 slides
    }, 6000); // Change the duration according to your preference

    return () => clearInterval(intervalId);
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  
  function getTotalTime(experience) {
    let totalTime = 0;
    // Iterate through each sub-array
    experience.forEach((item) => {
        // Parse the time string from the second element of each sub-array
        const timeString = item.Years.trim();
        // Split the string by space to get individual time components
        const timeComponents = timeString.split(' ');
        // Iterate through each time component and add to total time based on its unit
        timeComponents.forEach((component) => {
            if (component === 'yr' || component === 'yrs') {
                totalTime += parseInt(timeComponents[timeComponents.indexOf(component) - 1], 10) * 12;
            } else if (component === 'months' || component === 'month'|| component === 'Month'|| component === 'Months') {
                totalTime += parseInt(timeComponents[timeComponents.indexOf(component) - 1], 10);
            }
        });
    });
    const years = Math.floor(totalTime / 12);
    const months = totalTime % 12;
    var srt=""; 
    if(months ===1){
        srt = " month"
    }else{srt = " months"} 
    setexp(years +" Years "+months+srt);
}

    function scroll(elementId) {
        var ele = document.getElementById(elementId);
        ele.scrollIntoView({
          behavior: 'smooth'
        });;
      }
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://script.google.com/macros/s/AKfycby9Tec1ujI2yJOtbk6RDoiUrxuJExkSbKG6TJWRuPchM-E4dEbFKWMyI45RUCa7cf8/exec');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            try {
                var myprofile = JSON.parse(responseData["my_profile"]);
                var profilelist = myprofile.flat().filter(Boolean);
                var myprofile = profilelist
            } catch (error) {
                myprofile =[]
            }
            
            try {
                var projects = JSON.parse(responseData["projects"]);
                var projects = projects.filter(function(item) {
                    return item.some(function(value) {
                        return value !== '';
                    });
                });
                var processedData = projects.map(function(item) {
                    return {
                        title: item[0],
                        desc: item[1] && item[1].trim() ? JSON.parse(item[1]) : [],
                        skills: item[2] && item[2].trim() ? JSON.parse(item[2]) : []
                    };
                });
                var projects = processedData
            } catch (error) {
                console.log(error)
                projects =[]
            }
            
            try {
                var experience = JSON.parse(responseData["experience"]);
                var experience = experience.filter(function(item) {
                    return item.some(function(value) {
                        return value !== '';
                    });
                });
                var processedData = experience.map(function(item) {
                    return {
                                "id": item[0],
                                "company":item[1],
                                "Years": item[2],
                                "position":item[3],
                                "tech_Stack":JSON.parse(item[4]),
                                "JobDesc":JSON.parse(item[5]),
                                "logo":item[6]
                            };
                });
                var experience = processedData
            } catch (error) {
                experience =[]
            }
            
            setSelectedJob(experience[0])
            try {
                var education = JSON.parse(responseData["education"]);
                var education = education.filter(function(item) {
                    return item.some(function(value) {
                        return value !== '';
                    });
                });
            } catch (error) {
                education =[]
            }

            try {
                var publications = JSON.parse(responseData["publications"]);
                var publications = publications.filter(function(item) {
                    return item.some(function(value) {
                        return value !== '';
                    });
                });
            } catch (error) {
                publications =[]
            }
            

            setmy_profile(myprofile);
            setprojects(projects);
            setexperience(experience);
            seteducatione(education);
            setpublications(publications);
            setisloaded(true)
            getTotalTime(experience);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        message: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async  (e) => {
        e.preventDefault();
        // Handle form submission here
        var data = {
            "name": formData.name,
            "email": formData.email,
            "subject":formData.subject,
            "message":formData.message
        }
        const response = await fetch('https://script.google.com/macros/s/AKfycbxn78Fg5vPq3kvb2DoHAtA6VyDbSea27wTUx8AF2bn2o05apkPZs1aEqj-YGM7qsh139g/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          setmailSent(true)
        // You can perform any further action like submitting data to backend etc.
    };

    while(!isloaded){
        return(
            <Preloader/>
            // <div>
            //     <h1>Loading</h1>
            // </div>
        )
    }

      return (
        <div className="app">
            <div className="navbar">
                <NavigationBar />
            </div>
            <div className="scrollable">
                <div className="maincontent">
                    <div className="topic_name AboutMe">
                        <div style={{height:"25vh"}}>
                            <h3 style={{textAlign:'center'}}>
                                Hi, My name is
                            </h3>
                            <h1>Revati Borkhade</h1>
                            <Typewriter sentences={my_profile} />
                        </div>
                        <Row>
                            <h2  id="AboutMe">About Me</h2>
                        </Row>
                        <Row>
                            <Col md={6} sm={12}>
                                <Row>
                                    <Col style={{height:'100%'}}>
                                        <div onClick={(e)=>{scroll("Experience")}} className="card_cust">
                                            <img src="assets/Experience.svg" style={{width:'50px'}} alt="" />
                                            <h6>Experience</h6>
                                            {/* <p>Full Time & Internship</p> */}
                                            <p>{exp}</p>
                                        </div>
                                    </Col>
                                    <Col style={{height:'100%'}}>
                                        <div onClick={(e)=>{scroll("Publication")}} className="card_cust" >
                                            <img src="assets/publication.svg" style={{width:'50px'}} alt="" />
                                            <h6>Publications</h6>
                                            <p> {publications.length} Journal Papers</p>
                                            {/* <p> Field: Deep Learning</p> */}
                                        </div>
                                    </Col>
                                    <Col style={{height:'100%'}}>
                                        <div onClick={(e)=>{scroll("Education")}} className="card_cust">
                                            <img src="assets/edu.svg" style={{width:'50px'}} alt="" />
                                            <h6>Education</h6>
                                            <p>MS Engineering Mangement</p>
                                            {/* <p>Automotive Engineering</p> */}
                                        </div>
                                    </Col>
                                </Row>
                                <p>
                                My name is Revati Borkhade, and I hold a Master of Science  degree in Engineering Management from the University of Massachusetts ad  a bachelor of Technology ,Automobile engineering from Manipal Institute of Technology. Growing up, I had a a great experience growing up on a ship in the early days , which instilled in me a profound appreciation for geography and the strategic significance of global locations. This early exposure ignited my fascination with the movement of goods, leading me down the path of supply chain management.
<br/>Building upon this foundation, my master's degree journey transformed me into a conscientious thinker, equipped with the insights and skills necessary to navigate the complexities of the managerial field. As a supply chain and logistics analyst at Volvo Construction Equipment, I found myself at the intersection of automobiles, supply chain management, and analytics—a dynamic crossroad that ignited my enthusiasm and fueled my ambition.
<br/>Now, armed with a wealth of experience and a burning desire to make a meaningful impact, I am poised to embark on the next chapter of my corporate journey. With a keen focus on sustainability and a relentless drive for excellence, I am ready to tackle the challenges of tomorrow head-on, shaping the future of the Logistics industry, one strategic decision at a time.
<br/>I am equipped with extensive experience and knowledge in logistics, coupled with hands-on expertise in optimization and analytics tools. My approach to decision-making is rooted in data-driven insights, enabling me to make impactful contributions to any team I join. I look forward to connecting with you!
                                </p>
                            </Col>
                            <Col style={{display: "flex", justifyContent:'center'}} md={6} sm={12}>
                                <img  className="image" src="assets/AboutMe.jpeg" alt="" />
                            </Col>
                        </Row>
                    </div>
                     <div className="topic_name Education" id="Education">
                        <Row>
                            <Col md={6} sm={12}>
                                <img className="image" src="assets/education.jpeg" alt="" />
                            </Col>
                            <Col md={6} sm={12}>
                                <h2 style={{width:'100%',textAlign:'left'}}>Education</h2>
                                {education.map((item, index) => (
                                    <div className="edu_card" key={index}>
                                        <Row>
                                            <Col md={2} sm={12}>
                                                <img src={item[5]} style={{width:'100%'}} alt="" />
                                            </Col>
                                            <Col md={10} sm={12}>
                                                <h6 style={{width:'100%', textAlign:'left'}}>{item[0] + " " + item[3]}</h6>
                                                <p>{item[4]}</p>
                                                <Row style={{margin:'0px'}}>
                                                    <Col style={{padding:'0px'}}>
                                                        <p>CCPA: {item[2]}</p>
                                                    </Col>
                                                    <Col style={{padding:'0px'}}>
                                                        <p>Year Of Passing: {item[1]}</p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                                                              
                                    </div>
                                ))}
                            </Col>
                        </Row>
                    </div> 
                    <div className="topic_name Experience" id="Experience">
                        <h2 style={{width:"100%"}}>Experience</h2>
                        <Row>
                        {experience.map((item, index) => (
                            selectedJob.id !== item.id &&(
                                <Col onClick={(e)=>{setSelectedJob(item)}} key={item.id}>
                                    <div className={selectedJob.id == item.id ? "ExpCard selected_now":"ExpCard"}>
                                        <img src={item.logo} style={{width:'100px', margin:'auto'}} alt="" />
                                        {selectedJob.id ===item.id &&(
                                            <div style={{display:'flex', width:'100%', height:'100%', alignItems:'center'}}>
                                                <h3 style={{width:'100%', textAlign:'center'}}>{item.company}</h3>
                                            </div>
                                        )}
                                    </div>
                                </Col>
                                )
                            ))}
                        </Row>
                        <Row className="exp_desc">
                                    <Row>
                                        <Col md={6}><img src={selectedJob.logo} style={{width:'100px'}} alt="" /></Col>
                                        <Col  md={6} style={{width:'fit-content'}}>
                                            <h3 style={{textAlign:'left',textWrap: 'nowrap'}}>{selectedJob.position}</h3>
                                            <h5 style={{textAlign:'left', textWrap: 'nowrap'}}>{selectedJob.company}</h5>
                                        </Col>
                                    </Row>
                                
                                
                                <Row style={{flexDirection:'row', width:'80%'}}>
                                    <Row style={{width:'100%', flexDirection:'column'}}>
                                        <h3 style={{width:'100%', textAlign:'left'}} >Impact</h3>
                                        {selectedJob.JobDesc.map((item,index)=>(
                                                    <p key={item.id} style={{textAlign:'left'}}>&bull;{item}</p>
                                            ))}
                                    </Row>
                                    <Row style={{width:'100%', marginTop:'10px'}}>
                                        <div style={{ display: 'inline-block' }}>
                                            <h3 style={{ display: 'inline', marginRight: '10px' }}>Skills:</h3>
                                            {selectedJob.tech_Stack.map((item, index) => (
                                                <p key={index} style={{ display: 'inline' }}>&bull;{item}&nbsp;</p>
                                            ))}
                                        </div>
                                    </Row>
                                </Row>
                            </Row>
                        

                    </div>
                    <div className="topic_name Publication" id="Publication">
                        <h2>Publications</h2>
                        {publications.map((item, index)=>(
                            <Row className="pubCard">
                                <Row md={9} sm={12}>
                                    <h3 style={{textAlign:'center', fontWeight:'400'}}>{item[0]}</h3>
                                    
                                </Row>
                                <Row style={{display:'flex',flexDirection:"row", width:'100%'}} md={3} sm={12}>
                                    <Col md={12} >
                                        <h4 style={{textAlign:'center', fontWeight:'400'}}>Published in {item[1]} &bull; {item[2]} &bull; <a style={{textDecoration:'underline'}} href={item[3]} target="_blank">View Paper</a> </h4>
                                    </Col>
                                    
                                
                                </Row>
                            </Row>
                        ))}
                    </div>
                    <div className="topic_name Projects" id="Projects">
                        <h2>Projects</h2>
                        <Row>
                            {projects.map((item, index)=>(
                                <Col md={6} sm={12} key={index}>
                                    <div className="proj_card">
                                        <h3>{item.title}</h3>
                                        {(item.desc).map((desc, index1)=>(
                                            <h4 style={{fontWeight:'400'}} key={index1+100}>&bull; {desc}</h4>
                                            ))}

                                        {item.skills && item.skills.length > 0 && (
                                            <div style={{ display: 'inline-block' }}>
                                                <h3 style={{ display: 'inline', marginRight: '10px' }}>Skills:</h3>
                                                {item.skills.map((skill, index2) => (
                                                        <h4 style={{ display: 'inline',fontWeight:'400' }} key={index2 + 100}>
                                                            {index2 !== 0 && <>&bull; </>}{skill}</h4>
                                                    ))}
                                            </div>
                                        )}
                                        
                                    </div>
                                </Col>
                                
                            ))}
                        </Row>
                    </div>
                    <div style={{height:'80vh', overflow:'clip'}}>
                        {/* <Carousel activeIndex={index} onSelect={handleSelect}>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://via.placeholder.com/800x400?text=First+Slide"
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>First slide label</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://via.placeholder.com/800x400?text=First+Slide"
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>Second slide label</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://via.placeholder.com/800x400?text=First+Slide"
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>Third slide label</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel> */}
                        <video controls autoPlay muted>
                            <source src="assets/vid.mp4" type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="topic_name Contact_Me" id="Contact_Me">
                        <h2>Contact Me</h2>
                        <Row>
                            <Col md={6}>
                                <Row style={{flexDirection:'column'}}>
                                <Row><h1>Revati Borkhade</h1></Row>
                                <Row>
                                    <Col md={6} sm ={12}>
                                        <p>
                                            Email<br/>
                                            <a href="mailto:revatiborkhade@gmail.com" style={{textDecoration:'underline'}}>revatiborkhade@gmail.com</a>

                                        </p>

                                        <h3 style={{width:'100%', textAlign:"left", marginTop:'5%'}}>Connect with me on</h3>
                                        <Row style={{width:'50%'}}>
                                        {/* <Col ><a style={{margin:'20% auto'}} href="https://www.facebook.com/team.acceleracers/"><img src="assets/fb_dark.svg" alt="" style={{width:'35px'}}/></a></Col> */}
                                        <Col ><a href="https://www.instagram.com/haveyoumetreva/"><img src="assets/insta.svg" alt="" style={{width:'40px'}}/></a></Col>
                                        <Col ><a href="http://www.linkedin.com/in/revatiborkhade"><img src="assets/linkedin.svg" alt="" style={{width:'40px'}}/></a></Col>
                                        </Row>
                                    </Col>
                                    <Col md={6} sm ={12}>
                                        <h6 style={{textAlign:'left'}}>Quick Links</h6>
                                        <ul style={{textAlign:'left'}}>
                                            <li><a className="nav_link" onClick={(e)=>{scroll("AboutMe")}}>About Me</a></li>
                                            <li><a className="nav_link" onClick={(e)=>{scroll("Education")}}>My Education</a></li>
                                            <li><a className="nav_link" onClick={(e)=>{scroll("Experience")}}>My Experience</a></li>
                                            <li><a className="nav_link" onClick={(e)=>{scroll("Publication")}}>My Publications</a></li>
                                            <li><a className="nav_link" onClick={(e)=>{scroll("Projects")}}>My Projects</a></li>
                                        </ul>
                                    </Col>
                                </Row>
                                </Row>

                            </Col>
                            <Col md ={6}>
                                {!mailSent &&(
                                    <Form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col md={6} sm={12}>
                                            <Form.Group controlId="formName">
                                                    <Form.Label style={{color:'var(--primary-light)', width:'100%', textAlign:"left"}}>Name:</Form.Label>
                                                    <Form.Control
                                                    type="text"
                                                    placeholder="Enter your name"
                                                    name="name"
                                                    value={formData.name}
                                                    required = {true}
                                                    onChange={handleChange}
                                                    />
                                                </Form.Group>
                                                </Col>
                                            <Col md={6} sm={12}>
                                            <Form.Group controlId="formEmail">
                                                <Form.Label style={{color:'var(--primary-light)', width:'100%', textAlign:"left"}}>Email:</Form.Label>
                                                <Form.Control
                                                type="email"
                                                placeholder="Enter your email"
                                                name="email"
                                                required = {true}
                                                value={formData.email}
                                                onChange={handleChange}
                                                />
                                            </Form.Group>
                                            </Col>
                                        </Row>
                                    
                                

                                    <Form.Group controlId="formSubject">
                                        <Form.Label style={{color:'var(--primary-light)', width:'100%', textAlign:"left"}}>Subject:</Form.Label>
                                        <Form.Control
                                        type="text"
                                        placeholder="Enter subject"
                                        name="subject"
                                        required = {true}
                                        value={formData.subject}
                                        onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formMessage">
                                        <Form.Label style={{color:'var(--primary-light)', width:'100%', textAlign:"left"}}>Message:</Form.Label>
                                        <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter your message"
                                        name="message"
                                        required = {true}
                                        value={formData.message}
                                        onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Button style={{marginTop:'10px'}} variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                                )}
                                {mailSent &&(
                                    <h1>Thank You For Contacting me.</h1>
                                )}
                            </Col>
                        </Row>
                        <Row><p>&copy; Revati Borkhade, all rights reserved</p></Row>
                    </div>
                </div>
            </div>
        </div>
      );
};

export default Home;