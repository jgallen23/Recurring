var EditTaskView = ui.View.extend({
    init: function(element) {
        this._super(element);
		this.scroller = new iScroll(this.find("[role='content'] form"), { checkDOMChanges: false, desktopCompatibility: false }); 
    },
    populate: function(task) {
		var self = this;
        var data = { 
            task: {
                name: '',
                repeatType: '',
                repeat: '',
                due: Date.today(),
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
        this.renderAt("[role='content'] form", "jstEditTask", data);
        setTimeout(function () { self.scroller.refresh(); }, 0);
		this.find("form").onsubmit = function() {
			return false;
		}
    },
	dateFormat: function(date) {
		if (date)
			return date.toString("MMMM dd, yyyy");
		return "";
	},
	dateFormatBasic: function(date) {
		if (date)
			return date.toString("MM/dd/yy");
		return "";
	},
    getTaskData: function() {
        var task = {};
        var form = this.find("form");

        task.name = form.name.value;
        task.repeatType = form.repeatType.value;
        task.repeat = form.repeat.value;
        task.due = Date.parse(form.due.value);
        return task;
	},
	getDate: function() {
        var form = this.find("form");
		return Date.parse(form.due.value);
	},
	setDate: function(dateString) {
        var form = this.find("form");
		var date = Date.parse(dateString);
		
		form.due.value = this.dateFormatBasic(date);
		this.find("#EditTaskDue").innerHTML = this.dateFormat(date);
	}
});
