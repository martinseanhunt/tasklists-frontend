import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Container from '../components/styles/grid/Container'
import TaskList from '../components/TaskList/TaskList'

const TaskListPage = (props) => (
  <Container noPadd>
    <TaskList 
      slug={props.query.slug }
    />
  </Container>
)

export default TaskListPage