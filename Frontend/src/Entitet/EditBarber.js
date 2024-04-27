import { useNavigate, useParams } from "react-router-dom"
import TestAxios from "../apis/TestAxios"
import { useCallback, useEffect, useState } from "react"
import { FormGroup, FormLabel, Row, Col, Form, Button } from 'react-bootstrap';

const EditBarber = () => {
 
    const barberId = useParams().id

    var navigate = useNavigate()
//========================================= promenljiva =======================================
    var obj ={
        name: '',	    
	    lastName: '',	    
	    nickname: '',	    
	    picture: '',	    
	    aboutMe: '',   
    }
//=========================================== STATE ============================================
const [editObj, setEditObj] = useState(obj);

//=================================== DOBAVLJANJE PODATAKA ======================================

const getDataById = useCallback((id) => {
    TestAxios.get('/barbers/' + id)
    .then(res => {
        // handle success
        console.log(res);
        setEditObj({ 
            id: barberId,
            name: res.data.name,	    
            lastName: res.data.lastName,    
            nickname: res.data.nickname,    
            picture: res.data.picture,	    
            aboutMe: res.data.aboutMe,   
        });
    })
    .catch(error => {
        // handle error
        console.log(error);
        alert('Error occured please try again!');
     });
}, []);

useEffect(() => {
    getDataById(barberId)
}, []);

//============================== HANDLERI =============================
const valueInputChanged = (e) => {
    const { name, value } = e.target;      

    setEditObj((prevState) => ({
        ...prevState,
        [name]: value,
    }));
};

//=============================== FUNKCIJA ZA EDIT ==================================
const edit = () => {
   
    TestAxios.put('/barbers/' + barberId, editObj)
    .then(res => {      
        console.log(res);
        alert('Izmena je uspesno izvrsena!');
        navigate('/barbers');
    })
    .catch(error => {
        // handle error
        console.log(error);
        alert('Error occured please try again!');
     });
}
    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    return (
        <div>
            <h1>Edit barber</h1>

            <Row>
                <Col></Col>
                <Col></Col>
                <Col xs="12" sm="10" md="4">
                   
                    <Form>
                        
                      <FormGroup>
                        <FormLabel htmlFor='name'>Name</FormLabel>
                        <Form.Control type='text' id='name' value={editObj.name} name='name' onChange={valueInputChanged}></Form.Control>
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor='lastName'>Last name</FormLabel>
                        <Form.Control type='text' id='lastName' value={editObj.lastName} name='lastName' onChange={valueInputChanged}></Form.Control>
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor='nickname'>Nickname</FormLabel>
                        <Form.Control type='text' id='nickname' name='nickname' value={editObj.nickname} onChange={valueInputChanged}></Form.Control>
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor='picture'>Picture url</FormLabel>
                        <Form.Control type='text' id='picture' name='picture' value={editObj.picture} onChange={valueInputChanged}></Form.Control>
                      </FormGroup>
                      <FormGroup>
                        <FormLabel htmlFor='aboutMe'>About me</FormLabel>
                        <Form.Control as="textarea" id='aboutMe' name='aboutMe' value={editObj.aboutMe} onChange={valueInputChanged}></Form.Control>
                      </FormGroup>

                     
  {/*===================================== S E L E C T  /   PADAJUCI MENI ======= onChange NIKAKO U LABEL!!! ========================== */} 

                        <Button  onClick={() => edit()} style={{marginTop:'20px'}}>Edit</Button> 
                    </Form>
                </Col>
                <Col></Col>
                <Col></Col>
                
            </Row>




        </div>
    )
}

export default EditBarber