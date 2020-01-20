import Axios from "axios"
import {routes} from '../../containers/Router'
import {push} from 'connected-react-router'

export const fetchPosts  = () => async (dispatch) => {
    const token = window.localStorage.getItem("token")
    const response = await Axios.get (
        "https://us-central1-missao-newton.cloudfunctions.net/fourEddit/posts",

        {
            headers: {
                "Content-Type": "application/json",
                "auth": token
            } 
        },
    )
    
    dispatch (setPosts(response.data.posts))
}

const setPosts = (posts) => ({
    type: "SET_POSTS",
    payload: {
        posts
    }
})

export const createNewPost = (postText) => async (dispatch) => {
    const token = window.localStorage.getItem("token")
    const response = await Axios.post (
        "https://us-central1-missao-newton.cloudfunctions.net/fourEddit/posts",
        
        {
            "text": postText,
            "title": "Titulo!"
        },

        {
            headers: {
                "Content-Type": "application/json",
                "auth": token
            } 
        },

    )

    dispatch (fetchPosts())
}