import styled from 'styled-components'

// TODO hover state and animation

const Button = styled.button`
  cursor: pointer;
  height: 38px;
  border-radius: 4px;
  box-shadow: 0 1px 1px 0 rgba(22, 29, 37, 0.05), inset 0 2px 0 0 rgba(255, 255, 255, 0.05);
  border: solid 1px #d8dce6;
  background-image: linear-gradient(to top, #f6f7f9, #ffffff);
  padding: 0 15px;

  ${props => props.primary && `
    box-shadow: 0 1px 1px 0 rgba(22, 29, 37, 0.1), inset 0 2px 0 0 rgba(255, 255, 255, 0.06);
    border: solid 1px #1461d2;
    background-image: linear-gradient(to top, #1665d8, #1f6fe5);
    color: #fff;
  `}

  ${props => props.cancel && `
    box-shadow: 0 1px 1px 0 rgba(22, 29, 37, 0.1), inset 0 2px 0 0 rgba(255, 255, 255, 0.06);
    border: solid 1px #e6492d;
    background-image: linear-gradient(to top, #e6492d, #D8442A);
    color: #fff;
    margin-left: 10px;
  `}

  ${props => props.secondary && `
    box-shadow: 0 1px 1px 0 rgba(19, 31, 21, 0.1), inset 0 2px 0 0 rgba(255, 255, 255, 0.06);
    border: solid 1px #2d9c3c;
    background-image: linear-gradient(to top, #34aa44, #38b249);
    color: #fff;
  `}

  ${props => props.fullWidth && `
    width: 100%;
  `}

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`

export default Button