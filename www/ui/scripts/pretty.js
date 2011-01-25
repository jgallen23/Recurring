var prettyDate = function(date, format) {
	format = format || "MM/dd";
	var diff = (((new Date()).getTime() - date.getTime()) / 1000);

	var dayDiff = Math.floor(diff / 86400);
	switch(dayDiff) {
		case 1:
			return "Yesterday";
		case 0:
			return "Today";
		case -1:
			return "Tomorrow";
		case -7:
			return "Next Week";
		default:
			return date.toString(format);
	}
}
