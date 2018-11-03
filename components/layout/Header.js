import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import User from '../providers/User'
import SignOut from '../SignIn/SignOut'

// TODO Add profile image (gravatar or random Yoga image)
// on hover show settings and signout

// TODO Add notifications systed and header section

// TODO Add icons

// TODO Add search

// TODO General header styling, check menu + top bars from UIKIT

const Header = () => (
  <User>
    {({data}) => (
      <HeaderStyles>
        <h1>
          <FontAwesomeIcon icon="check" />
          <Link href="/"><a>TaskLists</a></Link>
        </h1>
        <nav>
          <Link href="/"><a>Dashboard</a></Link>
          <Link href="/create"><a>New Task</a></Link>
          <Link href="/settings"><a>Settings</a></Link>
          <SignOut/>
        </nav>
      </HeaderStyles>
    )}
  </User>
)

export default Header

const HeaderStyles = styled.header`
  background: #fff;
  border-bottom: 1px solid #eaedf2;
  text-align: left;
  padding: 0 30px;
  position: fixed;
  width: 100%;
  top:0;
  left: 0;
  height: 70px;
  z-index: 1010;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  h1 {
    font-size: 1.6rem;
    color: #3e3f42;

    a {
      color: #3e3f42;
      text-decoration: none;
    }
  }

  svg {
    margin-right: 5px;
  }

  nav {    
    a {
      color: #272e5c;
      font-size: 1.4rem;
      text-decoration: none;
      display: inline-block;
      padding: 15px 10px;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`