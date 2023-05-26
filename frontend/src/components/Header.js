import React from 'react'
import {Container, Navbar, NavDropdown, Nav } from 'react-bootstrap'

export default function Header(){
    return (
        <header>
            <Navbar bg="dark" variant = "dark" expand="lg" collapseOnSelect="true"  className = "py-3">
      <Container>
        <Navbar.Brand href="/">MERN Ecommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className = "justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link href="/cart"><i className = 'fas fa-shopping-cart'></i></Nav.Link>
            <Nav.Link href="/sign-in"><i className = 'fas fa-user'></i> Sign In</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </header>
    )
}