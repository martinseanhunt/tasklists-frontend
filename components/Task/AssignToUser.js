import React, { Component } from 'react'
import { Query } from 'react-apollo'
import Select, { components } from 'react-select'
import styled from 'styled-components'

import Avatar from '../common/Avatar'

import { ALL_USERS_QUERY } from '../settings/Users'
const { Option, SingleValue } = components

// TODO use react select for all dropdowns

class AssignToUser extends Component {
  render() {
    return (
      <Query query={ALL_USERS_QUERY}>
        {({data, error, loading}) => {
          if(error) return <p>Something went wrong</p>
          if(loading) return <p>Loading...</p>

          const options = data.users.map((user) => ({
            value: user.id,
            label: user.name,
            user: user,
          }))

          return (
            <Container>
              <Select 
                options={options} 
                components={{ Option: CustomOption, SingleValue: CustomSingleValue }} 
                isClearable={true}
                onChange={this.props.onChange}
                name="user"
              />    
            </Container>
          )
        }}
      </Query>
    )
  }
}

const CustomOption = (props) =>
  !props.isDisabled ? (
    <StyledOption {...props}>
      <Avatar user={props.data.user} />
      {props.data.label}
    </StyledOption>
  ) : null

const CustomSingleValue = (props) => {
  return (
    <StyledSingleValue
      {...props}
    >
      <Avatar user={props.data.user} xs/>
      {props.children}
    </StyledSingleValue>
  )
}

const Container = styled.div`
  input {
    margin-top: 0;
  }
`

// TODO this is not the best approach to overriding react-select styles... but it works for now!
const StyledOption = styled(Option)`
  height: 44px;
  display: flex !important;
  align-items: center;
  text-transform: capitalize;
`

const StyledSingleValue = styled(SingleValue)`
  display: flex !important;
  align-items: center;
  text-transform: capitalize;
  background: #fff;

  &:focus {
    outline: none !important;
  }
`

export default AssignToUser