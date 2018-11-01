import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import Button from '../styles/Button'

import { CURRENT_USER_QUERY } from '../providers/User'

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signOut {
      message
    }
  }
`

const SignOut = props => (
  <Mutation 
    mutation={SIGNOUT_MUTATION}
    refetchQueries={[{query: CURRENT_USER_QUERY}]}
  >
    {(signOut, {data, error, loading}) => {
      if(error) console.log(error)

      return (
        <Button onClick={signOut}>
          Sign{loading && 'ing'} Out
        </Button>
      )
    }}
  </Mutation> 
)

export default SignOut