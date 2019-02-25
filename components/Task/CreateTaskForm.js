import React, { Component } from 'react'
import { Mutation, withApollo, Query } from 'react-apollo'
import gql from 'graphql-tag'
import Select from 'react-select'
import moment from 'moment'
import { EditorState, convertToRaw } from 'draft-js'

import { Router } from '../../routes'

import Row from '../styles/grid/Row'
import Col from '../styles/grid/Col'
import Widget from '../styles/widget/Widget'
import WidgetHeader from '../styles/widget/WidgetHeader'
import WidgetRow from '../styles/widget/WidgetRow'
import Form from '../styles/Form'
import Button from '../styles/Button'
import WidgetFooter from '../styles/widget/WidgetFooter'
import SidebarRow from '../styles/sidebar/SidebarRow'
import Controls from '../styles/sidebar/Controls'
import SectionHeader from '../layout/SectionHeader/SectionHeader'

// Allows RTE to access window - doesn' need to be server rendered
import dynamic from 'next/dynamic'
const RichTextEditor = dynamic(() => import('../common/RichTextEditor'), {
  ssr: false
})

import DatePicker from '../Form/DatePicker'
import AssignToUser from './AssignToUser'
import clearCache from '../../utils/clearCache'

import { TASKLISTS_QUERY } from '../TaskLists/TaskLists'
import { ALL_USERS_QUERY } from '../settings/Users'

// TODO PRIORITY refactor this in to multiple components

// TODO test this with various roles

// TODO WYSIWYG

// TODO Make title / description more like design in Zeplin

// TODO allow individualised notification settings for each task

const CREATE_TASK_MUTATION = gql`
  mutation CREATE_TASK_MUTATION(
    $title: String!
    $description: String!
    $richText: String
    $due: TaskDue
    $dueDate: String
    $priority: TaskPriority
    $assignedTo: String
    $customFields: [CreateRelatedCustomField]
    $taskListSlug: String!
    $assets: [CreateRelatedAsset]
  ) {
    createTask(
      title: $title
      description: $description
      richText: $richText
      due: $due
      dueDate: $dueDate
      assignedTo: $assignedTo
      customFields: $customFields
      taskList: $taskListSlug
      assets: $assets
      priority: $priority
    ){
      id
      taskList{
        slug
      }
    }
  }
`

class CreateTaskForm extends Component {
  state = {
    due: null,
    dateDisabled: true,
    dueDate: null,
    priority: 'LOW',
    title: '',
    assets: [],
    assignedTo: '',
    customFields: [],
    editorState: EditorState.createEmpty(),
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

    if(['assetUrl', 'assetType', 'title'].includes(name)){
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

  handlePriorityChange = (e) => this.setState({
    priority: e ? e.value : null
  })

  handleDueChange = (e) => this.setState({
    due: e ? e.value : '',
    dateDisabled: !['ONDATE', 'BYDATE'].includes(e.value)
  })

  addAsset = (e, user) => {
    this.setState(state => ({
      assets: [...state.assets, 
        {
          assetUrl: '', 
          assetType: 'IMAGE',
          title: ''
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

    let { dueDate, customFields, due, editorState } = this.state
    
    customFields = customFields 
      ? customFields
        .map(field => ({
            ...field,
          })
        )
      : null

    const ContentState = editorState.getCurrentContent()
    
    const task = { 
      ...this.state,
      taskListSlug: this.props.taskList.slug,
      due: due ? due : null,
      dueDate: dueDate ? dueDate : null,
      customFields,
      description: ContentState.getPlainText(),
      richText: JSON.stringify(convertToRaw(ContentState))
    }

    createTaskMutation({ variables: task })
  }
  
  onCompleted = async ({ createTask }) => {
    //props.client.resetStore() // working but coul dbe slow
    // props.client.resetStore() // not working
    await clearCache(this.props.client.cache, true)
    Router.pushRoute('taskWithSlug', { id: createTask.id, taskListSlug: createTask.taskList.slug })
  }
    

  render() {
    const { title, description, dueDate, dateDisabled, assets } = this.state
    const { taskList, user } = this.props
    const customFields = taskList.taskListFields

    return (
      <Mutation
        mutation={CREATE_TASK_MUTATION}
        onCompleted={this.onCompleted}
        refetchQueries={[{ query: TASKLISTS_QUERY }]}
      >
        {( createTask, { error, loading } ) => (
          <Form 
            onSubmit={(e) => e.preventDefault()}
            noPadd 
            boldLabel
          >
            <SectionHeader 
              taskList={taskList}
              title={`New Task`}
              subTitle={`You're creating a task in ${taskList.name}`}
            >
              <Controls>
                <Button style={{ display: 'none' }}>
                  Cancel
                </Button>

                <Button 
                  secondary
                  onClick={() => this.createTask(createTask)}  
                  disabled={loading}
                  style={{ width: '200px' }}
                >
                  Create Task
                </Button>
              </Controls>
            </SectionHeader>
            <Row>
              <Col>
                <label htmlFor="title" className="heading">Task Title
                  <input 
                    name="title"
                    type="text"
                    placeholder="This is a task title..."
                    value={title}
                    onChange={this.handleChange}
                  />
                </label>

                <label htmlFor="title" className="heading">Task Description
                </label>

                <Query query={ALL_USERS_QUERY}>
                  {({data, error, loading}) => (!error && !loading) ? (
                    <RichTextEditor 
                      editorState={this.state.editorState} 
                      suggestions={data.users.map(user => ({
                        ...user,
                        avatar: user.avatar || '/static/userprofile.jfif'
                      }))}  
                      onChange={(editorState) => this.setState({ editorState })}
                    />
                  ) : <p>Loading...</p>}
                    
                </Query>

                {customFields.length > 0 && (
                  <Widget marginTop>
                    <WidgetHeader notFixed>
                      <div>
                        <h3>{taskList.name} Fields</h3>
                        <p>Information specific to {taskList.name}</p>
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
                      const assetTitleName = 'assetTitle' + i

                      return (
                        <fieldset 
                          name="assets" 
                          key={'assets' + i}
                          className={i > 0 ? 'no-margin' : ''}  
                        >
                          
                          <div className="flex flex--removable">
                            <label htmlFor={assetTitleName}  className="heading">{!i && 'Attachment title'}
                              <input 
                                name={assetTitleName}
                                type="text"
                                placeholder="Title"
                                onChange={this.handleChange}
                                value={this.state.assets[i].title}
                                data-id={i}
                                data-name='title'
                              />
                            </label>
                            
                            <label htmlFor={assetName}  className="heading">{!i && 'Attachment URL'}
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

                            <label htmlFor={assetTypeName}  className="heading">{!i && 'Attachment Type'}
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
                      onClick={e => this.addAsset(e, user)}
                      type="button"  
                      primary
                    >
                      Add Attachment
                    </Button>
                  </WidgetFooter>
                </Widget>

              </Col>
              <Col sidebar>
                <SidebarRow>
                  <fieldset className="no-margin">
                    <label htmlFor="due"  className="heading">Task Due</label>
                      <Select 
                        options={[
                          {
                            value: '',
                            label: 'No Due Date',
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
                        placeholder={'No Due Date'}
                      />
                  </fieldset>

                  <label htmlFor="date" className="hidden heading">Date:</label>
                    {!dateDisabled && (
                      <DatePicker 
                        animate={!dateDisabled}
                        disabled={dateDisabled}
                        date={dueDate}
                        setDate={this.setDate}
                      />
                    )}
                </SidebarRow>

                <SidebarRow>
                  <fieldset className="no-margin">
                    <label htmlFor="due"  className="heading">Priority Level</label>
                      <Select 
                        options={[
                          {
                            value: 'LOWEST',
                            label: 'Lowest',
                          },
                          {
                            value: 'LOW',
                            label: 'Low',
                          },
                          {
                            value: 'MEDIUM',
                            label: 'Medium',
                          },
                          {
                            value: 'HIGH',
                            label: 'High',
                          },
                          {
                            value: 'URGENT',
                            label: 'Urgent',
                          },
                        ]} 
                        onChange={this.handlePriorityChange}
                        name="priority"
                        placeholder={'Low'}
                      />
                  </fieldset>
                </SidebarRow>
                
                {['ADMIN', 'SUPERADMIN'].includes(user.role) && (
                  <SidebarRow>
                    <label htmlFor="user"  className="heading">Assign Task to user</label>
                    <AssignToUser name="user" onChange={this.handleUserChange}/>
                  </SidebarRow>
                )}
              </Col>
            </Row>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default withApollo(CreateTaskForm)