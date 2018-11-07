import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import styled from 'styled-components'

import 'react-datepicker/dist/react-datepicker.css'

class DatePickerComponent extends Component {
  state = {
    date: ''
  }

  componentDidMount = () => {
    this.setState({ startDate: moment() })
  }

  handleChange = (date) => {
    this.setState({ startDate: date })
  }

  render() {
    return (
      <StyledDatePicker animate={this.props.animate}>
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          disabled={this.props.disabled}
        />
      </StyledDatePicker>
    )
  }
}

// TODO plugin styles uses rem so everythign looks tiny! 

const StyledDatePicker = styled.div`
  display: block;
  box-shadow: 0 0 0 rgba(204,169,44, 0.4);
  border-radius: 4px;
  

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

export default DatePickerComponent