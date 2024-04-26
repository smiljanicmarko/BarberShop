import React, { useState, useEffect, useCallback } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import TestAxios from '../apis/TestAxios';
import { jwtDecode } from 'jwt-decode';

const Barbers = () => {

     //=================================== AUTORIZACIJA =========================================
     const token = localStorage.getItem("jwt");
     const decoded = token ? jwtDecode(token) : null;
     const isAdmin = decoded?.role?.authority === "ROLE_ADMIN";

    //========================== OBJEKAT PRETRAGE ==================================


    // ========================== STATE ============================================
    const [barbers, setBarbers] = useState([])
    const [pageNo, setPageNo] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    // /////////////////////////////////////////////////////// J A V A  S C R I P T  F U N K C I J E \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    //======================== USE EFFECT ============================================
    useEffect(() => {
        getBarbers();
    }, []);
    
    
   
   
    const getBarbers = useCallback(() => {
        TestAxios.get('/barbers/list')
            .then(res => {
                console.log(res);
                setBarbers(res.data)
              
            })
            .catch(error => {
                console.log(error);
                alert('Error occured please try again!');
            });
    }, []);
     //======================== NAVIGATE ============================================
     var navigate = useNavigate()

     const goToAdd = () => {
         navigate("/add-barber");
     }
     const goToSetShift = (id) => {
        navigate(`/set-shift/${id}`);
    }

    const goToEdit = (id) =>{
        navigate('/edit-barber/' + id)
    }

    // ======================== BRISANJE ===========================================
    const izbrisi = (id) => {
        TestAxios.delete('/zadaci/' + id)
            .then(res => {
                // handle success
                console.log(res);
                alert('Brisanje je uspesno izvrseno!');
                setBarbers(barbers.filter(el => el.id !==id))
               // window.location.reload();

            })
            .catch(error => {
                // handle error
                console.log(error);
                alert('Doslo je do greske, molimo pokusajte ponovo!');
            });
    }

    //============================================ HANDLERI ZA FORME I VALUE INPUT CHANGED ===============================





    {/* ================================================ RENDER TABELE ========================================= */ }
    //=============================================================================================================
    const renderBarbers = () => {
        return barbers.map((barber, index) => {
            return (
                <tr key={barber.id}>
                    <td>{barber.name}</td>
                    <td>{barber.lastName}</td>
                    
                   
                    {/* === DUGMICI ===*/}
                    <td><Button className='btn btn-success' style={{marginRight: '10px'}} onClick={() => goToSetShift(barber.id)}>Set shifts</Button>
                        <Button className='btn btn-warning' style={{marginRight: '10px'}} onClick={() => goToEdit(barber.id)}>Edit</Button>
                        <Button className='btn btn-danger' onClick={() => izbrisi(barber.id)}>Delete</Button></td>
                </tr>
            )
        })
    }

//========================================== RENDER FORME ZA PRETRAGU====================================================
//=======================================================================================================================










    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    return (
        <div>
            <h1>Barbers</h1>
            {/* ================================== PRETRAGA meni================= */}







            {/* ================================== ADD + PAGINACIJA IZNAD TABELE ================= */}
            <Button className="btn btn-primary" onClick={goToAdd} >Dodaj</Button>

           
            <Row><Col>
                <Table id="movies-table">
                    <thead>
                        <tr>
                            {/* ================================== ZAGLAVLJE TABELE ================= */}
                            <th>Name</th>
                            <th>Last name</th>
                            <th></th>                          
                        </tr>
                    </thead>
                    {/* ================================== TELO TABELE  ================= */}
                    <tbody>
                        {renderBarbers()}
                    </tbody>
                </Table>
            </Col></Row>

        </div>
    )

}

export default Barbers