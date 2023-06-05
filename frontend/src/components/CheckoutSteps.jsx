import {Nav, ProgressBar, Container} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'

const CheckoutSteps = ({step1, step2, step3, step4}) => {
    return (
        <Container>
        <Nav className='justify-content-between my-3'>
            <Nav.Item>
                {step2 ? (
                    <Nav.Link><Link to='/shipping'>Shipping</Link></Nav.Link>
                ) : (
                    <Nav.Link disabled>Shipping</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <Nav.Link><Link to='/payment'>Payment</Link></Nav.Link>
                ) : (
                    <Nav.Link disabled>Payment</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <Nav.Link><Link to='/login'>Place Order</Link></Nav.Link>
                ) : (
                    <Nav.Link disabled>Place Order</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
        <ProgressBar now={step1 ? 25 : step2 ? 50 : step3 ? 75 : 100} variant='success' className='mt-3 mb-5'></ProgressBar>
        </Container>
    )
}

export default CheckoutSteps