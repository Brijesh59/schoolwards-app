import { FETCH_EVENTS_REQUEST, FETCH_EVENTS_SUCCESS, FETCH_EVENTS_FAILURE  } 
from './types'
import axios from 'axios' 
import APIs from '../../utils/api'


export const pushEvents = (events) => (
    {
        type: 'PUSH_EVENTS',
        payload: events
    } 
)

export const fetchEventsRequest = () => (
    {
        type: FETCH_EVENTS_REQUEST,
    } 
)

export const fetchEventsSuccess = payload => (
    {
        type: FETCH_EVENTS_SUCCESS,
        payload
    } 
)

export const fetchEventsFailure = errorMsg => (
    {
        type: FETCH_EVENTS_FAILURE,
        payload: errorMsg
    } 
)

// Asyn Action Creator => returns fn
export const fetchEvents = (formData) => {
    const options = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return (dispatch) => {
        dispatch(fetchEventsRequest)
        axios.post(APIs.GET_PENDING_CONTENTS, formData, options)
            .then(async response => {
                if(response.data.device_valid === 'yes'){ 
                    const pendingContents = response.data.pending_objects
                    const events = []
                    pendingContents.map(async (obj) => {
                        const formData = new FormData()
                        formData.append('appname', config.schoolName)
                        const url = `${APIs.GET_EVENT}/${obj.type}/${obj.id}`
                        const response = await axios.post(url, formData, this.options)
                        const data = response.data
                        const NIA_NDA = data.non_interaction_attributes.non_display_attributes
                        const NIA_DA  = data.non_interaction_attributes.display_attributes
                        events.push({
                          id: NIA_NDA.id,
                          title: NIA_DA.title,
                          description: NIA_DA.body,
                          type: NIA_DA.series,
                          to: obj.object_type ==='common' ? 'all' : 'individual',
                          dateTime: NIA_DA.created_on,
                          attatchment: NIA_DA.url != "" ? NIA_DA.url : null,
                          venue: NIA_DA.venue,
                          studentName: obj.student_name,
                          studentId: obj.prn_no
                        })
                    })

                    dispatch(fetchEventsSuccess(events))
                }
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchEventsFailure(errorMsg))
            })
    }
}