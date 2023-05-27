import React from 'react'
import { Link } from 'react-router-dom'

import {Container, Navbar, NavDropdown, Nav } from 'react-bootstrap'

export default function Header(){
    return (
        <header>
            <Navbar bg="dark" variant = "dark" expand="lg" collapseOnSelect="true"  className = "py-3">
      <Container>
        <Navbar.Brand><Link to ="/">MERN Ecommerce</Link></Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className = "justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link><Link to = "/cart"><i className = 'fas fa-shopping-cart'></i></Link></Nav.Link>
            <Nav.Link><Link to = "/sign-in"><i className = 'fas fa-user'></i> Sign In</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </header>
    )
}