import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import styled from 'styled-components'
import { withRouter } from 'next/router'

import GlobalStyles from '../styles/GlobalStyles'

import User from '../providers/User'
import Header from './Header'
import ErrorHandler from './ErrorHandler'
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
      <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
    </Head>

    <User>
      {({data, error, loading}) => {
        if(error) return console.log(error) || <p>Something went wrong</p>
        if(loading) return <p>Loading...</p>

        if(data.me) return (
          <Main>
            <ErrorHandler client={props.client}/>
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
  margin-top: 70px;
  text-align: left;
`

export default withRouter(PageLayout)
