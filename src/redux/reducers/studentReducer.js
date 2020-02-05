import { FETCH_STUDENTS_REQUEST, FETCH_STUDENTS_FAILURE, FETCH_STUDENTS_SUCCESS  } 
from '../actions/types'
import AsyncStorage from '@react-native-community/async-storage'

const initialState = {
    isLoading: false,
    students: [],
    events: [],
    error: '',
}

const studentReducer = async(state = initialState, action) => {
    switch(action.type){
        case FETCH_STUDENTS_REQUEST: 
            return {
                ...state,
                isLoading: true
            }
        case FETCH_STUDENTS_SUCCESS: 
            const data = await selectDataFromPayload(action.payload)
            return {
                ...state,
                isLoading: false,
                students: data.students,
                events: data.events,
                error: ''
            }
        case FETCH_STUDENTS_FAILURE: 
            return {
                ...state,
                isLoading: false,
                error: action.payload
            } 
        case 'PUSH_STUDENTS': 
            return {
                ...state,
                students: action.payload,
            }    
        default: 
            return state
    }
}

async function selectDataFromPayload(payload){
    const payloadStudents = payload.students
    const payloadCommonEvents = payload.commonEvents
    const dataToSave = {
        students: [],
        events: []
    }

    // Saving Students details
    payloadStudents.forEach(student => {
        dataToSave.students.push({
            firstName: student.first_name,
            name: `${student.first_name} ${student.middle_name && student.middle_name} ${student.last_name && student.last_name}` ,
            prnNo: student.prn_no,
            dateOfBirth: student.dob,
            gender: student.gender,
            address: `${student.address}, ${student.city}, ${student.pincode}`,
            city: student.city,
            pincode: student.pincode,
            profileImage: student.photo,
            fatherName: student.father_name,
            motherName: student.mother_name,
            fatherEmail: student.father_email,
            motherEmail: student.mother_email,
            fatherMobile: student.father_mobile,
            motherMobile: student.mother_mobile,
            preferenceContact: student.prefence_contact,
            class: student.standard,
            division: student.division,
            rollNo: student.roll_no
        })
    })

    // Saving Individual Student events
    payloadStudents.forEach(student => {
        const studentId = student.prn_no
        const studentName = student.first_name
        student.events.forEach(event => {
            const NIA_NDA = event.non_interaction_attributes.non_display_attributes
            const NIA_DA  = event.non_interaction_attributes.display_attributes
            dataToSave.events.push({
                id: NIA_NDA.id,
                title: NIA_DA.name,
                description: NIA_DA.description,
                type: NIA_DA.series,
                to: 'individual',
                dateTime: NIA_DA.date_time,
                attatchment: NIA_DA.url != "" ? NIA_DA.url : null,
                venue: NIA_DA.venue,
                studentName: studentName,
                studentId: studentId
            })
        })
    })

    // Saving Common events
    payloadCommonEvents.forEach(event => {
        const NIA_NDA = event.non_interaction_attributes.non_display_attributes
        const NIA_DA  = event.non_interaction_attributes.display_attributes
        dataToSave.events.push({
            id: NIA_NDA.id,
            title: NIA_DA.name,
            description: NIA_DA.description,
            type: NIA_DA.series,
            to: 'all',
            dateTime: NIA_DA.date_time,
            attatchment: NIA_DA.url != "" ? NIA_DA.url : null,
            venue: NIA_DA.venue
        })
    })

    await AsyncStorage.setItem('cachedData', JSON.stringify(dataToSave))

    return dataToSave

}

export default studentReducer;