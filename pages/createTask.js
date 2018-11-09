import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Select from 'react-select'
import moment from 'moment'

import { Router } from '../routes'

import User from '../components/providers/User'
import SubHeader from '../components/layout/SubHeader'

import Container from '../components/styles/grid/Container'
import Row from '../components/styles/grid/Row'
import Col from '../components/styles/grid/Col'

import Widget from '../components/styles/widget/Widget'
import WidgetHeader from '../components/styles/widget/WidgetHeader'
import WidgetRow from '../components/styles/widget/WidgetRow'
import Form from '../components/styles/Form'
import Button from '../components/styles/Button'
import DatePicker from '../components/Form/DatePicker'
import WidgetFooter from '../components/styles/widget/WidgetFooter'

import SidebarRow from '../components/styles/sidebar/SidebarRow'
import Controls from '../components/styles/sidebar/Controls'

import AssignToUser from '../components/Task/AssignToUser'

// TODO PRIORITY refactor this in to multiple components

// TODO test this with various roles

// TODO ADD subheader

// TODO WYSIWYG

// TODO Make Choosing title more like design in Zeplin

const TASKLIST_WITH_FIELDS_QUERY = gql`
  query TASKLIST_WITH_FIELDS_QUERY($slug: String!) {
    taskList(slug: $slug) {
      name
      id
      slug
      description

      taskListFields {
        id
        fieldName
        fieldType
      } 
    }
  }
`

const CREATE_TASK_MUTATION = gql`
  mutation CREATE_TASK_MUTATION(
    $title: String!
    $description: String!
    $due: TaskDue!
    $dueDate: String
    $assignedTo: String
    $customFields: [CustomFieldCreateInput]
    $taskListSlug: String!
    $assets: [AssetCreateInput]
  ) {
    createTask(
      title: $title
      description: $description
      due: $due
      dueDate: $dueDate
      assignedTo: $assignedTo
      customFields: $customFields
      taskList: $taskListSlug
      assets: $assets
    ){
      id
    }
  }
`

class CreateTask extends Component {  
  state = {
    due: 'WHENPOSSIBLE',
    dateDisabled: true,
    dueDate: null,
    title: '',
    description: '',
    assets: [],
    assignedTo: '',
    customFields: []
  }

  handleChange = (e) => {    
    const { name, id, type, fieldid, fieldtype } = e.target.dataset
    
    if(type === 'custom-field') {
      const customFields = [...this.state.customFields]
      customFields[id] = {
        fieldName: e.target.name,
        fieldType: fieldtype,
        fieldValue: e.target.value,
        taskListField: fieldid
      }

      return this.setState({ customFields })
    }

    if(['assetUrl', 'assetType'].includes(name)){
      const assets = [...this.state.assets]
      assets[id][name] = e.target.value

      return this.setState({ assets })
    }

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleUserChange = (e) => this.setState({
    assignedTo: e ? e.value : null
  })

  handleDueChange = (e) => this.setState({
    due: e ? e.value : '',
    dateDisabled: !['ONDATE', 'BYDATE'].includes(e.value)
  })

  // TODO this component uses a similar add field structure to createTaskList - possibly refactor in to one component or use helper functions for add / remove asset etc

  // TODO implement wysiwyg

  // TODO improve design / layout

  // TODO allow individualised notification settings for each task

  addAsset = (e, user) => {
    this.setState(state => ({
      // TODO using placeholder createdByand assetUrl here - need to figure out the best way 
      // to do this so I don't have to send it to server at all - same with the connect
      // objects on other fierlds
      assets: [...state.assets, 
        {
          assetUrl: '', 
          assetType: 'IMAGE', 
          createdBy: { connect: { email: user.email } }
        }
      ]
    }), () => {
      // TODO  scroll to bottom of page if it's scrolalble
      // use scroll until div is visible
    })
  }

  removeAsset = i => this.setState(state => ({
    assets: state.assets
      .filter((_, index) => index !== i)
  }))

  setDate = (date) => this.setState({ dueDate: date })

  setDateForCustomField = (index, date, fieldName, fieldType, taskListField) => {
    const customFields = [...this.state.customFields]
    customFields[index] = {
      fieldName,
      fieldType,
      fieldValue: date,
      taskListField
    }

    this.setState({ customFields })
  }

  createTask = (createTaskMutation) => {
    // TODO this makes sense to me but not sure it would to others... refactor

    // BIGQUESTION the generated prisma file wants me to send the taskListField as 
    // taskListField: { connect: { id: field.taskListField } }
    // How could I just sent the id on it's own like taskListField: { field.taskListField  }
    // and handle making the connection server side? Is that the wrong way to be thinking of things?
  
    let { dueDate, customFields } = this.state
    
    customFields = customFields 
      ? customFields
        .filter(field => field !== null && field.fieldValue)
        .map(field => field.fieldType === 'DATE'
          ? {
            ...field,
            fieldValue: field.fieldValue.format(),
            taskListField: { connect: { id: field.taskListField } }
          }
          : {
            ...field,
            taskListField: { connect: { id: field.taskListField } }
          }
        )
      : null

    const task = { 
      ...this.state,
      taskListSlug: this.props.query.taskListSlug,
      dueDate: dueDate ? dueDate.format() : null,
      customFields
    }

    createTaskMutation({ variables: task })
  }

  onCompleted = ({ createTask }) => 
    Router.pushRoute('task', { id: createTask.id })
  

  render() {
    const { title, description, dueDate, dateDisabled, assets } = this.state
    return(
      <User>
        {({data: userData}) => (
          <Query
            query={TASKLIST_WITH_FIELDS_QUERY}
            variables={{
              slug: this.props.query.taskListSlug
            }}
          >
            {({data, error, loading}) => {
              if(error) return <p>Oops something went wrong!</p>
              if(loading) return <p>Loading...</p>
              
              const customFields = data.taskList.taskListFields

              return (
                <Mutation
                  mutation={CREATE_TASK_MUTATION}
                  onCompleted={this.onCompleted}
                >
                  {( createTask, { error, loading } ) => (
                    <>
                    <SubHeader 
                      title="Create New Task"
                      rightText={`${data.taskList.name}`}
                    />
                    <Container>

                      <Form 
                        onSubmit={(e) => e.preventDefault()}
                        noPadd 
                        boldLabel
                      >
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
                                <label htmlFor="title">Task Title
                                  <input 
                                    name="title"
                                    type="text"
                                    placeholder="This is a task title..."
                                    value={title}
                                    onChange={this.handleChange}
                                  />
                                </label>

                                <label htmlFor="title">Task Description
                                  <textarea
                                    name="description"
                                    placeholder="This is a task description..."
                                    value={description}
                                    onChange={this.handleChange}
                                  />
                                </label>

                              </WidgetRow>
                            </Widget>

                            {customFields.length > 0 && (
                              <Widget marginTop>
                                <WidgetHeader notFixed>
                                  <div>
                                    <h3>{data.taskList.name} Fields</h3>
                                    <p>Information specific to {data.taskList.name}</p>
                                  </div>
                                </WidgetHeader>
                                <WidgetRow>
                                  <fieldset className="no-margin">
                                    <div className={customFields.length > 1 ? 'flex flex--two-per-row' : ''}>
                                      {customFields.map((field, i) => {
                                        if(field.fieldType === 'DATE') return (
                                          <label key={field.id} htmlFor="title">{field.fieldName}
                                            <DatePicker 
                                              date={this.state.customFields[i] 
                                                ? this.state.customFields[i].fieldValue
                                                : moment()
                                              }
                                              setDate={date => this.setDateForCustomField(
                                                i,
                                                date,
                                                field.fieldName,
                                                field.fieldType,
                                                field.id
                                              )}
                                            />
                                          </label>
                                        )

                                        return (
                                          <label htmlFor="title" key={field.id}>{field.fieldName}
                                            <input 
                                              name={field.fieldName}
                                              type="text"
                                              placeholder={field.fieldName}
                                              value={customFields[i].fieldValue}
                                              onChange={this.handleChange}
                                              data-id={i}
                                              data-type="custom-field"
                                              data-fieldid={field.id}
                                              data-fieldtype={field.fieldType}
                                            />
                                          </label>
                                        )

                                      })}
                                    </div>
                                  </fieldset>
                                </WidgetRow>
                              </Widget>
                            )}
                            
                            <Widget marginTop>
                              <WidgetHeader notFixed>
                                <label htmlFor="taskListFields" className="inside-header">
                                  <h3>Attachments</h3>
                                  <p>Attach images, videos and other files to this task</p>
                                </label>
                              </WidgetHeader>
                              <WidgetRow noPaddTop>
                                {!assets.length && 
                                  <p style={{textAlign: 'center'}}>No attachments yet, click the button below to add some</p>}

                                {assets.map((_, i) => {
                                  const assetName = 'assetUrl' + i
                                  const assetTypeName = 'assetType' + i

                                  return (
                                    <fieldset 
                                      name="assets" 
                                      key={'assets' + i}
                                      className={i > 0 ? 'no-margin' : ''}  
                                    >
                                      
                                      <div className="flex flex--removable">
                                        <label htmlFor={assetName}>{!i && 'Attachment URL'}
                                          <input 
                                            name={assetName}
                                            type="text"
                                            placeholder="http://someurl.org/image.jpg"
                                            onChange={this.handleChange}
                                            value={this.state.assets[i].asset}
                                            data-id={i}
                                            data-name='assetUrl'
                                          />
                                        </label>

                                        <label htmlFor={assetTypeName}>{!i && 'Attachment Type'}
                                          <select
                                            name={assetTypeName}
                                            onChange={this.handleChange}
                                            value={this.state.assets[i].assetType}
                                            data-id={i}
                                            data-name='assetType'
                                          >
                                            <option value="IMAGE">Image</option>
                                            <option value="VIDEO">Video</option>
                                            <option value="FILE">File</option>
                                          </select>
                                        </label>

                                        <button 
                                          onClick={() => this.removeAsset(i)}
                                          type="button"
                                        >X</button>
                                      </div>
                                    </fieldset>
                                  )
                                })}
                              </WidgetRow>

                              <WidgetFooter>
                                <div></div>
                                <Button 
                                  onClick={e => this.addAsset(e, userData.me)}
                                  type="button"  
                                  primary
                                >
                                  Add Attachment
                                </Button>
                              </WidgetFooter>
                            </Widget>

                          </Col>
                          <Col division='fourths'>
                            <SidebarRow>
                              <Controls>
                                <Button>
                                  Cancel
                                </Button>

                                <Button 
                                  secondary
                                  onClick={() => this.createTask(createTask)}  
                                  disabled={loading}
                                >
                                  Create Task
                                </Button>
                              </Controls>
                            </SidebarRow>

                            <SidebarRow>
                              <fieldset className="no-margin">
                                <label htmlFor="due">Task Due</label>
                                <p>Set priority level or due date</p>
                                  <Select 
                                    options={[
                                      {
                                        value: 'WHENPOSSIBLE',
                                        label: 'When Possible',
                                      },
                                      {
                                        value: 'ASAP',
                                        label: 'ASAP (priority)',
                                      },
                                      {
                                        value: 'BYDATE',
                                        label: 'By Date',
                                      },
                                      {
                                        value: 'ONDATE',
                                        label: 'On Date',
                                      },
                                    ]} 
                                    onChange={this.handleDueChange}
                                    name="due"
                                    placeholder={'When Possible'}
                                  />

                                  <label htmlFor="date" className="hidden">Date:</label>
                                  {!dateDisabled && (
                                    <DatePicker 
                                      animate={!dateDisabled}
                                      disabled={dateDisabled}
                                      date={dueDate}
                                      setDate={this.setDate}
                                    />
                                  )}
                              </fieldset>
                            </SidebarRow>
                            
                            {['ADMIN', 'SUPERADMIN'].includes(userData.me.role) && (
                              <SidebarRow>
                                <label htmlFor="user">Assign Task</label>
                                <p>Assign this task to:</p>
                                <AssignToUser name="user" onChange={this.handleUserChange}/>
                              </SidebarRow>
                            )}
                          </Col>
                        </Row>
                      </Form>
                    </Container>
                    </>
                  )}
                </Mutation>
              )
            }}
          </Query>
        )}
      </User>
    )
  }
}

export default CreateTask