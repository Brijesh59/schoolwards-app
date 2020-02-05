import {FETCH_EVENTS_REQUEST, FETCH_EVENTS_SUCCESS, FETCH_EVENTS_FAILURE} from '../actions/types'
import AsyncStorage from '@react-native-community/async-storage'

const initialState = {
    loading: false,
    events: [],
    error: ''
}

const eventReducer = async(state = initialState, action) => {
    switch(action.type){
        case FETCH_EVENTS_REQUEST: 
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case FETCH_EVENTS_SUCCESS: 
            const events = await selectDataFromPayload(action.payload)
            return {
                ...state,
                isLoading: false,
                events,
                error: ''
            }
        case FETCH_EVENTS_FAILURE: 
            return {
                ...state,
                isLoading: false,
                error: action.payload
            } 
        case 'PUSH_EVENTS': 
            return {
                ...state,
                events: action.payload,
            }        
        default: 
            return state
    }
}


async function selectDataFromPayload(payload){
    const dataToSave = {
        students: [],
        events: []
    }
    const cachedData = await AsyncStorage.getItem('cachedData')
    const JSONData = JSON.parse(cachedData)
    dataToSave.events = [...payload, ...JSONData.events]
    dataToSave.students = [...JSONData.students]

    await AsyncStorage.setItem('cachedData', JSON.stringify(dataToSave))

    return payload
}

export default eventReducer;