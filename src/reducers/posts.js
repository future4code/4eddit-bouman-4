const initalState = ({
    posts : [],
    currentPostComments: [],
    currentPost: "",
})

export function postReducer (state = initalState, action) {
    switch (action.type) {
        case "SET_POSTS": 
            return ({
                ...state, posts: action.payload.posts
            })
        
        case "SET_DETAILS":
            return ({
                ...state, currentPostComments: action.payload.comments,
                          currentPost: action.payload.post

            })
            
        default:
            return (
                state
            )
    }
}

