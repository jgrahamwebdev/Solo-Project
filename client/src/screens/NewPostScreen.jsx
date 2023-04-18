
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listEntryDetails, updateEntry, deleteEntry } from '../actions/entryActions'


const NewPostScreen = () => {
    const { id } = useParams(); 
    const history = useNavigate()
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [date, setDate] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const entryDetails = useSelector((state) => state.entryDetails)
    const { loading, error, entry } = entryDetails

    const entryUpdate = useSelector((state) => state.entryUpdate)
    const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    } = entryUpdate

    useEffect(() => {  
        if(successUpdate) {
          dispatch({ type: 'ENTRY_UPDATE_RESET' })
          dispatch({type: 'ENTRY_DETAIL_RESET'})
          history('/profile')
          //Refreshes page after deleting post
          window.location.reload()
        } else {
            if (!entry.title || entry._id !== id) {
              dispatch(listEntryDetails(id))
            } else {
              setTitle(entry.title)
              setAuthor(entry.author)
              setDate(entry.date)
              setImage(entry.image)
              setDescription(entry.description)
            }
        }
        
      }, [dispatch, history, id, entry, successUpdate])


    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
    
        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
    
          const { data } = await axios.post('/api/upload', formData, config)
    
          setImage(data)
          setUploading(false)
        } catch (error) {
          console.error(error)
          setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateEntry({
            _id: id,
            title,
            author,
            date,
            image,
            description,
        }))
    }

    const deleteHandler = (id) => {
      if (window.confirm(`You have not clicked 'Submit Post' yet, are you sure you want to cancel your post?`)) {
          dispatch(deleteEntry(id))
      }
    }

    return (
        <>
        <FormContainer>
        <h1>Create New Post:</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='title'>
                <Form.Label>Title:</Form.Label>
                <Form.Control type='text' placeholder='Enter title' value={title} onChange={(e) => setTitle(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='author' className='my-3'>
                <Form.Label>Author:</Form.Label>
                <Form.Control type='text' placeholder='Full Name' value={author} onChange={(e) => setAuthor(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='date' className='my-3'>
                <Form.Label>Date:</Form.Label>
                <Form.Control type='text' placeholder='Month Day, Year' value={date} onChange={(e) => setDate(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='image' className='my-3'>
              <Form.Label>Image:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
             <Form.Control type='file'
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='description' className='my-3'>
                <Form.Label>Post:</Form.Label>
                <Form.Control as="textarea" rows={5} type='text' placeholder='Write post here' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='success' className='my-3 mr-4'>
                Submit Post
            </Button>

            <Link to='/profile'>
              <Button type='submit' variant='danger' className='my-3' onClick={() => deleteHandler(entry._id)}>
                Cancel
              </Button>
            </Link>
        </Form>
        )}
    </FormContainer>
    </>
    )
}

export default NewPostScreen
