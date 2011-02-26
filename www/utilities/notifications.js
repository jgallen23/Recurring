var notifications = (function() {

	return {
		getKey: function(date) {
			return date.toString("MM/dd");
		},
		cancel: function(date) {
			plugins.localNotification.cancel(this.getKey(date));
		},
		set: function(date) {
			this.cancel(date);
			if (parseInt(badge.get(date)) != 0) {
				plugins.localNotification.add({
					date: date.toString("MM/dd/yyyy hh:mm tt"),
					badge: badge.get(date),
					id: this.getKey(date) 
				});
			}
		}
	}
})();
