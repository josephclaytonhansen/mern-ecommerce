import {Link, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import Message from '../components/Message'
import {Row, Col, ListGroup, Image, Form, Button, Card, Container, ProgressBar } from 'react-bootstrap'
import Loader from '../components/Loader'
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPaypalClientIdQuery } from '../slices/ordersApi'
import { PayPalButtons, usePayPalScriptReducer, PayPalScriptProvider } from '@paypal/react-paypal-js' 
import {toast } from 'react-toastify'

const OrderScreen = () => {
    const { id: orderId } = useParams()
    const {data: order, refetch, isLoading, error} = useGetOrderDetailsQuery(orderId)

    const {userInfo} = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const [payOrder, {isLoading:loadingPay}] = usePayOrderMutation()
    const [{isPending}, paypalDispatch] = usePayPalScriptReducer()
    const {data: paypal, isLoading: loadingPayPal, error: errorPayPal} = useGetPaypalClientIdQuery()

    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && paypal.clientId){
            const loadPayPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'USD'
                    }
                })
                paypalDispatch({type:'setLoadingStatus', value: 'pending'})
            }
            if (order && !order.isPaid){
                if (!window.paypal){
                    loadPayPalScript()
                }
                
            }
            
        }
    }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal])

    function onApprove(data, actions){
        return actions.order.capture().then(async function(details){
            try {
                await payOrder({orderId, paymentResult: details})
                toast.success('Payment successful')

                refetch()
            } catch (error) {
                toast.error(error?.data?.message || error?.message)
            }
        })
    }
    function onError(error){
        toast.error(error?.data?.message || error?.message)
    }
    function createOrder(data, actions){
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice
                    }
                }
            ]
        }).then((orderId) => {
            return orderId
        })
    }


    return isLoading ? <Loader></Loader> : error ? <Message variant='danger'>{error}</Message> : (
        <Container className='my-4'>
            <h1>Order {parseInt(order._id.substr(18), 16)}</h1>
            <Row>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                                <p>
                                    <strong>Name: </strong> {order.user.name}
                                </p>
                                <p>
                                    <strong>Email: </strong> {order.user.email}
                                </p>
                                <p>
                                    <strong>Address: </strong>
                                    <br/>
                                    <span>{order.shippingAddress.address}</span>
                                        <br />
                                        <span>{order.shippingAddress.city}, {order.shippingAddress.state ? (order.shippingAddress.state.substr(0, 2).toUpperCase()) : (``)}</span>
                                        <br />
                                        <span>{order.shippingAddress.postalCode}</span>
                                        <br />
                                        <span>{order.shippingAddress.country}</span>
                                </p>
                                {order.trackingNumber && order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> : order.trackingNumber && !order.isDelivered ? <Message variant='dark'><strong>Tracking number: </strong><Link to={{ pathname: `https://www.google.com/search?q=${order.trackingNumber}` }} target="_blank">{order.trackingNumber}</Link></Message> : <Message variant='secondary'>No tracking information</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3>Payment</h3>
                            <h6><strong>Total: </strong>${order.totalPrice}</h6>
                            <Row className="my-3"> 
                                <Col md ={4}>
                                    {order.isPaid? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Not Paid</Message>}
                                </Col>
                                <Col>
                                {!order.isPaid &&(
                                    <ListGroup.Item>
                                        {loadingPay && <Loader></Loader>}
                                        {isPending ? <Loader></Loader> : (
                                            <PayPalScriptProvider>
                                            <PayPalButtons
                                            createOrder={createOrder}
                                            onApprove={onApprove}
                                            onError={onError}>
                                            </PayPalButtons>
                                            </PayPalScriptProvider>
                                        )}
                                    </ListGroup.Item>
                                )}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                    <ProgressBar variant = {order.isDelivered ? 'success' : 'primary'} className='progress-bar-striped progress-bar-animated'
                    now={order.isPaid ? 50 : order.isShipped ? 75 : order.isDelivered ? 100 : 25}></ProgressBar>
                    <Row className = "my-2 justify-content-between align-items-between align-content-between">
                        <Col className='text-center'>
                        {order ? <strong>Ordered</strong> : `Ordered`}
                        </Col>
                        <Col className='text-center'>
                        {order.isPaid ? <strong>Paid</strong> : `Paid`}
                        </Col>
                        <Col className='text-center'>
                        {order.isShipped ? <strong>Shipped</strong> : `Shipped`}
                        </Col>
                        <Col className='text-center'>
                        {order.isDelivered ? <strong>Delivered</strong> : `Delivered`}
                        </Col>
                    </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h3>Order Items</h3>
                        {order.orderItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                                <Row className='align-items-center'>
                                    <Col md={2} >
                                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                                    </Col>
                                    <Col md={8}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        x{item.qty}: ${(item.qty * item.price).toFixed(2)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup.Item>
                </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default OrderScreen