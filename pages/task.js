import React, { Component } from 'react'
import { Query, Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Select from 'react-select'
import moment from 'moment'
import { Link } from '../routes'
import styled from 'styled-components'
import Confetti from 'react-dom-confetti'
import {stateToHTML} from 'draft-js-export-html'
import { convertFromRaw } from 'draft-js'
import linkifyHtml from 'linkifyjs/html'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Router } from '../routes'

import Row from '../components/styles/grid/Row'
import Col from '../components/styles/grid/Col'
import Container from '../components/styles/grid/Container'
import SidebarRow from '../components/styles/sidebar/SidebarRow'
import Controls from '../components/styles/sidebar/Controls'
import Button from '../components/styles/Button'
import Widget from '../components/styles/widget/Widget'
import WidgetHeader from '../components/styles/widget/WidgetHeader'
import WidgetFooter from '../components/styles/widget/WidgetFooter'
import WidgetRow from '../components/styles/widget/WidgetRow'
import SubHeader from '../components/layout/SubHeader'
import SectionHeader from '../components/layout/SectionHeader/SectionHeader'

import User from '../components/providers/User'
import Avatar from '../components/common/Avatar'
import BreadCrumb from '../components/styles/BreadCrumb'
import Comments from '../components/Task/Comments'

import clearCache from '../utils/clearCache'
import { TASKLISTS_QUERY } from '../components/TaskLists/TaskLists'

// TODO design this page

// TODO Change close task terminology to archive task

// TODO limit edit, close re-open etc by permission

// Fix button flash when component is no longer loading but query has not yet been refetched

// TODO refetch tasklist after changing task status

// TODO or - even better, invalidate the cache!

// QUESTION Is this query too big? Should I seperate out the comments in to it's own query? 

// TODO /  QUESTION I believe that putting the queries at the page level here is stopping the loading state from working correctly because the page isn't loading at all until the query resolves. Should move these queries to the component level

// TODO change close / complete to status drop down (less ugly)

const TASK_QUERY = gql`
  query TASK_QUERY($id: ID!) {
    task(id: $id) {
      id
      title
      description
      richText
      createdBy {
        name
        id
        avatar
      }
      assignedTo {
        name 
        id
        avatar
      }
      due
      dueDate
      priority
      assets {
        id
        assetUrl
        assetType
        title
      }
      taskList {
        name
        slug
        color
        description
      }
      createdAt
      updatedAt
      customFields {
        id
        fieldName
        fieldValue
        fieldType
      }
      status
      comments {
        id
        comment
        createdAt
        richText
        assets {
          id
        }
        createdBy {
          id
          name
          avatar
        }
      }
      subscribedUsers {
        id
        name
        avatar
      }
    }
  }
`

const confettiConfig = {
  angle: 125,
  spread: 45,
  startVelocity: 45,
  elementCount: 50,
  dragFriction: 0.1,
  duration: 3000,
  delay: 0,
  width: "10px",
  height: "10px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

const UPDATE_TASK_STATUS = gql`
  mutation UPDATE_TASK_STATUS($id: ID!, $status: TaskStatus!) {
    updateTaskStatus(id: $id, status: $status) {
      id
      status
      taskList {
        slug
      }
    }
  }
`

const SUBSCRIBE_TO_TASK = gql`
  mutation SUBSCRIBE_TO_TASK($task: ID!) {
    subscribeToTask(task: $task) {
      id
      taskList {
        slug
      }
      subscribedUsers {
        id
        name
      }
    }
  }
`

const UNSUBSCRIBE_FROM_TASK = gql`
  mutation UNSUBSCRIBE_FROM_TASK($task: ID!) {
    unsubscribeFromTask(task: $task) {
      id
      taskList {
        slug
      }
      subscribedUsers {
        id
        name
        avatar
      }
    }
  }
`

class TaskPage extends Component { 
  state = {
    clearCacheOnUnmount: false,
    status: null
  }

  handleStatusChange = (status, updateTaskStatus, id) => {
    this.setState({ status })
    updateTaskStatus({ variables: {
      id,
      status
    }})
  }

  async componentWillUnmount() {
    if(this.state.clearCacheOnUnmount) {
      await clearCache(this.props.client.cache, true)
    }
  }
  
  render() { 
    const { query } = this.props
    

    return (
      <User>
        {({data: userData, error, loading}) => { 
          if(error) return <p>Something went wrong</p>
          if(loading) return <p>Loading...</p>

          return ( 
            <Query query={TASK_QUERY} variables={{ id: query.id }}>
              {({ data, error, loading, refetch }) => {
                if(error) return <p>Something went wrong</p>
                if(loading) return <p>Loading...</p>

                const { task } = data
                if(!task) return <p>Loading...</p>

                return (
                  <Container noPadd>
                    <SectionHeader 
                      taskList={task.taskList}
                      title={task && task.title}
                      subTitle={`${task.createdBy.name} created this task on ${moment(task.createdAt).format('MMM Do YYYY')}`}
                    >
                      <div>
                          {(userData.me.role === 'SUPERADMIN' || task.createdBy.id === userData.me.id) && (
                            <Button 
                              marginRight='10px'
                              onClick={() => Router.pushRoute('editTask', { 
                                taskListSlug: task.taskList.slug,
                                id: task.id
                              })}
                            >
                              <FontAwesomeIcon icon="pen" /> 
                              Edit Task
                            </Button>
                          )}
                          
                          {task.subscribedUsers && task.subscribedUsers.filter(u => u.id === userData.me.id).length ? (
                            <Mutation
                              mutation={UNSUBSCRIBE_FROM_TASK}
                              variables={{ task: task.id }}
                              onCompleted={() => this.setState({ clearCacheOnUnmount: true })}
                            >
                              {(unsubscribeFromTask, {data, error, loading}) => {
                                if(error) console.log(error)
                                
                                return (
                                  <Button
                                    onClick={unsubscribeFromTask}
                                    disabled={loading}
                                    cancel
                                  > 
                                    <FontAwesomeIcon icon="bell" /> 
                                    Stop Notifications
                                  </Button>
                                )
                              }}
                            </Mutation>
                        ) : (
                          <Mutation
                            mutation={SUBSCRIBE_TO_TASK}
                            variables={{ task: task.id }}
                            onCompleted={() => this.setState({ clearCacheOnUnmount: true })}
                          >
                            {(subscribeToTask, {data, error, loading}) => {
                              if(error) console.log(error)
                              
                              return (
                                <Button
                                  onClick={subscribeToTask}
                                  disabled={loading}
                                  secondary
                                >
                                  <FontAwesomeIcon icon="bell" /> 
                                  Get Notifications
                                </Button>
                              )
                            }}
                          </Mutation>
                        )}
                      </div>
                    </SectionHeader>
                    
                    <Row>
                      <Col>
                        <Heading noMargin>Task Details</Heading>

                        <Description>
                          <Data>
                            <TaskDetailHeader>
                              <Avatar user={task.createdBy} />
                              <div>
                                <span className="author">{task.createdBy.name}</span>
                                <span className="date">Created {moment(task.createdAt).fromNow()}</span>
                              </div>
                            </TaskDetailHeader>
                            {task.richText 
                              ? <div dangerouslySetInnerHTML={{ 
                                  __html: linkifyHtml(stateToHTML(convertFromRaw(JSON.parse(task.richText)), {
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
                                }}/>
                              : <p>{linkifyHtml(task.description)}</p>}
                          </Data>
                        </Description>

                        <Heading>Discussion</Heading>
                        <Comments 
                          task={task}
                          user={userData.me}
                        />
                      </Col>
                      <Col sidebar>

                        <SidebarRow>
                          <Heading noMargin>Status</Heading>

                          {(['ADMIN', 'SUPERADMIN'].includes(userData.me.role)
                          || task.createdBy.id === userData.me.id
                          || (task.assignedTo && task.assignedTo.id === userData.me.id)) 
                            ? (
                              <Mutation
                                mutation={UPDATE_TASK_STATUS}
                                refetchQueries={[{ query: TASKLISTS_QUERY }]}
                                onCompleted={() => this.setState({ clearCacheOnUnmount: true })}
                              >
                              {( updateTaskStatus, updateStatus ) => {
                                return (
                                  <label htmlFor='viewByStatus'> 
                                    <Select 
                                      value={this.state.status || task.status}
                                      options={[
                                        {
                                          value: 'CREATED',
                                          label: 'Created',
                                        },
                                        {
                                          value: 'ASSIGNED',
                                          label: 'Assigned',
                                        },
                                        {
                                          value: 'AWAITINGINPUT',
                                          label: 'Awaiting Input',
                                        },
                                        {
                                          value: 'AWAITINGASSETS',
                                          label: 'Awaiting Assets',
                                        },
                                        {
                                          value: 'AWAITINGFEEDBACK',
                                          label: 'Awaiting Feedback',
                                        },
                                        {
                                          value: 'INPROGRESS',
                                          label: 'In Progress',
                                        },
                                        {
                                          value: 'COMPLETED',
                                          label: 'Completed',
                                        },
                                        {
                                          value: 'CLOSED',
                                          label: 'Closed',
                                        },
                                        {
                                          value: 'CANCELLED',
                                          label: 'Cancelled',
                                        },
                                      ]} 
                                      onChange={(status) => this.handleStatusChange(status.value, updateTaskStatus, task.id)}
                                      name='status'
                                      styles={{ cursor: 'pointer' }}
                                      placeholder={task.status}
                                      className="react-select"
                                    />
                                  </label>
                                ) 
                                }}
                              </Mutation>
                            )
                            : <h3>{this.state.status || task.status}</h3>
                          }
                          
                        </SidebarRow>
                        

                        <SidebarRow>    
                          <h4>Priority</h4>
                          <p>TODO: Design this</p>
                          <strong>{task.priority}</strong>
                        </SidebarRow>
                        

                        <SidebarRow>    
                          <h4>Due Date</h4>
                          <p>TODO: Show due date</p>
                          <strong>TODO</strong>
                        </SidebarRow>
                      
                        <SidebarRow>    
                                
                          <h4>Assigned</h4>
                          <p>This task is assigned to:</p>
                          <strong>{task.assignedTo ? (
                            <>
                              <Avatar user={task.assignedTo} />
                              {task.assignedTo.name}
                            </>
                          ) : <p>None</p>}</strong>
                        </SidebarRow>

                        <SidebarRow>
                          <h4>Attachments</h4>
                          <p>Attachments for the task:</p>
                          {task.assets.length > 0 && (
                            task.assets.map(a => (
                              <li key={a.id}>
                                <a href={a.assetUrl} target="__blank">{a.title} ({a.assetType})</a>
                              </li>
                            ))
                          )}
                        </SidebarRow>

                        {/* Not sure if I want to use this button       
                        <SidebarRow>
                          {(['ADMIN', 'SUPERADMIN'].includes(userData.me.role)
                            || task.createdBy.id === userData.me.id
                            || (task.assignedTo && task.assignedTo.id === userData.me.id)) 
                            && (
                              <Mutation
                                mutation={UPDATE_TASK_STATUS}
                                refetchQueries={[{ query: TASKLISTS_QUERY }]}
                                variables={{
                                  id: task.id,
                                  // TODO refactor this and move in to setStatus function
                                  // there are more complicated use cases to account for

                                  // TODO Refetching is a bit of overkill here... Could do an optimistic
                                  // thing or just manually update the cache on complete
                                  status: ['COMPLETED', 'CLOSED'].includes(task.status) 
                                    ? task.assignedTo ? 'ASSIGNED' : 'CREATED'
                                    : 'COMPLETED'
                                }}
                                onCompleted={() => this.setState({ clearCacheOnUnmount: true })}
                              >
                              {( updateTaskStatus, updateStatus ) => {

                                return (
                                  <>
                                      
                                      {['COMPLETED', 'CLOSED'].includes(task.status) ? (
                                        <Button 
                                          primary
                                          fullWidth
                                          onClick={updateTaskStatus}
                                          disabled={updateStatus.loading}
                                        >
                                          Re-Open{updateStatus.loading && 'ing'} Task
                                        </Button>
                                      ) : (
                                        <Button 
                                          secondary
                                          fullWidth
                                          onClick={updateTaskStatus}
                                          disabled={updateStatus.loading}
                                        >
                                          Complet{updateStatus.loading ? 'ing' : 'e'} Task
                                        </Button>
                                      )}
                                    </>
                                  ) 
                                }}
                              </Mutation>
                            )
                          }
                        </SidebarRow>
                        */} 

                        <Confetti active={ ['COMPLETED'].includes(task.status) } config={ confettiConfig } />

                      </Col>
                    </Row>
                  </Container>
                )
              }}
            </Query>
          )
        }}
      </User>
    )
  }  
}

export default withApollo(TaskPage)
export { TASK_QUERY }

const TaskMeta = styled(WidgetRow)`
  display: flex;
  padding: 10px 0;
  margin: 0 30px;

  div {
    padding: 10px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    &:last-of-type {
      border-right: none;
    }

    span.label {
      color: #9ea0a5;
      font-size: 1.3rem;
      margin-right: 5px;

      &:first-of-type {
        font-size: 1.2rem;
        text-transform: uppercase;
        color: #9ea0a5;
        font-weight: 500;
      }
    }
  }
`

const Heading = styled.span`
  font-size: 1.2rem;
  text-transform: uppercase;
  color: #9ea0a5;
  font-weight: 500;
  display: block;
  margin-top: ${({ noMargin }) => noMargin ? '0' : '20px'};
  padding-bottom: 10px;
`

const Data = styled.div`
  border: 1px solid #e2e5ed;
  padding: 16px;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 20px;
`

const Description = styled.div`
  margin-bottom: 30px;
  p:first-of-type {
    margin-top: 0;
  }

  p:last-of-type {
    margin-bottom: 0;
  }

  span.mention {
    background: rgba(103,88,243,0.08);
    
    &:before {
      content: "@";
      display: inline-block;
      position: relative;
      top: -1px;
    }
  }
  
`

const TaskDetailHeader = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e2e5ed;

  .author { 
    font-weight: 500;
    display: block;
  }

  .date {
    color: #9EA0A5;
    font-size: 1.2rem;
    display: block;
  }
`