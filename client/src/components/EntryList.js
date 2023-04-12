
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listEntries, deleteEntry, createEntry, listMyEntries } from '../actions/entryActions';

const EntryList = () => {
    const dispatch = useDispatch()
    const history = useNavigate()

    const entryList = useSelector(state => state.entryList)
    const { loading, error, entries } = entryList

    const entryDelete = useSelector(state => state.entryDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = entryDelete

    const entryCreate = useSelector(state => state.entryCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, entry: createdEntry } = entryCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const entryListMy = useSelector(state => state.entryListMy)
    const { loading: loadingEntry, error: errorEntry, entries: entriesListMy } = entryListMy


    useEffect(() => {
        dispatch({ type: 'ENTRY_CREATE_RESET' })
        if (!userInfo) {
            history('/login')
        } 

        if(successCreate) {
            history(`/entry/${createdEntry._id}/edit`)
        } else {
            dispatch(listEntries())
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdEntry])

    // const createEntryHandler = () => {
    //     dispatch(createEntry())
    // }

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteEntry(id))
        }
    }

    return (
        <>
        <Row className='w-full items-center'>
            <Col>
                <h1 className='mb-4'>My Posts:</h1>
            </Col>
            <Row>
                <Col className='text-right'>
                    {/* <Button className='my-3' variant='success' onClick={createEntryHandler}>
                        <i className='fas fa-plus'></i> Create New Post
                    </Button> */}
                </Col>
            </Row>
        </Row>
         {loadingDelete && <Loader />}
         {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
         {loadingCreate && <Loader />}
         {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
         {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Table striped bordered hover responsive className='table-xs'>
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>TITLE</th>
                        <th>AUTHOR</th>
                        <th>DATE</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {entries.map((entry) => (
                        <tr key={entry._id}>
                            {/* <td>{entry._id}</td> */}
                            <td>{entry.title}</td>
                            <td>{entry.author}</td>
                            <td>{entry.date}</td>
                            <td>
                                <LinkContainer to={`/entry/${entry._id}/edit`}>
                                    <Button variant='info' className='btn-sm mx-3'>
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
            
        </>
    )
}

export default EntryList
