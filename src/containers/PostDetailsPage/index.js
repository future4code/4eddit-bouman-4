import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createComment, vote } from '../../actions/Posts'
import styled from 'styled-components'
import CommentCard from '../CommentCard'
import { routes } from '../Router/'
import { push } from 'connected-react-router'
import PostCard from '../PostCard'


const Container = styled.div`
    width:100%;
    margin:auto;
    display: grid;
    grid-gap:20px;
    place-content: center;
`
const CommentForm = styled.form`
    display: grid;
    width: 300px;
`

class DetailsPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            newComment: "",
        }
    }

    componentDidMount() {

        if (!this.props.currentPost) {
            this.props.goToFeed()
        }
    }

    handleInputs = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })

    }


    render() {

        return (

            <Container>


                {this.props.posts.filter(
                    post => post.id === this.props.currentPost.id
                ).map(
                    post => <PostCard key={post.id} post={post} />
                )}

                <CommentForm>

                    <TextField
                        label="comentários" name="newComment" type="text"
                        required variant="outlined" value={this.state.newComment}
                        onChange={this.handleInputs}>
                    </TextField>


                    <Button type="submit" variant="contained" color="primary" onSubmit={() => this.props.createComment(this.props.currentPost, this.state.newComment)}> Comentar </Button>

                </CommentForm>
                {this.props.currentPostComments.map(
                    comment => (<CommentCard comment={comment} currentPostId={this.props.currentPost.id} />)
                )}
            </Container>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return ({
        createComment: (currentPostId, newComment) => dispatch(createComment(currentPostId, newComment)),
        goToFeed: () => dispatch(push(routes.feed)),
        vote: (currentPostId, direction, userVoteDirection) => dispatch(vote(currentPostId, direction, userVoteDirection)),

    })
}

function mapStateToProps(state) {
    return ({
        currentPost: state.postReducer.currentPost,
        currentPostComments: state.postReducer.currentPostComments,
        posts: state.postReducer.posts
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage)

