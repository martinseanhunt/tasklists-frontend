import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import ModalContainer from '../styles/modal/ModalContainer'
import ModalInner from '../styles/modal/ModalInner'
import WidgetHeader from '../styles/widget/WidgetHeader'
import WidgetRow from '../styles/widget/WidgetRow'
import WidgetFooter from '../styles/widget/WidgetFooter'
import Form from '../styles/Form'
import Button from '../styles/Button'

import { ALL_USERS_QUERY } from './Users'

// TODO add icons to buttons

// TODO avatars upload + default typography avatar

// TODO remove refetch queries once using pagination and cache clearing

// TODO only show role for superadmins

// TODO improve errors

// TODO confirmation after user is added then fade out

const ADD_USER_MUTATION = gql`
  mutation ADD_USER_MUTATION(
    $name: String!
    $email: String!
    $slackHandle: String!
    $role: Role
    $avatar: String
  ) {
    createUser(
      name: $name
      email: $email
      slackHandle: $slackHandle
      role: $role
      avatar: $avatar
    ){
      id
    }
  }
`

class AddUser extends Component {
  state = {
    name: '',
    email: '',
    slackHandle: '',
    role: 'STAFF',
    avatar: ''
  }

  handleChange = e => 
    this.setState({ [e.target.name]: e.target.value })

  onCompleted = () => {
    this.setState({
      name: '',
      email: '',
      slackHandle: '',
      role: 'STAFF',
      avatar: ''
    })

    this.props.closeModal()
  }
  
  render() {
    const { showModal, closeModal } = this.props
    const { email, name, slackHandle, role, avatar } = this.state
    
    return showModal ? (
      <Mutation 
        mutation={ADD_USER_MUTATION}
        variables={{ ...this.state }}
        refetchQueries={[{ query: ALL_USERS_QUERY }]}
        onCompleted={this.onCompleted}
      >
        {(createUser, { error, loading }) => (
          <ModalContainer onClick={closeModal}>
            <ModalInner onClick={(e) => e.stopPropagation()}>
              <WidgetHeader>
                <h3>Invite New User</h3>
                <button 
                  className="close"
                  onClick={closeModal}
                >X</button>
              </WidgetHeader>
              <WidgetRow>
                {error && <p>{error.message}</p>}
                <UserForm>
                  <label htmlFor="name">Name
                    <input 
                      onChange={this.handleChange}
                      name="name"  
                      type="text"
                      value={name}
                      placeholder="Some Person"
                    ></input>
                  </label>
    
                  <label htmlFor="email">Email Address
                    <input 
                      onChange={this.handleChange}
                      name="email"  
                      type="email"
                      value={email}
                      placeholder="email@example.com"
                    ></input>
                  </label>
    
                  <label htmlFor="slackHandle">Slack Handle
                    <input 
                      onChange={this.handleChange}
                      name="slackHandle"  
                      type="text"
                      value={slackHandle}
                      placeholder="@someone"
                    ></input>
                  </label>
                  
                  <label htmlFor="role">Role
                    <select 
                      name="role"
                      value={role}
                      onChange={this.handleChange}
                      className="react-select"
                    >
                      <option value="STAFF">Staff</option>
                      <option value="ADMIN">Admin</option>
                      <option value="SUPERADMIN">Super Admin</option>
                    </select>
                  </label>
                </UserForm>
              </WidgetRow>
    
              <WidgetFooter>
                <Button onClick={closeModal}>Cancel</Button>
                <Button 
                  secondary 
                  onClick={createUser}
                  disabled={loading}
                >
                  Invite User
                </Button>
              </WidgetFooter>
            </ModalInner>
          </ModalContainer>
        )}
      </Mutation>
    ) : null
  }
}

const UserForm = styled(Form)`
  padding: 0;

  label:first-of-type {
    margin-top: 0px;
  }
`

export default AddUser