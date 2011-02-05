ui.View.prototype.renderAt = function(element, templateId, data, cb) {
	element = (typeof element === "string")?this.find(element):element;
	var tmp = ui.template(templateId, data);
	var s = function() {
		element.innerHTML = tmp;
		if (element.innerHTML == "") {
			console.log("none");
			setTimeout(s, 200);
		} else {
			if (cb) cb();
		}
	}
	s();
};
