import React, {useState, useEffect, useContext} from 'react'
import {Form, FormGroup, Input, Button} from 'reactstrap'
import {FaCopy, FaCheck, FaRetweet, FaRotate} from 'react-icons/fa6'
import {toast} from 'react-toastify'
import he from 'he'
import {MainContext} from "../context/MainContext"

const Converter = () => {
  const maxSize = 5;
  const [string, setString] = useState("")
  const [entity, setEntity] = useState(null)
  const [copyStatus, setCopyStatus] = useState(false)
  const [lastFiveArray, setLastFiveArray] = useContext(MainContext)
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Save the updated array to localStorage whenever it changes
    localStorage.setItem('lastFiveArray', JSON.stringify(lastFiveArray));
  }, [lastFiveArray]);

  //Checks if item in already in array or not.
  //Skips operations if its already in array.
  // If its not, checks for max size 5, if array size exceeds,
  // removes 1st element & then push new element. Otherwise pushes element directly
  const handleAddItem = (ent) => {
    if (!lastFiveArray.includes(ent)) {
      if (lastFiveArray.length === maxSize) {
        const newArray = lastFiveArray.slice(1)
        setLastFiveArray([...newArray, ent])
      } else {
        setLastFiveArray(lastFiveArray => [...lastFiveArray, ent])
      }
    }
  };
  
  // If entity(converted text in <pre>) changes, using useEffect to perform operations
  // Checks if entity is not null, if so, executing handleAddItem function
  // and setting copy status to false
  useEffect(() => {
    if (entity !== null) {
      handleAddItem(entity)
      // Setting copy status as false to again change button icon and text
      setCopyStatus(false)
    }
  }, [entity])

  // Using npm package 'he' to convert special chars or emojis from string
  // to HTML entities & set tp entity state variable which will be displayed in <pre>
  const convert = () => {
    if (string !== "") {
      setEntity(he.encode(string, { useNamedReferences: true }))
    } else {
      toast("String can't be empty!", {type: 'error', theme: 'colored'})
    }
  }
  
  //Copy to clipboard functionality
  const copyToClipboard = async () => {
    if (entity !== null) {
      try {
        await navigator.clipboard.writeText(entity);
        //Setting copy status as true, to change button icon and text to 'Copied'
        setCopyStatus(true)
      } catch (err) {
        console.error('Unable to copy text: ', err);
      }
    } else {
      toast("Can't copy empty field, first convert some string!", {type: 'error', theme: 'colored'})
    }
  }

  //Reset button functionality
  const reset = () => {
    //Clears input field
    setString("");
    //Clears <pre>
    setEntity(null);
    //Sets copy status as false, to change button icon and text back to 'Click to copy'
    setCopyStatus(false);
  }

  return (
    <div className='mb-5 mb-md-0'>
      <h4 className='mb-4'>Converter</h4>
      <Form>
        <FormGroup>
          <Input id="exampleText" name="text" type="textarea" className='textarea' value={string} onChange={e => setString(e.target.value)}/>
        </FormGroup>
        <div className='d-flex justify-content-center'>
          <Button className='convertBtn' color='primary' onClick={convert}><FaRetweet /> Convert</Button>
          <Button className='convertBtn mx-2' color='danger' onClick={reset}><FaRotate /> Reset</Button>
        </div>
      </Form>
      <div className='pre-container mt-3'>
        <pre className='pre p-3 m-0'>
          <span className='prespan'>{entity}</span>
        </pre>
        {/*
          Setting buttons as per copy status. If true, shows 'Copied' else shows 'Click to copy'
        */}
        {copyStatus ? (
          <Button className='copy-icon-container copied' color='success' onClick={copyToClipboard}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
            <FaCheck/> <span className={`${isHovered ? 'd-inline' : 'd-none'}`}>Copied!</span>
          </Button>
        ) : (
          <Button className='copy-icon-container copy' color='success' onClick={copyToClipboard}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
            <FaCopy/> <span className={`${isHovered ? 'd-inline' : 'd-none'}`}>Click to Copy</span>
          </Button>
        )}
      </div>
    </div>
  )
}

export default Converter