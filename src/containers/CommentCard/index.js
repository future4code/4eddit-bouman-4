import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {connect} from 'react-redux'
import {voteComment} from '../../actions/Posts'

const useStyles = makeStyles({
  card: {
    minWidth: 275,
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
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
            {props.comment.username}
        </Typography>

        <Typography variant="body2" component="p">
            {props.comment.text}
        </Typography>
      </CardContent>
      
      <CardActions>
          <Button
             color={props.comment.userVoteDirection === 1 ? "primary" : "secondary" } 
             onClick={() => props.voteComment(props.comment.id, 1, props.comment.userVoteDirection, props.currentPost.id, props.currentPost)} 
             size="small"><ArrowUpwardIcon/>
          </Button>

            {props.comment.votesCount}
          
          <Button
            color={props.comment.userVoteDirection === -1 ? "primary" : "secondary" } 
            onClick={() => props.voteComment(props.comment.id, -1, props.comment.userVoteDirection, props.currentPost.id,props.currentPost)} 
            size="small"> <ArrowDownwardIcon/>
          </Button>

      </CardActions>
    </Card>
  );
}

function mapDispatchToProps (dispatch) {
    return({
        voteComment:(commentId, direction, userVoteDirection, postId, currentPost) => dispatch (voteComment(commentId, direction, userVoteDirection, postId,currentPost))
    })
}

function mapStateToProps (state) {
    return({
        currentPost: state.postReducer.currentPost
    })
}

export default connect (mapStateToProps, mapDispatchToProps) (SimpleCard)
