import { Card, FormLabel, Row, Col, Form, Button } from 'react-bootstrap';
import './BarberCard.css'

const BarberCard = (props) => {
    return (
    
<div className='BarberCard'>
<Card className='card-fixed-size'>
      <Card.Img variant="top" src={props.picture}  className="card-image-fixed-size"/>
      <Card.Body>
        <Card.Title>{props.nickname}</Card.Title>
        <Card.Text>
         
        </Card.Text>
        
      </Card.Body>
    </Card>
</div>


)
}

export default BarberCard