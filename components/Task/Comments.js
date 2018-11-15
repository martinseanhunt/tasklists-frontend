import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'
import styled from 'styled-components'
import Textarea from 'react-textarea-autosize'

import { TASK_QUERY } from '../../pages/task'

import Widget from '../styles/widget/Widget'
import WidgetHeader from '../styles/widget/WidgetHeader'
import WidgetFooter from '../styles/widget/WidgetFooter'
import WidgetRow from '../styles/widget/WidgetRow'
import Button from '../styles/Button'

import AssignToUser from './AssignToUser'
import Avatar from '../common/Avatar'

// TODO create fragment for getting comment 
// info so don't always have to update here when updating in task

const CREATE_COMMENT_MUTATION = gql`
  mutation CREATE_COMMENT_MUTATION($comment: String!, $task: ID!, $notify: ID) {
    createComment(
      comment: $comment
      task: $task
      notify: $notify
    ) {
      id
      comment
      createdAt
      createdBy {
        id
        name
        avatar
      }
      assets {
        id
      }
    }
  }
`

// TODO implement @user in post body instead of having to select from dropdown.

// TODO attatching assets to comments

// TODO better error handling

class Comments extends Component {
  state = {
    value: '',
    assignedTo: null
  }

  handleUserChange = (e) => this.setState({
    assignedTo: e ? e.value : null
  })

  onCreateComment = (cache, { data }) => {
    const task = cache.readQuery({
      query: TASK_QUERY,
      variables: { id: this.props.task.id }
    })

    cache.writeQuery({
      query: TASK_QUERY,
      variables: { id: this.props.task.id },
      data: { task: {
        ...task.task,
        comments: [
          ...task.task.comments, 
          data.createComment
        ]
      }}
    })

    this.setState({ value: '', assignedTo: null })
  }

  render() {
    const { task, user } = this.props
    return (
      <Widget marginTop>
        <WidgetHeader>
          <h3>Discussion</h3>

          {/* TODO user avatars who are invlolved */}
        </WidgetHeader>
        
        {task.comments.length > 0 && (
          <WidgetRow>
            {task.comments.map(comment => (
              <Comment key={comment.id}>
                <Avatar user={comment.createdBy} comment xs/>
                <span className="author">{comment.createdBy.name}</span>
                <span className="date"> {moment(comment.createdAt).fromNow()}</span>
                <div className="comment">{comment.comment}</div>
              </Comment>
            ))}
          </WidgetRow>
        )}

        <WidgetFooter isForm>
          <InputContainer>
            <Avatar user={user}/>
            <CommentInput 
              onChange={e => this.setState({ value: e.target.value })}
              placeholder='Write a comment...'
              value={this.state.value}
            />
          </InputContainer>
          {this.state.value.length > 0 && (
            <Controls>
              <div className="flex">
                <span>Notify: </span>

                <SelectUser>
                  <AssignToUser name="user" onChange={this.handleUserChange}/>
                </SelectUser>
              </div>

              <Mutation 
                mutation={CREATE_COMMENT_MUTATION}
                variables={{
                  comment: this.state.value,
                  task: task.id,
                  notify: this.state.assignedTo
                }}
                update={this.onCreateComment}
              >
                {(createComment, { data, error, loading }) => {
                  if(error) console.log(error.message)

                  return (
                    <Button
                      disabled={loading}
                      onClick={createComment}
                    >
                      Add{loading && 'ing'} Comment
                    </Button>
                  )
                }}
              </Mutation>
              
            </Controls>
          )}
        </WidgetFooter>
      </Widget>
    )
  }
}

const InputContainer = styled.div`
  position: relative;
  padding: 5px 10px 5px 40px;
  
  div {
    position: absolute;
    top: 0;
    left: 0;
  }
`

const CommentInput = styled(Textarea)`
  border: none;
  max-height: 700px;
  width: 100%;
  display: block;
  outline: none;
  resize: none;
`

const Controls = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  text-align: right;
  border-top: 1px solid #e2e5ed;
  display: flex;
  justify-content: space-between;
  

  .flex {
    display: flex;
    align-items: center;
    flex: 1;
  }
`

const SelectUser = styled.div`
  flex: 1;
  padding-right: 190px;
  padding-left: 10px;
`

const Comment = styled.div`
  border-bottom: 1px solid #EBECEE;
  padding: 30px 0;
  margin-left: 35px;
  position: relative;

  p {
    margin: 0;
  }

  &:last-of-type {
    border: none;
  }

  .author {
    font-weight: 500;
  }

  .comment {
    padding-top: 8px;
    color: #6D6E70;
  }

  .date {
    color: #9EA0A5;
    font-size: 1.2rem;
    padding-left: 5px;
  }
`

export default Comments