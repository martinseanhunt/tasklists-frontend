import React, { Component } from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { adopt } from 'react-adopt'

import Col from '../styles/grid/Col'
import ListView from '../ListView/ListView'

const TASKCARD_FRAGMENT = `
  id
  title
  status
  description
  createdBy {
    name
    avatar
    id
  }
  assignedTo {
    name
    avatar
    id
  }
  subscribedUsers {
    id
    name
    avatar
  }
  createdAt
  due
  dueDate
  priority
  taskList {
    name
    slug
    color
  }
`

const DASHBOARD_QUERY = gql`
  query DASHBOARD_QUERY {
    myOpenTasks {
      ${TASKCARD_FRAGMENT}
    }
    mySubscriptions {
      ${TASKCARD_FRAGMENT}
    }
  }
`

// TODO improve error message
// TODO improve loading

class Dashboard extends Component {
  render = () => (
    <Query query={DASHBOARD_QUERY}>
      {({data, error, loading}) => {
        if(error) return <p>Something went wrong</p>
        if(loading) return <p>Loading...</p>

        const {myOpenTasks, mySubscriptions} = data

        return (
          <Col>
            <ListView listItems={myOpenTasks} title={"Open Tasks Assigned To Me"}/>
            <ListView listItems={mySubscriptions} title={"Open Tasks I'm Subscribed To"}/>
          </Col>
        )
      }}
    </Query> 
  )
}

const SectionHeader = styled.div` 
  padding: 0 0 10px 0;
  margin: 0 0 30px 0;
  position: relative;
  display: flex;
  border-bottom 1px solid #eaedf3;
  
  h2 {
    color: #3e3f42;
    font-size: 1.4rem;
    font-weight: 500;
    margin: 0;
    background: #fbfbfd;
    z-index: 999;
    position: relative;
    top: 1px;
    display: inline;
    width: 350px;
    min-width: 218px;

    svg {
      font-size: 1.4rem;
      margin-right: 10px;
      color: #9ea0a5;
    }
  }
`

const Headings = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  text-align: center;
  align-items: flex-end;

  span {
    color: #9ea0a5;
    text-transform: uppercase;
    font-size: 11px;
    text-align: center;
    display: block;
    flex: 1;
    min-width: 70px;

    &:first-of-type {
      width: 90px;
      flex: 0 1 90px;
    }

    &:nth-of-type(2) {
      width: 90px;
      flex: 0 1 90px;
    }

  }
`

export default Dashboard
export { DASHBOARD_QUERY, TASKCARD_FRAGMENT }