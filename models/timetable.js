function Section(info) {
	this.name = info['name'];
	this.activity = info['activity'];
	this.start_time = info['start_time'];
	this.end_time = info['end_time'];
	this.days = info['days'];
	this.check_conflict = function(other) {
		var all_days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
		for (var i = 0; i < all_days.length; i++) {
			var day = all_days[i];
			if (this.days.indexOf(day) !== -1 && other.days.indexOf(day) !== -1) {
				var start_1_parse = this.start_time.split(':');
				var start_1 = start_1_parse[0]*100 + start_1_parse[1];
				var end_1_parse = this.end_time.split(':');
				var end_1 = end_1_parse[0]*100 + end_1_parse[1];
				var start_2_parse = other.start_time.split(':');
				var start_2 = start_2_parse[0]*100 + start_2_parse[1];
				var end_2_parse = other.end_time.split(':');
				var end_2 = end_2_parse[0]*100 + end_2_parse[1];
				if ((start_1 < start_2 && end_1 > start_2) || (end_1 > end_2 && start_1 < end_2)) {
					return true;
				}
			}
		return false;
	}
}

function Schedule(sections) {
	this.sections = sections || [];
	this.check_conflict = function(section) {
		for (var i = 0; i < this.sections.length; i++) {
			if (this.sections[i].check_conflict(section)) {
				return true;
			}
		}
		return false;
	}
	this.get_add_section = function(section) {
		if (!(this.check_conflict(section))) {
			this.sections.push(section);
			return this.sections;
		}
		return false;
	}
}

function Timetables(schedules) {
	this.schedules = schedules || [];
	this.add_sections = function(sections) {
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
					new_schedules.push(try_add_section);
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
}

module.exports = {
	create_timetable: function(sections) {

		// split the sections by activity
		var lectures = [];
		var laboratories = [];
		var tutorials = [];

		for (var i = 0; i < sections.length; i++) {
			var section = sections[i];
			var activity = section['activity'];
			if (activity == 'Lecture') {
				lectures.push(new Section(section));
			} else if (activity == 'Laboratory') {
				laboratories.push(new Section(section));
			} else if (activity == 'Tutorial') {
				tutorials.push(new Section(section));
			}
		}

		if (lectures.length == 0) {
			console.err('No lectures found');
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
	}
}