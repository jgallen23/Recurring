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
		case -2: 
			return "2 Days";
		case -3:
			return "3 Days";
		case -4:
			return "4 Days";
		case -5:
			return "5 Days";
		case -6:
			return "6 Days";
		default:
			return date.toString(format);
	}
}
