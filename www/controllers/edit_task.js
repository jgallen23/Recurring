var EditTaskController = ui.PageController.extend({
    init: function(element, task) {
        this.view = new EditTaskView(element);
        this._super(element);
        this.task = task;
        this.view.populate(task);
    },
    cancel: function() {
        this.slideOut();
    },
    save: function() {
        var self = this;
        var data = this.view.getTaskData();
        if (!this.task)
            this.task = new Task();
        this.task.name = data.name;
        this.task.repeatType = data.repeatType;
        this.task.repeat = data.repeat;
        this.task.due = data.due;

        persistence.add(this.task);
        persistence.flush(function() {
            self.slideOut();
        });
    },
    setDate: function() {
		var today = Date.today().addDays(-1);
		var months = {};
		var days = {};
		var years = {};

		for (var i = 1, c = Date.CultureInfo.monthNames.length; i <= c; i++) {
			months[i] = Date.CultureInfo.monthNames[i-1];
		}
		for (var i = 1, c = 31; i <= c; i++) {
			days[i] = i;
		}
		var y = Date.today().getFullYear(); 
		for (var i = 0, c = 3; i < c; i++) {
			years[y+i] = y+i;
		}

        SpinningWheel.addSlot(months, 'right');
        SpinningWheel.addSlot(days, 'right');
        SpinningWheel.addSlot(years, 'right');

		var self = this;
		SpinningWheel.setCancelAction(function() {
		});
		SpinningWheel.setDoneAction(function() {
			var vals = SpinningWheel.getSelectedValues()
			var d = ui.stringFormat("{0}/{1}/{2}", vals.keys[0], vals.keys[1], vals.keys[2]);
			self.view.setDate(d);
		});
        SpinningWheel.open();
    }
});
