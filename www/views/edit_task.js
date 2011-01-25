var EditTaskView = ui.View.extend({
    populate: function(task) {
        var data = { 
            task: {
                name: '',
                repeatType: '',
                repeat: '',
                due: Date.today(),
                getNextDue: function() { 
                    return '';
                }
            }
        };
        if (task) {
            data.task = task;
        }
		data.dateFormat = this.dateFormat;
		console.log(data);
        this.renderAt("[role='content']", "jstEditTask", data);
    },
	dateFormat: function(date) {
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
	setDate: function(dateString) {
        var form = this.find("form");
		form.due.value = dateString;
		this.find("#EditTaskDue").innerHTML = dateString;
	}
});
