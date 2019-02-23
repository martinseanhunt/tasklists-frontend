import React from 'react'
import styled from 'styled-components'

import Widget from '../../styles/widget/Widget'
import WidgetHeader from '../../styles/widget/WidgetHeader'
import TaskListIcon from '../../common/TaskListIcon'

const SectionHeader = ({ justControls, children, taskList, title, subTitle }) => (
  <>
    <TaskListHeader>
      <TaskListHeaderInner fluidHeight>
        <Meta>
          <TaskListIcon 
            color={taskList.color || '#6758F3'} 
            name={taskList.name}
            large  
          />
          <div>
            <h2>{title || taskList.name}</h2>
            <p>{subTitle || taskList.description}</p>
          </div>
        </Meta>
        
        <Controls justControls={justControls}>
          {children}
        </Controls>
      </TaskListHeaderInner>
    </TaskListHeader>
    <Padder/>
  </>
)


const TaskListHeader = styled(Widget)`
  border: 0;
  position: fixed;
  width: calc(100% - 269px);
  z-index: 1000;
`

const Padder = styled.div`
  margin-bottom: 35px;
  height: 74px;
`

const TaskListHeaderInner = styled(WidgetHeader)`
  padding-right: 25px;
`

const Meta = styled.div`
  display: flex;
  align-items: flex-start;

  div:first-child {
    margin-right: 10px;
    margin-top: 1px;
  }

  h2 {
    margin-top: 3px;
    margin-bottom: 0px;
    font-size: 18px;
    font-weight: 500;
  }

  p {
    margin: 0;
  }
`

const Controls = styled.div`
  display: flex;
  align-items: center;

  label {
    width: 230px;
    margin-right: 15px;
  }

  
`


export default SectionHeader