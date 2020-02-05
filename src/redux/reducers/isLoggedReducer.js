
import {IS_LOGGED} from '../actions/types'

const initialState = {
    isLogged: false
}

const isLoggedReducer = (state = initialState, action) => {
    switch(action.type){
        case IS_LOGGED:
            return !state.isLogged
        default: 
            return state
    }   
}

export default isLoggedReducer;

