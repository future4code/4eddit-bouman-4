import React from 'react'
import {connect} from 'react-redux'

class DetailsPage extends React.Component {
    constructor(props){
        super(props)
        
        this.state = {
            newComment: "",
        }
    }

    render () {
        return(
         <input></input>   
        )
    }

}

export default connect () (DetailsPage)

