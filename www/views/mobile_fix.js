ui.View.prototype.renderAt = function(element, templateId, data, cb) {
	element = (typeof element === "string")?this.find(element):element;
	var tmp = ui.template(templateId, data);
	var s = function() {
		element.innerHTML = tmp;
		if (element.innerHTML == "") {
			console.log("redraw");
			setTimeout(s, 100);
		} else {
			if (cb) cb();
		}
	};
	setTimeout(s, 20);
};
