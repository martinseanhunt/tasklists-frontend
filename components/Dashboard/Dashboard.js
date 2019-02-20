import React, { Component } from 'react'
import { Router, Link } from '../../routes'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import TaskListItem from '../TaskList/TaskListItem'

import Row from '../styles/grid/Row'
import Col from '../styles/grid/Col'
import Card from '../styles/card/Card'
import CardInner from '../styles/card/CardInner'
import CardFooter from '../styles/card/CardFooter'

class Dashboard extends Component {

  render() {
    const { taskLists, myOpenTasks, mySubscriptions } = this.props

    return (
      <>
      {myOpenTasks && myOpenTasks.length > 0 && (
        <Col>
          <SectionHeader>
            <h2><FontAwesomeIcon icon="list"/>Open Tasks Assigned To Me</h2>
            <Headings>
              <span>Creator</span>
              <span>Assignee</span>
              <span>Status</span>
              <span>Created</span>
              <span>Due</span>
              <span>Priority</span>
            </Headings>
          </SectionHeader>

          {myOpenTasks && myOpenTasks.map((task, i) => (
            <TaskListItem key={task.id} task={task}/>
          ))}
        </Col>
      )}
      <br/>
      <br/><br/><br/>
      {mySubscriptions && mySubscriptions.length > 0 && (
        <>
          <Col>
            <SectionHeader>
              <h2><FontAwesomeIcon icon="list"/>Open Tasks I'm Subscribed To</h2>
              <Headings>
                <span>Creator</span>
                <span>Assignee</span>
                <span>Status</span>
                <span>Created</span>
                <span>Due</span>
                <span>Priority</span>
              </Headings>
            </SectionHeader>
         
            {mySubscriptions.map((task, i) => (
              <TaskListItem key={task.id} task={task} />
            ))}

          </Col>
        </>
      )}
      
      </>
    )
  }
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