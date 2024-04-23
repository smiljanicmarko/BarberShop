import { Card, Row, Col } from 'react-bootstrap';
import './BarberCard.css';
import { useState } from 'react';

const BarberCard = (props) => {
  const { id, picture, nickname, hours, selectedCard, selectedHour, onTimeClick } = props;
  // const [selectedHour, setSelectedHour] = useState(null);


  // Function to format hours into rows with 4 columns
  const formatHours = (hours) => {
    const rows = [];
    const rowSize = 4;

    for (let i = 0; i < hours.length; i += rowSize) {
      const row = hours.slice(i, i + rowSize);
      rows.push(row);
    }

    return rows;
  };

 
  const formattedHours = formatHours(hours);


  // const handleClick = (hour) => {
  //   setSelectedHour(hour)
  //   console.log(`You clicked on: ${hour}`); 
  // };

  return (
    <div className='BarberCard'>
      <Card className='card-fixed-size'>
        <Card.Img 
          variant="top" 
          src={picture} 
          className="card-image-fixed-size" 
        />
        <Card.Body>
          <Card.Title>{nickname}</Card.Title>
          <div style={{ padding: 0 }}>
          {formattedHours.map((row, rowIndex) => (
            <Row key={rowIndex}>
              {row.map((hour, colIndex) => (
                <Col key={colIndex}  className={`text-center hoverable ${selectedHour === hour ? 'highlight' : ''}`}
                 xs={3} style={{ padding: '5px', margin: '0' }} 
                 onClick={() => onTimeClick(id,hour)}> 
                  {hour}
                </Col>
              ))}
            </Row>
          ))}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BarberCard;
