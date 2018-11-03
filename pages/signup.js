import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import SignUp from '../components/SignIn/SignUp'

const USER_BY_TOKEN_QUERY = gql`
  query USER_BY_TOKEN_QUERY($token: String!) {
    userByToken(token: $token) {
      name
      email
      role
    }
  }
`

// TODO improve these errors / loading 

// TODO redirect if invalid token or just link to signup? 

// TODO PRIORITY redirect if user is already signed iN! Pass user down to child

const Index = ({ query }) => 
  <Query query={USER_BY_TOKEN_QUERY} variables={{ token: query.token }}>
    {({data, loading, error}) => {
      if(error) return <p>Your token is invalid</p>
      if(loading) return <p>Loading...</p>

      return <SignUp user={data.userByToken}/>
    }}    
  </Query>

export default Index