import React, { Component } from 'react';
import './CourseInput.css';

class CourseInput extends Component {
  constructor () {
    super();
    this.state = { dept: "",
                   code: "" }
  }

  handleDeptChange(event) {
    var value = event.target.value;
    this.setState({dept: value});
    if (value.length === 4 && this.state.code.length === 3) {
      this.props.handleCourseChange(this.props.number, value, this.state.code);
    }
  }

  handleCodeChange(event) {
    var value = event.target.value;
    this.setState({code: value});
    if (value.length === 3 && this.state.dept.length === 4) {
      this.props.handleCourseChange(this.props.number, this.state.dept, value);
    }
  }

  render() {
    return (
      <tr>
        <td>
          <input type="text" placeholder="DEPT" maxLength="4" onChange={this.handleDeptChange.bind(this)}></input>
        </td>
        <td>
          <input type="text" placeholder="CODE" maxLength="3" onChange={this.handleCodeChange.bind(this)}></input>
        </td>
      </tr>
    )
  }
}

export default CourseInput;