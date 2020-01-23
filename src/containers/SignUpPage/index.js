import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import {createUser} from '../../actions/Users'
import {connect} from 'react-redux'
import {logoCommentario} from '../../images/4eddit-cadastro.png'

const Container = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: white ;
  color: white;
  `

const FormStyled = styled.form `
display: flex;
  flex-direction: column;  
`

class SignUpPage extends Component {
  constructor(props){
    super(props)
      this.state = {
        email: "",
        password: "",
        userName: "",
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
        
        <img alt="Logo Future4" src={logoCommentario} width="300"/>

        <FormStyled>
            <TextField  label="Nome de usuário" name="userName" type="text" required variant="outlined"
             value={this.state.userName} onChange={this.handleInputs}/>
            <br/>
            
            <TextField  label="email" name="email" type="email" required variant="outlined"
             value={this.state.email} onChange={this.handleInputs}/>
            <br/>

            <TextField  label="password" type="password" name="password" required variant="outlined"
             value={this.state.password} onChange={this.handleInputs}/>

            <Button variant="contained" color="primary" onClick={() => this.props.createUser (
              this.state.userName,this.state.email, this.state.password)}> 
                Cadastrar 
            </Button>
        </FormStyled>

        
      </Container>
    );
  }
}

function mapDispatchToProps (dispatch){
  return ({
    createUser: (userName, email, password) => dispatch (createUser (userName, email, password)),
  })
}

export default connect (null,mapDispatchToProps)(SignUpPage);