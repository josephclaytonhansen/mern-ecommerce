import {Form, Button, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import {useState, useEffect} from 'react'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {savePaymentMethod} from '../slices/cartSlice'
import {toast } from 'react-toastify'

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const history = useHistory()
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const {shippingAddress} = cart

    useEffect(() => {
        if(!shippingAddress.address){
            if(!toast.isActive('shippingToast')){
                toast.error('Please enter shipping address', {toastId: 'shippingToast', draggable: false, autoClose: 1500})
            }
            
            history.push('/shipping')
            
        }
    }, [shippingAddress, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return(
        <FormContainer>
            <CheckoutSteps s={3}></CheckoutSteps>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check type='radio'
                        className='margin-y2'
                         label='PayPal or Credit Card'
                          id='PayPal' name='paymentMethod'
                           value='PayPal' checked
                            onChange={(e) => setPaymentMethod(e.target.value)}>

                            </Form.Check>
                            <Form.Check type='radio'
                        className='margin-y2'
                         label='Stripe'
                          id='Stripe' name='paymentMethod'
                           value='Stripe'
                            onChange={(e) => setPaymentMethod(e.target.value)}>

                            </Form.Check>
                            </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
                </Form>
                        
        </FormContainer>
    )
}

export default PaymentScreen