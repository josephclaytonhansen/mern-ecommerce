import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import { useLogoutMutation } from '../slices/usersApiSlice'
import {logout } from '../slices/authSlice'

import {Container, Navbar, NavDropdown, Nav, Badge} from 'react-bootstrap'

export default function Header() {
  const {cartItems} = useSelector((state) => state.cart)
  const {userInfo} = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const history = useHistory()

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      history.push('/login')
      
    } catch (error) {
      console.log(error)
      
    }
  }

  const itemsCount = parseInt(cartItems.reduce((acc, item) => acc + item.qty, 0))
  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect="true"
        className="py-3">
        <Container>
          <Navbar.Brand>
            <Link
              to="/"
              className="link-light"
              style={{
              textDecoration: 'none'
            }}>MERN Ecommerce</Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="ml-auto">
              <Nav.Link>
                <Link
                  to="/cart"
                  className="link-light"
                  style={{
                  textDecoration: 'none'
                }}>
                  <i className='fas fa-shopping-cart text-secondary'>
                    {cartItems.length > 0 && (
                      <Badge pill bg='success' className="ml-2">
                        {itemsCount}
                      </Badge>
                    )
}</i>
                </Link>
              </Nav.Link>

              {userInfo ? (
                                             <>
                                                <NavDropdown title = {userInfo.name} id='username'>
                                                    <NavDropdown.Item> <Link to='/profile' className='link-dark'>Profile</Link></NavDropdown.Item>
                                                    <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>
                                                </NavDropdown>
                                             </>
                                           
              ) : (
                              <Nav.Link>
                              <Link
                                to="/login"
                                className="link-light"
                                style={{
                                textDecoration: 'none'
                              }}>
                                <i className='fas fa-user text-secondary'></i>
                                Sign In</Link>
                            </Nav.Link>
              )}


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}