import React, { Component } from 'react';
import './WorklistDisplay.css';

import { Table } from 'react-bootstrap';

class WorklistDisplay extends Component {

  render() {
    const children = [];
    const timetable = [];
    var i = 0, j = 0;
    if (this.props.notFound.length > 0) {
      var not_found_courses = "Could not find ";
      for (i = 0; i < this.props.notFound.length; i += 1) {
        not_found_courses = not_found_courses + this.props.notFound[i] + ", ";
      }
      not_found_courses = not_found_courses.slice(0, -2) + ".";
      children.push(<p key={i}>{not_found_courses}</p>)
    }
    if (this.props.timetable.length < 1) {
      children.push(<p key={i+1}>No timetables containing all requested courses found.</p>);
    } else {
      var sections = [];

      for (j = 0; j < this.props.timetable.length; j += 1) {
        var section = this.props.timetable[j]
        sections.push(<tr key={i+j}>
                        <td>{section.name}</td>
                        <td>{section.activity}</td>
                        <td>{section.start_time}</td>
                        <td>{section.end_time}</td>
                        <td>{section.days}</td>
                      </tr>);
      }

      timetable.push(<Table key={i+j+1} condensed>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Activity</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Days</th>
                          </tr>
                        </thead>
                        <tbody>
                        {sections}
                        </tbody>
                     </Table>);
    }

    return (
      <div className="WorklistDisplay">
        {children}
        {timetable}
      </div>
    )
  }
}

export default WorklistDisplay