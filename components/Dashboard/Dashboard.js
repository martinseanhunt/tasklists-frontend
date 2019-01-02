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
    let division = 'halves'

    if(taskLists.length > 2 ) 
      division = taskLists.length % 3 === 0
        ? 'thirds'
        : 'fourths'

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
      <Col>
        <SectionHeader>
          <h2><FontAwesomeIcon icon="list"/>Lists</h2>
        </SectionHeader>
      </Col>
      <Row marginBottom>
        {taskLists && taskLists.map((taskList, i) => {
          
          const progress = this.calculateProgress(taskList)

          return (
            <Col key={taskList.id} division={division}>
              <Card
                onClick={() => Router.pushRoute('tasklist', { slug: taskList.slug })}
                clickable
              >
                <CardInner>
                  <div>
                    <h3>{taskList.name}</h3>
                    <p>{taskList.description.length > 100 
                      ? taskList.description.substring(0,70) + '...'
                      : taskList.description}</p>
                  </div>
                  
                  <div>
                    <span>Tasks Completed</span>
                    <div className={`progress progress--${progress.allTasksComplete && 'complete'}`}>
                      <span style={{ 
                        width: progress.width, 
                        display: progress.noTasks ? 'none' : 'block',
                      }}></span>
                    </div>
                  </div>
                </CardInner>
                <CardFooter>
                  <Link route="tasklist" params={{ slug: taskList.slug }}>
                    <a>View Tasks →</a>
                  </Link>
                </CardFooter>
              </Card>
            </Col>
          )}
        )}
      </Row>
      
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