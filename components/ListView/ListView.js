import React, {Component} from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ListViewItem from './ListViewItem'

class ListView extends Component {
    handleSort = (e) => {
      const { sortBy } = this.props
      let sort = ''
      switch (e.target.innerHTML.split(' ')[0]) {
        case 'Status':
          sortBy === 'status_ASC'
            ? sort = 'status_DESC'
            : sort = 'status_ASC'
          break
        case 'Created':
          sortBy === 'createdAt_ASC'
            ? sort = 'createdAt_DESC'
            : sort = 'createdAt_ASC'
          break
        case 'Due':
          sortBy === 'dueDate_ASC'
            ? sort = 'dueDate_DESC'
            : sort = 'dueDate_ASC'
          break
        case 'Priority':
        sortBy === 'priority_ASC'
        ? sort = 'priority_DESC'
        : sort = 'priority_ASC'
          break
      }

      this.props.updateSortBy(sort)
    }

    render() {
      const { listItems, title, sortBy } = this.props
      // todo store these headings in an array and map through them
      return (
        <ListContainer>
          <SectionHeader>
            <h2><FontAwesomeIcon icon="list"/>{title}</h2>
            <Headings>
              <span>Creator</span>
              <span>Assignee</span>
              <span className={`sort ${sortBy && sortBy.includes('status') && ( sortBy.includes('ASC') ? 'asc' : 'desc' )}`} onClick={this.handleSort}>Status</span>
              <span className={`sort ${sortBy && sortBy.includes('created') && ( sortBy.includes('ASC') ? 'asc' : 'desc' )}`} onClick={this.handleSort}>Created</span>
              <span className={`sort ${sortBy && sortBy.includes('due') && ( sortBy.includes('ASC') ? 'asc' : 'desc' )}`} onClick={this.handleSort}>Due</span>
              <span className={`sort ${sortBy && sortBy.includes('priority') && ( sortBy.includes('ASC') ? 'asc' : 'desc' )}`} onClick={this.handleSort}>Priority</span>
            </Headings>
          </SectionHeader>

          {this.props.sortBy && this.props.sortBy.includes('dueDate') && (
            <Notice>
              <FontAwesomeIcon icon="exclamation-circle"/> <p>You're ordering by due date so items without a due date will <b>not</b> be shown. Click <a href="#" onClick={() => this.props.updateSortBy(null)}>here</a> to clear this filter.</p>
            </Notice>
          )}

          {listItems && listItems.length > 0 && listItems.map((task, i) => (
            <ListViewItem key={task.id} task={task}/>
          ))}

          {listItems && !listItems.length > 0 && (
            <p>Uh oh, there aren't any {title.toLowerCase()} here 🤷</p>
          )}
        </ListContainer>
      )
    }
  }

  const ListContainer = styled.div`
    margin-bottom: 65px;
  `
  
  const SectionHeader = styled.div` 
    padding: 0 0 10px 0;
    margin: 0 0 30px 0;
    position: relative;
    display: flex;
    border-bottom: 1px solid #eaedf3;
    
    h2 {
      color: #3e3f42;
      font-size: 1.4rem;
      font-weight: 500;
      margin: 0;
      background: #fbfbfd;
      z-index: 999;
      position: relative;
      top: 1px;
      display: inline;
      width: 350px;
      min-width: 218px;
      text-transform: capitalize;
  
      svg {
        font-size: 1.4rem;
        margin-right: 10px;
        color: #9ea0a5;
      }
    }

    .sort { 
      color: #1f6fe5;
      cursor: pointer;
      position: relative;

      &:hover {
        text-decoration: underline;
      }

      &.asc:after {
        content: "▲";
      }
     
      &.desc:after {
        content: "▼";
      }
    }
  `
  
  const Headings = styled.div`
    display: flex;
    justify-content: space-between;
    flex: 1;
    text-align: center;
    align-items: flex-end;
  
    span {
      color: #9ea0a5;
      text-transform: uppercase;
      font-size: 11px;
      text-align: center;
      display: block;
      flex: 1;
      min-width: 70px;
  
      &:first-of-type {
        width: 90px;
        flex: 0 1 90px;
      }
  
      &:nth-of-type(2) {
        width: 90px;
        flex: 0 1 90px;
      }
  
    }
  `
  
const Notice = styled.div`
  margin-bottom: 20px;
  background: #e8eef7;
  border-left: 3px solid #1665d8;
  width: 100%;
  padding: 5px 10px;
  font-size: 14px;
  display: flex;
  align-items: center;

  svg {
    font-size: 25px;
    margin-right: 10px;
  }

  a {
    cursor: pointer;
    color: #1665d8;

    &:hover {
      text-decoration: none;
    }
  }

`
  
  export default ListView