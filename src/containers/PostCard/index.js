import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';
import {push} from 'connected-react-router';
import {routes} from '../Router'
import {connect} from 'react-redux'

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
        <CardActions>
          <Button size="small"><ThumbUpAltIcon/></Button>
          {props.votesCount}
          <Button size="small"><ThumbDownIcon/></Button>
          {props.comments}
          <Button size="small" onClick={props.goToPostDetailsPage}><CommentIcon/></Button>
          
        </CardActions>
      </Card>
    );
  }

  function mapDispatchToProps (dispatch) {
      return ({
        goToPostDetailsPage: () => (dispatch(push(routes.details)))
      })
  }

export default connect (null, mapDispatchToProps)(SimpleCard)
  