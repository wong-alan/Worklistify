import React, { Component } from 'react';
import './CourseInput.css';

class CourseInput extends Component {
  render() {
    return (
      <tr>
        <td>
          <input type="text" placeholder="DEPT"></input>
        </td>
        <td>
          <input type="text" placeholder="CODE"></input>
        </td>
      </tr>
    )
  }
}

export default CourseInput;