import React, { Component } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const ERROR_QUERY = gql`
  query ERROR_QUERY {
    showError @client
  }
`

class ErrorHandler extends Component {
  render() {
    return (
      <Query query={ERROR_QUERY}>
        {({data}) => data && data.showError && <ErrorNotification><div><p>Oops, something went wrong!</p></div></ErrorNotification>}
      </Query>
    )
  }
}

export default ErrorHandler

const ErrorNotification = styled.div`
  position: fixed;
  top: 55px;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999999999;
  opacity: 0;
  animation: fadeinout 3s;

  @keyframes fadeinout {
    0% {
      opacity: 0;
    }
  
    30% {
      opacity: 1;
    }

    80% {
      opacity: 1;
    }
  
    100% {
      opacity: 0;
    }
  }

  div {
    width: 30%;
    padding: 20px 30px;
    text-align: center;
    border: 1px solid #D8442A;
    border-radius: 5px;
    background: #edb6ad;

    p {
      font-size: 1.6rem;
      font-weigth: 500;
    }
  }
`