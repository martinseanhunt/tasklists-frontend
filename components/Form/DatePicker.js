import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import styled from 'styled-components'

import 'react-datepicker/dist/react-datepicker.css'

class DatePickerComponent extends Component {
  componentDidMount = () => this.props.setDate(moment())

  render() {
    return (
      <StyledDatePicker animate={this.props.animate}>
        <DatePicker
          selected={this.props.date}
          onChange={this.props.setDate}
          disabled={this.props.disabled}
        />
        <NoDate disabled={this.props.disabled}>N/A</NoDate>
      </StyledDatePicker>
    )
  }
}

// TODO plugin styles uses rem so everythign looks tiny! 

const StyledDatePicker = styled.div`
  display: block;
  box-shadow: 0 0 0 rgba(204,169,44, 0.4);
  border-radius: 4px;
  position: relative;
  margin-top: 15px;

  ${({animate}) => animate && `
    animation: pulse 1s 2;
    
    @-webkit-keyframes pulse {
      0% {
        -webkit-box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
      }
      70% {
          -webkit-box-shadow: 0 0 0 10px rgba(204,169,44, 0);
      }
      100% {
          -webkit-box-shadow: 0 0 0 0 rgba(204,169,44, 0);
      }
    }
    @keyframes pulse {
      0% {
        -moz-box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
        box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
      }
      70% {
          -moz-box-shadow: 0 0 0 10px rgba(204,169,44, 0);
          box-shadow: 0 0 0 10px rgba(204,169,44, 0);
      }
      100% {
          -moz-box-shadow: 0 0 0 0 rgba(204,169,44, 0);
          box-shadow: 0 0 0 0 rgba(204,169,44, 0);
      }
    }
  `}


  .react-datepicker-wrapper, .react-datepicker__input-container {
    width: 100%;
    display: block;
  }

  input {
    cursor: pointer;

    &:disabled {
      cursor: default;
    }
  }
`

const NoDate = styled.span`
  visibility: ${({ disabled }) => disabled ? 'visible' : 'hidden'};
  position: absolute;
  top: 2px;
  left: 7px;
  display: block;
  color: #b2b2b2 !important;
  background: #fff;
  font-weight: normal;
  padding: 10px;
  min-width: 100px;
  font-size: 1.4rem;
` 

export default DatePickerComponent