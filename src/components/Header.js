import React from 'react'
import {Navbar, Container, NavbarBrand} from 'reactstrap'

const Header = () => {
  return (
    <Navbar>
      <Container className='py-2'>
        <NavbarBrand className='text-uppercase'>HTML Entity Converter</NavbarBrand>
      </Container>
    </Navbar>
  )
}

export default Header