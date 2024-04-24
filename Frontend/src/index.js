import React from 'react';
import { createRoot } from 'react-dom/client';
import { Route, Link, Navigate, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import Login from './components/auth/Login';
import { logout } from './services/auth';
import Zadaci from './Entitet/Zadaci';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dodavanje from './Entitet/Dodavanje';
import Scheduling from './Entitet/Scheduling';
import { jwtDecode } from 'jwt-decode';
import Barbers from './Entitet/Barbers';
import SetShift from './Entitet/SetShift';
import AddBarber from './Entitet/AddBarber';


const App = () => {
    const token = localStorage.getItem("jwt");
    const decoded = token ? jwtDecode(token) : null;
    const isAdmin = decoded?.role?.authority === "ROLE_ADMIN";

    if(window.localStorage["jwt"]){
        return (
            <>
                <Router>
                    <Navbar expand bg="dark" variant="dark">
                        <Navbar.Brand as={Link} to="/">
                            JWD
                        </Navbar.Brand>
                        <Nav>
                        <Nav.Link as={Link} to="/scheduling">
                            Schedule 
                        </Nav.Link>  
                        {isAdmin? 
                        <Nav.Link as={Link} to="/barbers">
                        Barbers 
                        </Nav.Link>  :<></>
                    }
                                         
                        <Button  onClick={logout}>Logout</Button>
                       
                        </Nav>
                </Navbar>
                <Container style={{paddingTop:"10px"}}>
                <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Navigate replace to = "/" />} />
                        <Route path='/barbers' element={<Barbers/>} />
                        <Route path='/add-barber' element={<AddBarber/>} />
                        <Route path='/set-shift/:id' element={<SetShift/>} />
                        <Route path="/scheduling" element={<Scheduling />} />
                        <Route path='/dodavanje' element={<Dodavanje/>}/>                       
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Container>
                </Router>
            </>
        );
        }else{
            return(
           <>
                <Router>
                    <Navbar expand bg="dark" variant="dark">
                        <Navbar.Brand as={Link} to="/">
                            JWD
                        </Navbar.Brand>
                        <Nav>                       
                        <Nav.Link as={Link} to="/login">
                            Login
                        </Nav.Link>
                        </Nav>
                </Navbar>
                <Container style={{paddingTop:"10px"}}>
                <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />                        
                        <Route path="*" element={<Navigate replace to = "/login" />} />
                    </Routes>
                </Container>
                </Router>
            </>
            );
        }
    
    };


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <App/>,
);