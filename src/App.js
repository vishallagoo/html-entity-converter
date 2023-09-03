import React, {useState, useEffect} from "react";
import {Container, Row, Col} from 'reactstrap'
import {toast, ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Header from "./components/Header";
import Footer from "./components/Footer";
import Converter from "./components/Converter";
import LastConversions from "./components/LastConversions";

import {MainContext} from "./context/MainContext"

function App() {

  //Get items from localStorage if any or else set state as empty array
  //Passing this state variable and object to other components using Context API
  //Using Context API, avoiding these function in every component which needs to be refreshed using
  //useEffect which causing infinite loop sometimes as lastFiveArray is being changed in different functionalities
  const [lastFiveArray, setLastFiveArray] = useState(() => {
    const storedArray = JSON.parse(localStorage.getItem('lastFiveArray')) || [];
    return storedArray;
  });

  return (
    <MainContext.Provider value={[lastFiveArray, setLastFiveArray]}>
      <ToastContainer/>
      <Header/>
      <Container>
        <Row className="my-5">
          <Col md={8}>
            <Converter />
          </Col>
          <Col md={4}>
            <LastConversions/>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </MainContext.Provider>
  );
}

export default App;
