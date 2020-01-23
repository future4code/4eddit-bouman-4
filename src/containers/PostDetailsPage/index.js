import React from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import TextField from '@material-ui/core/TextField';
import { createComment, vote } from '../../actions/Posts'
import styled from 'styled-components'
import CommentCard from '../CommentCard'
import { routes } from '../Router/'
import { push } from 'connected-react-router'
import { makeStyles } from '@material-ui/core/styles';
import PostCard from '../PostCard'


const Container = styled.div`
    margin-left: 30px;
`
const useStyles = makeStyles({
    card: {
        maxWidth: 375,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});



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

        const VoteCount = styled.span`
            color: ${props => props.color}
            `




        const VoteCountColor = () => {
            if (this.props.currentPost.votesCount > 0) {
                return ('green')
            } else if (this.props.currentPost.votesCount < 0) {
                return ('red')
            } else {
                return ('gainsboro')
            }
        }

        return (

            <Container>
                
                {this.props.posts.filter(
                    post => post.id === this.props.currentPost.id
                ).map(
                    post => <PostCard key={post.id} post={post} />
                )}

                <form>

                    <TextField
                        label="comentários" name="newComment" type="text"
                        required variant="outlined" value={this.state.newComment}
                        onChange={this.handleInputs}>
                    </TextField>

                    <Button type="submit" variant="contained" color="primary" onSubmit={() => this.props.createComment(this.props.currentPost, this.state.newComment)}> Comentar </Button>

                    {this.props.currentPostComments.map(
                        comment => (<CommentCard comment={comment} currentPostId={this.props.currentPost.id} />)
                    )}


                </form>

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

