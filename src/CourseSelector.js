import React, { Component } from 'react';
import './CourseSelector.css';

import { Table } from 'react-bootstrap';

import CourseInput from './CourseInput'
import CourseAdd from './CourseAdd'

class CourseSelector extends Component {
  constructor () {
    super();
    this.state = {
      numCourses: 1
    };
  }

  onAddCourse () {
    this.setState({
      numCourses: Math.min(this.state.numCourses + 1, 7)
    })
    console.log(this.state.numCourses)
  }

  render() {
    const children = []

    for (var i = 0; i < this.state.numCourses; i += 1) {
      children.push(<CourseInput number={i} />);
    };

    return (
      <div className="CourseSelector">
        <Table className="SelectorTable" striped bordered condensed hover>
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
            <CourseAdd addCourse={this.onAddCourse.bind(this)} />
          </tbody>
        </Table>
      </div>
    )
  }
}

export default CourseSelector;