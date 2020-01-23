import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts, createNewPost } from '../../actions/Posts'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PostCard from '../PostCard'
import { routes } from '../Router'
import { push } from 'connected-react-router'
import CircularProgress from '@material-ui/core/CircularProgress';


const FeedContainer = styled.div`
    margin:auto;
    >*{margin:10px };   
    display:flex;
    flex-wrap:wrap;    
    justify-content: space-around; 
`

const FormStyled = styled.form`
    padding: 2px;    
    display: flex;
    justify-content: center;
    width:100%;
`


class FeedPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            postText: "",
        }
    }

    handleInputs = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount() {

        const token = window.localStorage.getItem("token")

        if (token) {          
            this.props.fetchPosts()
        } else {
            this.props.goToLoginPage()
        }

    }

    submitPost = (ev) => {
        this.props.createNewPost(this.state.postText)

    }

    render() {
        return (

            <FeedContainer >
                <FormStyled>
                    <TextField
                        label="Escreva seu post"
                        name="postText"
                        type="text"

                        variant="outlined"
                        value={this.state.postText}
                        onChange={this.handleInputs}
                        required
                    />
                    <br />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onSubmit={this.submitPost}

                    >
                        Enviar
                    </Button>
                </FormStyled>

          

                {this.props.posts.length !== 0 ? this.props.posts.map(
                    post => <PostCard key={post.id} post={post} />
                )
                    : <CircularProgress color="primary" />}


            </FeedContainer>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return ({
        fetchPosts: () => dispatch(fetchPosts()),
        createNewPost: (postText) => dispatch(createNewPost(postText)),
        goToLoginPage: () => dispatch(push(routes.root))
    })
}

function mapStateToProps(state) {
    return ({
        posts: state.postReducer.posts
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);