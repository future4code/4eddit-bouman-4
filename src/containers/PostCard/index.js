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
import {push} from 'connected-react-router';
import {routes} from '../Router'
import {connect} from 'react-redux'
import { vote, fetchDetailsPageContent } from "../../actions/Posts"


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
  
function SimpleCard(props) {
    const classes = useStyles();

  
    return (
      <Card className={classes.card} color="primary">
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.username}
          </Typography>

          <Typography variant="body2" component="p">
            {props.text}
          </Typography>
        </CardContent>
        <CardActions >
          <Button
             color={props.userVoteDirection === 1 ? "primary" : "secondary" } 
             onClick={(ev) => props.vote(props.postId, 1,props.userVoteDirection)} 
             size="small"><ArrowUpwardIcon/>
          </Button>

          {props.votesCount}
          
          <Button
            color={props.userVoteDirection === -1 ? "primary" : "secondary" } 
            onClick={(ev) => props.vote(props.postId, -1, props.userVoteDirection)} 
            size="small"> <ArrowDownwardIcon/>
          </Button>

          {props.comments}

          <Button 
            color="secondary" size="small" 
            onClick={() => props.fetchDetailsPageContent (props.postId)}>
            <AddCommentIcon/>
          </Button>
          
        </CardActions>
      </Card>
    );
  }

  function mapDispatchToProps (dispatch) {
      return ({
        fetchDetailsPageContent: (postId) => dispatch (fetchDetailsPageContent(postId)),
        vote: (postId, direction, userVoteDirection) => (dispatch(vote(postId, direction, userVoteDirection)))
      })
  }

export default connect (null, mapDispatchToProps)(SimpleCard)
  