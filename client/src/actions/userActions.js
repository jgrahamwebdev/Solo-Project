
import axios from 'axios';

//LOGIN
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: 'USER_LOGIN_REQUEST'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/users/login', { email, password }, config)

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: 'USER_LOGIN_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

//LOGOUT
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: 'USER_LOGOUT' })
    document.location.href = '/'
}

//REGISTER
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: 'USER_REGISTER_REQUEST'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/users', { name, email, password }, config)

        dispatch({
            type: 'USER_REGISTER_SUCCESS',
            payload: data
        })
        //Logs user in automatically if registration is successful
        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: 'USER_REGISTER_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

//profile DETAILS
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'USER_DETAILS_REQUEST'
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/users/${id}`, config)

        dispatch({
            type: 'USER_DETAILS_SUCCESS',
            payload: data
        })
       
    } catch (error) {
        dispatch({
            type: 'USER_DETAILS_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

//UPDATE profile
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'USER_UPDATE_PROFILE_REQUEST'
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put('/users/profile', user, config)

        dispatch({
            type: 'USER_UPDATE_PROFILE_SUCCESS',
            payload: data
        })
       
    } catch (error) {
        dispatch({
            type: 'USER_UPDATE_PROFILE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}