import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import {createUser} from '../../actions/Users'
import {connect} from 'react-redux'



const Container = styled.div `
  display: flex;
  flex-direction: column;
  `

const FormStyled = styled.form `
display: flex;
  flex-direction: column;
  
`


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));



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
        <FormStyled>
            <TextField  label="Nome de usuário" name="userName" type="text" required variant="outlined" value={this.state.userName} onChange={this.handleInputs}/>
            <br/>
            <TextField  label="email" name="email" type="email" required variant="outlined" value={this.state.email} onChange={this.handleInputs}/>
            <br/>
            <TextField  label="password" type="password" name="password" required variant="outlined" value={this.state.password} onChange={this.handleInputs}/>
        </FormStyled>

        <Button variant="contained" color="primary" onClick={() => this.props.createUser (this.state.userName,this.state.email, this.state.password)}> Cadastrar </Button>
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