import styled from 'styled-components'

// TODO Seperate form elements in to their own components to avoid
// Style interference like with react-select etc

const Form = styled.form`
  flex-basis: 50%;
  padding: ${({noPadd}) => noPadd ? '0' : '32px 40px'};

  input {
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
    margin: 20px 0 0 0;
    display: flex;

    &.no-margin {
      margin: 0;
    }

    .flex {
      display: flex;
      flex-wrap: wrap;

      label{
        margin-top: 20px;
        flex-basis: 50%;
        
        &:first-child {
          padding-right: 5px;
          margin-top: 0;
        }

        &:nth-child(2) {
          padding-left: 5px;
          margin-top: 0;
        }
      }

      &--removable {
        position: relative;
        margin-top: 0;
        
        label {
          flex-basis: 35%;

          &:nth-child(3) {
            flex-basis: 25%;
            flex-grow: 0;
            border: #000;
            margin-top: 0;
            padding-left: 10px;
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

  label.heading {
    font-size: 1.2rem;
    text-transform: uppercase;
    color: #9ea0a5;
    font-weight: 500;
    display: block;
    margin-top: 20px;
    display: block;
    font-weight: ${({ boldLabel }) => boldLabel ? '500' : 'normal'};

    &.hidden {
      visibility: hidden;
      height: 0; 
      overflow: hidden;
    } 
    
    &.inside-header {
      text-transform: none;
      color: inherit;
      font-size: inherit;
      font-weight: inherit;
    }
  
    span {
      display: block;
      text-transform: none;
      color: #3e3f42;
      padding-top: 10px;
    }

    &:first-of-type {
      margin-top: ${({noPadd}) => noPadd ? '0' : '30px'};  
    }
  }
`

export default Form