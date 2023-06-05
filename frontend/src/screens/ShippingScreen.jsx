import {useState } from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {saveShippingAddress} from '../slices/cartSlice'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress?.address || '')
    const [city, setCity] = useState(shippingAddress?.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '')
    const [country, setCountry] = useState(shippingAddress?.country || '')
    const [state, setState] = useState(shippingAddress?.state || '')

    const history = useHistory()
    const dispatch = useDispatch()

    

    const submitHandler = (e) => {
        dispatch(saveShippingAddress({address, city, postalCode, country, state}))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps s={2}></CheckoutSteps>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                
                <Row>
                    <Col md = {6}>  
                    <Form.Group controlId='address' className='my-3'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type = 'text' required='true' placeholder='Enter address' value ={address} onChange={(e)=>setAddress(e.target.value)}></Form.Control>
                </Form.Group></Col>
                    <Col md = {6}>
                        <Form.Group controlId='city' className='my-3'>
                            <Form.Label>City</Form.Label>
                            <Form.Control type = 'text' required='true' placeholder='Enter city' value ={city} onChange={(e)=>setCity(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md = {4}>
                        <Form.Group controlId='state' className='my-3'>
                            <Form.Label>State</Form.Label>
                            <Form.Control type = 'text' placeholder='Enter state' value ={state} onChange={(e)=>setState(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md = {4}>
                        <Form.Group controlId='postalcode' className='my-3'>
                            <Form.Label>Postal code</Form.Label>
                            <Form.Control type = 'number' required='true' placeholder='Enter postal code' value ={postalCode} onChange={(e)=>setPostalCode(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md = {4}>
                        <Form.Group controlId='country' className='my-3'>
                            <Form.Label>Country</Form.Label>
                            <CountryDropdown className="form-control" style={{width:`100%`}} value={country} onChange={(val) => setCountry(val)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Button type='submit' variant='primary' className='my-3'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen