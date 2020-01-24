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
import logo from "../../images/f4-icon.png"


const style = {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 52,
    margin: 17,
    width: 180,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  };

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
    width:90%;
`

const HeaderStyled = styled.div `
    background-color: #F0F8FF;
    width: 100vw;
    height: 18vh;
    margin-bottom: 30px;    
    display: flex;
    img {
        width: 81px;
        height: 100px;
      
    };

`


const StyledP = styled.span`
    font-family: 'Montserrat', sans-serif;
    font-size: 35px;
`

const MainContainer = styled.div`
    background-color: 'white'
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
           <MainContainer>
            <HeaderStyled>
                <img src={logo} alt=""/>
                <StyledP>4eddit</StyledP>
            </HeaderStyled>

            <FeedContainer >
                <FormStyled>
                    <TextField
                        label="Escreva seu post"
                        name="postText"
                        type="text"
                        fullWidth
                        margin="normal"
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
                        style={style}
                    >
                        Enviar
                    </Button>
                </FormStyled>

          

                {this.props.posts.length !== 0 ? this.props.posts.map(
                    post => <PostCard key={post.id} post={post} />
                )
                    : <CircularProgress color="primary" />}


            </FeedContainer>
        </MainContainer> 
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