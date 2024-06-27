import React, { useState, useContext, useRef, useEffect } from "react";
import "./home.css";
import NavigationBar from "../components/navbar";
import Typewriter from '../components/type-writer';
import Preloader from "../components/preloader";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { Row, Col } from "react-bootstrap";
import Footer from '../components/footer';
import ParallaxDiv from '../components/intro';

const Home = () => {
    const [isloaded, setisloaded] = useState(false);
    const [my_profile, setmy_profile] = useState([]);
    const [projects, setprojects] = useState([]);
    const [experience, setexperience] = useState([]);
    const [education, seteducatione] = useState([]);
    const [publications, setpublications] = useState([]);
    const [selectedJob, setSelectedJob] = useState([]);
    const [about_me_description, setabout_me_description] = useState([]);
    const [images, setImages] = useState([])
    const [exp, setexp] = useState("")
    const [scrollYvalue, setscrollYvalue] = useState(0)

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
                } else if (component === 'months' || component === 'month' || component === 'Month' || component === 'Months') {
                    totalTime += parseInt(timeComponents[timeComponents.indexOf(component) - 1], 10);
                }
            });
        });
        const years = Math.floor(totalTime / 12);
        const months = totalTime % 12;
        var srt = "";
        if (months === 1) {
            srt = " month"
        } else { srt = " months" }
        setexp(years + " Years " + months + srt);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://script.google.com/macros/s/AKfycbxqYrDLOHjH9TDR9TqXnedMoKKl71pEP9gj6pFdpHnwTOUoNiWKt_snMmHGBeenvvP7/exec');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const responseData = await response.json();
                console.log(responseData);
                try {
                    var myprofile = JSON.parse(responseData["my_profile"]);
                    var profilelist = myprofile.flat().filter(Boolean);
                    var myprofile = profilelist
                } catch (error) {
                    myprofile = []
                }

                try {
                    var projects = JSON.parse(responseData["projects"]);
                    var projects = projects.filter(function (item) {
                        return item.some(function (value) {
                            return value !== '';
                        });
                    });
                    var processedData = projects.map(function (item) {
                        return {
                            title: item[0],
                            desc: item[1] && item[1].trim() ? JSON.parse(item[1]) : [],
                            skills: item[2] && item[2].trim() ? JSON.parse(item[2]) : [],
                            link: item[3]
                        };
                    });
                    var projects = processedData
                } catch (error) {
                    console.log(error)
                    projects = []
                }

                try {
                    var experience = JSON.parse(responseData["experience"]);
                    var experience = experience.filter(function (item) {
                        return item.some(function (value) {
                            return value !== '';
                        });
                    });
                    var processedData = experience.map(function (item) {
                        return {
                            "id": item[0],
                            "company": item[1],
                            "Years": item[2],
                            "position": item[3],
                            "tech_Stack": JSON.parse(item[4]),
                            "JobDesc": JSON.parse(item[5]),
                            "logo": item[6]
                        };
                    });
                    var experience = processedData
                } catch (error) {
                    experience = []
                }

                setSelectedJob(experience[0])
                try {
                    var education = JSON.parse(responseData["education"]);
                    var education = education.filter(function (item) {
                        return item.some(function (value) {
                            return value !== '';
                        });
                    });
                } catch (error) {
                    education = []
                }

                try {
                    var publications = JSON.parse(responseData["publications"]);
                    var publications = publications.filter(function (item) {
                        return item.some(function (value) {
                            return value !== '';
                        });
                    });
                } catch (error) {
                    publications = []
                }
                try {
                    var About_me_description = JSON.parse(responseData["About me description"]);
                    var About_me_description = About_me_description.filter(function (item) {
                        return item.some(function (value) {
                            return value !== '';
                        });
                    });
                } catch (error) {
                    About_me_description = []
                }
                try {
                    var images = JSON.parse(responseData["images"]);
                    var images = images.filter(function (item) {
                        return item.some(function (value) {
                            return value !== '';
                        });
                    });
                } catch (error) {
                    images = []
                }
                setImages(images);
                setabout_me_description(About_me_description);
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

    function scroll(elementId) {
        var ele = document.getElementById(elementId);
        ele.scrollIntoView({
          behavior: 'smooth'
        });;
      }

    while (!isloaded) {
        return (
            <Preloader />
        )
    }

    return (
        <div className="app">
                <NavigationBar ResumeLink={images[6]} />
                <ParallaxDiv my_profile={my_profile} />
                <div style={{zIndex:'1'}} className="AboutMe" id = "AboutMe">
                    <Row>
                        <Row>
                            <Col md={6} sm={12}><img  className="image" src={images[0]} alt="" /></Col>
                            <Col md={6} sm={12} style={{textAlign:'justify'}}>
                                <h1>About Me</h1>
                                {about_me_description.map((item, index)=>(
                                <p key={index}>{item}</p>
                                ))}
                            </Col>
                        </Row>
                        
                    </Row>
                </div>
                <div className="Education" id = "Education">
                    <Row>
                        <Col className="bt-border" md={4} sm={12}>
                            <Row>
                            <h1 className="title black">Education</h1>
                            </Row>
                        </Col>
                        <Col className="bt-border" md={8} sm={12}>
                        {education.map((item, index) => (
                                    <div key={index}>
                                        <Row className="pd-10">

                                            <Col md={4} sm={12}>
                                                <img src={item[5]} style={{width:'100%'}}/>
                                            </Col>
                                            <Col md={8} sm={12}>
                                                <h1 style={{width:'100%'}} className="black left">{item[4]}</h1>
                                                <h3 className="black left" style={{width:'100%',fontWeight:'400',fontStyle:'italic', fontFamily:'IBM Plex Serif, serif'}}>
                                                    {item[0]} in {item[3]}
                                                </h3>
                                                <p style={{width:'100%'}} className="black left">
                                                    Batch of {item[1]}
                                                 </p>
                                            </Col>
                                                
                                        </Row>
                                                                              
                                    </div>
                                ))}
                        </Col>
                    </Row>
                </div>
                <div className="Experience" id = "Experience">
                <Row>
                        <Col className="bt-border" md={4} sm={12}>
                            <Row>
                                <h1 className="title black">Experience</h1>
                            </Row>
                        </Col>
                        <Col className="bt-border" md={8} sm={12}>
                        {experience.map((item, index) => (
                                    <div key={index}>
                                        <Row>
                                                <h1 style={{width:'100%'}} className="black left">{item.company}</h1>
                                                <h3 className="black left" style={{width:'100%',fontWeight:'400',fontStyle:'italic', fontFamily:'IBM Plex Serif, serif'}}>
                                                    {item.position}
                                                </h3>
                                                {item.JobDesc.map((item,index)=>(
                                                    <p className="black left" key={item.id} style={{textAlign:'left'}}>- {item}</p>
                                                ))}
                                                <h3 className="black left">Skills:
                                                {item.tech_Stack.map((item2, index) => (
                                                <span key={index} style={{ display: 'inline', fontWeight:'400' }}> {item2}{index < item.tech_Stack.length - 1 ? ',' : ''}</span>
                                            ))}
                                                </h3>
                                        </Row>
                                                                              
                                    </div>
                                ))}
                        </Col>
                    </Row>
                </div>
                <div className="Leadership" id="Leadership">
                <Row>
                        <Col className="bt-border" md={4} sm={12}>
                            <Row>
                            <h1 className="title black">Leadership Positions</h1>
                            </Row>
                        </Col>
                        <Col className="bt-border" md={8} sm={12}>
                                        <Row>
                                                <h1 style={{width:'100%'}} className="black left">TMR : Baja India</h1>
                                                    <p className="black left" style={{textAlign:'left'}}>
                                                        I had an opportunity to work with one of the premium student run ATV teams in India , Team Manipal racing where I contributed my skills to build scalable business models to win podiums for the team!
                                                    </p>
                                        </Row>
                                        <Row>
                                                <h1 style={{width:'100%'}} className="black left">AIESEC UN SDG at Bahrain</h1>
                                                    <p className="black left" style={{textAlign:'left'}}>
                                                        I had an opportunity representing MIT manipal at Unleash Bahrain 2030 for United Nations Sustainable Develeopment Goal
                                                    </p>
                                        </Row>
                                        <Row>
                                                <h1 style={{width:'100%'}} className="black left">HPAIR 2021</h1>
                                                    <p className="black left" style={{textAlign:'left'}}>
                                                        I was selected as a delegate for Harvard Project for Asian and International Relations for discussion of economic, political and social issues !
                                                    </p>
                                        </Row>
                        </Col>
                    </Row>
                </div>
                <div className="Publications" id = "Publications">
                    <Row>
                        <Col className="bt-border" md={4} sm={12}>
                            <Row>
                            <h1 className="title black">Publications</h1>
                            </Row>
                        </Col>
                        <Col className="bt-border" md={8} sm={12}>
                        {publications.map((item, index) => (
                                    <div key={index}>
                                        <Row>
                                                <h1 style={{width:'100%'}} className="black left">{item[0]}</h1>
                                                <h3 className="black left" style={{width:'100%',fontWeight:'400',fontStyle:'italic', fontFamily:'IBM Plex Serif, serif'}}>
                                                    {item[2]} | Year {item[1]}
                                                </h3>
                                                <a className="black"  href={item[3]} target="_blank">View Publication</a>
                                        </Row>
                                                                              
                                    </div>
                                ))}
                        </Col>
                    </Row>
                </div>
                <div className="Projects" id = "Projects">
                <Row>
                        <Col className="bt-border"  md={4} sm={12}>
                            <Row>
                            <h1 className="title black">Projects</h1>
                            </Row>
                        </Col>
                        <Col className="bt-border"  md={8} sm={12}>
                        {projects.map((item, index) => (
                                    <div key={index}>
                                        <Row className="pd-10">
                                                <h1 style={{width:'100%'}} className="black left">{item.title}</h1>
                                                <h3 className="black left" style={{width:'100%',fontWeight:'400',fontStyle:'italic', fontFamily:'IBM Plex Serif, serif'}}>
                                                Skills - 
                                                {item.skills.map((skill, index2) => (
                                                        <span>
                                                            {index2 !== 0 && <>, </>}{skill}</span>
                                                    ))}
                                                </h3>
                                                {(item.desc).map((desc, index1)=>(
                                                <p className="black left" key={index1+100}>{desc}</p>
                                                ))}
                                                <p className="black left" style={{ textDecoration:'underline', cursor:'pointer'}}><br/>
                                                        <a className="black left" style={{color:'white', textDecoration:'underline', textDecorationColor:'white'}} target="_blank" href={item.link}>View Project</a>
                                                </p>
                                        </Row>                          
                                    </div>
                                ))}
                        </Col>
                    </Row>
                </div>
                <Footer scroll={scroll} images={images} />
               
        </div>
    );
};

export default Home;