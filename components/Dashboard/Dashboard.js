import React, { Component } from 'react'
import { Router, Link } from '../../routes'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Row from '../styles/grid/Row'
import Col from '../styles/grid/Col'
import Card from '../styles/card/Card'
import CardInner from '../styles/card/CardInner'
import CardFooter from '../styles/card/CardFooter'

class Dashboard extends Component {
  calculateProgress = (taskList) => {
    if(!taskList.tasks) return `0%`
    if(!taskList.tasks.length) return `0%`

    const totalTasks = taskList.tasks.length
    const completedTasks = 
      taskList.tasks.filter(task => ['COMPLETED', 'CLOSED'].includes(task.status))
      .length
    
    return `calc(${Math.floor(completedTasks*100/totalTasks)}% + 2px)`
  }

  render() {

    // TODO do we really need the user here?
    const { user, taskLists } = this.props

    // TODO when we can get the count of tasks aassigned to a taskList
    // Show the number of open tasks and a percentage bar of ompleted tasks

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

    return (
      <>
      <Col>
        <SectionHeader>
          <h2><FontAwesomeIcon icon="list"/>Lists</h2>
        </SectionHeader>
      </Col>
      <Row>
        {taskLists && taskLists.map((taskList, i) => (
          <Col key={taskList.id} division={division}>
            <Card
              onClick={() => Router.pushRoute('tasklist', { slug: taskList.slug })}
              clickable
            >
              <CardInner>
                <h3>{taskList.name}</h3>
                <p>{taskList.description.length > 100 
                  ? taskList.description.substring(0,70) + '...'
                  : taskList.description}</p>

                <span>Tasks Completed</span>
                <div className="progress">
                  <span style={{ width: this.calculateProgress(taskList) }}></span>
                </div>
              </CardInner>
              <CardFooter>
                <Link route="tasklist" params={{ slug: taskList.slug }}>
                  <a>View Tasks →</a>
                </Link>
              </CardFooter>
            </Card>
          </Col>
        ))}
      </Row>
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