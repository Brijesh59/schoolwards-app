import {PUSH_STUDENT} from '../actions/types'

const initialState = {
    students: []
}

const studentReducer = (state = initialState, action) => {
    switch(action.type){
        case PUSH_STUDENT: 
            return {
                ...state,
                students: [...state.students, Math.random()*10]
            }   
        default: 
            return state
    }
}

export default studentReducer;