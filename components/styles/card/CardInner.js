import styled from 'styled-components'

const CardInner = styled.div`
  border-bottom: 1px solid #EAEDF3;
  padding: 25px 30px;
  
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

  .progress {
    margin-top: 10px;
    margin-bottom: 5px;
    height: 4px;
    background: #E6E7E8;
    width: 90%;
    border-radius: 2px;
    
    span {
      background: #1665d8;
      height: 4px;
    }
  }
`

export default CardInner