import React from 'react';
import styled from 'styled-components'
import logo from "../../../images/f4-icon.png"
import { connect } from 'react-redux'
import { push, goBack } from 'connected-react-router'
import Button from '@material-ui/core/Button'

const HeaderStyled = styled.div`
    background-color: #F0F8FF;
    height: 18vh;
    margin-bottom: 30px;    
    display: flex;
    justify-content: space-between;
    width: 97.8vw;
    img {
        width: 81px;
        height: 100px;
      
    };
    padding-right: 5px;
`

const StyledP = styled.span`
    font-family: 'Montserrat', sans-serif;
    font-size: 35px;
`

export default connect(
    null,
    dispatch => ({
        goBack: () => dispatch(goBack()),
        logOut: () => {
            window.localStorage.clear()
            return dispatch(push("/"))
        }
    })
)(
    function Headers(props) {
        return (
            <HeaderStyled>
                <div>
                    <img src={logo} alt="" />
                    <StyledP>4eddit</StyledP>
                </div>
                <div>
                    <Button color="primary" onClick={props.goBack}>Voltar</Button>
                    <Button color="primary" onClick={props.logOut}>Sair</Button>
                </div>

            </HeaderStyled>
        )
    }
)