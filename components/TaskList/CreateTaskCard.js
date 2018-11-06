import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Col from '../styles/grid/Col'
import Card from '../styles/card/Card'
import CardInner from '../styles/card/CardInner'
import CardIcon from '../styles/card/CardIcon'

const CreateTaskCard = ({ division }) => (
  <Col division={division}>
    <Card
      onClick={() => Router.pushRoute('createTask')}
      clickable
    >
      <CardInner centered>
        <CardIcon>
          <FontAwesomeIcon icon='plus'/>
        </CardIcon>

        <h3>Create New Task</h3>
        
        <p>Create a new task in [ListName]</p>
      </CardInner>
    </Card>
  </Col>
)

export default CreateTaskCard