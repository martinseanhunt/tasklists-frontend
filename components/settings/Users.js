import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import styled from 'styled-components'

import UserCard from './UserCard'
import AddUser from './AddUser'

import Widget from '../styles/widget/Widget'
import WidgetHeader from '../styles/widget/WidgetHeader'
import WidgetTable from '../styles/widget/WidgetTable'
import Button from '../styles/Button'

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      name
      id
      role
      slackHandle
      email
      status
    }
  }
`
// TODO improve visual error messages & Loading states

// TODO edit user

// TODO delete user

// TODO resend (reset) signup token

// TODO Add pagination and cache clearing

// TODO user ordering

// TODO move error and loading outside of table. eep inside widget tho

class Users extends Component {
  state={
    showModal: false
  }

  render = () => (
    <Widget>
      <WidgetHeader>
        <h3>Users</h3>
        <div>
          <Button 
            onClick={() => this.setState({ showModal: true })}
            primary
          >
            Add User
          </Button>
        </div>
      </WidgetHeader>
      
      <WidgetTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Slack Handle</th>
            <th>Role</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <Query query={ALL_USERS_QUERY}>
            {({data, error, loading}) => {

              if(error) return <tr><td colSpan="6">Something went wrong!</td></tr>
              if(loading) return <tr><td colSpan="6">Loading...</td></tr>
  
              const { users } = data
              return users.length > 0 && users
                .map(user => <UserCard user={user} key={user.id}/>)
            }}
          </Query>
        </tbody>
      </WidgetTable>

      <AddUser 
        showModal={this.state.showModal}
        closeModal={() => this.setState({ showModal: false })}
      />
  
    </Widget>
  )
} 

export default Users
export { ALL_USERS_QUERY }