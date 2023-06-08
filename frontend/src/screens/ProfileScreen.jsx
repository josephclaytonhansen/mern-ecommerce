import { useProfileMutation } from "../slices/usersApiSlice"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table, Form, Button, Row, Col, Container, Card } from "react-bootstrap"
import {Link, useLocation, useHistory} from 'react-router-dom'
import Message from "../components/Message"
import Loader from "../components/Loader"
import { toast } from "react-toastify"
import PasswordStrengthBar from 'react-password-strength-bar'
import { setCredentials } from "../slices/authSlice"
import { useGetMyOrdersQuery } from '../slices/ordersApi'
import {FaTimes, FaCheck} from 'react-icons/fa'

const ProfileScreen = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch()
    const history = useHistory()

    const { userInfo } = useSelector(state => state.auth)

    const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation()

    const {data: orders, isLoading: loadingOrders, error: errorOrders} = useGetMyOrdersQuery()

    useEffect(() => {
        if(userInfo){
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    }, [userInfo.name, userInfo.email]) //runs only when userInfo.name or userInfo.email changes

    const submitHandler = async(e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error("Passwords do not match")
        }else {
            try{
                const res = await updateProfile({_id:userInfo._id, name, email, password}).unwrap()
                dispatch(setCredentials(res))
                toast.success("Profile updated")
            } catch(err){
                toast.error(err?.data?.message || err.error)
            }

        }
    }

    return(
        <Container>
            <Row className="justify-content-md-center my-2">
                <Col md={3}>
                    <h3>User Profile</h3>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name" className="my-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="email" className="my-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="password" className="my-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                        <PasswordStrengthBar password={password} minLength={8}/>
                        <Form.Group controlId="confirmPassword" className="my-2">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm new password" value={''} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary" className="my-3 w-100">Update</Button>
                        {loadingUpdateProfile && <Loader/>}
                    </Form>

                </Col>
                <Col md={9}>
                    <h3>My Orders</h3>
                    {loadingOrders ? <Loader/> : errorOrders ? <Message variant="danger">{errorOrders?.data?.message || errorOrders.error}</Message> : (
                        <Table striped hover responsive className='align-items-center align-content-center justify-content-center table-sm text-center'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Shipped</th>
                                    <th>Delivered</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.map((order) => (
                                    <tr key={order._id} onClick={()=> {history.push(`/order/${order._id}`)}} style={{cursor:'pointer'}}>
                                        <td>{order._id && (<Link to={`/order/${order._id}`}>{parseInt(order._id.substr(18), 16)}</Link>)}</td>
                                        <td>{order.createdAt.substring(0,10)}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>{order.isPaid ?  <i className="fas fa-check" style={{color: "green"}}></i>: <i className="fas fa-times" style={{color: "red"}}></i>}</td>
                                        <td>{order.isShipped ?  <i className="fas fa-check" style={{color: "green"}}></i>: <i className="fas fa-times" style={{color: "red"}}></i>}</td>
                                        <td>{order.isDelivered ?  <i className="fas fa-check" style={{color: "green"}}></i>: <i className="fas fa-times" style={{color: "red"}}></i>}</td>
                                        </tr>
                                ) )}
                            </tbody>
                            </Table>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default ProfileScreen