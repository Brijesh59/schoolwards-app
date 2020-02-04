import {PUSH_EVENT, PUSH_STUDENT} from './types'

export const pushEvent = (event) => (
    {
        type: PUSH_EVENT,
        data: event
    }
)
