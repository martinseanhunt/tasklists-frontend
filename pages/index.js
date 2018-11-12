import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Container from '../components/styles/grid/Container'
import User from '../components/providers/User'
import Dashboard from '../components/Dashboard/Dashboard'

// TODO Should tasks be moved in to their own query for each taskList on the page? 
// I think that probably makes more sense! 

/* BIGQUESTION: would it be better to, from within a progressbar component, get the aggregate of all posts where taskList = taskList. Would need to write 2 queries one to get the count of copleted items and one to get the count of total.

OR : is the below fine? At what point would it become sluggish? 
*/

const ALL_TASKLISTS_QUERY = gql`
  query ALL_TASKLISTS_QUERY {
    taskLists {
      id
      name
      description
      slug
      tasks {
        status
      }
    }
  }
`

// DECISION Should I rename taskLists to Lists ?

// TODO improve error

// TODO standardise capitalisation in component folder names

const Index = () => (
  <Container>
    <User>
      {({data}) => (
        <Query query={ALL_TASKLISTS_QUERY}>
          {({data, error, loading}) => {
            if (error) return <p>Something went wrong</p>
            if (loading) return <p>Loading...</p>

            return (
              <Dashboard
                me={data.me}
                taskLists={data.taskLists}
              />
            )
          }} 
        </Query>
      )}
    </User>
  </Container>
)

export default Index