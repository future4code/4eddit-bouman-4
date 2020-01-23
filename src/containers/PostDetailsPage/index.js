import React from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import TextField from '@material-ui/core/TextField';
import { createComment, vote, voteAndUpdate } from '../../actions/Posts'
import styled from 'styled-components'
import CommentCard from '../CommentCard'
import { routes } from '../Router/'
import { push } from 'connected-react-router'
import AddCommentIcon from '@material-ui/icons/AddComment';
import { makeStyles } from '@material-ui/core/styles';


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
                <Card>
                    <CardContent>

                        <Typography variant="h5" component="h2">
                            {this.props.currentPost.username}
                        </Typography>

                        <Typography variant="body2" component="p">
                            {this.props.currentPost.text}
                        </Typography>

                    </CardContent>

                    <Button
                        color={this.props.currentPost.userVoteDirection === 1 ? "primary" : "secondary"}
                        onClick={() => this.props.voteAndUpdate(this.props.currentPost, +1)}
                        size="small"><ArrowUpwardIcon />
                    </Button>

                    <VoteCount color={VoteCountColor()}>{this.props.currentPost.votesCount}</VoteCount>

                    <Button
                        color={this.props.currentPost.userVoteDirection === -1 ? "primary" : "secondary"}
                        onClick={() => this.props.voteAndUpdate(this.props.currentPost, -1)}
                        size="small"> <ArrowDownwardIcon />
                    </Button>

                    {this.props.currentPost.commentsNumber}

                    {" Comentários"}
                </Card>


                <form>

                    <TextField
                        label="comentários" name="newComment" type="text"
                        required variant="outlined" value={this.state.newComment}
                        onChange={this.handleInputs}>
                    </TextField>

                    <Button variant="contained" color="primary" onClick={() => this.props.createComment(this.props.currentPost, this.state.newComment)}> Comentar </Button>

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
        voteAndUpdate: (post, direction) => dispatch(voteAndUpdate(post, direction))
    })
}

function mapStateToProps(state) {
    return ({
        currentPost: state.postReducer.currentPost,
        currentPostComments: state.postReducer.currentPostComments
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage)

