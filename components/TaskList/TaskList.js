import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select'

import { Router } from '../../routes'
import { TASKCARD_FRAGMENT } from '../Dashboard/Dashboard'

import Col from '../styles/grid/Col'
import Button from '../styles/Button'
import ListView from '../ListView/ListView'
import SectionHeader from '../layout/SectionHeader/SectionHeader'

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
              <SectionHeader taskList={taskList}>
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
              </SectionHeader>
            
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

export default TaskList
export { TASKLIST_QUERY }