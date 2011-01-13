var RepeatType = {
	every: 0,
	after: 1
}
var Repeat = {
	daily: 0,
	weekly: 1,
	monthly: 2,
	yearly: 3,
	weekday: 4
}


var Task = persistence.define('Task', {
	name: 'TEXT',
	due: 'DATE',
	repeatType: 'INT',
	repeat: 'INT',
	lastDue: 'DATE'
});
Task.prototype.getNextDue = function() {
}
Task.prototype.complete = function() {
	var d;
	this.lastDue = new Date(this.due.getTime());
	if (this.repeatType == RepeatType.every) 
		d = this.due;
	else if (this.repeatType == RepeatType.after)
		d = Date.today();
	
	switch(this.repeat) {
		case Repeat.daily:
			this.due = d.addDays(1);
			break;
		case Repeat.weekly:
			this.due = d.addWeeks(1);
			break;
		case Repeat.monthly:
			this.due = d.addMonths(1);
			break;
		case Repeat.yearly:
			this.due = d.addYears(1);
			break;
		case Repeat.weekday:
			if (d.is().friday())
				this.due = d.next().monday();
			else
				this.due = d.addDays(1);
			break;
	}
	
}
Task.prototype.undoComplete = function() {
	this.due = this.lastDue;
}
