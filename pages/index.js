import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { adopt } from 'react-adopt'

import Container from '../components/styles/grid/Container'
import User from '../components/providers/User'
import Dashboard from '../components/Dashboard/Dashboard'

// TODO alll queries need to be moved to the component level or the page doesn't load until the query copletes

// TODO how to run these as seperate queries and compose using adopt?

const DASHBOARD_QUERY = gql`
  query DASHBOARD_QUERY {
    taskLists {
      id
      name
      description
      slug
      totalTaskCount
      completedTaskCount
    }
    myOpenTasks {
      id
      title
      status
      description
    }
    mySubscriptions {
      id
      title
      status
    }
  }
`

const Composed = adopt({
  user: ({ render }) => <User >{render}</User>,
  dashboard: ({ render }) => <Query query={DASHBOARD_QUERY}>{render}</Query>,
})

// DECISION Should I rename taskLists to Lists ?

// TODO improve error

// TODO standardise capitalisation in component folder names

const Index = () => (
  <Container>
    <Composed>
      {({user, dashboard}) => {

        if (dashboard.error) return <p>Something went wrong</p>
        if (dashboard.loading) return <p>Loading...</p>

        return (
          <Dashboard
            me={user.data.me}
            taskLists={dashboard.data.taskLists}
            myOpenTasks={dashboard.data.myOpenTasks}
            mySubscriptions={dashboard.data.mySubscriptions}
          />
        )
      }}
    </Composed>
  </Container>
)

export default Index