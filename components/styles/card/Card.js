import styled from 'styled-components'
import Widget from '../widget/Widget'

const Card = styled(Widget)`
  margin-bottom: 30px;
  transition: all 0.15s;

  &:hover {
    cursor: pointer;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  
    a {
      opacity: 0.7;
    }
  }
`

export default Card