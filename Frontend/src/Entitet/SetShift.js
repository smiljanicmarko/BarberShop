import React, { useState, useEffect, useCallback } from 'react';
import { Button, Col, Form, FormGroup, FormLabel, Row, Table } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import TestAxios from '../apis/TestAxios';
import { jwtDecode } from 'jwt-decode';


const getNextSevenDays = () => {
    const today = new Date();
    const sevenDays = [];

    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };

    for (let i = 0; i < 7; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() + i); // Increment the day

        const formattedDate = day.toLocaleDateString('en-US', options); // MM/dd/yyyy
        const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(day);

        sevenDays.push({
            day: dayName,
            date: formattedDate,
        });
    }

    return sevenDays;
};


  


const SetShift = () => {

     //=================================== AUTORIZACIJA =========================================
     const token = localStorage.getItem("jwt");
     const decoded = token ? jwtDecode(token) : null;
     const isAdmin = decoded?.role?.authority === "ROLE_ADMIN";

  

     // ========================== STATE ============================================
    const barberId = useParams().id;
    const [barber, setBarber] = useState([])
    const [shifts, setShifts] = useState(
        getNextSevenDays().map((day) => ({
            day: day.day,
            date: day.date, // This should be in MM/dd/yyyy format
            shift: '', // Default to no shift
        }))
    );
      
    

    // /////////////////////////////////////////////////////// J A V A  S C R I P T  F U N K C I J E \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    //======================== USE EFFECT ============================================
    useEffect(() => {
        getBarberDetails();
    }, []);
    
   

  const [sevenDays, setSevenDays] = useState(getNextSevenDays());
   

    const getBarberDetails = useCallback(() => {
        TestAxios.get(`/barbers/${barberId}`)
            .then(res => {
                console.log(res);
                setBarber(res.data)
                
            })
            .catch(error => {
                console.log(error);
                alert('Error occured please try again!');
            });
    }, []);



    const sendShiftsToApi = () => {
        TestAxios.post(`/barbers/${barberId}/set-shifts`,  shifts )
          .then((response) => {
            console.log("Shifts successfully set:", response.data);
            alert("Shifts successfully set!");
          })
          .catch((error) => {
            console.error("Error setting shifts:", error);
            alert("Error occurred while setting shifts. Please try again.");
          });
      };


     //======================== NAVIGATE ============================================
     var navigate = useNavigate()

     const goToAdd = () => {
         navigate("/dodavanje");
     }
 

   

    //============================================ HANDLERI ZA FORME I VALUE INPUT CHANGED ===============================
    const handleShiftChange = (index, event) => {
        const newShifts = [...shifts]; // Create a copy of the shifts array
        newShifts[index].shift = event.target.value; // Update the specific shift
        setShifts(newShifts); // Set the updated array back to state
      };
      




   
   

//========================================== RENDER FORME ZA PRETRAGU====================================================
//=======================================================================================================================



  useEffect(() => {
    // Set the list of next seven days when the component is mounted
    setSevenDays(getNextSevenDays());
  }, []);




    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = GLAVNI RETURN = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
   

    return(
        <div>
      <h1>Set shifts for {barber.name}</h1>

      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Shift</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift, index) => (
                <tr key={index}>
                  <td>{`${shift.day} - ${shift.date}`}</td>
                  <td>
                    <Form.Control
                      as="select"
                      value={shift.shift}
                      onChange={(e) => handleShiftChange(index, e)}
                    >
                      <option value="">Select Shift</option>
                      <option value="1">Shift 1</option>
                      <option value="2">Shift 2</option>
                    </Form.Control>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Button onClick={sendShiftsToApi}>Save Shifts</Button> {/* Add a button to send the shifts */}
    </div>
    )

}

export default SetShift