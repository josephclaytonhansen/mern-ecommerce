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

const ProfileScreen = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch()

    const { userInfo } = useSelector(state => state.auth)

    const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation()

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
                            <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                        <PasswordStrengthBar password={password} minLength={8}/>
                        <Form.Group controlId="confirmPassword" className="my-2">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" value={''} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary" className="my-3 w-100">Update</Button>
                        {loadingUpdateProfile && <Loader/>}
                    </Form>

                </Col>
                <Col md={9}></Col>
            </Row>
        </Container>
    )
}

export default ProfileScreen