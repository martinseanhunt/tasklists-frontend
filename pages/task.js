import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Select from 'react-select'
import moment from 'moment'
import { Link } from '../routes'
import styled from 'styled-components'

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

import User from '../components/providers/User'
import Avatar from '../components/common/Avatar'
import BreadCrumb from '../components/styles/BreadCrumb'
import Comments from '../components/Task/Comments'

// TODO design this page

// TODO Change close task terminology to archive task

// TODO limit edit, close re-open etc by permission

// Fix button flash when component is no longer loading but query has not yet been refetched

// TODO refetch tasklist after changing task status

// QUESTION Is this query too big? Should I seperate out the comments in to it's own query? 

// TODO /  QUESTION I believe that putting the queries at the page level here is stopping the loading state from working correctly because the page isn't loading at all until the query resolves. Should move these queries to the component level

const TASK_QUERY = gql`
  query TASK_QUERY($id: ID!) {
    task(id: $id) {
      id
      title
      description
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
      assets {
        id
        assetUrl
        assetType
      }
      taskList {
        name
        slug
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

const UPDATE_TASK_STATUS = gql`
  mutation UPDATE_TASK_STATUS($id: ID!, $status: TaskStatus!) {
    updateTaskStatus(id: $id, status: $status) {
      id
    }
  }
`

const SUBSCRIBE_TO_TASK = gql`
  mutation SUBSCRIBE_TO_TASK($task: ID!) {
    subscribeToTask(task: $task) {
      subscribedUsers {
        id
        name
        avatar
      }
    }
  }
`

const UNSUBSCRIBE_FROM_TASK = gql`
  mutation UNSUBSCRIBE_FROM_TASK($task: ID!) {
    unsubscribeFromTask(task: $task) {
      subscribedUsers {
        id
        name
        avatar
      }
    }
  }
`

const TaskPage = ({ query }) => (
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
            return (
              <Container>
                <BreadCrumb>
                  <Link route='tasklist' params={{ slug: task.taskList.slug }}><a>«{task.taskList.name}</a></Link>
                </BreadCrumb>

                {/* TODO refactor these two operations to use same mutation nad move in to own compoennt  */}

                {task.subscribedUsers && task.subscribedUsers.filter(u => u.id === userData.me.id).length ? (
                  <Mutation
                    mutation={UNSUBSCRIBE_FROM_TASK}
                    variables={{ task: task.id }}
                    update={(cache, { data: unsubscribeFromTask }) => {
                      cache.writeQuery({
                        query: TASK_QUERY,
                        variables: { id: task.id },
                        data: { task: {
                          ...task,
                          subscribedUsers: [
                            ...unsubscribeFromTask.unsubscribeFromTask.subscribedUsers
                          ]
                        }
                      }})
                    }}
                  >
                    {(unsubscribeFromTask, {data, error, loading}) => {
                      if(error) console.log(error)
                      
                      return (
                        <Button
                          onClick={unsubscribeFromTask}
                          disabled={loading}
                        >
                          Unsubscribe from task
                        </Button>
                      )
                    }}
                  </Mutation>
                ) : (
                  <Mutation
                    mutation={SUBSCRIBE_TO_TASK}
                    variables={{ task: task.id }}
                    update={(cache, { data: subscribeToTask }) => {
                      console.log(subscribeToTask)
                      cache.writeQuery({
                        query: TASK_QUERY,
                        variables: { id: task.id },
                        data: { task: {
                          ...task,
                          subscribedUsers: [
                            ...subscribeToTask.subscribeToTask.subscribedUsers
                          ]
                        }
                      }})
                    }}
                  >
                    {(subscribeToTask, {data, error, loading}) => {
                      if(error) console.log(error)
                      
                      return (
                        <Button
                          onClick={subscribeToTask}
                          disabled={loading}
                        >
                          Subscribe to Task
                        </Button>
                      )
                    }}
                  </Mutation>
                )}

                <Row>
                  <Col>
                    <Widget>
                      <WidgetHeader noFlex notFixed>
                        <h1>{task.title}</h1>
                        <p> 
                          {task.createdBy.name} created this task on {moment(task.createdAt).format('MMM Do YYYY')}
                        </p>
                        
                      </WidgetHeader>
                      
                      <TaskMeta>
                        <div>
                          <span className="label">Status: </span>  <span>{task.status}</span>
                        </div>

                        <div>
                          <span className="label">Due: </span>  <span>{task.due} {task.dueDate && moment(task.dueDate).format('MMM Do YYYY')}</span>
                        </div>

                        <div>
                          <span className="label">Assigned to: </span>  
                          <span>
                            {task.assignedTo 
                              ? <Avatar user={task.assignedTo}/>
                              : 'None'
                            }
                            
                          </span>
                        </div>

                        {task.customFields.length > 0 && (
                          task.customFields.map(cf => (
                            <div key={cf.id}>
                              <span className="label">{cf.fieldName}:</span> 
                              <span>{cf.fieldValue}</span>
                            </div>
                          ))
                       )}
                      </TaskMeta>

                      <WidgetRow>
                        <p>{task.description}</p>
                      </WidgetRow>

                      {(['ADMIN', 'SUPERADMIN'].includes(userData.me.role)
                      || task.createdBy.id === userData.me.id
                      || (task.assignedTo && task.assignedTo.id === userData.me.id)) 
                      && (
                        <Mutation
                          mutation={UPDATE_TASK_STATUS}
                          variables={{
                            id: task.id,
                            // TODO refactor this and move in to setStatus function
                            // there are more complicated use cases to account for
                            status: ['COMPLETED', 'CLOSED'].includes(task.status) 
                              ? task.assignedTo ? 'ASSIGNED' : 'CREATED'
                              : 'COMPLETED'
                          }}
                          onCompleted={() => refetch()}
                        >
                        {( updateTaskStatus, updateStatus ) => {
                          if(updateStatus.error) return <p>Oops, something went wrong</p>

                          return (
                              <WidgetFooter>
                                <div className="controls">
                                  <Button>
                                    Edit
                                  </Button>
                                  {!['COMPLETED', 'CLOSED'].includes(task.status) && (
                                    <Button cancel>
                                      Close Task
                                    </Button>
                                  )}
                                </div>
                                {['COMPLETED', 'CLOSED'].includes(task.status) ? (
                                  <Button primary
                                    onClick={updateTaskStatus}
                                    disabled={updateStatus.loading}
                                  >
                                    Re-Open{updateStatus.loading && 'ing'} Task
                                  </Button>
                                ) : (
                                  <Button secondary
                                    onClick={updateTaskStatus}
                                    disabled={updateStatus.loading}
                                  >
                                    Complet{updateStatus.loading ? 'ing' : 'e'} Task
                                  </Button>
                                )}
                                
                              </WidgetFooter>
                            ) 
                          }}
                        </Mutation>
                      )
                    }
                    </Widget>

                    <Comments 
                      task={task}
                      user={userData.me}
                    />
                  </Col>
                  <Col division='fourths'>
                   
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
                            <a href={a.assetUrl} target="__blank">{a.assetUrl}</a>
                          </li>
                        ))
                      )}
                    </SidebarRow>

                   
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

export default TaskPage
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