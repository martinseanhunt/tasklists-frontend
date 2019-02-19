import React, { Component } from 'react'
import styled from 'styled-components'

class Sidebar extends Component {
  render = () => (
    <SidebarContainer>
      What'supp
    </SidebarContainer>
  )
}

const SidebarContainer = styled.div`
  width: 300px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  border-right: 1px solid #ccc;
  background: #fff;
  z-index: 9999;
`

export default Sidebar