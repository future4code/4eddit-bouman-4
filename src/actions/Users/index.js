import Axios from "axios"
import {routes} from '../../containers/Router'
import {push} from 'connected-react-router'

export const submit = (email,password) => async (dispatch) => {
    const response = await Axios.post (
        "https://us-central1-missao-newton.cloudfunctions.net/fourEddit/login",
        {
            "email" : email,
            "password" : password
        },

        {
            headers: {
                "Content-Type": "application/json"
            } 
        }

    )
    
    window.localStorage.setItem("token", response.data.token)
    dispatch (push(routes.feed))
}


export const createUser = (userName,email,password) => async (dispatch) => {
    const response = await Axios.post (
        "https://us-central1-missao-newton.cloudfunctions.net/fourEddit/signup",
        {
            "email" : email,
            "password" : password,
            "username": userName
        },

        {
            headers: {
                "Content-Type": "application/json"
            } 
        }

    )
    console.log(response)
}



