import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import { FaTrash } from 'react-icons/fa'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../slices/cartSlice'

const CartScreen = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart
    const cartPrice = useSelector((state) => state.cart.itemsPrice)
    const itemsCount = parseInt(cartItems.reduce((acc, item) => acc + item.qty, 0))
    
    
    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({...product, qty}))
    }

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=/shipping')
    }

    return (
        <Row className='my-5'>
            <Col md={8}>
                <h1  className='mb-4'>Cart</h1>
                {cartItems.length === 0 ? (
                    <Message>Your cart is empty<br/><Link to="/">Go Back</Link></Message>
                ) : (
                    <ListGroup variant='flush'>
                        { cartItems.map((item) => (
                            <ListGroup.Item key= {item._id}>
                                <Row>
                                    <Col md='2'>
                                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                                    </Col>
                                    <Col md='3'>
                                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                                    </Col>
                                    <Col md='2'>${item.price}</Col>
                                    <Col md ='2'>
                                    <Form.Control as='select' value={item.qty} onChange={(e) => addToCartHandler(item, e.target.value)}>
                                        {[...Array(item.countInStock).keys()].map((x) => (<option key={x+1} value={x+1}>{x+1}</option>))}
                                    </Form.Control>
                                    </Col>
                                    <Col md='2'>
                                        <Button type='button' onClick = {() => removeFromCartHandler(item._id)} variant='light'><FaTrash /></Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md ='4'>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row><Col><h2>Subtotal</h2><h3>${cartPrice}</h3></Col>
                            <Col><h2>{itemsCount} item{itemsCount > 1 && 's'}</h2></Col>
                            </Row>
                            
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button classname='btn-block' type = 'button' disabled ={itemsCount <= 0} onClick ={checkoutHandler}>Proceed to Checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen