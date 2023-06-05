import { useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {Button, Row, Col, ListGroup, Image, Card, Container} from "react-bootstrap"
import FormContainer from '../components/FormContainer'
import CheckoutSteps from "../components/CheckoutSteps"
import {toast } from 'react-toastify'
import Message from "../components/Message"
import Loader from "../components/Loader"
import { useCreateOrderMutation } from "../slices/ordersApi"
import { clearCart } from "../slices/cartSlice"

const PlaceOrderScreen = (props) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    const [createOrder, isLoading, error] = useCreateOrderMutation()

    useEffect(() => {
        if(!cart.shippingAddress.address){
            history.push("/shipping")
        } else if (!cart.paymentMethod){
            history.push("/payment")
        }
    }, [cart, history])

    const placeOrder = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                taxPrice: cart.taxPrice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice
            }).unwrap()
            dispatch(clearCart())
            history.push(`/order/${res._id}`)
        } catch (error) {
            toast.error(error.message, {toastId: 'placeOrderError', draggable: false, autoClose: 1500})
            
        }
    }
    const emptyCartRedirect = () => {
        if(!toast.isActive('emptyCart')){
            toast.error('Cart is empty', {toastId: 'emptyCart', draggable: false, autoClose: 1500})
        }
        history.push("/")
    }

    return(
        <Container>
        {cart.cartItems.length === 0 ? (
            <>
        <Message>Your cart is empty</Message>
        <Container>
            <Button onClick={emptyCartRedirect()}>Continue Shopping</Button>
        </Container>
        </>
        ) : (
            <><FormContainer>
                    <CheckoutSteps s={4} />
                </FormContainer><Row className="my-3 align-items-top">
                        <Col md={4}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row className="align-items-center">
                                        <Col md={8}><h4 className="p-0 m-0">Shipping Address</h4></Col>
                                        <Col><Button variant='dark' onClick={() => history.push('/shipping')}>Change</Button></Col>
                                    </Row>

                                    <p className="my-3">
                                        <span>{cart.shippingAddress.address}</span>
                                        <br />
                                        <span>{cart.shippingAddress.city}, {cart.shippingAddress.state ? (cart.shippingAddress.state.substr(0, 2).toUpperCase()) : (``)}</span>
                                        <br />
                                        <span>{cart.shippingAddress.postalCode}</span>
                                        <br />
                                        <span>{cart.shippingAddress.country}</span>
                                    </p>

                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row className="align-items-center my-3">
                                        <Col md={8}><h4 className="p-0 m-0">Payment Method</h4></Col>
                                        <Col><Button variant='dark' onClick={() => history.push('/payment')}>Change</Button></Col>
                                    </Row>
                                    <p className="my-3">{cart.paymentMethod}</p>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={6}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h4 className="p-0 m-0">Order Summary</h4>
                                    <p className="my-3">
                                        {cart.cartItems.length === 0 ? `Your cart is empty` : (
                                            <ListGroup variant='flush'>
                                                {cart.cartItems.map((item, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <Row className='align-items-center'>
                                                            <Col md={2}>
                                                                <Link to={`/product/${item.product}`}><Image src={item.image} alt={item.name} fluid rounded /></Link>
                                                            </Col>
                                                            <Col>
                                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                            </Col>
                                                            <Col md={4}>
                                                                x{item.qty}: ${(item.qty * item.price).toFixed(2)}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        )}
                                    </p>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col>

                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col><h4>Subtotal</h4>
                                            <p>{cart.itemsPrice ? `${cart.itemsPrice.toFixed(2)}` : `No items in cart`}</p>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col><h4>Tax</h4>
                                            <p>{cart.taxPrice ? `${cart.taxPrice.toFixed(2)}` : `No items in cart`}</p>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col><h4>Shipping</h4>
                                            <p>{cart.shippingPrice ? `${cart.shippingPrice.toFixed(2)}` : `$0.00`}</p>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col><h4>Total</h4>
                                            <p>{cart.totalPrice ? `${cart.totalPrice.toFixed(2)}` : `No items in cart`}</p>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {error && <Message variant='danger'>{error}</Message>}
                                    <Button type='button' className='btn-block' disabled={cart.cartItems.length === 0} onClick={placeOrder}>Place Order</Button>
                                </ListGroup.Item>
                            </ListGroup>

                        </Col>
                    </Row></>)}
</Container>)}

export default PlaceOrderScreen