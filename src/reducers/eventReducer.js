import {PUSH_EVENT} from '../actions/types'

const initialState = {
    events: []
}

const eventReducer = (state = initialState, action) => {
    switch(action.type){
        case PUSH_EVENT: 
            return {
                ...state,
                events: [...state.events, Math.random()*10]
            }   
        default: 
            return state
    }
}

export default eventReducer;