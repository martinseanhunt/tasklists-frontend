import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import CategoryCard from './CategoryCard'
import AddCategory from './AddCategory'

import Widget from '../styles/widget/Widget'
import WidgetHeader from '../styles/widget/WidgetHeader'
import WidgetTable from '../styles/widget/WidgetTable'
import Button from '../styles/Button'

const ALL_CATEORIES_QUERY = gql`
  query ALL_CATEORIES_QUERY {
    categories {
      id
      name
      categoryFields {
        id
        fieldName
        fieldType
      }
    }
  }
`

// DECISION: SHOULD I REFACTOR THESE SETTINGS WIDGETS TO USE TRHE SAME COMPOENNT? 

// TODO improve visual error messages & Loading states

// TODO edit category

// TODO delete category

// TODO Add pagination and cache clearing

// TODO category ordering

// TODO move error and loading outside of table. eep inside widget tho

// TODO PRIORITY set up front end validation everywhere. Look in to 
// https://github.com/jquense/yup


class Categories extends Component {
  state={
    showModal: false
  }

  render = () => (
    <Widget marginTop>
      <WidgetHeader>
        <h3>Categories</h3>
        <div>
          <Button 
            onClick={() => this.setState({ showModal: true })}
            primary
          >
            Add Category
          </Button>
        </div>
      </WidgetHeader>
      
      <WidgetTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Custom Fields</th>
            <th>Total Tasks</th>
            <th>Open Tasks</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <Query query={ALL_CATEORIES_QUERY}>
            {({data, error, loading}) => {

              if(error) return <tr><td colSpan="6">Something went wrong!</td></tr>
              if(loading) return <tr><td colSpan="6">Loading...</td></tr>
  
              const { categories } = data

              return categories.length > 0 && categories
                .map(category => <CategoryCard category={category} key={category.id}/>)
            }}
          </Query>
        </tbody>
      </WidgetTable>

      <AddCategory
        showModal={this.state.showModal}
        closeModal={() => this.setState({ showModal: false })}
      />
  
    </Widget>
  )
} 

export default Categories
export { ALL_CATEORIES_QUERY }