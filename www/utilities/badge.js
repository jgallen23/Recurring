var badge = (function() {
	return {
		getKey: function(date) {
			return "tasks_" + date.toString("MM/dd");
		},
		get: function(date) {
			return localStorage.getItem(this.getKey(date));
		},
		set: function(date, value) {
			localStorage.setItem(this.getKey(date), value);
		},
		increment: function(date) {
			if (!this.get(date))
				localStorage.setItem(this.getKey(date), 0);
			localStorage[this.getKey(date)]++;
		},
		decrement: function(date) {
			if (!this.get(date))
				localStorage.setItem(this.getKey(date), 1);
			localStorage[this.getKey(date)]--;
		}
	}
})();
