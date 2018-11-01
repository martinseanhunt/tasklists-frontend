import styled from 'styled-components'

const Form = styled.form`
  flex-basis: 50%;
  padding: 32px 40px;

  label, input {
    display: block;
  }

  h1 {
    font-weight: normal;
    font-size: 2.2rem;
    line-height: 1.45rem;
    color: #3e3f42;
  }

  p {
    line-height: 1.7rem;
    color: #9ea0a5;         
  }

  input {
    padding: 11px 16px;
    border-radius: 4px;
    box-shadow: inset 0 1px 2px 0 rgba(102, 113, 123, 0.1);
    border: solid 1px #e2e5ed;
    background-color: #ffffff;
    width: 100%;
    color: #3e3f42;
    margin-top: 10px;
    font-size: 1.4rem;

    &:disabled {
      opacity: 0.4;
    }
  }

  select {
    height: 38px;
    border-radius: 4px;
    box-shadow: inset 0 1px 2px 0 rgba(102, 113, 123, 0.1);
    border: solid 1px #e2e5ed;
    background-color: #ffffff;
    width: 100%;
    color: #3e3f42;
    margin-top: 10px;
    font-size: 1.4rem;
    display: block;
    text-indent: 12px;
    cursor: pointer;
  }

  label {
    font-size: 1.2rem;
    text-transform: uppercase;
    color: #9ea0a5;
    font-weight: 500;
    display: block;
    margin-top: 20px;
  
    &:first-of-type {
      margin-top: 30px;  
    }
  }
`

export default Form