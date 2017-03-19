import React, { Component } from 'react';
import './WorklistBuilder.css';

import Client from './Client.js'
import CourseSelector from './CourseSelector.js'
import WorklistDisplay from './WorklistDisplay.js'

class WorklistBuilder extends Component {
  constructor () {
    super();
    this.state = { numCourses: 1,
                   sendQuery: false,
                  0: { "dept": "",
                       "code": ""},
                  not_found: [],
                  timetable: [] }
  }

  onAddCourse () {
    var newCourse = this.state.numCourses + 1;

    if (newCourse <= 7) {
      var newState = {};
      newState[newCourse-1] = { "dept": "",
                              "code": ""}
      newState.numCourses = newCourse;
      this.setState(newState);
    } else {
      window.alert("Max 7 Courses.");
    }
  }

  validCourse(course) {
    var dept = course.dept
    var code = course.code

    if (dept.length === 4 && code.length === 3) {
      return true
    }
    return false
  }

  handleCourseChange(id, dept, code) {
    var newState = {};
    var course = {"dept": dept, 
                  "code": code};
    newState[id] = course;
    if (this.validCourse(course)) {
      newState.sendQuery = true;
    } else {
      newState.sendQuery = false;
    }

    this.setState(newState);
  }

  render() {

    if (this.state.sendQuery) {
      var query = "";
      var validCourses = 0;

      var not_found;
      var timetable;

      for (var i = 0; i < this.state.numCourses; i += 1) {
        var course = this.state[i];
        if (course !== undefined) {
          if (this.validCourse(course)) {
            validCourses += 1;
            var dept = course.dept.toUpperCase();
            var code = course.code;
            query += "c" + (i+1) + "=" + dept + code + "&";
          }
        }
      }

      if (validCourses) {
        query = query.slice(0, -1);

        Client.search(query, (result) => {
          not_found = result['not_found'];
          timetable = result['timetable'];
          var newState = {};
          newState.sendQuery = false;
          newState.not_found = not_found;
          newState.timetable = timetable;
          this.setState(newState);
        });
      }
    }

    return (
      <div className="WorklistBuilder">
        <div className="CourseSelectionDiv">
          <CourseSelector numCourses={this.state.numCourses} 
                          handleAddCourse={this.onAddCourse.bind(this)}
                          handleCourseChange={this.handleCourseChange.bind(this)} />
        </div>
        <div className="WorklistDisplayDiv">
          <WorklistDisplay notFound={this.state.not_found} timetable={this.state.timetable} />
        </div>
      </div>
    )
  }
}

export default WorklistBuilder