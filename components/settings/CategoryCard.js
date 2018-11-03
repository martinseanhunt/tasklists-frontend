import React from 'react'

const UserCard = ({ category }) => (
  <tr>
    <td><strong>{category.name}</strong></td>
    <td>{category.categoryFields.length}</td>
    <td>TODO</td>
    <td>TODO</td>
    <td className="edit">...</td>
  </tr>
)

export default UserCard