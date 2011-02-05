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
			if (ui.browser.isPhoneGap) {
				plugins.localNotification.cancel(self.task.id)
				plugins.localNotification.add({ date: self.task.due.toString("MM/dd/yyyy hh:mm tt"), message: self.task.name, action: 'View', id: self.task.id });
			}
            self.slideOut();
        });
    },
    setDate: function() {
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

		var selectedDate = this.view.getDate();
        SpinningWheel.addSlot(months, 'right', selectedDate.getMonth()+1);
        SpinningWheel.addSlot(days, 'right', selectedDate.getDate());
        SpinningWheel.addSlot(years, 'right', selectedDate.getFullYear());

		var self = this;
		SpinningWheel.setCancelAction(function() {
		});
		SpinningWheel.setDoneAction(function() {
			var vals = SpinningWheel.getSelectedValues()
			var d = ui.stringFormat("{0}/{1}/{2}", vals.keys[0], vals.keys[1], vals.keys[2]);
			self.view.setDate(d);
		});
        SpinningWheel.open();
	},
	setTime: function() {
		var self = this;
		var hours = {};
		var minutes = { '00': '00', '15': '15', '30': '30', '45': '45' };
		var tod = { AM: 'AM', PM: 'PM' };

		for (var i = 1; i <= 24; i++) {
			hours[i] = i;
		}

		var selectedTime = this.view.getTime();
		var h = selectedTime.getHours();
		var am = true;
		if (h > 12) {
			am = false;
			h = h - 12;
		}

        SpinningWheel.addSlot(hours, 'right', h);
        SpinningWheel.addSlot(minutes, 'right', selectedTime.getMinutes());
        SpinningWheel.addSlot(tod, 'right', (am)?"AM":"PM");
		SpinningWheel.setDoneAction(function() {
			var vals = SpinningWheel.getSelectedValues();
			var t = ui.stringFormat("{0}:{1} {2}", vals.keys[0], vals.keys[1], vals.keys[2]);
			self.view.setTime(t);
		});
		SpinningWheel.open();
	},
	deleteTask: function(e, target) {
		var msg = "Are you sure you want to delete this task?";
		var self = this;
		var d = function(index) {
			persistence.remove(self.task);
			persistence.flush(function() {
				self.slideOut();
			});
		}
		if (confirm(msg)) {
			d(0);
		}
	}
});
