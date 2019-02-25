import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import TaskListCard from './TaskListCard'
import CreateTaskList from './CreateTaskList'

import Widget from '../styles/widget/Widget'
import WidgetHeader from '../styles/widget/WidgetHeader'
import WidgetTable from '../styles/widget/WidgetTable'
import Button from '../styles/Button'

const ALL_TASKLISTS_QUERY = gql`
  query ALL_TASKLISTS_QUERY {
    taskLists {
      id
      name
      taskListFields {
        id
        fieldName
        fieldType
      }
    }
  }
`

// DECISION: SHOULD I REFACTOR THESE SETTINGS WIDGETS TO USE TRHE SAME COMPOENNT? 

// TODO improve visual error messages & Loading states

// TODO edit TaskList

// TODO delete TaskList

// TODO Add pagination and cache clearing

// TODO TaskList ordering

// TODO move error and loading outside of table. eep inside widget tho

// TODO PRIORITY set up front end validation everywhere. Look in to 
// https://github.com/jquense/yup


class TaskLists extends Component {
  state={
    showModal: false
  }

  render = () => (
    <Widget marginTop>
      <WidgetHeader>
        <h3>TaskLists</h3>
        <div>
          <Button 
            onClick={() => this.setState({ showModal: true })}
            primary
          >
            Add TaskList
          </Button>
        </div>
      </WidgetHeader>
      
      <WidgetTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Custom Fields</th>
            <th>Total Tasks</th>
            <th>Open Tasks</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <Query query={ALL_TASKLISTS_QUERY}>
            {({data, error, loading}) => {

              if(error) return <tr><td colSpan="6">Something went wrong!</td></tr>
              if(loading) return <tr><td colSpan="6">Loading...</td></tr>
  
              const { taskLists } = data

              return taskLists && taskLists.length > 0 && taskLists
                .map(taskList => <TaskListCard taskList={taskList} key={taskList.id}/>)
            }}
          </Query>
        </tbody>
      </WidgetTable>

      <CreateTaskList
        showModal={this.state.showModal}
        closeModal={() => this.setState({ showModal: false })}
      />
  
    </Widget>
  )
} 

export default TaskLists
export { ALL_TASKLISTS_QUERY }