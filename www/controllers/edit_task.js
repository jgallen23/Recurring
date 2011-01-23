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
		var dates = {};
		for (var i = 0; i < 100; i++) {
			var d = today.addDays(1);
			var key = d.toString("MM/dd/yy");
			var value = d.toString("ddd MMM d");
			dates[key] = value;
		}
        SpinningWheel.addSlot(dates, 'right');

		var self = this;
		SpinningWheel.setCancelAction(function() {
		});
		SpinningWheel.setDoneAction(function() {
			var vals = SpinningWheel.getSelectedValues()
			alert(vals.keys[0]);
		});
        SpinningWheel.open();
    }
});
