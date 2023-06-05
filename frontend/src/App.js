import React from 'react'

import { BrowserRouter as Router, Route, Switch, withRouter  } from 'react-router-dom'

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ShippingScreen from './screens/ShippingScreen'
import { useSelector } from 'react-redux'

function App() {
  const {userInfo} = useSelector((state) => state.auth)
  return (
    <Router>
    <Header />
      <main>
        <Container>
          <Switch>
          
          <Route path="/product/:id" component={withRouter(ProductScreen)} />
          <Route path="/cart" component={withRouter(CartScreen)} />
          <Route path="/" component={withRouter(HomeScreen)} exact index={true} />
          <Route path="/login" component={(LoginScreen)} />
          <Route path="/register" component={(RegisterScreen)} />
          {userInfo ? <Route path="/shipping" component={(ShippingScreen)} /> : <Route path="/shipping" component={(LoginScreen)} />}
          </Switch>
        </Container>
        </main>
        <Footer />
        <ToastContainer />

    </Router>
  );
}

export default App
