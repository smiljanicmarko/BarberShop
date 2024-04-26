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
    var params = {
        id: editObj.id,
        naslov: editObj.naslov,
        tip: editObj.tip,          
        potrebanProcenat: editObj.potrebanProcenat,
        opis: editObj.opis,        
        zgradaId: editObj.zgradaId     
    };

    TestAxios.put('/poruke/' +editObj.id, params)
    .then(res => {      
        console.log(res);
        alert('Izmena je uspesno izvrsena!');
        navigate('/zadaci');
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

        {/* U SUSTINI ISTO KAO I ZA DODAVANJE: 
        PRIMER: 
        
         <Row>
                <Col></Col>
                <Col></Col>
                <Col xs="12" sm="10" md="4">
                   
                    <Form>
                        
                      <FormGroup>
                        <FormLabel htmlFor='naslov'>Naslov</FormLabel>
                        <Form.Control type='text' value={editObj.naslov} id='naslov' name='naslov' onChange={valueInputChanged}></Form.Control>
                      </FormGroup>

                      <FormGroup>
                        <FormLabel htmlFor='opis'>Opis</FormLabel>
                        <Form.Control type='text' value={editObj.opis} id='opis' name='opis' onChange={valueInputChanged}></Form.Control>
                      </FormGroup>
                        {editObj.tip==='predlog'? 
                         <FormGroup>
                         <FormLabel htmlFor='potrebanProcenat'>Potreban procenat</FormLabel>
                         <Form.Control type='number' value={editObj.potrebanProcenat} id='potrebanProcenat' name='potrebanProcenat' onChange={valueInputChanged}></Form.Control>
                       </FormGroup>
                       :
                       <></>
                    
                    }
        
        */}




        </div>
    )
}

export default EditBarber