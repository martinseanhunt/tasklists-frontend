import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import SignInButton from '../styles/signIn/SignInButton'
import BigImage from '../styles/signIn/BigImage'
import SignInContainer from '../styles/signIn/SignInContainer'
import SignInInner from '../styles/signIn/SignInInner'
import Form from '../styles/Form'

import { CURRENT_USER_QUERY } from '../providers/User'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signIn(
      email: $email
      password: $password
    ) {
      id
    }
  }
`

class SignUp extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = e => this.setState({
    [e.target.name]: e.target.value
  })

  render() {
    const { email, password } = this.state
    
    return (
      <Mutation 
        mutation={SIGNIN_MUTATION}
        refetchQueries={[{query: CURRENT_USER_QUERY}]}
        variables={{ email, password }}
      >
        {(signIn, {error, loading}) => (
          <SignInContainer>
            <SignInInner>
              
              <Form>
                {error && (
                  <p>There was an error logging in {error.message}</p>
                )}
                <h1>Omstars DevLists</h1>
                <p>Sign in to the Omstars DevLists!</p>

                <label htmlFor="email">Email Address
                  <input 
                    onChange={this.handleChange}
                    name="email"  
                    type="email"
                    value={email}
                    placeholder="email@example.com"
                  ></input>
                </label>

                <label htmlFor="password">Password
                  <input 
                    onChange={this.handleChange}
                    name="password"  
                    type="password"
                    value={password}
                    placeholder="password"
                  ></input>
                </label>

                <SignInButton 
                  onClick={signIn} 
                  disabled={loading}
                  secondary
                  fullWidth
                >
                  Sign{loading && 'ing'} In
                </SignInButton>
              </Form>
              <BigImage>

              </BigImage>
            </SignInInner>
          </SignInContainer>
        )}
      </Mutation> 
    )
  }
}

export default SignUp