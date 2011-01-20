var EditTaskController = ui.PageController.extend({
    init: function(element, task) {
        //this.view = new EditTaskView
        this._super(element);
        this.task = task;
        this._populate();
    },
    _populate: function() {
        var data = { 
            task: {
                name: '',
                repeatType: '',
                repeat: '',
                due: '',
                getNextDue: function() { 
                    return '';
                }
            }
        };
        if (this.task) {
            data.task = this.task;
        }
        data.dateFormat = function(date) {
            if (date)
                return date.toString("MM/dd/yy");
            return "";
        }
        this.view.renderAt("[role='content']", "jstEditTask", data);
    },
    cancel: function() {
        this.slideOut();
    },
    save: function() {
        var self = this;
        var form = this.view.find("form");
        this.task.name = form.name.value;
        this.task.repeatType = form.repeatType.value;
        this.task.repeat = form.repeat.value;
        this.task.due = Date.parse(form.due.value);
        persistence.add(this.task);
        persistence.flush(function() {
            self.slideOut();
        });
    }
});
