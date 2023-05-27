import React from 'react'

import { BrowserRouter as Router, Route, Switch, withRouter  } from 'react-router-dom'

import {Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'

function App() {
  return (
    <Router>
    <Header />
      <main>
        <Container>
          <Switch>
          
          <Route path="/product/:id" component={withRouter(ProductScreen)} />
          <Route path="/" component={withRouter(HomeScreen)} exact />
          </Switch>
        </Container>
        </main>
        <Footer />

    </Router>
  );
}

export default App
