import axios from 'axios'
import APIs from './api'
import config from './config'
 
export default class NetworkRequest{
    constructor(){
        this.options = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
    } 
    async getPendingContents(formData){
        try{
            const response = await axios.post(APIs.GET_PENDING_CONTENTS, formData, this.options)
            return response.data
        }
        catch(error){
            return error.message
        }
    }
    async getEvent(eventType, id){
        const formData = new FormData()
        formData.append('appname', config.schoolName)
        try{
            const response = await axios.post(
                `${APIs.GET_EVENT}/${eventType}/${id}`, 
                 formData, this.options)
            return response.data
        }
        catch(error){
            return error.message
        }
    }
}