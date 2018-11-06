import React from 'react'

import Col from '../styles/grid/Col'
import Card from '../styles/card/Card'
import CardInner from '../styles/card/CardInner'
import CardFooter from '../styles/card/CardFooter'

console.log(Col)
// TODO once functionality is somewhat complete make sure 
// this is all split in to the relevant components and we're not repeating ourselves 
// from the dashboard.

// TODO progress/status should be its own component

const TaskCard = ({ task, division }) => {
  return (
    <Col key={task.id} division={division}>
      <Card
        onClick={() => Router.pushRoute('task', { slug: task.id })}
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
          Footer
        </CardFooter>
      </Card>
    </Col>
  )
}

export default TaskCard