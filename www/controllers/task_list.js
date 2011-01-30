var TaskListController = ui.PageController.extend({
    init: function(element) {
        this.view = new TaskListView(element);
        this._super(element);
        this._tasks = null;
        this.bind("visible", this._loadTasks);
        this.trigger("visible");
    },
    _loadTasks: function() {
        var self = this;
        Task.all().order("due", true).list(null, function(tasks) {
            self._tasks = tasks;
            self.view.render(tasks);
        });
    },
    add: function(e) {
        var editTaskController = new EditTaskController("EditTask");
        this.slideIn(editTaskController);
    },
    edit: function(e, target) {
        var self = this;
		var parent = this.view.findParentWithAttribute(target, "data-index");
		console.log(parent);
        var index = parent.getAttribute('data-index');
        var task = self._tasks[index];
        var editTaskController = new EditTaskController("EditTask", task);
        this.slideIn(editTaskController);
    },
    complete: function(e) {
        var self = this;
        var index = e.target.parentNode.getAttribute('data-index');
        console.log('complete', index);
        var task = self._tasks[index];
        task.complete();
        persistence.add(task);
        persistence.flush(function(tx) {
			if (ui.browser.isPhoneGap) {
				plugins.localNotification.cancel(task.id)
				plugins.localNotification.add({ date: task.due.toString("MM/dd/yyyy HH:mm tt"), message: 'Recurring: '+task.name, action: 'View', id: task.id });
			}
            self._loadTasks();
        });
    }
});
