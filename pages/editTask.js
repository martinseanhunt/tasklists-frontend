import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { TASK_QUERY } from './task'

import User from '../components/providers/User'
import EditTaskForm from '../components/Task/EditTaskForm'
import Container from '../components/styles/grid/Container'

const TASKLIST_WITH_FIELDS_QUERY = gql`
  query TASKLIST_WITH_FIELDS_QUERY($slug: String!) {
    taskList(slug: $slug) {
      name
      id
      slug
      description

      taskListFields {
        id
        fieldName
        fieldType
      } 
    }
  }
`

class CreateTask extends Component {  
  render() {
    return(
      <User>
        {({data: userData}) => (
          
          <Query
            query={TASK_QUERY}
            variables={{
              id: this.props.query.id
            }}
          >
            {({data, error, loading}) => {
              if(error) return <p>Oops something went wrong!</p>
              if(loading) return <p>Loading...</p>

              const task = data.task

              return (
                <Query
                  query={TASKLIST_WITH_FIELDS_QUERY}
                  variables={{
                    slug: this.props.query.taskListSlug
                  }}
                >
                  {({data, error, loading}) => {
                    if(error) return <p>Oops something went wrong!</p>
                    if(loading) return <p>Loading...</p>

                    // Fix for clearing cache after creating task
                    if(!data.taskList) return <p>NoData</p>
                    
                    return (
                      <Container noPadd>
                        <EditTaskForm 
                          task={task}
                          taskList={data.taskList}
                          user={userData.me}
                        />
                      </Container>
                    )
                  }}
                </Query>
              )}}
          </Query>
        )}
      </User>
    )
  }
}

export default CreateTask