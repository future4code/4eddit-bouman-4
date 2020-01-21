import React from 'react'
import {connect} from 'react-redux'

class DetailsPage extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            newComment: "",
        }
    }

    render () {
        return(
            <div>

                {this.props.post.comments.map(
                    comment => comment.text
                )}

            </div>
            
        )
    }

}

function mapStateToProps (state)  {
    return ({
        post: state.postReducer.currentPostId

    })
}


export default connect (mapStateToProps) (DetailsPage)

