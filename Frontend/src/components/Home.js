import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import './Home.css'
import aboutUsParagraph from '../services/TextFiles';

const Home = () =>{

  

  return (
    <div className='home'>
     
    <Container>
        <Row>
          <Col>
            <h1 className="heading">MAN'S BARBER SHOP</h1> {/* First item */}
          </Col>
        </Row>

        <Row className='secondPart'>
          <Col>
            <img
              src="https://lirp.cdn-website.com/ac99697f/dms3rep/multi/opt/Team-1920w.jpg" /* Your image source */
              alt="Example"
              className="img-fluid"
            /> {/* Second item */}
          </Col>
          <Col>
            <div className="about-section">
              <h2 className="heading2">About us</h2> {/* Third item */}
             {aboutUsParagraph('about-us')}
            </div>
          </Col>
        </Row>

        <Row>
         
        </Row>
      </Container>
  </div>
  )
}


export default Home;