import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from './Message';
import Loader from './Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyEntries, deleteEntry } from '../actions/entryActions';


const UserEntries = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch() 


    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const entryDelete = useSelector(state => state.entryDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = entryDelete

    const entryCreate = useSelector(state => state.entryCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, entry: createdEntry } = entryCreate

    const entryListMy = useSelector((state) => state.entryListMy);
    const { loading: loadingEntries, error: errorEntries, entries } = entryListMy;
  
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

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteEntry(id))
            //Refreshes page after deleting post
            window.location.reload()
        }
    }
 
    return (
      <Row>
        <Col>
        <h2 className='mb-4 font-[400]'>My Posts</h2>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loadingEntries ? (
          <Loader />
        ) : errorEntries ? (
          <Message variant='danger'>{errorEntries}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-md'>
            <thead>
              <tr>
                <th>DATE</th>
                <th>TITLE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {entries && entries.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry.date}</td>
                  <td>{entry.title}</td>
                  <td className='flex items-center justify-around'>
                    <LinkContainer to={`/entry/${entry._id}`}>
                      <Button className='btn-sm' variant='info'>
                        <i className='fas fa-eye'></i>
                      </Button>
                    </LinkContainer>
                    <LinkContainer to={`/entry/${entry._id}/edit`}>
                      <Button variant='warning' className='btn-sm mx-3'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(entry._id)}>
                        <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        </Col>
      </Row>
    )
}

export default UserEntries
