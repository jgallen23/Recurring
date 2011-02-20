var TaskListView  = ui.View.extend({
    init: function(element) {
        this._super(element);
		this.scroller = new iScroll(this.find("[role='content'] ul"), { checkDOMChanges: false, desktopCompatibility: false }); 
    },
	destroy: function() {
		this.scroller.destroy();
	},
    render: function(tasks) {
        var self = this;
        var data = { tasks: tasks };
        this.renderAt("[role='content'] ul", "jstTaskList", data, function() {
			setTimeout(function () { self.scroller.refresh(); }, 100);
		});
    }
});
