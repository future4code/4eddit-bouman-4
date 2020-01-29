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

export const fetchDetailsPageContent = (post, currentPage) => async (dispatch) => {
    const token = window.localStorage.getItem("token")
    try {
        const response = await Axios.get (
            `https://us-central1-missao-newton.cloudfunctions.net/fourEddit/posts/${post.id}/`,
            
            {
                headers: {
                    "Content-Type": "application/json",
                    "auth": token
                } 
            },
        
            
        
        )
        
        dispatch (setDetailsPageContent (response.data.post.comments, post))
        
        if ( currentPage === routes.feed ) {
            dispatch (push (routes.details))
        }    
        
           
    }
    
    catch (error) {
        console.log(error)
        alert("ERRO QUANDO CLIQUEI NO COMENTARIO")
        
    }
}

const setDetailsPageContent = (comments, post) => ({
    type: "SET_DETAILS",
    payload: {
        comments, post
    }
})

export const createComment =  (post, newComment)=> async (dispatch) => {
    const token = window.localStorage.getItem("token")
    try{
        await Axios.post (
            `https://us-central1-missao-newton.cloudfunctions.net/fourEddit/posts/${post.id}/comment`,
            { 
                "text": newComment
            },

            {
                headers: {
                    "Content-Type": "application/json",
                    "auth": token
                } 
            },


            )

        alert("Sucesso!")
        dispatch(fetchDetailsPageContent(post))

    }catch{
        alert('Ocorreu um erro')
    }
}

export const voteComment =  (commentId, direction, userVoteDirection, postId, currentPost) => async (dispatch) => {
    const token = window.localStorage.getItem("token")
    if (userVoteDirection === direction){
        try {
            await Axios.put (
                `https://us-central1-missao-newton.cloudfunctions.net/fourEddit/posts/${postId}/comment/${commentId}/vote`,
                
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
          dispatch(fetchDetailsPageContent(currentPost))    
        }
        catch (error) {
            alert("Ocorreu um erro, tente novamente")
            console.log(error)
        }
    }
    else{
        try {
            await Axios.put (
                `https://us-central1-missao-newton.cloudfunctions.net/fourEddit/posts/${postId}/comment/${commentId}/vote`,
                
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
            
        dispatch(fetchDetailsPageContent(currentPost)) 

        } catch (error) {
            alert("Ocorreu um erro, tente novamente")
            console.log(error)
        }
    }
}

