import React, { useEffect, useState, useContext } from 'react'
import { ListGroup, ListGroupItem, Button, Row, Col } from 'reactstrap'
import {FaCheck, FaCopy, FaTrashCan} from 'react-icons/fa6'
import {toast} from 'react-toastify'
import {MainContext} from '../context/MainContext'

const LastConversions = () => {
  const [lastFiveArray, setLastFiveArray] = useContext(MainContext)
  const [copyStatus, setCopyStatus] = useState(Array(lastFiveArray.length).fill(false))

  //Copy to clipboard functionality
  const copyToClipboard = async (item, itemIndex) => {
    if (item !== null) {
      try {
        await navigator.clipboard.writeText(item);
        //When clicking on copy, set previous 'Copied' status to false
        const updatedCopyStatus = Array(lastFiveArray.length).fill(false);
        //Set copy status as true of only element which is clicked
        updatedCopyStatus[itemIndex] = true;
        setCopyStatus(updatedCopyStatus);
      } catch (err) {
        console.error('Unable to copy text: ', err);
      }
    } else {
      toast("Can't copy empty field, first convert some string!", {type: 'error', theme: 'colored'})
    }
  }
  
  //Clears local storage using state method received from Context API Provider in App.js
  const clearLastConversions = () => {
    setLastFiveArray([])
  }

  return (
    <>
      <h4 className='mb-4'>Last 5 Conversions</h4>
      <ListGroup className='listgroup-precontainer'>
        {/*
          Mapping through lastFiveArray to obtain last 5 conversions.
          Passing index and item to List Group Item to properly use copy to clipboard functionality
        */}
        {lastFiveArray.map((item, index) => (
          <ListGroupItem key={index} className='mb-3'>
            <Row>
              <Col md={10}>
                <span className='itemHolder d-block'>{item}</span>
              </Col>
              <Col md={2}>
                  {/*
                    Checks copy status of individual item using index
                    and flip buttons from Copy -> Copied & vice verca
                  */}
                  {copyStatus[index] ? (
                    <Button className='list-copy-icon-container' color='success' onClick={() => copyToClipboard(item, index)}>
                      <FaCheck/> 
                    </Button>
                  ) : (
                    <Button className='list-copy-icon-container' color='success' onClick={() => copyToClipboard(item, index)}>
                      <FaCopy/> 
                    </Button>
                  )}
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
      <div className='d-flex justify-content-center'>
          {
            /*
              Checks for last 5 conversions, if not any, displays text accordingly
              If items are present, shows button to clear conversations from localStorage
            */
            (lastFiveArray.length !== 0) ? (
                <Button className='convertBtn mx-2' color='danger' onClick={clearLastConversions}><FaTrashCan /> Clear</Button>
            ) : (
              <h5>There are no last conversions</h5>
            )
          }
      </div>
    </>
  )
}

export default LastConversions