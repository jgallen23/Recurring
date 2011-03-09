ui.View.prototype.renderAt = function(element, templateId, data, cb) {
	element = (typeof element === "string")?this.find(element):element;
	var tmp = ui.template(templateId, data);
	var tempNode = document.createElement("div");
	var s = function() {
		tempNode.innerHTML = tmp;
		if (tempNode.innerHTML == "") {
			console.log("redraw");
			setTimeout(s, 100);
		} else {
			element.innerHTML = tempNode.innerHTML;
			if (cb) cb();
		}
	};
	setTimeout(s, 20);
};
