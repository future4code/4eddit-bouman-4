import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AddCommentIcon from '@material-ui/icons/AddComment';
import {connect} from 'react-redux'
import { vote, fetchDetailsPageContent } from "../../actions/Posts"
import styled from 'styled-components'


const VoteCount = styled.span`
  color: ${props => props.color}

`




const useStyles = makeStyles({
    card: {
      maxWidth: 375,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  
export function SimpleCard(props) {
    const classes = useStyles();

  const VoteCountColor = () => {
  if (props.post.votesCount > 0) {
    return ('green')
  }else if(props.post.votesCount < 0){
    return ('red')
  }else{
    return ('gainsboro')
  }
}
  
    return (
      <Card className={classes.card} color="primary">
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.post.username}
          </Typography>

          <Typography variant="body2" component="p">
            {props.post.text}
          </Typography>
        </CardContent>
        <CardActions >
          <Button
             color={props.post.userVoteDirection === 1 ? "primary" : "secondary" } 
             onClick={() => props.vote(props.post.id, 1, props.post.userVoteDirection)} 
             size="small"><ArrowUpwardIcon/>
          </Button>

          <VoteCount color={VoteCountColor ()}>{props.post.votesCount}</VoteCount>
          
          <Button
            color={props.post.userVoteDirection === -1 ? "primary" : "secondary" } 
            onClick={() => props.vote(props.post.id, -1, props.post.userVoteDirection)} 
            size="small"> <ArrowDownwardIcon/>
          </Button>

          {props.post.commentsNumber}

          <Button 
            color="secondary" size="small" 
            onClick={() => props.fetchDetailsPageContent (props.post)}>
            <AddCommentIcon/>
          </Button>
          
        </CardActions>
      </Card>
    );
  }

  function mapDispatchToProps (dispatch) {
      return ({
        fetchDetailsPageContent: (post) => dispatch (fetchDetailsPageContent(post)),
        vote: (postId, direction, userVoteDirection) => (dispatch(vote(postId, direction, userVoteDirection)))
      })
  }

export default connect (null, mapDispatchToProps)(SimpleCard)
  