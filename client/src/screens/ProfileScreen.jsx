
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyEntries } from '../actions/entryActions';
import UserEntries from '../components/UserEntries';


const ProfileScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch() 

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    // const entryListMy = useSelector(state => state.entryListMy)
    // const { loading: loadingEntry, error: errorEntry, entries } = entryListMy

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyEntries())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user])
 
    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
           dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }

    return (
       <Row className='pl-4 w-full flex items-center justify-center'>
        {/* <Col md={3}>
            <h2 className='font-[400]'>My Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {success && <Message variant='success'>Update successful!</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type='name' placeholder='Full name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword' className='my-3'>
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button className='my-3' type='submit' variant='info'>
                    Update Info
                </Button>
            </Form>
        </Col> */}

        <Col md={9}>
          <UserEntries />
        </Col>
     </Row>
    )
}

export default ProfileScreen
