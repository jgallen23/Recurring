var EditTaskView = ui.View.extend({
    init: function(element) {
        this._super(element);
		this.scroller = new iScroll(this.find("[role='content'] div[role='wrapper']"), { checkDOMChanges: false, desktopCompatibility: false }); 
    },
	destroy: function() {
		this.scroller.destroy();
	},
    populate: function(task) {
		var self = this;
        var data = { 
            task: {
                name: '',
                repeatType: '',
                repeat: '',
                due: Date.parse("8:00 AM"),
                getNextDue: function() { 
                    return '';
                }
			},
			showDelete: (task)
        };
        if (task) {
            data.task = task;
			this.find("h1").innerHTML = "Edit Task";
		} else {
			this.find("h1").innerHTML = "New Task";
		}
		data.dateFormat = this.dateFormat;
		data.dateFormatBasic = this.dateFormatBasic;
        this.renderAt("[role='content'] div[role='wrapper']", "jstEditTask", data);
        setTimeout(function () { self.scroller.refresh(); }, 0);
    },
	dateFormat: function(date) {
		if (date)
			return date.toString("ddd, MMM dd, yyyy");
		return "";
	},
	dateFormatBasic: function(date) {
		if (date)
			return date.toString("MM/dd/yy");
		return "";
	},
    getTaskData: function() {
        var task = {};

        task.name = this.find("[name='name']").value;
        task.repeatType = parseInt(this.find("[name='repeatType']").value);
        task.repeat = parseInt(this.find("[name='repeat']").value);
        task.due = Date.parse(this.find("[name='due']").value);// + " " + this.find("[name='time']").value);
        return task;
	},
	getDate: function() {
		return Date.parse(this.find("[name='due']").value);
	},
	setDate: function(dateString) {
		var date = Date.parse(dateString);
		this.find("[name='due']").value = this.dateFormatBasic(date);
		this.find("#EditTaskDue").innerHTML = this.dateFormat(date);
	},
	getTime: function() {
		return Date.parse(this.find("[name='time']").value);
	},
	setTime: function(timeString) {
		this.find("[name='time']").value = timeString;
		this.find("#EditTaskTime").innerHTML = timeString;
	}
});
