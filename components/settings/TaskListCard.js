import React from 'react'

const TaskListCard = ({ taskList }) => (
  <tr>
    <td><strong>{taskList.name}</strong></td>
    <td>{taskList.taskListFields.length}</td>
    <td>TODO</td>
    <td>TODO</td>
    <td className="edit">...</td>
  </tr>
)

export default TaskListCard