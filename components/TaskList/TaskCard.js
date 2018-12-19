import React from 'react'
import { Router } from '../../routes'

import Avatar from '../common/Avatar'

import Col from '../styles/grid/Col'
import Card from '../styles/card/Card'
import CardInner from '../styles/card/CardInner'
import CardFooter from '../styles/card/CardFooter'

// TODO once functionality is somewhat complete make sure 
// this is all split in to the relevant components and we're not repeating ourselves 
// from the dashboard.

// TODO progress/status should be its own component

// TODO Have a WAITINGON task status which shows as yellow and on hover tells you
// The Staff member who's assigned to the last comment that we're waiting on assets etc

const TaskCard = ({ task, division }) => {
  return (
    <Col key={task.id} division={division} marginBottom>
      <Card
        onClick={() => Router.pushRoute('task', { id: task.id })}
        clickable
      >
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

            {task.subscribedUsers && task.subscribedUsers.map(u => 
                u.id !== task.createdBy.id && u.id !== task.assignedTo.id && (
                  <Avatar user={u} />
                  
                )
              )
            }
          </div>
        </CardFooter>
      </Card>
    </Col>
  )
}

export default TaskCard