import React from 'react'
import {Col, Container, Row} from 'reactstrap'

const Footer = () => {
  return (
    <Container fluid className='py-2 footer fixed-bottom-md'>
      <Row>
        <Col sm={12} md={6} className='text-center text-md-center my-3 my-md-2'>
          <h5>&#169; Vishal Lagoo</h5>
        </Col>
        <Col sm={12} md={6} className='text-center text-md-center my-3 my-md-2'>
          <h5>Made with <span style={{color: 'red', fontSize: '20px'}}>&#10084;</span> in India</h5>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer