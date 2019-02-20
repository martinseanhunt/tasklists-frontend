import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { CirclePicker } from 'react-color'

import ModalContainer from '../styles/modal/ModalContainer'
import ModalInner from '../styles/modal/ModalInner'
import WidgetHeader from '../styles/widget/WidgetHeader'
import WidgetRow from '../styles/widget/WidgetRow'
import WidgetFooter from '../styles/widget/WidgetFooter'
import Form from '../styles/Form'
import Button from '../styles/Button'

import { ALL_TASKLISTS_QUERY } from './TaskLists'
import { TASKLISTS_QUERY } from '../TaskLists/TaskLists'

const CREATE_TASKLIST_MUTATION = gql`
  mutation CREATE_TASKLIST_MUTATION(
    $name: String!, 
    $description: String!, 
    $taskListFields: [TaskListFieldCreateWithoutTaskListInput]
    $color: String
  ) {
    createTaskList(
      name: $name
      description: $description
      taskListFields: $taskListFields
      color: $color
    ){
      name
      description
    }
  }
`

// TODO add icons to buttons

// TODO avatars upload + default typography avatar

// TODO remove refetch queries once using pagination and cache clearing

// TODO improve errors

// TODO only scroll on middle widget container

class CreateTaskList extends Component {
  scrollableWidget = React.createRef()

  state = {
    name: '',
    description: '',
    taskListFields: [],
    color: '#6758F3'
  }

  handleChange = e => {
    const { name, id } = e.target.dataset

    if(['fieldName', 'fieldType'].includes(name)){
      const taskListFields = [...this.state.taskListFields]
      taskListFields[id][name] = e.target.value

      return this.setState({ taskListFields })
    }

    this.setState({ [e.target.name]: e.target.value })
  }

  handleColorChange = color => this.setState({ color: color.hex })

  onCompleted = () => {
    this.setState({
      name: '',
      description: '',
      taskListFields: [{fieldName: '', fieldType: 'STRING'}],
      color: '#6758F3'
    })

    this.props.closeModal()
  }
  
  addCustomField = e => {
    this.setState(state => ({
      taskListFields: [...state.taskListFields, {fieldName: '', fieldType: 'STRING'}]
    }), () => {
      // scroll to bottom of container if it's scrolalble
      const widget = this.scrollableWidget
      widget.scrollTop = widget.offsetHeight
    })
  }

  createTaskList = (createTaskList) => createTaskList({
    variables: {
      ...this.state,
      taskListFields: this.state.taskListFields
        .filter(field => field.fieldName !== '')
    }
  })

  removeField = i => this.setState(state => ({
    taskListFields: state.taskListFields
      .filter((field, index) => index !== i)
  }))

  render() {
    const { showModal, closeModal } = this.props
    const { name, description, taskListFields, color } = this.state

    return showModal ? (
      <Mutation 
        mutation={CREATE_TASKLIST_MUTATION}
        refetchQueries={[
          { query: ALL_TASKLISTS_QUERY },
          { query: TASKLISTS_QUERY }
        ]}
        onCompleted={this.onCompleted}
      >
        {(createTaskList, { error, loading }) => (
          <ModalContainer onClick={closeModal}>
            <ModalInner onClick={(e) => e.stopPropagation()}>
              <WidgetHeader>
                <h3>Create New TaskList</h3>
                <button 
                  className="close"
                  onClick={closeModal}
                >X</button>
              </WidgetHeader>
              <WidgetRow 
                ref={(el) => this.scrollableWidget = el} 
              >
                {error && <p>{error.message}</p>}
                <UserForm>
                  <label htmlFor="name">TaskList Name
                    <input 
                      onChange={this.handleChange}
                      name="name"  
                      type="text"
                      value={name}
                      placeholder="TaskList Name"
                    ></input>
                  </label>
    
                  <label htmlFor="email">TaskList description
                    <textarea 
                      onChange={this.handleChange}
                      name="description"  
                      type="text"
                      value={description}
                      placeholder="This TaskList is for..."
                    ></textarea>
                  </label>

                  <label htmlFor="taskListFields">
                    Cusom TaskList Feilds
                    <span>These are optional, TaskList specific, fields that appear in addition to the default fields.</span>
                  </label>

                  {taskListFields.map((_, i) => {
                    const fieldNameName = 'fieldName' + i
                    const fieldTypeName = 'fieldType' + i
                    
                    return (
                      <fieldset 
                        name="taskListFields" 
                        key={'taskListFields' + i}
                        className={i > 0 ? 'no-margin' : ''}  
                      >
                        
                        <div className="flex flex--removable">
                          <label htmlFor={fieldNameName}>{!i && 'Field Name'}
                            <input 
                              name={fieldNameName}
                              type="text"
                              placeholder="Field Name"
                              onChange={this.handleChange}
                              value={this.state.taskListFields[i].fieldName}
                              data-id={i}
                              data-name='fieldName'
                            />
                          </label>

                          <label htmlFor={fieldTypeName}>{!i && 'Field Type'}
                            <select
                              name={fieldTypeName}
                              onChange={this.handleChange}
                              value={this.state.taskListFields[i].fieldType}
                              data-id={i}
                              data-name='fieldType'
                            >
                              <option value="STRING">Text</option>
                              <option value="DATE">Date</option>
                              <option value="INT">Number</option>
                              <option value="ASSET">File</option>
                            </select>
                          </label>

                          <button 
                            onClick={() => this.removeField(i)}
                            type="button"
                          >X</button>
                        </div>
                      </fieldset>
                    )
                  })}
                  
                  <AddNew>
                    <Button 
                      onClick={this.addCustomField}
                      type="button"  
                      primary
                    >
                      Add new field
                    </Button>
                  </AddNew>

                  <StyledPicker>
                    <label htmlFor="color">Color
                      <span className='instructions'>Used for some list specific styling elements</span>
                      <CirclePicker
                        onChangeComplete={ this.handleColorChange }
                        color={this.state.color}
                        colors={["#6758F3", "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"]}
                        width={'100%'}
                      />
                    </label>
                  </StyledPicker>

                </UserForm>
              </WidgetRow>
    
              <WidgetFooter>
                <Button 
                  onClick={closeModal}
                >Cancel</Button>
                <Button 
                  secondary 
                  onClick={() => this.createTaskList(createTaskList)}
                  disabled={loading}
                >
                  Create Task List
                </Button>
              </WidgetFooter>
            </ModalInner>
          </ModalContainer>
        )}
      </Mutation>
    ) : null
  }
}


// TODO Move this in to option to style via prop since it's in two places now

const UserForm = styled(Form)`
  padding: 0;

  label:first-of-type {
    margin-top: 0px;
  }
`

// TODO should this be part of the form styling component ? Make form a folder ? 

const AddNew = styled.div`
  border-top: 1px solid #eaedf2;
  margin-top: 20px;
  padding-top: 20px;
  text-align: right;
  margin-bottom: 10px;
`

const StyledPicker = styled.div`
  .instructions {
    padding: 10px 0 15px 0;
  }

  label span {
    padding-top: 0;
  }

  span div span div {
    width: 28px !important;
    height: 28px !important;
  }
`

export default CreateTaskList