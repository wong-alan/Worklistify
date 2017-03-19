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
      this.setState({ newCourse: { "dept": "",
                                   "code": ""},
                      numCourses: newCourse
      });
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
    console.log(id)
    console.log(dept)
    console.log(code)
    var newState = this.state;
    newState[id] = {"dept": dept, 
                    "code": code};
    console.log(newState);

    var query = "";
    for (var i = 0; i < newState.numCourses; i += 1) {
      if (this.validCourse(newState[i])) {
        query += "dept" + i + "=" + newState[i].dept + "&";
        query += "code" + i + "=" + newState[i].code + "&";
      }
    }

    if (query.length > 0) {
      query = query.slice(0, 1);
      console.log(query)
    }

    this.setState(newState);
  }

  render() {
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