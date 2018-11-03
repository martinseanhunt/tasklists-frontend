import React, { Component } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Row from '../styles/grid/Row'
import Col from '../styles/grid/Col'
import Card from '../styles/card/Card'
import CardInner from '../styles/card/CardInner'
import CardFooter from '../styles/card/CardFooter'

class Dashboard extends Component {
  render() {
    const { user, categories } = this.props

    // TODO when we can get the count of tasks aassigned to a category
    // Show the number of open tasks and a percentage bar of ompleted tasks

    // TODO make progress bar it's own component - pass in the percentage
    // as a prop

    // TODO round edges of progress bar

    // TODO figure out why font awesome loads huge at first https://github.com/FortAwesome/vue-fontawesome/issues/14
    return (
      <>
      <Col>
        <SectionHeader>
          <h2><FontAwesomeIcon icon="list"/>Task Collections</h2>
        </SectionHeader>
      </Col>
      <Row>
        {categories && categories.map((category, i) => (
          <Col key={category.id} fourth>
            <Card>
              <CardInner>
                <h3>{category.name}</h3>
                <p>{category.description.length > 100 
                  ? category.description.substring(0,70) + '...'
                  : category.description}</p>

                <span>Tasks Completed</span>
                <div className="progress">
                  <span style={{ width: '40%' }}></span>
                </div>
              </CardInner>
              <CardFooter>
                <Link href={`/tasks/` + category.id}>
                  <a>View Tasks →</a>
                </Link>
              </CardFooter>
            </Card>
          </Col>
        ))}
      </Row>
      </>
    )
  }
}

const SectionHeader = styled.div`
  padding: 30px 0;
  position: relative;
  
  h2 {
    color: #3e3f42;
    font-size: 1.4rem;
    font-weight: 500;
    margin: 0;
    background: #fbfbfd;
    z-index: 999;
    position: relative;
    display: inline;
    padding-right: 20px;

    svg {
      font-size: 1.4rem;
      margin-right: 10px;
      color: #9ea0a5;
    }
  }

  &:after {
    position: absolute;
    width: 100%;
    height: 1px;
    display: block;
    background: #eaedf3;
    content: "";
    top: 50%;
    left: 0;
  }

`

export default Dashboard