import React, { Component } from 'react';
import './CourseInput.css';

class CourseInput extends Component {
  constructor () {
    super();
    this.state = { dept: "",
                   code: "" }
  }

  handleDeptChange(event) {
    console.log(event.target.value);
    this.setState({dept: event.target.value});
    console.log(this.state.dept);
    console.log(this.state.code);
    this.props.handleCourseChange(this.props.number, this.state.dept, this.state.code);
  }

  handleCodeChange(event) {
    this.setState({code: event.target.value});
    this.props.handleCourseChange(this.props.number, this.state.dept, this.state.code);
  }

  render() {
    return (
      <tr>
        <td>
          <input type="text" placeholder="DEPT" onChange={this.handleDeptChange.bind(this)}></input>
        </td>
        <td>
          <input type="text" placeholder="CODE" onChange={this.handleCodeChange.bind(this)}></input>
        </td>
      </tr>
    )
  }
}

export default CourseInput;