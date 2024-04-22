import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

const Home = () =>{
  return (
    <div className='home'>
    <h1 style={{align: 'center'}}>HOME</h1>
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <img src="/images/scissors.jpg" className="img-fluid" alt="Responsive" style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
         
        </Col>
      </Row>
    </Container>
  </div>
  )
}


export default Home;