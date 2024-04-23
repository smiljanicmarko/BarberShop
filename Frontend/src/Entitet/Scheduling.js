import React, { useState, useEffect, useCallback } from 'react';
import {FormGroup, FormLabel, Col, Form, Button, Row, Table, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import TestAxios from '../apis/TestAxios';
import { jwtDecode } from 'jwt-decode';
import BarberCard from './BarberCard';
import './Scheduling.css'

const Scheduling = () => {

    //=================================== AUTORIZACIJA =========================================
    const token = localStorage.getItem("jwt");
    const decoded = token ? jwtDecode(token) : null;
    const isAdmin = decoded?.role?.authority === "ROLE_ADMIN";

    //========================== OBJEKAT PRETRAGE ==================================


    // ========================== STATE ============================================
    const [tabela, setTabela] = useState([])
    const [pickedDate, setPickedDate] = useState('')

    // /////////////////////////////////////////////////////// J A V A  S C R I P T  F U N K C I J E \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    //======================== USE EFFECT ============================================
    useEffect(() => {
        getZadaci();
    }, []);



    // ======================== DOBAVLJANJE PODATAKA ================================
    // Kada budes ubacivao pretragu,  nakon (?pageNo=${pageNo}`)) stavis ZAREZ i onda {objekat}, da bi se sve slalo u istom zahtevu, i paginacija nastavila da radi.
    //u dependeci tu i iznad u useEffectu obavezno dodati parametar 'pretraga' , i tako imamo live search! 

    // Ako mora na dugme, onda f-ja pretragaClickHandler, useEffect ostaje samo pageNo, a u getZadaci pageNo i pretraga. 

    const getZadaci = useCallback(() => {
        TestAxios.get(`/barbers`)
            .then(res => {
                console.log(res);
                setTabela(res.data)

            })
            .catch(error => {
                console.log(error);
                alert('Error occured please try again!');
            });
    }, []);
    //======================== NAVIGATE ============================================
    var navigate = useNavigate()

    const goToAdd = () => {
        navigate("/dodavanje");
    }




    //============================================ HANDLERI ZA FORME I VALUE INPUT CHANGED ===============================
    const valueInputChanged = (e) => {
        const { name, value } = e.target;      
    
        setPickedDate((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };




    {/* ================================================ RENDER TABELE ========================================= */ }
    //=============================================================================================================
    const renderTabela = () => {
        return tabela.map((klasa, index) => {
            return (
                <li key={klasa.id}>
                    <BarberCard
                        name={klasa.name} // Example prop
                        picture={klasa.picture} // Example prop
                        nickname={klasa.nickname} // Example prop
                    />
                </li>
            )
        })
    }

    //========================================== RENDER FORME ZA PRETRAGU====================================================
    //=======================================================================================================================










    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    return (
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
                            style={{ marginRight: '10px', whiteSpace: 'nowrap',  fontWeight: 'bold' }}>
                            Pick a date:
                        </FormLabel>
                        <Form.Control
                            type="date"
                            id=""
                            name=""
                            onChange={valueInputChanged}
                            style={{ flex: '1' }} // Allow the date picker to expand
                        />
                    </FormGroup>
                </Col>
            </Row>
        </div>





            <Row>
                <ul className='barbers'>
                    {renderTabela()}
                </ul>
            </Row>

        </Container>
    )

}

export default Scheduling