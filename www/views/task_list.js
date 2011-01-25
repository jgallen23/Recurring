var TaskListView  = ui.View.extend({
    init: function(element) {
        this._super(element);
		this.scroller = new iScroll(this.find("[role='content'] ul"), { checkDOMChanges: false, desktopCompatibility: false }); 
    },
    render: function(tasks) {
        var self = this;
        var data = { tasks: tasks };
        this.renderAt("[role='content'] ul", "jstTaskList", data);
        setTimeout(function () { self.scroller.refresh(); }, 0);
    }
});
