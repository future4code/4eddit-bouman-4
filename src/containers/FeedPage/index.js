import React from 'react';
import {connect} from 'react-redux';
import {fetchPosts,createNewPost} from '../../actions/Posts'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PostCard from '../PostCard'



const FormStyled = styled.form `
display: flex;
  flex-direction: column;
  
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


    

componentDidMount () {
    this.props.fetchPosts () 
}    

    render () {
        return (
            <div>
                <FormStyled>
                    <TextField  label="Escreva seu post" name="postText" type="text" required variant="outlined" value={this.state.postText} onChange={this.handleInputs}/>
                    <br/>
                    <Button variant="contained" color="primary" onClick={() => this.props.createNewPost(this.state.postText)}> Enviar </Button>

                </FormStyled>

                {this.props.posts.map(post => (
                    <PostCard 
                        text={post.text} 
                        username={post.username} 
                        key={post.id} 
                        votesCount={post.votesCount} 
                        comments={post.commentsNumber}
                        postId={post.id}
                    />
                )
                    
                    )}                
            </div>
        )
    }
}

function mapDispatchToProps (dispatch){
    return ({
      fetchPosts: () => dispatch (fetchPosts()),
      createNewPost: (postText) => dispatch (createNewPost(postText))
    })
}

function mapStateToProps (state){
    return ({
        posts: state.postReducer.posts
    })
}

export default connect (mapStateToProps, mapDispatchToProps)(FeedPage);