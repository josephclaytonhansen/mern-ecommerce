import {Nav, ProgressBar, Container} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'

const CheckoutSteps = ({s}) => {
    return (
        <Container>
        <Nav className='justify-content-between my-3'>
            <Nav.Item>
                {s==3 ? (
                    <Nav.Link><Link to='/shipping'>Shipping</Link></Nav.Link>
                ) : (
                    <Nav.Link disabled>Shipping</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {s==2 ? (
                    <Nav.Link><Link to='/payment'>Payment</Link></Nav.Link>
                ) : (
                    <Nav.Link disabled>Payment</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {s==3 ? (
                    <Nav.Link><Link to='/login'>Place Order</Link></Nav.Link>
                ) : (
                    <Nav.Link disabled>Place Order</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
        <ProgressBar now={s<2 ? 0 : s<3 ? 25 : s<4 ? 55 : 95} variant='success' className='mt-3 mb-5'></ProgressBar>
        </Container>
    )
}

export default CheckoutSteps