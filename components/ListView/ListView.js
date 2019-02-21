import React, {Component} from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ListViewItem from './ListViewItem'

class ListView extends Component {
    render() {
      const { listItems, title } = this.props
  
      return (
        <ListContainer>
          <SectionHeader>
            <h2><FontAwesomeIcon icon="list"/>{title}</h2>
            <Headings>
              <span>Creator</span>
              <span>Assignee</span>
              <span>Status</span>
              <span>Created</span>
              <span>Due</span>
              <span>Priority</span>
            </Headings>
          </SectionHeader>

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
  
  export default ListView