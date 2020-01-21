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

          {props.post.votesCount}
          
          <Button
            color={props.post.userVoteDirection === -1 ? "primary" : "secondary" } 
            onClick={() => props.vote(props.post.id, -1, props.post.userVoteDirection)} 
            size="small"> <ArrowDownwardIcon/>
          </Button>

          <Button 
            color="secondary" size="small" 
            onClick={() => props.fetchDetailsPageContent (props.post.id)}>
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
  