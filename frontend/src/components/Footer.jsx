import React from 'react'
import {Container, Row, Col } from 'react-bootstrap'

export default function Footer(){
    return (
        <footer>
            <Container fluid className = "bg-dark text-light">
                <Row>
                    <Col className = 'text-center py-3'>
                        Copyright &copy; Joseph Hansen
                    </Col>
                </Row>

            </Container>
        </footer>
    )
}