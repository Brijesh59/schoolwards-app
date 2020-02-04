import { PUSH_STUDENT } from './types'
 
export const pushStudent = (student) => (
    {
        type: PUSH_STUDENT,
        data: student
    }
)