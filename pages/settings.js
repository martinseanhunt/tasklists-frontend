import User from '../components/providers/User'
import Users from '../components/settings/Users'

import Col from '../components/styles/grid/Col'

// TODO improve role checks... helper function

// TODO improve page headings

const Settings = () => (
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
        </Col>
      )
    }}
  </User>
)

export default Settings