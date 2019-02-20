import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

import { Router } from '../../routes'

import Avatar from '../common/Avatar'

import Col from '../styles/grid/Col'
import Card from '../styles/card/Card'
import CardInner from '../styles/card/CardInner'
import CardHeader from '../styles/card/CardHeader'
import CardFooter from '../styles/card/CardFooter'

// TODO once functionality is somewhat complete make sure 
// this is all split in to the relevant components and we're not repeating ourselves 
// from the dashboard.

// TODO progress/status should be its own component

// TODO Have a WAITINGON task status which shows as yellow and on hover tells you
// The Staff member who's assigned to the last comment that we're waiting on assets etc

const dueTypeMap = {
  ASAP: 'Due ASAP',
  WHENPOSSIBLE: 'Due when possible',
  BYDATE: 'Due by ',
  ONDATE: 'Due on '
}

const TaskCard = ({ task, division }) => {
  return (
    <Col key={task.id} division={division} marginBottom>
      <Card
        onClick={() => Router.pushRoute('taskWithSlug', { id: task.id, taskListSlug: task.taskList.slug })}
        clickable
      >
        <CardHeader>
          <DueInfo bold={['ASAP'].includes(task.due)}>
            {dueTypeMap[task.due]}
            {['BYDATE', 'ONDATE'].includes(task.due) && 
              moment(task.dueDate).format('MMM Do YYYY')}
          </DueInfo>
        </CardHeader>

        <CardInner>
          <div>
            

            <h3>{task.title}</h3>
            
            {task.description && (
              <p>{task.description.length > 100 
                ? task.description.substring(0,70) + '...'
                : task.description}</p>
            )}
          </div>
          
          <div>
            <span>Status</span>
            <div className={`status status--${task.status}`}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </CardInner>
        <CardFooter>
          <div>
            <Avatar user={task.createdBy} />
            {task.assignedTo && task.assignedTo.id !== task.createdBy.id && (
              <Avatar user={task.assignedTo} />
            )}

            {(task.subscribedUsers.length - 2) > 0 && `and ${task.subscribedUsers.length - 2} more...`}
          </div>
          
        </CardFooter>
      </Card>
    </Col>
  )
}

const DueInfo = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ bold }) => bold ? '#e6492d' : '#3e3f42'};
  margin-top: 0;
`

export default TaskCard