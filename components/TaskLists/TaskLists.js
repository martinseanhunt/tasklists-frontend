import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Router, Link } from '../../routes'
import { withRouter } from 'next/router'

import alphaHex from '../../utils/alphaHex'
import TaskListIcon from '../common/TaskListIcon'

const TASKLISTS_QUERY = gql`
  query TASKLISTS_QUERY {
    taskLists {
      id
      name
      description
      slug
      totalTaskCount
      completedTaskCount
      color
    }
  }
`

class TaskLists extends Component {
  calculateProgress = ({totalTaskCount, completedTaskCount}) => {
    if(!totalTaskCount) return {
      width: '0%',
      noTasks: true
    }

    const percentage = Math.floor(completedTaskCount*100/totalTaskCount)
    
    return {
      width:`calc(${percentage}% + 2px)`,
      allTasksComplete: totalTaskCount && totalTaskCount === completedTaskCount,
      noTasks: percentage === 0
    }
  }

  render = () => (
    <Query query={TASKLISTS_QUERY}>
      {({data, loading}) => {
        if(loading) return <p>Loading</p>

        return (
          <>
            <div>
              {data.taskLists && data.taskLists.map((taskList, i) => {
                
                const progress = this.calculateProgress(taskList)
                const listColor = taskList.color || '#6758F3'
                const listColorAlpha = alphaHex(taskList.color) || alphaHex('#6758F3')

                return (
                  <ListItem
                    onClick={() => Router.pushRoute('tasklist', { slug: taskList.slug })}
                    urlSlug={this.props.router.query.slug || this.props.router.query.taskListSlug}
                    listItemSlug={taskList.slug}
                    key={taskList.slug}
                    color={listColor}
                    colorAlpha={listColorAlpha}
                  >
                    <TaskListIcon  
                      color={listColor}
                      name={taskList.name}
                    />
                    <Content>
                      <h3>{taskList.name}</h3>
                      
                      <div className={`progress progress--${progress.allTasksComplete && 'complete'}`}>
                        <span style={{ 
                          width: progress.width, 
                          display: progress.noTasks ? 'none' : 'block',
                        }}></span>
                      </div>
                    </Content>
                  </ListItem>
                )
              })}
            </div>
          </>
        )
    
      }}
    </Query>
  )
}

const ListItem = styled.div`
  padding: 15px 25px;
  display: flex;
  align-items: center;

  &:hover {
    background: ${props => props.colorAlpha};
    border-left: 3px solid ${props => props.color};
    padding-left: 22px;
    cursor: pointer;
  }

  ${props => props.urlSlug === props.listItemSlug && `
    background: ${props.colorAlpha};
    border-left: 3px solid ${props.color};
    padding-left: 22px;
  `}

  .progress {
    height: 4px;
    background: #E6E7E8;
    width: 100%;
    border-radius: 2px;
    border: 1px solid #E6E7E8;
    overflow: visible;
    margin-bottom: 1px;
    
    span {
      background: ${props => props.color};
      height: 4px;
      position: relative;
      top: -1px;
      left: -1px;
      border-radius: 2px;
      border: 1px solid ${props => props.color};
    }

    &--complete {
      span {
        background: #34AA44;
        border-color: #34AA44;
      }
    }
    
  }
`

const Content = styled.div`
  padding-left: 15px;
  height: 38px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  h3{
    margin: 0;
    font-size: 14px;
    font-weight: 500;
  }
`

export default withRouter(TaskLists)
export { TASKLISTS_QUERY }