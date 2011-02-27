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
			plugins.badge.set(badge.get(Date.today()));
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
			var oldDate = new Date(task.due.getTime());
			task.complete();
			persistence.add(task);
			persistence.flush(function(tx) {
				if (ui.browser.isPhoneGap) {
					badge.decrement(oldDate);
					notifications.set(oldDate);
					badge.increment(task.due);
					notifications.set(task.due);
				}
				self._loadTasks();
			});
		}, 500);
    },
    weinre: function() {
        startWeinre();
	}
});
var resetNotifications = function() {
	localStorage.clear();
	plugins.localNotification.cancelAll();
	Task.all().order("due", true).list(null, function(tasks) {
		for (var i = 0; i < tasks.length; i++) {
			var task = tasks[i];
			badge.increment(task.due);
			notifications.set(task.due);
		};		
	});
}
