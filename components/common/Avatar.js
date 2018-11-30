import styled from 'styled-components'

const getInitials = name => 
  name ? name.split(' ').map(n => n[0]).join('') : ''

const Avatar = ({user, xs, comment}) => {
  return (
    <AvatarContainer xs={xs} comment={comment} className='avatar'>
      {user.avatar && (
        <img src={user.avatar} alt={user.name} />
      )}

      {!user.avatar && (
        <span>{getInitials(user.name)}</span>
      )}
    </AvatarContainer>
  )
}

// TODO set default background color for user randomly when creating a user
// on server side
const colors = ['#1665D8', '#F6AB2F', '#34AA44', '#E6492D']

const AvatarContainer = styled.div`
  vertical-align: middle;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 5px;
  text-transform: uppercase;
  background-color: ${colors[2]};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 500;
  color: #fff;

  ${({xs}) => xs && `
    width: 25px;
    height: 25px;
    font-size: 1.1rem;
  `}

  ${({comment}) => comment && `
    position: absolute;
    left: -35px;
  `}
`

export default Avatar