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
    }
});
