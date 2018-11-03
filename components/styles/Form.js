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

  fieldset {
    padding: 0;
    border: none;
    margin-top: 20px;
    display: flex;

    &.no-margin {
      margin-top: 0;
    }

    label {
      font-weight: normal;
    }
    
    .flex {
      display: flex;
      
      label{
        margin-top: 0;
        flex-basis: 50%;
        
        &:first-child {
          padding-right: 5px;
        }

        &:nth-child(2) {
          padding-left: 5px;
        }
      }

      &--removable {
        position: relative;
        margin-top: 0;
        
        label {
          &:first-child {
            flex-basis:  55%;
          }

          &:nth-child(2) {
            flex-basis: 40%;
            flex-grow: 0;
            border: #000;
          }
        }
  
        button {
          background: none;
          border: none;
          height: 40px;
          vertical-align: baseline;
          position: absolute;
          bottom: 0;
          right: 0;
          padding: 5px;
        }
      }
    }
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

  textarea {
    padding: 11px 16px;
    border-radius: 4px;
    box-shadow: inset 0 1px 2px 0 rgba(102, 113, 123, 0.1);
    border: solid 1px #e2e5ed;
    background-color: #ffffff;
    width: 100%;
    color: #3e3f42;
    margin-top: 10px;
    font-size: 1.4rem;
    min-height: 120px;

    &:disabled {
      opacity: 0.4;
    }
  }

  select {
    height: 40px;
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
  
    span {
      display: block;
      text-transform: none;
      color: #3e3f42;
      padding-top: 10px;
    }

    &:first-of-type {
      margin-top: 30px;  
    }
  }
`

export default Form