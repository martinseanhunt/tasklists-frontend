import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select'

import { Router } from '../../routes'
import { TASKCARD_FRAGMENT } from '../Dashboard/Dashboard'

import Col from '../styles/grid/Col'
import Widget from '../styles/widget/Widget'
import WidgetHeader from '../styles/widget/WidgetHeader'
import Button from '../styles/Button'
import ListView from '../ListView/ListView'
import TaskListIcon from '../common/TaskListIcon'

// TODO Ordering and filtering!

// TODO SEARCH

// TODO ARCHIVE CLOSED TASKS IMMEDIATELY WHEN CLOSED ?

// TODO PAGINATION

// TODO tooltips

// TODO PRIORITY: Toggle between open and completed and cancelled tasks

// TODO handle incorrect or missing slug


const TASKLIST_QUERY = gql`
  query TASKLIST_QUERY(
    $slug: String!, 
    $excludeStatus: [TaskStatus],
    $filterByStatus: [TaskStatus],
    $orderBy: String
  ) {
    taskList(slug: $slug) {
      name
      id
      slug
      description
      color
    }

    tasks(
      taskListSlug: $slug
      excludeStatus: $excludeStatus
      filterByStatus: $filterByStatus
      orderBy: $orderBy
    ) {
      ${TASKCARD_FRAGMENT}
    }
  }
`

class TaskList extends Component {
  state = {
    viewing: {
      value: 'open',
      label: 'Viewing Open Tasks'
    },
    sortBy: null
  }

  getFilterVariables() {
    if(this.state.viewing.value === 'completed') return {
      filterByStatus: ['COMPLETED']
    }

    if(this.state.viewing.value === 'cancelled') return {
      filterByStatus: ['CLOSED', 'CANCELLED']
    }

    return {
      excludeStatus: ['CANCELLED', 'CLOSED', 'COMPLETED']
    }
  }

  handleViewingChange = (e) => {
    e.label = 'Viewing ' + e.label
    this.setState({ viewing: e })
  }

  updateSortBy = (sortBy) => this.setState({ sortBy: sortBy })

  render() {
    const { slug } = this.props

    return (
      <Query 
        query={TASKLIST_QUERY}
        variables={{
          slug,
          ...this.getFilterVariables(),
          orderBy: this.state.sortBy,
        }}
      >
        {({data, error, loading}) => {
          if(error) return <p>Oops, something went wrong loading the list</p>
          if(loading) return <p>Loading...</p>

          const { taskList, tasks } = data

          return (
            <>
              <TaskListHeader>
                <WidgetHeader fluidHeight>
                  <Meta>
                    <TaskListIcon 
                      color={taskList.color || '#6758F3'} 
                      name={taskList.name}
                      large  
                    />
                    <div>
                      <h2>{taskList.name}</h2>
                      <p>{taskList.description}</p>
                    </div>
                  </Meta>
                  
                  <Controls>
                    <label htmlFor='viewByStatus'> 
                      <Select 
                        value={this.state.viewing}
                        options={[
                          {
                            value: 'open',
                            label: 'Open Tasks',
                          },
                          {
                            value: 'completed',
                            label: 'Completed Tasks',
                          },
                          {
                            value: 'cancelled',
                            label: 'Cancelled Tasks',
                          },
                        ]} 
                        onChange={this.handleViewingChange}
                        name='viewing'
                        styles={{ cursor: 'pointer' }}
                        placeholder='Viewing Open Tasks'
                      />
                    </label>
                    <Button 
                      primary 
                      onClick={() => Router.pushRoute('createTask', { taskListSlug: taskList.slug })}
                    >
                      <FontAwesomeIcon icon="plus" /> 
                      New Task
                    </Button>
                  </Controls>
                </WidgetHeader>
              </TaskListHeader>
            
              <Col>
                <ListView 
                  listItems={tasks} 
                  sortBy={this.state.sortBy} 
                  updateSortBy={this.updateSortBy} 
                  title={this.state.viewing.value + ' Tasks'}/>
              </Col>
            </>
          )

        }}
      </Query>
    )
  }
}

const TaskListHeader = styled(Widget)`
  margin-bottom: 50px;
  border: 0;
`

const Meta = styled.div`
  display: flex;
  align-items: flex-start;

  div:first-child {
    margin-right: 10px;
    margin-top: 3px;
  }

  h2 {
    margin-top: 3px;
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: 500;
  }

  p {
    margin: 0;
  }
`

const Controls = styled.div`
  display: flex;
  align-items: center;

  label {
    width: 230px;
    margin-right: 15px;
  }
`

export default TaskList
export { TASKLIST_QUERY }