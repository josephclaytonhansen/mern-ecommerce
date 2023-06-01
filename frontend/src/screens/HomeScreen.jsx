import React from 'react'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {Container, Row, Col } from 'react-bootstrap'
import { useGetProductsQuery } from '../slices/productsApiSlice'

export default function HomeScreen(){
    const { data:products, isLoading, error } = useGetProductsQuery()

    return (
        <>
        { isLoading ? (
            <h2><Loader /></h2>
        ) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (
            <>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
            </>
        ) }
            
        </>
    )
}