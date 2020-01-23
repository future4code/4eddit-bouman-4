import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import {submit} from '../../actions/Users'
import {connect} from 'react-redux'
import {push} from 'connected-react-router'
import {routes} from '../Router'
import logo from "../../images/4eddit-logo.png"

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
const SpanStyledLogin = styled.span `
    color: white;
  `
const SpanStyledSignUp = styled.span `
  color: #ff7f50;
`


class LoginPage extends Component {
  constructor(props){
    super(props)
      this.state = {
        email: "",
        password: "",
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
        <img alt="Logo Future4" src={logo} width="300" />
        
        <FormStyled>
            <TextField  label="email" name="email" type="email" required variant="outlined" 
              value={this.state.email} onChange={this.handleInputs}/>

            <br></br>
            <TextField  label="password" type="password" name="password" required variant="outlined"
              value={this.state.password} onChange={this.handleInputs}/>
            <br/>

            <Button type="submit" variant="contained" color="primary" onSubmit={() => this.props.submit 

              (this.state.email, this.state.password)}> 
              <SpanStyledLogin> Entrar </SpanStyledLogin> 
            </Button>
            <br/>
            <Button variant="outlined" color="primary" onClick={this.props.goToSignUp}>
              <SpanStyledSignUp>Cadastre-se</SpanStyledSignUp>
            </Button>
        </FormStyled>        
      </Container>
    );
  }
}

function mapDispatchToProps (dispatch){
  return ({
    submit: (email, password) => dispatch (submit (email, password)),
    goToSignUp: () => dispatch (push(routes.signUp))
  })
}

export default connect (null,mapDispatchToProps)(LoginPage);