import styled from 'styled-components'

const CardInner = styled.div`
  padding: 25px 30px;
  display: flex; 
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  
  h3 {
    font-size: 1.8rem;
    line-height: 1.56;
    font-weight: 500;
    color: #3e3f42;
    margin-top: 0;
    margin-bottom: 9px;
  }

  p {
    color: #9ea0a5;
    font-size: 1.4rem;
    line-height: 1.57;
    margin-top: 0;
    width: calc(100% + 10px)
  }

  span {
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.33;
    text-transform: uppercase;
    color: #9ea0a5;
    display: block;
  }

  ${({ centered }) => centered && `
    text-align: center;
    
    p {
      width: 100%;
    }
  `}

  .progress {
    margin-top: 10px;
    margin-bottom: 5px;
    height: 4px;
    background: #E6E7E8;
    width: 90%;
    border-radius: 2px;
    border: 1px solid #E6E7E8;
    overflow: visible;
    
    span {
      background: #1665d8;
      height: 4px;
      position: relative;
      top: -1px;
      left: -1px;
      border-radius: 2px;
      border: 1px solid #1665d8;
    }

    &--complete {
      span {
        background: #34AA44;
        border-color: #34AA44;
      }
    }
    
  }

  .status {
    margin-top: 10px;
    margin-bottom: 5px;
    height: 4px;
    width: 90%;
    display: flex;
    
    span {
      flex: 1;
      background: #E6E7E8;
      height: 4px;
      border-radius: 2px;
      border: 1px solid #E6E7E8;
      margin-right: 5px;

      &:last-child {
        margin-right: 0;
      }
    }

    &--CREATED {
      span {
        &:nth-child(1) {
          background: #1665d8;
          border: 1px solid #1665d8;
        }
      }
    }

    &--ASSIGNED {
      span {
        &:nth-child(1), &:nth-child(2) {
          background: #1665d8;
          border: 1px solid #1665d8;
        }
      }
    }

    &--AWAITINGINPUT {
      span {
        &:nth-child(1), &:nth-child(2), &:nth-child(3) {
          background: #1665d8;
          border: 1px solid #1665d8;
        }
      }
    }

    &--COMPLETED {
      span {
        &:nth-child(1), &:nth-child(2), &:nth-child(3), &:nth-child(4) {
          background: #34aa44;
          border: 1px solid #34aa44;
        }
      }
    }

    &--CLOSED {
      span {
        &:nth-child(1), &:nth-child(2), &:nth-child(3), &:nth-child(4) {
          background: #e6492d;
          border: 1px solid #e6492d;
        }
      }
    }
  }
`

export default CardInner