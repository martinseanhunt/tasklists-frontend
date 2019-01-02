import ApolloClient from 'apollo-boost'
import withApollo from 'next-with-apollo'
import gql from 'graphql-tag'

import { GRAPHQL_URL } from './config'


export default withApollo(({ ctx, headers }) => {
  const client = new ApolloClient({ 
    uri: GRAPHQL_URL,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },

    clientState: {
      defaults: {
        showError: false,
      }
    },

    onError: ({ graphQLErrors, networkError }) => {
      // IMPORTANT NOTE: REMEMBER TO USE client.writeData and not client.cache.writeData or there are 
      // bugs where the relevant components querying this data do not update - particularly when using set timeout

      client.writeData({ data: { showError: true } })

      setTimeout(() => client.writeData({ data: { showError: false } }), 3000);

      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        )
    
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }
  })

  return client
})