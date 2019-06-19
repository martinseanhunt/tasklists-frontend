import React, { Component } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'

class DatePickerComponent extends Component {
  render() {
    return (
      <div>
        <DayPickerInput onDayChange={this.props.setDate} disabled={this.props.disabled} selectedDay={this.props.selected}
        value={this.props.selected} />
      </div>
    )
  }
}

export default DatePickerComponent