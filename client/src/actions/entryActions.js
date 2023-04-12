import axios from 'axios'

//FOR HOMESCREEN 
export const listEntries = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: 'ENTRY_LIST_REQUEST' })

        // const { data } = await axios.get('/entries')
        const { data } = await axios.get(`/entries?keyword=${keyword}`)

        dispatch({ 
            type: 'ENTRY_LIST_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'ENTRY_LIST_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

//FOR ENTRY DETAILS PAGE
export const listEntryDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'ENTRY_DETAILS_REQUEST' })

        const { data } = await axios.get(`/entries/${id}`)

        dispatch({ 
            type: 'ENTRY_DETAILS_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'ENTRY_DETAILS_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

//DELETE a entry
export const deleteEntry = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ENTRY_DELETE_REQUEST'
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {                          
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/entries/${id}`, config)

        dispatch({
            type: 'ENTRY_DELETE_SUCCESS',
        })
       
    } catch (error) {
        dispatch({
            type: 'ENTRY_DELETE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


//CREATE a entry
export const createEntry = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ENTRY_CREATE_REQUEST'
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {                          
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/entries`, {}, config)

        dispatch({
            type: 'ENTRY_CREATE_SUCCESS',
            payload: data
        })
       
    } catch (error) {
        dispatch({
            type: 'ENTRY_CREATE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

//UPDATE a entry
export const updateEntry = (entry) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ENTRY_UPDATE_REQUEST'
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {     
                'Content-Type': 'application/json',                     
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/entries/${entry._id}`, entry, config)

        dispatch({
            type: 'ENTRY_UPDATE_SUCCESS',
            payload: data
        })

        dispatch({
            type: 'ENTRY_DETAILS_SUCCESS',
            payload: data,
          })
       
    } catch (error) {
        dispatch({
            type: 'ENTRY_UPDATE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const listMyEntries = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'ENTRY_LIST_MY_REQUEST'
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {                          
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/entries/myentries`, config)

        dispatch({
            type: 'ENTRY_LIST_MY_SUCCESS',
            payload: data
        })
       
    } catch (error) {
        dispatch({
            type: 'ENTRY_LIST_MY_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}