import React from 'react'
import { useState } from 'react'
import Product from '../components/Product'
import { useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Container, Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap'
import { useParams, Link, useHistory } from 'react-router-dom'
import Rating from '../components/Rating'
import { useGetProductDetailsQuery } from '../slices/productsApiSlice'
import { addToCart } from '../slices/cartSlice'


export default function ProductScreen(){
    
    const { id: productId } = useParams()
    const { data:product, isLoading, error } = useGetProductDetailsQuery(productId)

    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    const history = useHistory()


    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty}))
        history.push('/cart')
    }

    return (
        <>
            <Link className='btn btn-light my-3' to = "/">&lt; Back</Link>

            { isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (
                <Row>
                <Col md = {6}>
                    <Image fluid src = {product.image} alt={product.image}></Image>
                </Col>
                <Col md = {6}>
                    <ListGroup variant ='flush'>
                        <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value = {product.rating} text = {`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                        <ListGroup.Item>
                                <Row>
                                    
                                    <Col>{product.description}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status: </Col>
                                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row><Col>Qty</Col><Col>
                                    <Form.Control as='select' value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                                        {[...Array(product.countInStock).keys()].map((x) => (<option key={x+1} value={x+1}>{x+1}</option>))}
                                    </Form.Control>
                                    </Col></Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button className='btn-block' type='button' onClick={addToCartHandler}
                                 disabled = {product.countInStock <= 0} >Add to Cart</Button>
                            </ListGroup.Item>
                    </ListGroup>
                </Col>
            
            </Row>
            ) }


            
        </>
    )
}