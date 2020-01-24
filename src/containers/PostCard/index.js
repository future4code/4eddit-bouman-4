import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AddCommentIcon from '@material-ui/icons/AddComment';
import { connect } from 'react-redux'
import { vote, fetchDetailsPageContent } from "../../actions/Posts"
import styled from 'styled-components'
import Badge from '@material-ui/core/Badge';



const VoteCount = styled.span`
  color: ${props => props.color};  
  font-weight: bold;
`

const useStyles = makeStyles({
  card: {
    width: 300,
    display: 'flex',       
  }, 
  title: {
    fontSize: 14,
  },  

  pos: {
    marginBottom: 12,
  },
});

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  align-items: center;
  background-color: aliceblue;
`

export function SimpleCard(props) {
  const classes = useStyles();

  const VoteCountColor = () => {
    if (props.post.votesCount > 0) {
      return ('blue')
    } else if (props.post.votesCount < 0) {
      return ('red')
    } else {
      return ('gainsboro')
    }
  }

  return (
    <Card className={classes.card} color="primary">
      <FlexContainer>
        <FlexContainer>
          <Button
            color={props.post.userVoteDirection === 1 ? "primary" : "secondary"}
            onClick={() => props.vote(props.post.id, 1, props.post.userVoteDirection)}
            size="small"
          >
            <ArrowUpwardIcon />
          </Button>

          <VoteCount color={VoteCountColor()}>{props.post.votesCount}</VoteCount>

          <Button
            color={props.post.userVoteDirection === -1 ? "primary" : "secondary"}
            onClick={() => props.vote(props.post.id, -1, props.post.userVoteDirection)}
            size="small"> <ArrowDownwardIcon />
          </Button>
        </FlexContainer>

        <Button
          color="secondary" size="small"

          onClick={() => props.fetchDetailsPageContent(props.post, "/feed/")}

        >
          <Badge badgeContent={props.post.commentsNumber} color="primary">
            <AddCommentIcon />
          </Badge>
        </Button>
      </FlexContainer>
      <CardContent>

        <Typography variant="h5" component="h2">
          {props.post.username}
        </Typography>

        <Typography variant="body2" component="p">
          {props.post.text}
        </Typography>

      </CardContent>

    </Card>
  );
}

function mapDispatchToProps(dispatch) {
  return ({

    fetchDetailsPageContent: (post, currentPage) => dispatch(fetchDetailsPageContent(post, currentPage)),

    vote: (postId, direction, userVoteDirection) => (dispatch(vote(postId, direction, userVoteDirection)))
  })
}

export default connect(null, mapDispatchToProps)(SimpleCard)
