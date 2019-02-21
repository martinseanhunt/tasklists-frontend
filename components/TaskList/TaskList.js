import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Router } from '../../routes'

import Col from '../styles/grid/Col'
import Widget from '../styles/widget/Widget'
import WidgetHeader from '../styles/widget/WidgetHeader'
import WidgetRow from '../styles/widget/WidgetHeader'
import Button from '../styles/Button'
import ListView from '../ListView/ListView'

// TODO Ordering and filtering!

// TODO SEARCH

// TODO move division logic elsewhere - helper function

// TODO ARCHIVE COMPLETED TASKS AFTER x TIME ?
// TODO ARCHIVE COMPLETED TASKS manuall ? both individually and archive all completed

// TODO ARCHIVE CLOSED TASKS IMMEDIATELY WHEN CLOSED ?

// TODO PAGINATION

// TODO tooltip for status bar

// TODO PRIORITY: Toggle between open and completed and cancelled tasks

const TaskList = ({ taskList, openTasks, completedTasks }) => {
  return (
    <>
      <TaskListHeader>
        <WidgetHeader>
          <h2>{taskList.name}</h2>
          <Button 
            primary 
            onClick={() => Router.pushRoute('createTask', { taskListSlug: taskList.slug })}
          >
            <FontAwesomeIcon icon="plus" /> 
            New Task
          </Button>
        </WidgetHeader>
        <WidgetRow>
          <p>{taskList.description}</p>
        </WidgetRow>
      </TaskListHeader>
    
    <Col>
      <ListView listItems={openTasks} title={"Open Tasks"}/>
      <ListView listItems={completedTasks} title={"Completed Tasks"}/>
    </Col>
    </>
  )
}

const TaskListHeader = styled(Widget)`
  margin-bottom: 50px;
  border: 0;
`

export default TaskList