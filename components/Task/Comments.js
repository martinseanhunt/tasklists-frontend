import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'
import styled from 'styled-components'
import Textarea from 'react-textarea-autosize'
import { MentionsInput, Mention } from 'react-mentions'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import linkifyHtml from 'linkifyjs/html'
import { stateToHTML } from 'draft-js-export-html'

import { TASK_QUERY } from '../../pages/task'
import { ALL_USERS_QUERY } from './AssignToUser'

import Widget from '../styles/widget/Widget'
import WidgetHeader from '../styles/widget/WidgetHeader'
import WidgetFooter from '../styles/widget/WidgetFooter'
import WidgetRow from '../styles/widget/WidgetRow'
import Button from '../styles/Button'

import AssignToUser from './AssignToUser'
import Avatar from '../common/Avatar'

// Allows RTE to access window - doesn' need to be server rendered
import dynamic from 'next/dynamic'
const RichTextEditor = dynamic(() => import('../common/RichTextEditor'), {
  ssr: false
})


// TODO create fragment for getting comment 
// info so don't always have to update here when updating in task

const CREATE_COMMENT_MUTATION = gql`
  mutation CREATE_COMMENT_MUTATION($comment: String!, $task: ID!, $richText: String) {
    createComment(
      comment: $comment
      task: $task
      richText: $richText
    ) {
      id
      comment
      createdAt
      richText
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
    editorState: EditorState.createEmpty()
  }

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

    this.setState({ editorState: EditorState.createEmpty() })
  }

  postComment = (createComment, task) => {
    const { editorState } = this.state

    const ContentState = editorState.getCurrentContent()

    createComment({ 
      variables: {
        comment: ContentState.getPlainText(),
        richText: JSON.stringify(convertToRaw(ContentState)),
        task,
      }
    })

  }

  render() {
    const { task, user } = this.props
    return (
      <>
        {task.comments.length > 0 && (
          task.comments.map((comment, i) => {
            const commentToRender = comment.richText 
              ? linkifyHtml(stateToHTML(convertFromRaw(JSON.parse(comment.richText)), {
                  entityStyleFn: (entity) => {
                    const entityType = entity.get('type').toLowerCase()
                    if (entityType === 'mention') {
                      const data = entity.getData()
                      return {
                        element: 'span',
                        attributes: {
                          className: 'mention',
                        },
                        style: {
                        },
                      }
                    }
                  }
                }))
              : linkifyHtml(comment.comment)
            
            return (
              <Comment key={comment.id} last={i+1 === task.comments.length }>
                <CommentHeader>
                  <Avatar user={comment.createdBy} comment/>
                  <div className="meta">
                    <span className="author">{comment.createdBy.name}</span>
                    <span className="date"> {moment(comment.createdAt).fromNow()}</span>
                  </div>
                </CommentHeader>

                <div className="comment" dangerouslySetInnerHTML={{ __html: commentToRender }} />
              </Comment>
            )
          })
        )}

        <AddComment>
          <Query query={ALL_USERS_QUERY}>
            {({data, error, loading}) => (!error && !loading) ? (  
              <RichTextEditor 
                editorState={this.state.editorState} 
                suggestions={data.users.map(user => ({
                  ...user,
                  avatar: user.avatar || '/static/userprofile.jfif'
                }))}  
                onChange={(editorState) => this.setState({ editorState, touched: true })}
                placeholder='Write a comment...'
                noPaddNoBorder
                hideToolbarBeforeFocus
                beenFocused={() => this.setState({ beenFocused: true })}
              /> ) : 'Loading...'}
          </Query>
          
          {this.state.beenFocused && (
            <Controls>
              <div className="flex">
                
              </div>

              <Mutation 
                mutation={CREATE_COMMENT_MUTATION}
                update={this.onCreateComment}
              >
                {(createComment, { data, error, loading }) => {
                  if(error) console.log(error.message)

                  return (
                    <Button
                      disabled={loading}
                      onClick={() => this.postComment(createComment, task.id)}
                    >
                      Add{loading && 'ing'} Comment
                    </Button>
                  )
                }}
              </Mutation>
              
            </Controls>
          )}
        </AddComment>
      </>
    )
  }
}

const InputContainer = styled.div`
  position: relative;
  padding: 20px;
  
  .avatar {
    position: absolute;
    top: 0;
    left: 0;
  }

  textarea {
    border: none;
    outline: none;
  }

  .mentions-input__highlighter strong {
    background: #5490E8;
    opacity: 0.3;
    padding-right: 3px;
  }

  .mentions-input__suggestions {
    border: 1px solid #ededed;
  }

  .mentions-input__suggestions span {
    display: block;
    padding: 10px 20px;

    &:hover {
      background: #ededed;
    }
  }
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
  border: 1px solid #e2e5ed;
  padding: 16px;
  border-radius: 4px;
  background: #fff;
  margin-bottom: ${({last}) => last ? '20px' : '15px'};

  .avatar {
    position: static;
  }

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
    padding-top: 20px;
    margin-top: 20px;
    color: #6D6E70;
    border-top: 1px solid #e2e5ed;

    .mention {
      color: #1665d8;
      &:before {
        content: "@"
      }
    }
  }

  .meta {
    display: inline-block;
    margin-left: 5px;
  }

  .date {
    color: #9EA0A5;
    font-size: 1.2rem;
    display: block;
  }
`

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const AddComment = styled.div`
  border: 1px solid #e2e5ed;
  border-radius: 4px;
  background: #fff;
  box-shadow: inset 0 1px 2px 0 rgba(102, 113, 123, 0.1);
  padding: 16px;
  position: relative; 
`

export default Comments