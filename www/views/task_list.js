var TaskListView  = ui.View.extend({
    init: function(element) {
        this._super(element);
    },
    render: function(tasks) {
        var data = { tasks: tasks };
        this.renderAt("[role='content']", "jstTaskList", data);
    }
});
