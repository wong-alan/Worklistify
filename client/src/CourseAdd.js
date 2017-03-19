import React, { Component } from 'react';
import './CourseAdd.css';

import plus from './assets/images/plus.svg'

class CourseAdd extends Component {
  render() {
    return (
      <tr>
        <td onClick={this.props.addCourse} colSpan="2">
          <img src={plus} className="plus-icon" alt="plus" />
           <text>Add a course</text>
        </td>
      </tr>
    )
  }
}

export default CourseAdd;