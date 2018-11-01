import React from 'react'

// TODO resend invitation

// TODO Edit user Modal

const UserCard = ({user}) => (
  <tr>
    <td><strong>{user.name}</strong></td>
    <td>{user.email}</td>
    <td>{user.slackHandle}</td>
    <td>{user.role}</td>
    <td>{user.status}</td>
    <td className="edit">...</td>
  </tr>
)

export default UserCard