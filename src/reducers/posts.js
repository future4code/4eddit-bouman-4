const initalState = ({
    posts : [],
    currentPostId: "",
})

export function postReducer (state = initalState, action) {
    switch (action.type) {
        case "SET_POSTS": 
            return ({
                ...state, posts: action.payload.posts
            })
        
        case "SET_DETAILS":
            return ({
                ...state, currentPostId: action.payload.post
            })
            
        default:
            return (
                state
            )
    }
}

