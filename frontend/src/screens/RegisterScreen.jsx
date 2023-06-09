import {useState, useEffect} from 'react'
import {Link, useLocation, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import PasswordStrengthBar from 'react-password-strength-bar'
import { useRegisterMutation } from '../slices/usersApiSlice'
import {setCredentials} from '../slices/authSlice'
import {toast} from 'react-toastify'

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()

    const [register, { isLoading}] = useRegisterMutation()

    const { userInfo } = useSelector((state) => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo){
            history.push(redirect)
        }
    }, [userInfo, redirect, history])

    const submitHandler = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword){
            toast.error("Passwords do not match", {position:'top-right', autoClose:1500, draggable:false})
            return
        } else {
            try {
                const res = await register({name, email, password}).unwrap()
                dispatch(setCredentials({...res}))
                history.push((redirect))
                
            } catch (error) {
                toast.error("Invalid credentials", {position:'top-right', autoClose:1500, draggable:false})
            }
            
        }

        
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name' className='my-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    type='text'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <PasswordStrengthBar password={password} minLength={8}/>
                <Form.Group controlId='confirmPassword' className='my-3'>
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='my-3' disabled = {isLoading} > 
                    Sign Up
                </Button>

                {isLoading && <Loader />}
            </Form>

            <Row className='py-3'>
                <Col>
                    Existing Customer? <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>Log in</Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default RegisterScreen