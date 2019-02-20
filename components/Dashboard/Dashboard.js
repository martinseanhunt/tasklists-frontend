import React, { Component } from 'react'
import { Router, Link } from '../../routes'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import TaskCard from '../TaskList/TaskCard'

import Row from '../styles/grid/Row'
import Col from '../styles/grid/Col'
import Card from '../styles/card/Card'
import CardInner from '../styles/card/CardInner'
import CardFooter from '../styles/card/CardFooter'

class Dashboard extends Component {
  calculateProgress = ({totalTaskCount, completedTaskCount}) => {
    if(!totalTaskCount) return {
      width: '0%',
      noTasks: true
    }

    const percentage = Math.floor(completedTaskCount*100/totalTaskCount)
    
    return {
      width:`calc(${percentage}% + 2px)`,
      allTasksComplete: totalTaskCount && totalTaskCount === completedTaskCount,
      noTasks: percentage === 0
    }
  }

  render() {
    const { taskLists, myOpenTasks, mySubscriptions } = this.props

    // TODO make progress bar it's own component - pass in the percentage
    // as a prop

    // TODO allow user to toggle between list and card view

    // TODO allow an admin to create a list from this page

    // TODO make sure cards are always the same height

    // Work out how to divide the row
    let openTasksDivision = 'halves'

    if(myOpenTasks.length > 2 ) 
      openTasksDivision = taskLists.length % 3 === 0
        ? 'thirds'
        : 'fourths'

    let subscribedTasksDivision = 'halves'

    if(mySubscriptions.length > 2 ) 
      subscribedTasksDivision = taskLists.length % 3 === 0
        ? 'thirds'
        : 'fourths'

    return (
      <>
      {myOpenTasks && myOpenTasks.length > 0 && (
        <>
          <Col>
            <SectionHeader>
              <h2><FontAwesomeIcon icon="list"/>Open Tasks Assigned To Me</h2>
            </SectionHeader>
          </Col>
          <Row marginBottom>
            {myOpenTasks && myOpenTasks.map((task, i) => {
              return (
                <TaskCard key={task.id} task={task} division={openTasksDivision}/>
              )}
            )}
          </Row>
        </>
      )}
      
      {mySubscriptions && mySubscriptions.length > 0 && (
        <>
          <Col>
            <SectionHeader>
              <h2><FontAwesomeIcon icon="list"/>Open Tasks I'm Subscribed To</h2>
            </SectionHeader>
          </Col>
          <Row marginBottom>
            {mySubscriptions.map((task, i) => {
              return (
                <TaskCard key={task.id} task={task} division={subscribedTasksDivision}/>
              )}
            )}
          </Row>
        </>
      )}
      
      </>
    )
  }
}

const SectionHeader = styled.div`
  padding: 30px 0;
  position: relative;
  
  h2 {
    color: #3e3f42;
    font-size: 1.4rem;
    font-weight: 500;
    margin: 0;
    background: #fbfbfd;
    z-index: 999;
    position: relative;
    display: inline;
    padding-right: 20px;

    svg {
      font-size: 1.4rem;
      margin-right: 10px;
      color: #9ea0a5;
    }
  }

  &:after {
    position: absolute;
    width: 100%;
    height: 1px;
    display: block;
    background: #eaedf3;
    content: "";
    top: 50%;
    left: 0;
  }

`

export default Dashboard