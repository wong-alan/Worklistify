import React, { Component } from 'react';
import './WorklistBuilder.css';

import CourseSelector from './CourseSelector.js'
import WorklistDisplay from './WorklistDisplay.js'

class WorklistBuilder extends Component {

  render() {
    return (
      <div className="WorklistBuilder">
        <div className="CourseSelectionDiv">
          <CourseSelector>
          </CourseSelector>
        </div>
        <div className="WorklistDisplayDiv">
          <WorklistDisplay>
          </WorklistDisplay>
        </div>
      </div>
    )
  }
}

export default WorklistBuilder