import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import {submit} from '../../actions/Users'
import {connect} from 'react-redux'
import {push} from 'connected-react-router'
import {routes} from '../Router'
import logo from "../../images/logo.png"

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



class LoginPage extends Component {
  constructor(props){
    super(props)
      this.state = {
        email: "",
        password: "",
      }
  }

  componentDidUpdate () {
    
  }

handleInputs = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  })
}
  



  render() {
    return (
      <Container>
        <img src={logo} width="300" />
        
        <FormStyled>
            <TextField  label="email" name="email" type="email" required variant="outlined" value={this.state.email} onChange={this.handleInputs}/>
            <br></br>
            <TextField  label="password" type="password" name="password" required variant="outlined" value={this.state.password} onChange={this.handleInputs}/>
            
            <Button variant="contained" color="primary" onClick={() => this.props.submit (this.state.email, this.state.password)}> Logar </Button>
        </FormStyled>

        <Button variant="contained" color="primary" onClick={this.props.goToSignUp}> Cadastrar </Button>
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