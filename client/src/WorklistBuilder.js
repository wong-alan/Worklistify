import React, { Component } from 'react';
import './WorklistBuilder.css';

import CourseSelector from './CourseSelector.js'
import WorklistDisplay from './WorklistDisplay.js'

class WorklistBuilder extends Component {
  constructor () {
    super();
    this.state = { numCourses: 1,
                  0: { "dept": "",
                       "code": ""} }
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
      window.alert("Max 7 Courses lmao");
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
    newState[id] = {"dept": dept, 
                    "code": code};

    this.setState(newState);
  }

  render() {

    console.log(this.state);

    var query = "";
    var validCourses = 0;

    for (var i = 0; i < 7; i += 1) {
      var course = this.state[i];
      var dept = "%00";
      var code = "%00";
      if (course !== undefined) {
        if (this.validCourse(course)) {
          validCourses += 1;
          dept = course.dept;
          code = course.code;
        }
      }
      query += "dept" + i + "=" + dept + "&";
      query += "code" + i + "=" + code + "&";
    }

    if (validCourses) {
      query = query.slice(0, -1);
      console.log("Query: " + query);
      console.log("Pass the response into WorklistDisplay.")
    }

    return (
      <div className="WorklistBuilder">
        <div className="CourseSelectionDiv">
          <CourseSelector numCourses={this.state.numCourses} 
                          handleAddCourse={this.onAddCourse.bind(this)}
                          handleCourseChange={this.handleCourseChange.bind(this)} />
        </div>
        <div className="WorklistDisplayDiv">
          <WorklistDisplay />
        </div>
      </div>
    )
  }
}

export default WorklistBuilder