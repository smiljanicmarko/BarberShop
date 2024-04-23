import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import './Home.css'
import aboutUsParagraph from '../services/TextFiles';

const Home = () =>{

  

  return (
    <div className='home'>
       <Row>
          <Col>
            <h1 className="heading1">MAN'S BARBER SHOP</h1> {/* First item */}
          </Col>
        </Row>

        <Container>
  <Row className='secondPart'>
    <Col md={6} > {/* This sets a half-and-half layout */}
      <img
        src="https://lirp.cdn-website.com/ac99697f/dms3rep/multi/opt/Team-1920w.jpg"
        alt="Example"
        className="img-fluid"
      />
    </Col>
    <Col md={6}>
      <div className="about-section">
        <h2 className="heading2">About us</h2>
        {aboutUsParagraph('about-us')}
      </div>
    </Col>
  </Row>
</Container>
  </div>
  )
}


export default Home;