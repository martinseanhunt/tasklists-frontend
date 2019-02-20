import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { Router, Link } from '../../routes'
import { withRouter } from 'next/router'

const TASKLISTS_QUERY = gql`
  query TASKLISTS_QUERY {
    taskLists {
      id
      name
      description
      slug
      totalTaskCount
      completedTaskCount
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

                return (
                  <ListItem
                    onClick={() => Router.pushRoute('tasklist', { slug: taskList.slug })}
                    urlSlug={this.props.router.query.slug || this.props.router.query.taskListSlug}
                    listItemSlug={taskList.slug}
                    key={taskList.slug}
                  >
                    <Icon>{taskList.name.split(' ').map((word, i) => i < 2 ? word[0] : null).join('')}</Icon>
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
  padding: 15px 30px;
  display: flex;
  align-items: center;

  &:hover {
    background: #ECEAF8;
    border-left: 3px solid #6758F3;
    padding-left: 27px;
    cursor: pointer;
  }

  ${props => props.urlSlug === props.listItemSlug && `
    background: #ECEAF8;
    border-left: 3px solid #6758F3;
    padding-left: 27px;  
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
      background: #6758F3;
      height: 4px;
      position: relative;
      top: -1px;
      left: -1px;
      border-radius: 2px;
      border: 1px solid #6758F3;
    }

    &--complete {
      span {
        background: #34AA44;
        border-color: #34AA44;
      }
    }
    
  }
`

const Icon = styled.div`
  border-radius: 3px;
  background: #6758F3;
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight:bold;
  font-size: 18px;
  text-transform: uppercase;
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