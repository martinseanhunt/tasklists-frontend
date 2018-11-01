import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import propTypes from 'prop-types'

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      name
      email
      role
    }
  }
`

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => (props.children(payload))}
  </Query>
)

User.propTypes = {
  children: propTypes.func.isRequired
}

export default User
export { CURRENT_USER_QUERY }