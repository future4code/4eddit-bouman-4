import Axios from "axios"
import {routes} from '../../containers/Router'
import {push} from 'connected-react-router'

export const fetchPosts  = () => async (dispatch) => {
    const token = window.localStorage.getItem("token")
    try {
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
    } catch (error) {
        alert("Ocorreu um erro, recarregue a página")
        console.log(error)
    }
   
}

const setPosts = (posts) => ({
    type: "SET_POSTS",
    payload: {
        posts
    }
})

export const createNewPost = (postText) => async (dispatch) => {
    const token = window.localStorage.getItem("token")
    try {
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
        alert("Sucesso!")    
        dispatch (fetchPosts())
    } catch (error) {
        alert("Ocorreu um erro, tente novamente")
        console.log(error)
    }
   
}

export const vote = (postId, direction, userVoteDirection) => async (dispatch) => {
    const token = window.localStorage.getItem("token")    
    if (userVoteDirection === direction){
        try {
            await Axios.put (
                `https://us-central1-missao-newton.cloudfunctions.net/fourEddit/posts/${postId}/vote`,
                
                {
                    "direction": 0,               
                },
        
                {
                    headers: {
                        "Content-Type": "application/json",
                        "auth": token
                    } 
                },
        
            )
                dispatch(fetchPosts())
        }
        catch (error) {
            alert("Ocorreu um erro, tente novamente")
            console.log(error)
        }
    }
    else{
        try {
            await Axios.put (
                `https://us-central1-missao-newton.cloudfunctions.net/fourEddit/posts/${postId}/vote`,
                
                {
                    "direction": direction,               
                },
        
                {
                    headers: {
                        "Content-Type": "application/json",
                        "auth": token
                    } 
                },
        
            )
            dispatch(fetchPosts())
        } catch (error) {
            alert("Ocorreu um erro, tente novamente")
            console.log(error)
        }
    }
}

export const fetchDetailsPageContent = (postId) => async (dispatch) => {
    const token = window.localStorage.getItem("token")
    try {
        const response = await Axios.get (
            `https://us-central1-missao-newton.cloudfunctions.net/fourEddit/posts/${postId}/`,
            
            {
                headers: {
                    "Content-Type": "application/json",
                    "auth": token
                } 
            },
        
            
        
        )
            console.log(response.data.post)
        dispatch (setDetailsPageContent(response.data.post))
        dispatch (push(routes.details))    
    }
    
    catch (error) {
        alert("Ocorreu um erro, tente novamente")
        console.log(error)
    }
}

const setDetailsPageContent = (post) => ({
    type: "SET_DETAILS",
    payload: {
        post
    }
})