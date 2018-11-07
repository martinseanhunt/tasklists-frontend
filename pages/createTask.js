import React, { Component } from 'react'
import { Query } from 'react-apollo'

import User from '../components/providers/User'

import Row from '../components/styles/grid/Row'
import Col from '../components/styles/grid/Col'

import Widget from '../components/styles/widget/Widget'
import WidgetHeader from '../components/styles/widget/WidgetHeader'
import WidgetRow from '../components/styles/widget/WidgetRow'
import Form from '../components/styles/Form'
import DatePicker from '../components/Form/DatePicker'

class CreateTask extends Component {
  state = {
    due: 'WHENPOSSIBLE',
    dateDisabled: true
  }

  handleChange = (e) => {
    console.log(e.target.value, ['ONDATE', 'BYDATE'].includes(e.target.value)
  )
    this.setState({
      [e.target.name]: e.target.value,
      dateDisabled: !['ONDATE', 'BYDATE'].includes(e.target.value)
    })
  }

  render() {
    const { due, dateDisabled } = this.state
    
    return(
      <User>
        {({data}) => (
          <Row>
            <Col>
              <Widget>
                <WidgetHeader notFixed>
                  <div>
                    <h3>Create a New Task</h3>
                    <p>You're creating a task in the "LIST NAME" TaskList</p>
                  </div>
                </WidgetHeader>
                <WidgetRow>
                  <Form noPadd boldLabel>
                    <label htmlFor="title">Task Title
                      <input 
                        name="title"
                        type="text"
                        placeholder="This is a task title..."
                      />
                    </label>

                    <fieldset>
                        <div className="flex">
                          <label htmlFor="dueWhenPossible">Due:
                          <select
                            onChange={this.handleChange}
                            name="due"
                          >
                              <option value="WHENPOSSIBLE">When Possible</option>
                              <option value="ASAP">ASAP</option>
                              <option value="BYDATE">By Date</option>
                              <option value="ONDATE">On Date</option>
                            </select>
                          </label>

                          <label htmlFor="date">Date:
                            <DatePicker 
                              animate={!dateDisabled}
                              disabled={dateDisabled}
                            />
                          </label>
                        </div>
                      </fieldset>

                    <label htmlFor="title">Task Description
                      <textarea
                        name="desc"
                        placeholder="This is a task description..."
                      />
                    </label>

                    {/* DUE DATE */}

                    {/* DUE WHEN POSSIBLE */}

                    {/* DUE ASAP (ADD_TO_DB) */}

                    {/* ASSETS */}

                    {/* CUSTOM FIELDS */}

                    {/* ASSIGNED TO (IF ADMIN) */}

                  </Form>
                </WidgetRow>
              </Widget>
            </Col>
            <Col division='thirds'>
              Sidebar
            </Col>
          </Row>
        )}
      </User>
    )
  }
}

export default CreateTask