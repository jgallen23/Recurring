persistence.store.websql.config(persistence, 'recurringtest', 'Unit Tests', 5*1024*1024);
persistence.debug = true;


module('Task');
test('create task', function() {
    var t = new Task({ name: 'test' });
    equal("test", t.name, "name");
});

module('Complete Task')
test('every/daily', function() {
	var t = new Task({ name: '1', due: Date.today(), repeat: Repeat.daily });
	t.complete();
	equal(t.lastDue.getTime(), Date.today().getTime(), "Last due is today");
	equal(t.due.getTime(), Date.today().add(1).days().getTime(), "Due date is now tomorrow");
});

test('after/daily', function() {
	var t = new Task({ name: '1', due: Date.today().add(-5).days(), repeatType: RepeatType.after, repeat: Repeat.daily });
	t.complete();
	equal(t.lastDue.getTime(), Date.today().add(-5).days().getTime(), "Last due is 5 days ago");
	equal(t.due.getTime(), Date.today().add(1).days().getTime(), "Due date is now tomorrow");
});

test('every/weekday', function() {
	var t = new Task({ name: '1', due: Date.today().last().friday(), repeat: Repeat.weekday });
	t.complete();
	console.log(t.due);
	equal(t.due.getTime(), Date.today().last().monday().getTime(), "Due date is last monday");
});

module('Undo Complete')
test('every/daily', function() {
	var t = new Task({ name: '1', due: Date.today(), repeat: Repeat.daily });
	t.complete();
	equal(t.lastDue.getTime(), Date.today().getTime(), "Last due is today");
	equal(t.due.getTime(), Date.today().add(1).days().getTime(), "Due date is now tomorrow");
	t.undoComplete();
	equal(t.due.getTime(), Date.today().getTime(), "Due is today");
});
/*asyncTest('save task', 1, function() {*/
/*var self = this;*/
/*var t = new Task({ name: 'testing' });*/
/*Task.data.find(function(tasks) {*/
/*var t1 = tasks.length;*/
/*Task.data.save(t, function() {*/
/*Task.data.find(function(tasks) {*/
/*equal(t1+1, tasks.length);*/
/*start();*/
/*});*/
/*});*/
/*});*/
/*});*/
