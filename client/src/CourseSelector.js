import React, { Component } from 'react';
import './CourseSelector.css';

import { Table } from 'react-bootstrap';

import CourseInput from './CourseInput'
import CourseAdd from './CourseAdd'

class CourseSelector extends Component {

  render() {
    const children = [];

    for (var i = 0; i < this.props.numCourses; i += 1) {
      children.push(<CourseInput number={i} key={i}
              handleCourseChange={this.props.handleCourseChange.bind(this)} />);
    };

    return (
      <div className="CourseSelector">
        <Table className="SelectorTable" condensed>
          <thead>
            <tr>
              <th>
                DEPT
              </th>
              <th>
                CODE
              </th>
            </tr>
          </thead>
          <tbody>
            {children}
            <CourseAdd addCourse={this.props.handleAddCourse.bind(this)} />
          </tbody>
        </Table>
      </div>
    )
  }
}

export default CourseSelector;