const initalState = ({
    posts : [],
})

export function postReducer (state = initalState, action) {
    switch (action.type) {
        case "SET_POSTS": 
            return ({
                ...state, posts: action.payload.posts
            }) 
        default:
            return (
                state
            )
    }
}

