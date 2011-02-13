var RepeatType = {
	afterComplete: 1,
	afterDue: 0
}
var Repeat = {
	day: 0,
	week: 1,
	month: 2,
	year: 3,
	weekday: 4
}


var Task = persistence.define('Task', {
	name: 'TEXT',
	due: 'DATE',
	repeatType: 'INT',
	repeat: 'INT',
	lastDue: 'DATE',
    reminder: 'DATE'
});
Task.prototype.getNextDue = function() {
    var d;
	if (this.repeatType == RepeatType.afterDue) 
		d = this.due || Date.today();
	else if (this.repeatType == RepeatType.afterComplete)
		d = Date.today();
	
	switch(this.repeat) {
		case Repeat.day:
			d = d.addDays(1);
			break;
		case Repeat.week:
			d = d.addWeeks(1);
			break;
		case Repeat.month:
			d = d.addMonths(1);
			break;
		case Repeat.year:
			d = d.addYears(1);
			break;
		case Repeat.weekday:
			if (d.is().friday())
				d = d.next().monday();
			else
				d = d.addDays(1);
			break;
	}
    return d;
}
Task.prototype.repeatString = function() {
    for (var str in Repeat) {
        if (Repeat[str] == this.repeat)
            return str
    }
    return "";
}
Task.prototype.complete = function() {
	this.lastDue = new Date(this.due.getTime());
    this.due = this.getNextDue();	
}
Task.prototype.undoComplete = function() {
	this.due = this.lastDue;
}
Task.prototype.isDueToday = function() {
	var d = new Date(this.due.getTime()).clearTime().getTime();
	return (d == Date.today().getTime());
}
Task.prototype.isDueTomorrow = function() {
	var d = new Date(this.due.getTime()).clearTime().getTime();
	return (d == Date.today().addDays(1).getTime());
}
Task.prototype.isOverdue = function() {
	var d = new Date(this.due.getTime()).clearTime().getTime();
	return ((Date.today().getTime() - d) > 0) 
}
