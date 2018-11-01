import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router, { withRouter } from 'next/router'

import SignInButton from '../styles/signIn/SignInButton'
import BigImage from '../styles/signIn/BigImage'
import SignInContainer from '../styles/signIn/SignInContainer'
import SignInInner from '../styles/signIn/SignInInner'
import Form from '../styles/Form'

import { CURRENT_USER_QUERY } from '../providers/User'

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($token: String!, $password: String!, $avatar: String) {
    signUp(
      token: $token
      password: $password
      avatar: $avatar
    ) {
      id
    }
  }
`

class SignUp extends Component {
  state = {
    password: '',
    password2: '',
    avatar: '',
    error: ''
  }

  handleChange = e => this.setState({
    [e.target.name]: e.target.value
  })

  onSubmit = (e, signUp) => {
    e.preventDefault()
    const { password, password2 } = this.state
    if (password !== password2) return this.setState({ 
      error: 'Passwords must match'
     })
    signUp()
    this.setState({
      error: ''
    })
  }

  onCompleted = () => Router.push('/')

  // TODO improve error message

  // TODO Move company images in to config

  // TODO move company name in to config

  // TODO heading copy

  // TODO flow for if you've already used the sign in token

  // TODO text overlay on image (see design)

  // TODO Avatar Upload

  // TODO Front end Validation

  // TODO imporove passwords match error

  render() {
    const { password2, password } = this.state
    const { token } = this.props.router.query
    const { user } = this.props
    
    return (
      <Mutation 
        mutation={SIGNUP_MUTATION}
        refetchQueries={[{query: CURRENT_USER_QUERY}]}
        variables={{ password, token }}
        onCompleted={this.onCompleted}
      >
        {(signIn, {error, loading}) => (
          <SignInContainer>
            <SignInInner>
              
              <Form onSubmit={e => this.onSubmit(e, signIn)} >
                {error && (
                  <p>There was an error logging in {error.message}</p>
                )}
                <h1>Welcome {user.name}</h1>
                <p>Join the Omstars DevLists!</p>
                
                <label htmlFor="password">Password
                  <input 
                    onChange={this.handleChange}
                    name="password"  
                    type="password"
                    value={password}
                    placeholder="password"
                    required={true}
                  ></input>
                </label>

                <label htmlFor="password">Password Confirm
                  <input 
                    onChange={this.handleChange}
                    name="password2"  
                    type="password"
                    value={password2}
                    placeholder="password confirm"
                    required={true}
                  ></input>
                </label>

                {this.state.error && (
                  <p>{this.state.error }</p>
                )}

                <SignInButton 
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

export default withRouter(SignUp)