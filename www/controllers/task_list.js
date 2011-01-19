var TaskListController = ui.PageController.extend({
    init: function(element) {
        this.view = new TaskListView(element);
        this._super(element);
        this._tasks = null;
        this._loadTasks();
    },
    _loadTasks: function() {
        var self = this;
        Task.all().list(null, function(tasks) {
            self._tasks = tasks;
            self.view.render(tasks);
        });
    },
    add: function(e) {
    },
    complete: function(e) {
        var self = this;
        var index = e.target.parentNode.getAttribute('data-index');
        console.log('complete', index);
        var task = self._tasks[index];
        task.complete();
        persistence.add(task);
        persistence.flush(function(tx) {
            self._loadTasks();
        });
    }
});
