var TaskListController = ui.PageController.extend({
    init: function(element) {
        this.view = new TaskListView(element);
        this._super(element);
        this._tasks = null;
        this.bind("visible", this._loadTasks);
        var self = this;
        document.addEventListener("applicationActive", function() {
			console.log("active");
            self._loadTasks();
        });
        this.trigger("visible");
    },
    _loadTasks: function() {
        var self = this;
        Task.all().order("due", true).list(null, function(tasks) {
			console.log("Task Count: "+tasks.length);
            self._tasks = tasks;
            self.view.render(tasks);
			self._updateBadge();
        });
    },
	_updateBadge: function() {
		if (ui.browser.isPhoneGap) {
			var todayCount = 0;
            var tomorrowCount = 0;
			this._tasks.forEach(function(item) {
				if (item.isDueToday() || item.isOverdue())
					todayCount++;
                else if (item.isDueTomorrow())
                    tomorrowCount++;
			});
			console.log("Badge: "+todayCount);
			plugins.badge.set(todayCount);
			//Set tomorrow's badge
			var d = Date.today().addHours(7).addDays(1);
			var tBadge = todayCount+tomorrowCount;
			notifications.add(d, tBadge); 
		}
	},
    add: function(e) {
        var editTaskController = new EditTaskController("EditTask");
        this.slideIn(editTaskController);
    },
    edit: function(e, target) {
        var self = this;
		var parent = this.view.findParentWithAttribute(target, "data-index");
        var index = parent.getAttribute('data-index');
        var task = self._tasks[index];
        var editTaskController = new EditTaskController("EditTask", task);
        this.slideIn(editTaskController);
    },
    complete: function(e) {
        var self = this;
        var index = e.target.parentNode.getAttribute('data-index');
		setTimeout(function() {
			var task = self._tasks[index];
			task.complete();
			persistence.add(task);
			persistence.flush(function(tx) {
				if (ui.browser.isPhoneGap) {
					/*plugins.localNotification.cancel(task.id)*/
					/*plugins.localNotification.add({ date: task.due.toString("MM/dd/yyyy hh:mm tt"), message: task.name, action: 'View', id: task.id });*/
				}
				self._loadTasks();
			});
		}, 500);
    },
    weinre: function() {
        startWeinre();
    }
});
