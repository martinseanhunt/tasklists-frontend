import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

import { Router } from '../../routes'

import Avatar from '../common/Avatar'
import alphaHex from '../../utils/alphaHex'

// TODO once functionality is somewhat complete make sure 
// this is all split in to the relevant components and we're not repeating ourselves 
// from the dashboard.

// TODO progress/status should be its own component

// TODO Have a WAITINGON task status which shows as yellow and on hover tells you
// The Staff member who's assigned to the last comment that we're waiting on assets etc

const dueTypeMap = {
  ASAP: 'ASAP',
  WHENPOSSIBLE: 'when possible',
  BYDATE: 'by ',
  ONDATE: 'on '
}

const statusMap = {
  CREATED: 'Created',
  ASSIGNED: 'Assigned',
  AWAITINGINPUT: 'Awaiting Input',
  AWAITINGASSETS: 'Awaiting Assets',
  AWAITINGFEEDBACK: 'Awaiting Feedback',
  INPROGRESS: 'In Progress',
  COMPLETED: 'Completed', 
  CLOSED: 'Closed',
  CANCELLED: 'Cancelled'
}

const statusColorMap = {
  CREATED: '#1665D8',
  ASSIGNED: '#6758F3',
  AWAITINGINPUT: '#F6AB2F',
  AWAITINGASSETS: '#E6492D',
  AWAITINGFEEDBACK: '#F6AB2F',
  INPROGRESS: '#FACF55',
  COMPLETED: '#34AA44', 
  CLOSED: '#000',
  CANCELLED: '#000'
}

const priorityColorMap = {
  HIGH: '#FACF55',
  URGENT: '#E6492D'
}

const dateColor = (date) => {
  if (!date) return null
  if(moment().isAfter(date)) return '#E6492D'
  if(moment().diff(date, 'days') < 3) return '#F6AB2F'
  return null
}

const TaskListItem = ({ task, division }) => {
  return (
    <TaskListItemContainer
      onClick={() => Router.pushRoute('taskWithSlug', { id: task.id, taskListSlug: task.taskList.slug })}
      color={statusColorMap[task.status]}
    >
      <Item>{task.title}</Item>
      <Item avatar>
        <Avatar user={task.createdBy} />
      </Item>
      <Item avatar>
        {task.assignedTo ? (
          <Avatar user={task.assignedTo} />
        ) : '-'}
      </Item>
      <Item status={task.status}>
        {statusMap[task.status]}
      </Item>
      <Item>{moment(task.createdAt).format('MMM Do YYYY')}</Item>
      <Item  
        highlight={dateColor(task.dueDate)}
      > 
        {task.due ? (
          <>
           {dueTypeMap[task.due]}
           {['BYDATE', 'ONDATE'].includes(task.due) && 
             moment(task.dueDate).format('MMM Do')}
          </>
        ) : '-'}
       
      </Item>
      <Item
        highlight={priorityColorMap[task.priority] || null}
      >
        {task.priority ? task.priority.toLowerCase() : '-'}
      </Item>
    </TaskListItemContainer>
  )
}

const TaskListItemContainer = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  background: #fff;
  border-top: 1px solid #eaedf3;
  width: 100%;
  border-left: 3px solid ${props => props.color};
  padding: 0;
  cursor: pointer;

  &:nth-of-type(2n) { background: #fcfcfc; }

  &:hover { 
    background: ${props => alphaHex(props.color, 0.03)}; 
  }
`

const Item = styled.li`
  border-right: 1px solid #eaedf3;
  padding: 12px 10px;
  flex: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
  font-size: 13px;
  min-width: 70px;

  ${props => props.avatar && `
    width: 90px;
    flex: 0 1 90px;
  `}

  ${props => props.status && `
    background: ${alphaHex(statusColorMap[props.status], 0.85)};
    font-weight: 500;
    color: #fff;
  `}

  ${props => props.highlight && `
    background: ${alphaHex(props.highlight, 0.8)};
    font-weight: 500;
    color: #fff;
  `}

  &:first-of-type{
    width: 350px;
    flex: 0 1 350px;
    min-width: 218px;
    text-align: left;
    justify-content: left;
    font-size: 14px;
  }

  .avatar {
    margin: 0;
  }

`

const DueInfo = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ bold }) => bold ? '#e6492d' : '#3e3f42'};
  margin-top: 0;
`

export default TaskListItem