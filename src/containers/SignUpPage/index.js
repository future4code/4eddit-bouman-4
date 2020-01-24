import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import { createUser } from '../../actions/Users'
import { connect } from 'react-redux'
import logoCommentario from '../../images/logo-comentario.png'

import { routes } from '../Router'
import { push } from 'connected-react-router'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: white ;
  color: black;
  text-align: right;
  `

const FormStyled = styled.form`
display: flex;
  flex-direction: column;  
`

const SpanStyledCadastro = styled.span`
  color: white;
`

const SpanStyled = styled.span`
  color: #ff7f50;

  :hover{
    font-weight:bold;
    cursor: pointer;
  }

`

class SignUpPage extends Component {
  constructor(props) {
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

  handleUserCreation = ev => {
    ev.preventDefault()
    this.props.createUser(this.state.userName, this.state.email, this.state.password)
  }

  render() {
    return (
      <Container>
        <img alt="Logo Future4" src={logoCommentario} width="300" />
        <FormStyled onSubmit={this.handleUserCreation}>
          <TextField label="Nome de usuário" name="userName" type="text" required variant="outlined"
            value={this.state.userName} onChange={this.handleInputs} />
          <br />

          <TextField label="Email" name="email" type="email" required variant="outlined"
            value={this.state.email} onChange={this.handleInputs} />
          <br />

          <TextField label="Senha" type="password" name="password" required variant="outlined"
            value={this.state.password} onChange={this.handleInputs} />

          <br />

          <Button type="submit" variant="contained" color="primary" >
            <SpanStyledCadastro>Cadastrar</SpanStyledCadastro>
          </Button>
          <br />
        </FormStyled>


        <SpanStyled onClick={this.props.goToLoginPage}>Já tem uma conta?</SpanStyled>

      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return ({
    createUser: (userName, email, password) => dispatch(createUser(userName, email, password)),
    goToLoginPage: () => dispatch(push(routes.root))
  })
}

export default connect(null, mapDispatchToProps)(SignUpPage)