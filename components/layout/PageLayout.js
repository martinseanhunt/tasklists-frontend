import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import styled from 'styled-components'
import { withRouter } from 'next/router'

import GlobalStyles from '../styles/GlobalStyles'

import User from '../providers/User'
import Header from './Header'
import SignIn from '../SignIn/SignIn'
import Icons from './Icons'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const PageLayout = props => (
  <>
    <GlobalStyles/>
    <Head>
      <title>Devlists</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />

    </Head>

    <User>
      {({data, error, loading}) => {
        if(error) return console.log(error) || <p>Something went wrong</p>
        if(loading) return <p>Loading...</p>

        if(data.me) return (
          <Main>
            <Header />
            {props.children}
          </Main>
        )

        if(props.router.pathname === '/signup') return props.children

        return <SignIn />
      }}
    </User>
  </>
)

const Main = styled.main`
  max-width: 1140px;
  margin: 0 auto;
  margin-top: 70px;
  padding-top: 30px;
  text-align: left;
`

export default withRouter(PageLayout)
