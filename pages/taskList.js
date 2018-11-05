import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const TASKLIST_QUERY = gql`
  query TASKLIST_QUERY($slug: String!, $excludeStatus: [TaskStatus]) {
    taskList(slug: $slug) {
      name
      id
      slug
      description
    }

    tasks(taskListSlug: $slug, excludeStatus: $excludeStatus) {
      id
      title
      status
    }
  }
`

const TaskList = (props) => (
  <Query 
    query={TASKLIST_QUERY}
    variables={{
      slug: props.query.slug,
      excludeStatus: ['COMPLETED', 'CLOSED']
    }}
  >
    {({data, error, loading}) => {
      if(error) return <p>This is an error</p>
      if(loading) return <p>loading...</p>

      return (
        <div>
          {data.tasks && data.tasks.map(task => (
            <p key={task.id}>{task.title}</p>
          ))}
        </div>
      )
    }}
  </Query>
)

export default TaskList