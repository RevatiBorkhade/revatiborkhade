import React, {useState} from "react";
import "../home/home.css";
import { Row, Col, Form, Button } from "react-bootstrap";

const Footer = ({images, scroll}) => {
    const [mailSent, setmailSent] = useState(false)
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
    
    return (
        <div id = "Footer">
            <div className="video_player">
                <video controls autoPlay muted>
                    <source src={images[2]} type="video/mp4" />
                    Your browser does not support the video.
                </video>
            </div>
            <div className="topic_name Contact_Me" id="Contact_Me">
                <h2>Contact Me</h2>
                <Row className="pd-10">
                    <Col md={6}>
                        <Row className="pd-10" style={{ flexDirection: 'column' }}>
                            <Row className="pd-10"><h1 className="left">Revati Borkhade</h1></Row>
                            <Row className="pd-10">
                                <Col md={6} sm={12}>
                                    <p className="left">
                                        Email<br />
                                        <a href="mailto:revatiborkhade@gmail.com" style={{ textDecoration: 'underline' }}>revatiborkhade@gmail.com</a>

                                    </p>

                                    <h3 style={{ width: '100%', textAlign: "left", marginTop: '5%' }}>Connect with me on <a href="http://www.linkedin.com/in/revatiborkhade" target="_blank"><img src="assets/linkedin.svg" alt="" style={{ width: '40px' }} /></a></h3>
                                    <a style={{color:'white', textDecoration:'none'}} href={images[6]} target="_blank"><h3 style={{textAlign:'left'}}>Download my Resume</h3></a>
                                 
                                </Col>
                                <Col md={6} sm={12}>
                                    <h6 style={{ textAlign: 'left' }}>Quick Links</h6>
                                    <ul style={{ textAlign: 'left' }}>
                                        <li><a className="nav_link white" onClick={(e) => { scroll("AboutMe") }}>About Me</a></li>
                                        <li><a className="nav_link white" onClick={(e) => { scroll("Education") }}>My Education</a></li>
                                        <li><a className="nav_link white" onClick={(e) => { scroll("Experience") }}>My Experience</a></li>
                                        <li><a className="nav_link white" onClick={(e) => { scroll("Publications") }}>My Publications</a></li>
                                        <li><a className="nav_link white" onClick={(e) => { scroll("Projects") }}>My Projects</a></li>
                                    </ul>
                                </Col>
                            </Row>
                        </Row>

                    </Col>
                    <Col md={6}>
                        {!mailSent && (
                            <Form onSubmit={handleSubmit}>
                                <Row style={{padding:'10px 0px'}}>
                                    <Col className="pr-10" md={6} sm={12}>
                                        <Form.Group controlId="formName">
                                            <Form.Label style={{ color: 'white', width: '100%', textAlign: "left" }}>Name:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your name"
                                                name="name"
                                                value={formData.name}
                                                required={true}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col className="pl-10" md={6} sm={12}>
                                        <Form.Group controlId="formEmail">
                                            <Form.Label style={{ color: 'white', width: '100%', textAlign: "left" }}>Email:</Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter your email"
                                                name="email"
                                                required={true}
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>



                                <Form.Group controlId="formSubject">
                                    <Form.Label style={{ color: 'white', width: '100%', textAlign: "left" }}>Subject:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter subject"
                                        name="subject"
                                        required={true}
                                        value={formData.subject}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formMessage">
                                    <Form.Label style={{ color: 'white', width: '100%', textAlign: "left" }}>Message:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter your message"
                                        name="message"
                                        required={true}
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Button style={{ marginTop: '10px' }} variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        )}
                        {mailSent && (
                            <h1>Thank You For Contacting me.</h1>
                        )}
                    </Col>
                </Row>
                <Row><p style={{textAlign:'left'}}>&copy; Revati Borkhade, all rights reserved <br />
                <span style={{fontSize:'10px'}}>Photo by <a href="https://unsplash.com/@nasa?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">NASA</a> on <a href="https://unsplash.com/photos/photo-of-outer-space-Q1p7bh3SHj8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
                </span></p>
                </Row>
            </div>
        </div>
    )

}

export default Footer;