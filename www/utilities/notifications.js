var notifications = (function() {

	return {
		add: function(date, badge) {
			plugins.localNotification.cancel(date.toString("MM/dd"));
			if (badge != 0) {
				plugins.localNotification.add({
					date: date.toString("MM/dd/yyyy hh:mm tt"),
					badge: badge,
					id: date.toString("MM/dd") 
				});
			}
		}
	}
})();
