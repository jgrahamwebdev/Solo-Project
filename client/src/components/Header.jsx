
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';
import { listEntries, createEntry } from '../actions/entryActions';

const Header = () => {
    const dispatch = useDispatch()
    const history = useNavigate()

    const entryCreate = useSelector(state => state.entryCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, entry: createdEntry } = entryCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        dispatch({ type: 'ENTRY_CREATE_RESET' })

        if(successCreate) {
            history(`/entry/${createdEntry._id}/new`)
        } else {
            dispatch(listEntries())
        }
    }, [dispatch, history, userInfo, successCreate, createdEntry])

    const logoutHandler = () => {
        dispatch(logout())
    }

    const createEntryHandler = () => {
        dispatch(createEntry())
    }

    return (
        <header className='mb-4'>
        {/*variant changes the font color to be opposite of dark making font light */}
        <Navbar className='h-[4.5rem]' bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>  
                {/* LOGO */}
                <LinkContainer to="/">
                    <img className='h-10 w-auto mr-8 cursor-pointer' src='./img/logo.png' />              
                </LinkContainer>  

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                   
                   {/* <SearchBox  /> */}
                   
                    {/* ms-auto pushes links to far right of container */}
                    <Nav className="ms-auto"> 
                            {userInfo ? (
                                <div className='w-full h-[3rem] flex items-center justify-start py-4 mr-4'>
                                   <button className='bg-[#2ECC40] text-white font-[400] p-2 rounded-[6px] max-sm:text-[15px]' onClick={createEntryHandler}>
                                        + Create new post
                                    </button>
                                </div>
                                ) : (
                                <div></div>
                            )}   

                            {userInfo ? (
                                <NavDropdown className='flex items-center justify-center font-[400] text-[1rem]' title={`Hi, ${userInfo.name}`} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login" className='relative'>
                                    <Nav.Link>
                                        <img src='./img/robot.png' className='absolute right-[4rem] w-[25px] h-auto'/>Log In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </header>
    )
}

export default Header




