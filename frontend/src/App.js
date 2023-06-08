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
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import ProfileScreen from './screens/ProfileScreen'
import { useSelector } from 'react-redux'
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

function App() {
  const {userInfo} = useSelector((state) => state.auth)
  return (
    <PayPalScriptProvider deferLoading={true}>
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
          {userInfo ? <Route path="/payment" component={(PaymentScreen)} /> : <Route path="/payment" component={(LoginScreen)} />}
          {userInfo ? <Route path="/placeorder" component={(PlaceOrderScreen)} /> : <Route path="/placeorder" component={(LoginScreen)} />}
          {userInfo ? <Route path="/order/:id" component={(OrderScreen)} /> : <Route path="/order/:id" component={(LoginScreen)} />}
          {userInfo ? <Route path="/profile" component={(ProfileScreen)} /> : <Route path="/order/:id" component={(LoginScreen)} />}

          </Switch>
        </Container>
        </main>
        <Footer />
        <ToastContainer />

    </Router>
    </PayPalScriptProvider>
  );
}

export default App
