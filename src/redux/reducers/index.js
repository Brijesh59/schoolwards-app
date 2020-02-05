import {combineReducers } from 'redux'
import EventReducer from './eventReducer'
import StudentReducer from './studentReducer'
import IsLoggedReducer from './isLoggedReducer'

const allReducers = combineReducers({
    studentReducer: StudentReducer,
    eventReducer: EventReducer,
    isLoggedReducer: IsLoggedReducer
})

export default allReducers;