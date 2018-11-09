import User from '../components/providers/User'
import Users from '../components/settings/Users'
import TaskLists from '../components/settings/TaskLists'

import Container from '../components/styles/grid/Container'
import Col from '../components/styles/grid/Col'

// TODO improve role checks... helper function

// TODO improve page headings

// TODO put each of these on their own sub page

const Settings = () => (
  <Container>
    <User>
      {({loading, error, data}) => {
        if(error) return console.log(error) || <p>Something went wrong</p>
        if(loading) return <p>Lodaing...</p>

        return (
          <Col>
            <h2>Settings</h2>

            {data.me 
              && ['ADMIN', 'SUPERADMIN'].includes(data.me.role)
              && <Users /> }

            {data.me 
              && ['ADMIN', 'SUPERADMIN'].includes(data.me.role)
              && <TaskLists /> }
          </Col>
        )
      }}
    </User>   
  </Container>
)

export default Settings