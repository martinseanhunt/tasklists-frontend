import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Select from 'react-select'

import Row from '../components/styles/grid/Row'
import Col from '../components/styles/grid/Col'
import Container from '../components/styles/grid/Container'
import SidebarRow from '../components/styles/sidebar/SidebarRow'
import Controls from '../components/styles/sidebar/Controls'
import Button from '../components/styles/Button'

import SubHeader from '../components/layout/SubHeader'
import User from '../components/providers/User'

// TODO design this page

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
              <>
                <SubHeader title={task.taskList.name}>
                  {/* TODO something on the right side... */}
                </SubHeader>

                <Container>
                  <Row>
                    <Col>
                      <h1>{task.title}</h1>
                      <p>Created: {task.createdAt}</p>
                      <p>Updated: {task.updatedAt}</p>
                      {task.createdBy && ( <p>Created By {task.createdBy.name}</p> )}
                      <p>{task.description}</p>
                      <hr/>
                      
                      {task.customFields.length > 0 && (
                        <>
                          <h3>Custom Fields</h3>
                          {task.customFields.map(cf => (
                            <div key={cf.id}>
                              {cf.fieldName}: {cf.fieldValue}
                            </div>
                          ))}
                        </>
                      )}
                    </Col>
                    <Col division='fourths'>
                      <SidebarRow>
                        <h4>Status</h4>
                        <p>Current task status:</p>
                        <strong>{task.status}</strong>
                        
                        <Mutation
                          mutation={UPDATE_TASK_STATUS}
                          variables={{
                            id: task.id,
                            status: 'COMPLETED'
                          }}
                          onCompleted={() => refetch()}
                        >
                        {( updateTaskStatus, updateStatus ) => {
                          if(updateStatus.error) return <p>Oops, something went wrong</p>

                          return (
                            (['ADMIN', 'SUPERADMIN'].includes(userData.me.role)
                            || task.createdBy.id === userData.me.id
                            || (task.assignedTo && task.assignedTo.id === userData.me.id)) 
                              && (
                                <Controls>
                                  <Button secondary
                                    onClick={updateTaskStatus}
                                    disabled={updateStatus.loading}
                                  >
                                    Complete Task
                                  </Button>
                                </Controls>
                              )
                          )
                        }}
                        
                        </Mutation>
                        
                      </SidebarRow>

                      <SidebarRow>
                        <h4>Task Due</h4>
                        <p>This task is due</p>
                        <strong>{task.due} </strong>
                        <strong>{task.dueDate && task.dueDate}</strong>
                      </SidebarRow>
                      
                      <SidebarRow>
                        <h4>Assigned</h4>
                        <p>This task is assigned to:</p>
                        <strong>{task.assignedTo && task.assignedTo.name}</strong>
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

                      <SidebarRow>
                        <Controls>

                          <Button>
                            Edit Task
                          </Button>
                        </Controls>
                      </SidebarRow>
                    </Col>
                  </Row>
                </Container>
              </>
            )
          }}
        </Query>
      )
    }}
  </User>
)

export default TaskPage