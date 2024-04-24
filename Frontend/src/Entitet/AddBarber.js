import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import TestAxios from '../apis/TestAxios';
import { FormGroup, FormLabel, Row, Col, Form, Button } from 'react-bootstrap';



const AddBarber = () => {

//DEKLARACIJA OBJEKTA, SA IMENIMA IZ DTO! OBAVEZNO ISTA IMENA U NAME ATRIBUT U HTML!
    var kostur = {    
	   
	    name: '',	    
	    lastName: '',	    
	    nickname: '',	    
	    picture: '',	    
	    aboutMe: '',
    };

//============================================= S T A T E ============================================================    
    const [rezultat, setRezultat] = useState([]) // STATE ZA SELECT OPCIJU
    const [objekat, setObjekat] = useState(kostur);

    var navigate = useNavigate();
// ==================================== GLAVNA AXIOS FUNKCIJA ZA KREIRANJE ============================================
    const create = () => {
        // var params = {
           
        // };

        TestAxios.post('/barbers', objekat)
        .then(res => {
            console.log(res);
           
            alert('Dodavanje je uspesno izvrseno!');
            navigate('/scheduling'); 
        })
        .catch(error => {           
            console.log(error);
            alert('Doslo je do greske, molimo pokusajte ponovo!');
         });
    }

    // ============= GENERICKA FUNKCIJA - OBAVEZNO IMATI OBJEKAT SA IMENIMA IZ DTO + "NAME" atribut u html!==============
    // ==============ALTERNATIVA JE  (e) => setNesto (e.target.value)=====================
    const valueInputChanged = (e) => {
        const { name, value } = e.target;      
    
        setObjekat((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


   

//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
return(
<div>
    <h1>Add barber</h1>

    <Row>
                <Col></Col>
                <Col></Col>
                <Col xs="12" sm="10" md="4">
                   
                    <Form>
                        
                      <FormGroup>
                        <FormLabel htmlFor='name'>Name</FormLabel>
                        <Form.Control type='text' id='name' name='name' onChange={valueInputChanged}></Form.Control>
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor='lastName'>Last name</FormLabel>
                        <Form.Control type='text' id='lastName' name='lastName' onChange={valueInputChanged}></Form.Control>
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor='nickname'>Nickname</FormLabel>
                        <Form.Control type='text' id='nickname' name='nickname' onChange={valueInputChanged}></Form.Control>
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor='picture'>Picture url</FormLabel>
                        <Form.Control type='text' id='picture' name='picture' onChange={valueInputChanged}></Form.Control>
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor='aboutMe'>About me</FormLabel>
                        <Form.Control as="textarea" id='aboutMe' name='aboutMe' onChange={valueInputChanged}></Form.Control>
                      </FormGroup>

                     
  {/*===================================== S E L E C T  /   PADAJUCI MENI ======= onChange NIKAKO U LABEL!!! ========================== */} 

                        <Button  onClick={() => create()} style={{marginTop:'20px'}} >Add</Button>
                    </Form>
                </Col>
                <Col></Col>
                <Col></Col>
                
            </Row>
</div>
)}

export default AddBarber