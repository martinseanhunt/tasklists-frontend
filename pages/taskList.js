import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Container from '../components/styles/grid/Container'
import TaskList from '../components/TaskList/TaskList'

// TODO use fragments for getting task info!

const TASKLIST_QUERY = gql`
  query TASKLIST_QUERY($slug: String!) {
    taskList(slug: $slug) {
      name
      id
      slug
      description
    }

    openTasks(taskListSlug: $slug) {
      id
      title
      status
      description
      assignedTo {
        name
        avatar
        id
      }
      createdBy {
        name
        avatar
        id
      }
      subscribedUsers {
        id
        name
        avatar
      }
    }

    completedTasks(taskListSlug: $slug) {
      id
      title
      status
      description
      assignedTo {
        name
        avatar
        id
      }
      createdBy {
        name
        avatar
        id
      }
      subscribedUsers {
        id
        name
        avatar
      }
    }
  }
`

// TODO handle incorrect or missing slug


const TaskListPage = (props) => (
  <Container>
    <Query 
      query={TASKLIST_QUERY}
      variables={{
        slug: props.query.slug    
      }}
    >
      {({data, error, loading}) => {
        if(error) return <p>This is an error</p>
        if(loading) return <p>loading...</p>

        return (
          <TaskList 
            taskList={data.taskList}
            openTasks={data.openTasks}
            completedTasks={data.completedTasks}
          />
        )
      }}
    </Query>
  </Container>
)

export default TaskListPage