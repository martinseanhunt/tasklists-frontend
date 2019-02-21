import React from 'react'
import styled from 'styled-components'

const TaskListIcon = (props) => (
  <Icon color={props.color} large={props.large}>
    {props.name.split(' ').map((word, i) => i < 2 ? word[0] : null).join('')}
  </Icon>
)

const Icon = styled.div`
  border-radius: 3px;
  background: ${props => props.color};
  width: ${props => props.large ? '44px' : '38px'};
  height: ${props => props.large ? '44px' : '38px'};
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight:bold;
  font-size: 18px;
  text-transform: uppercase;
`

export default TaskListIcon