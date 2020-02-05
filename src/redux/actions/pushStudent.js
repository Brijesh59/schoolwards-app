import { FETCH_STUDENTS_REQUEST, FETCH_STUDENTS_FAILURE, FETCH_STUDENTS_SUCCESS  } 
from './types'
import axios from 'axios' 
import APIs from '../../utils/api'


export const pushStudents = (students) => (
    {
        type: 'PUSH_STUDENTS',
        payload: students
    } 
)

export const fetchStudentsRequest = () => (
    {
        type: FETCH_STUDENTS_REQUEST,
    } 
)

export const fetchStudentsSuccess = students => (
    {
        type: FETCH_STUDENTS_SUCCESS,
        payload: students
    } 
)

export const fetchStudentsFailure = errorMsg => (
    {
        type: FETCH_STUDENTS_FAILURE,
        payload: errorMsg
    } 
)

// Asyn Action Creator => returns fn
export const fetchStudents = (formData) => {
    const options = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return (dispatch) => {
        dispatch(fetchStudentsRequest())
        axios.post(APIs.VERIFY_OTP, formData, options)
            .then(async response => {
                if(response.data.response === 'success'){ 
                    const students = response.data.students
                    const commonEvents = response.data.common_events
                    const payload = {
                        students: students,
                        commonEvents: commonEvents
                    }
                    await dispatch(fetchStudentsSuccess(payload))
                }
            })
            .catch(error => {
                const errorMsg = error.message
                console.log("Error in fetch", errorMsg)
                dispatch(fetchStudentsFailure(errorMsg))
            })
    }
}