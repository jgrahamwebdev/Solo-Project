
//ALL Entries (HOMESCREEN)
export const entryListReducer = (state = { entries: [] }, action) => {
    switch(action.type) {
        case 'ENTRY_LIST_REQUEST':
            return { loading: true, entries: [] }
        case 'ENTRY_LIST_SUCCESS':
            return { loading: false, entries: action.payload }
        case 'ENTRY_LIST_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

//ONE single entry (ENTRY SCREEN PAGE)
export const entryDetailsReducer = (state = { entry: { reviews: []} }, action) => {
    switch(action.type) {
        case 'ENTRY_DETAILS_REQUEST':
            return { loading: true, ...state }
        case 'ENTRY_DETAILS_SUCCESS':
            return { loading: false, entry: action.payload }
        case 'ENTRY_DETAILS_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

//DELETE a entry (ENTRY LIST)
export const entryDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case 'ENTRY_DELETE_REQUEST':
            return { loading: true }
        case 'ENTRY_DELETE_SUCCESS':
            return { loading: false, success: true }
        case 'ENTRY_DELETE_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

//CREATE a entry (ENTRY LIST **HEADER**)
export const entryCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case 'ENTRY_CREATE_REQUEST':
            return { loading: true }
        case 'ENTRY_CREATE_SUCCESS':
            return { loading: false, success: true, entry: action.payload }
        case 'ENTRY_CREATE_FAIL':
            return { loading: false, error: action.payload }
        case 'ENTRY_CREATE_RESET':
            return {}
        default:
            return state
    }
}

//UPDATE a entry (ENTRY LIST)
export const entryUpdateReducer = (state = { entry: {} }, action) => {
    switch(action.type) {
        case 'ENTRY_UPDATE_REQUEST':
            return { loading: true }
        case 'ENTRY_UPDATE_SUCCESS':
            return { loading: false, success: true, entry: action.payload }
        case 'ENTRY_UPDATE_FAIL':
            return { loading: false, error: action.payload }
        case 'ENTRY_UPDATE_RESET':
            return { entry: {} }
        default:
            return state
    }
}

//Get ALL logged in users entry(s)
export const entryListMyReducer = (state = { entry: [] }, action) => {
    switch(action.type) {
        case 'ENTRY_LIST_MY_REQUEST':
            return {
                loading: true
            }
        case 'ENTRY_LIST_MY_SUCCESS':
            return {
                loading: false,              
                entries: action.payload,
            }
        case 'ENTRY_LIST_MY_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        case 'ENTRY_LIST_MY_RESET':
            return { entries: [] }
        default:
            return state
    }
}