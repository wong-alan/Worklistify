function Section(info) {
	this.name = info['name'];
	this.activity = info['activity'];
	this.start_time = info['start_time'];
	this.end_time = info['end_time'];
	this.days = info['days'];
}

Section.prototype.check_conflict = function(other) {
	var all_days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	for (var i = 0; i < all_days.length; i++) {
		var day = all_days[i];
		if (this.days !== null && this.days.indexOf(day) !== -1 && other.days.indexOf(day) !== -1) {
			var start_1_parse = this.start_time.split(':');
			var start_1 = parseInt(start_1_parse[0])*60 + parseInt(start_1_parse[1]);
			var end_1_parse = this.end_time.split(':');
			var end_1 = parseInt(end_1_parse[0])*60 + parseInt(end_1_parse[1]);
			var start_2_parse = other.start_time.split(':');
			var start_2 = parseInt(start_2_parse[0])*60 + parseInt(start_2_parse[1]);
			var end_2_parse = other.end_time.split(':');
			var end_2 = parseInt(end_2_parse[0])*60 + parseInt(end_2_parse[1]);
			if ((start_1 < start_2 && end_1 > start_2) || (end_1 > end_2 && start_1 < end_2)) {
				return true;
			}
		}
	}
	return false;
}

function Schedule(sections) {
	this.sections = sections || [];
}

Schedule.prototype.check_conflict = function(section) {
	for (var i = 0; i < this.sections.length; i++) {
		if (this.sections[i].check_conflict(section)) {
			return true;
		}
	}
	return false;
}

Schedule.prototype.get_add_section = function(section) {
	if (!(this.check_conflict(section))) {
		var added_sections = [];
		for (var i = 0; i < this.sections.length; i++) {
			added_sections.push(this.sections[i]);
		}
		added_sections.push(section);
		return added_sections;
	}
	return false;
}

function Timetables(schedules) {
	this.schedules = schedules || [];
}

Timetables.prototype.add_sections = function(sections) {
	if (this.schedules.length === 0) {
		this.schedules = sections;
		return true;
	}
	if (sections.length === 0) {
		return true;
	}
	var new_schedules = [];
	for (var i = 0; i < this.schedules.length; i++) {
		for (var j = 0; j < sections.length; j++) {
			var try_add_section = this.schedules[i].get_add_section(sections[j]);
			if (try_add_section) {
				new_schedules.push(new Schedule(try_add_section));
			}
		}
	}
	if (new_schedules.length === 0) {
		console.log('No possible timetables!');
		return false;
	} else {
		this.schedules = new_schedules;
		return true;
	}
}

module.exports = {
	// sections is an array of sections for one course
	create_timetable_single: function(sections) {

		// split the sections by activity
		var lectures = [];
		var laboratories = [];
		var tutorials = [];

		for (var i = 0; i < sections.length; i++) {
			var section = sections[i];
			var activity = section['activity'];
			if (activity == 'Lecture') {
				lectures.push(new Schedule([new Section(section)]));
			} else if (activity == 'Laboratory') {
				laboratories.push(new Section(section));
			} else if (activity == 'Tutorial') {
				tutorials.push(new Section(section));
			}
		}

		if (lectures.length == 0) {
			console.log('No lectures found');
			return [];
		}

		var timetables = new Timetables(lectures);
		if (!(timetables.add_sections(laboratories))) {
			return [];
		}
		if (!(timetables.add_sections(tutorials))) {
			return [];
		}
		return timetables.schedules;
	},
	// courses_sections is an array of array of sections, based on course
	create_timetable: function(courses_sections) {
		var timetables;
		for (var i = 0; i < courses_sections.length; i++) {
			// split the sections by activity
			var lectures = [];
			var laboratories = [];
			var tutorials = [];

			for (var j = 0; j < courses_sections[i].length; j++) {
				var section = courses_sections[i][j];
				var activity = section['activity'];
				if (activity == 'Lecture') {
					if (i === 0) {
						lectures.push(new Schedule([new Section(section)]));
					} else {
						lectures.push(new Section(section));
					}
				} else if (activity == 'Laboratory') {
					laboratories.push(new Section(section));
				} else if (activity == 'Tutorial') {
					tutorials.push(new Section(section));
				}
			}

			if (lectures.length == 0) {
				console.log('No lectures found for course ' + (i+1).toString());
				return [];
			}
			if (i === 0) {
				var timetables = new Timetables(lectures);
			} else {
				if (!(timetables.add_sections(lectures))) {
					return [];
				}
			}
			if (!(timetables.add_sections(laboratories))) {
				return [];
			}
			if (!(timetables.add_sections(tutorials))) {
				return [];
			}
		}
		if (timetables) {
			return timetables.schedules;
		}
		return [];
	}
}
