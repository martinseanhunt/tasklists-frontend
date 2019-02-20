import React, { Component } from 'react'
import styled from 'styled-components'

import TaskLists from '../TaskLists/TaskLists'

class Sidebar extends Component {
  render = () => (
    <SidebarContainer>
      <h2>Your Lists</h2>
      <TaskLists/>
    </SidebarContainer>
  )
}

const SidebarContainer = styled.div`
  width: 270px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  border-right: 1px solid #eaedf2;
  background: #fff;
  z-index: 9997;
  padding-top: 70px;

  h2 {
    font-size: 12px;
    font-weight: 500;
    padding: 20px 30px 5px 30px;
    color: #9EA0A5;
    text-transform: uppercase;
  }
`

export default Sidebar