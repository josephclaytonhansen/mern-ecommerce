import React from 'react'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Container, Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import Rating from '../components/Rating'
import { useGetProductDetailsQuery } from '../slices/productsApiSlice'


export default function ProductScreen(){
    
    const { id: productId } = useParams()
    const { data:product, isLoading, error } = useGetProductDetailsQuery(productId)

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
                            <ListGroup.Item>
                                <Button className='btn-block' type='button' disabled = {product.countInStock <= 0} >Add to Cart</Button>
                            </ListGroup.Item>
                    </ListGroup>
                </Col>
            
            </Row>
            ) }


            
        </>
    )
}