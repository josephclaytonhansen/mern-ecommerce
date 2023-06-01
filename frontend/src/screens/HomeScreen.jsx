import React from 'react'
import Product from '../components/Product'
import {Container, Row, Col } from 'react-bootstrap'
import { useGetProductsQuery } from '../slices/productsApiSlice'

export default function HomeScreen(){
    const { data:products, isLoading, error } = useGetProductsQuery()

    return (
        <>
        { isLoading ? (
            <h2>Loading...</h2>
        ) : error ? (<div>{error?.data?.message || error.error}</div>) : (
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