import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Col from '../styles/grid/Col'
import Row from '../styles/grid/Row'
import TaskCard from './TaskCard'
import CreateTaskCard from './CreateTaskCard'

// TODO division should really be applied on the ROw

// TODO Ordering and filtering!

// TODO SEARCH

// TODO move division logic elsewhere - helper function

// TODO ARCHIVE COMPLETED TASKS AFTER x TIME ?
// TODO ARCHIVE COMPLETED TASKS manuall ? both individually and archive all completed

// TODO ARCHIVE CLOSED TASKS IMMEDIATELY WHEN CLOSED ?

// TODO PAGINATION

// TODO tooltip for status bar

const TaskList = ({ taskList, openTasks, completedTasks }) => {
  let division = 'halves'
  if((openTasks.length + 1) > 2 ) 
    division = (openTasks.length + 1) % 3 === 0
      ? 'thirds'
      : 'fourths'

  return (
    <div>
      <Col>
        <h2>{taskList.name}</h2>
        <p>{taskList.description}</p>

        {/*  SEARCH HERE */}
      </Col>

      <Col>
        <SectionHeader>
          <h2><FontAwesomeIcon icon="list"/>Open Tasks</h2>
        </SectionHeader>
      </Col>

      <Row marginBottom>
        <>
        <CreateTaskCard division={division} taskList={taskList} />
        {openTasks && openTasks.map(task => (
          <TaskCard task={task} division={division} key={task.id}/>
        ))}
        </>
      </Row>

      <Col>
        <SectionHeader>
          <h2><FontAwesomeIcon icon="check-square"/>Completed Tasks</h2>
        </SectionHeader>
      </Col>
      <Row>
        {completedTasks && completedTasks.map(task => (
          <TaskCard task={task} division={division} key={task.id}/>
        ))}
      </Row>

    </div>
  )
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

export default TaskList