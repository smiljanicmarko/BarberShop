import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FormGroup, FormLabel, Col, Form, Button, Row, Table, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import TestAxios from '../apis/TestAxios';
import { jwtDecode } from 'jwt-decode';
import BarberCard from './BarberCard';
import './Scheduling.css'
import { formatOnlyDate, formatOnlyDate2 } from '../services/formatDate';
import BottomPage from './BottomPage';

const Scheduling = () => {

    //=================================== AUTORIZACIJA =========================================
    const token = localStorage.getItem("jwt");
    const decoded = token ? jwtDecode(token) : null;
    const isAdmin = decoded?.role?.authority === "ROLE_ADMIN";

    //===========================================================
    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Ensures 2-digit format
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
      };

      var kostur = {
        //barberId: '',	
        serviceId: 1,		
        customerName: '',	
        customerEmail: '',			
        customerPhone: '',	
       // date: '',	
        //time: ''
    };

    // ========================== STATE ============================================
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);
    const [selectedBarber, setSelectedBarber] = useState('')
    const [selectedBarberId, setSelectedBarberId] = useState('')
    const [barbers, setBarbers] = useState([])
    const [object, setObject] = useState(kostur);
    const [pickedDate, setPickedDate] = useState({ date: getTodayDate() })
    const [isDisabled, setIsDisabled] = useState(true);
    const [errors, setErrors] = useState({});
   
    const bookingSectionRef = useRef(null);
    // /////////////////////////////////////////////////////// J A V A  S C R I P T  F U N K C I J E \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    //======================== USE EFFECT ============================================
    useEffect(() => {        
            getBarbers();         
    }, [pickedDate.date]);

    const getBarbers = useCallback(() => {
        TestAxios.get(`/barbers`, {
            params:{
                date: pickedDate.date
            }
        })
            .then(res => {
                console.log(res);
                setBarbers(res.data)

            })
            .catch(error => {
                console.log(error);
                alert('Error occured please try again!');
            });
    }, [pickedDate.date]);

    const create = () => {
        if (!validate()) return;
        var params = {
           ...object,
           barberId: selectedCard,
           date: pickedDate.date,	
           time: selectedHour
        };

        TestAxios.post('/appointments', params)
        .then(res => {
            console.log(res);
           
            alert('Dodavanje je uspesno izvrseno!');
            getBarbers();
        })
        .catch(error => {           
            console.log(error);
            alert('Doslo je do greske, molimo pokusajte ponovo!');
         });
    }
    //======================== NAVIGATE ============================================
    var navigate = useNavigate()

  
    //============================================ HANDLERI ZA FORME I VALUE INPUT CHANGED ===============================
    const valueInputChanged = (e) => {
        const { name, value } = e.target;

        setPickedDate((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const customerDetailsInputChanged = (e) => {
        const { name, value } = e.target;

        setObject((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log("email" +object.customerEmail);
        console.log("name" +object.customerName);
        console.log("phone" +object.customerPhone);
    };
    const handleTimeClick = (cardId, hour, nickname) => {
        //Update the selected card and hour
        
            // Otherwise, update the selected card and hour
            setSelectedCard(cardId);
            setSelectedHour(hour);
            setIsDisabled(false); 
            setSelectedBarber(nickname);
            setSelectedBarberId(cardId);
    };

    console.log('Karta: ' + selectedCard)
    console.log('Vreme: ' + selectedHour)
    console.log(pickedDate.date)

    useEffect(() => {
        if (!isDisabled && bookingSectionRef.current) {
          bookingSectionRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start', // Scrolls to the start of the element
          });
        }
      }, [isDisabled]); 


      const validate = () => {
            let tempErrors = {};
            tempErrors.customerName = object.customerName ? "" : "Name is obligatory.";
            tempErrors.customerEmail = object.customerEmail ? "" : "Email is obligatory";
            tempErrors.customerPhone = object.customerPhone ? "" : "Phone number is obligatory";
           
            setErrors(tempErrors);
            return Object.values(tempErrors).every(x => x === "");
        };


    {/* ================================================ RENDER TABELE ========================================= */ }
    //=============================================================================================================
    const renderTabela = () => {
        return barbers.map((barber, index) => {
            return (

                <Col key={barber.id}>
                    <BarberCard
                        id={barber.id}
                        name={barber.name}
                        picture={barber.picture}
                        nickname={barber.nickname}
                        hours={barber.hours}
                        selectedCard={selectedCard}
                        selectedHour={selectedHour}
                        onTimeClick={handleTimeClick}
                    />
                </Col>

            )
        })
    }

    //========================================== RENDER FORME ZA PRETRAGU====================================================
    //=======================================================================================================================










    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    return (
        <div className='main'>
            <Container fluid>
                <h1 className='heading'>Scheduling</h1>
                <div className='instruction-container'>
                    <ul className="instruction">
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                            </svg>

                            Pick a date
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                            </svg>

                            Pick desired time and barber
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                            </svg>

                            Fill the form and book
                        </li>
                    </ul>
                </div>
                <hr></hr>

                <div className="date-picker">
                    <Row className="justify-content-center"> {/* Center the row */}
                        <Col md={3}> {/* Control the column width */}
                            <FormGroup style={{ display: 'flex', alignItems: 'center' }}>
                                <FormLabel
                                    htmlFor=""
                                    style={{ marginRight: '10px', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                                    Pick a date:
                                </FormLabel>
                                <Form.Control
                                    type="date"
                                    id=""
                                    value={pickedDate.date}
                                    name="date"
                                    onChange={valueInputChanged}
                                    style={{ flex: '1' }} // Allow the date picker to expand
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </div>


                <Row>
                    <div className='barbers'>
                        {renderTabela()}
                    </div>

                </Row>




            </Container>
            <Container fluid ref={bookingSectionRef}>
                <div className='user-details-form'>
                    <div style={{ opacity: isDisabled ? 0.5 : 1, cursor: isDisabled ? 'not-allowed' : 'pointer' }}>
                        <h3>Your info</h3>
                        <Row>
                           
                            
                            <Col xs="12" sm="10" md="4">

                                <Form>

                                    <FormGroup>
                                        <FormLabel htmlFor='customerEmail'>Email</FormLabel>
                                        <Form.Control  type='email' id='customerEmail' name='customerEmail' isInvalid={!!errors.customerEmail} onChange={customerDetailsInputChanged}></Form.Control>
                                        <Form.Control.Feedback type="invalid">{errors.customerEmail} </Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel htmlFor='customerName'>Name</FormLabel>
                                        <Form.Control type='text' id='customerName' name='customerName' isInvalid={!!errors.customerName} onChange={customerDetailsInputChanged}></Form.Control>
                                        <Form.Control.Feedback type="invalid">{errors.customerName} </Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormLabel htmlFor='customerPhone'>Phone number</FormLabel>
                                        <Form.Control type='text' id='customerPhone' name='customerPhone' isInvalid={!!errors.customerPhone} onChange={customerDetailsInputChanged}></Form.Control>
                                        <Form.Control.Feedback type="invalid">{errors.customerPhone} </Form.Control.Feedback>
                                    </FormGroup>
                                    </Form>

                                    {!isDisabled &&
                                        
                                        <div className='booking-details'>
                                    <h5>Your booking: </h5>
                                    <Table className='table table-bordered'>
                                        <tbody>
                                        <tr>
                                        <th>Service</th><td>haircut</td>
                                        </tr>
                                        <tr>
                                        <th>Barber</th><td>{selectedBarber}</td>
                                        </tr>
                                        <tr>
                                        <th>Date and time</th><td>{formatOnlyDate2(pickedDate.date)} {selectedHour}</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                    <Button className='btn btn-danger' onClick={() => create()} >Book</Button>
                                    </div>}                                    
                            </Col>
                           

                        </Row>
                    </div>
                </div>
            </Container>

            <BottomPage></BottomPage>
        </div>


    )

}

export default Scheduling