function extractRgbValues(color) {
	var regexp = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*[0-1]\.?(\d+)?)?\)$/
	var matches = regexp.exec(color);
	if (matches == null)
		return color;
	return {
		r: matches[1],
		g: matches[2],
		b: matches[3],
		a: (parseFloat("0." + matches[5])) || 1
	};
}

// Used to convert color objects from < v3 (which were stored as lua arrays instead of objects) look fine to v3
function validateColorObject(obj) {
	if ("r" in obj)
		return obj;
	return {
		r: obj["1"],
		g: obj["2"],
		b: obj["3"],
		a: (obj["4"] || 1)
	}
}


function jsonObjToShape(v) {
	var shape;
	switch(v.type) {
		case "rect":
			shape = addShape(new Rect());
			if ("bgColor" in v) {
				var bgc = validateColorObject(v.bgColor);
				shape.css("background-color", "rgba(" + bgc.r + ", " + bgc.g + ", " + bgc.b + ", " + (bgc.a || 1) + ")");
			}
			if ("borderColor" in v) {
				var bgc = validateColorObject(v.borderColor);
				shape.css("border-color", "rgba(" + bgc.r + ", " + bgc.g + ", " + bgc.b + ", " + (bgc.a || 1) + ")");
			}
			if ("borderRadius" in v)
				shape.css("border-radius", v.borderRadius + "px");
			break;
		case "text":
			shape = addShape(new Text());
			if ("color" in v) {
				var bgc = validateColorObject(v.color);
				shape.css("color", "rgba(" + bgc.r + ", " + bgc.g + ", " + bgc.b + ", " + (bgc.a || 1) + ")");
			}
			if ("text" in v)
				$(shape.children("span")[0]).text(v.text);
			if ("font" in v)
				shape.css("font-family", v.font);
			if ("fontSize" in v)
				shape.css("font-size", v.fontSize + "px");
			break;
		case "minimap":
			shape = addShape(new Minimap());
			break;
		case "icon":
			shape = addShape(new Icon());
			shape.css("background-image", "url(" + (v.fullurl || "") + ")");
			shape.css("background-color", "transparent");
			break;
		case "infobar":
			shape = addShape(new InfoBar());
			if ("borderRadius" in v) {
				shape.css("border-radius", v.borderRadius + "px");
				$(shape.children("div")[0]).css("border-radius", v.borderRadius + "px");
			}
			if ("healthColor" in v) {
				var bgc = validateColorObject(v.healthColor);
				$(shape.children("div")[0]).css("background-color", "rgba(" + bgc.r + ", " + bgc.g + ", " + bgc.b + ", " + (bgc.a || 1) + ")");
			}
			if ("dmgColor" in v) {
				var bgc = validateColorObject(v.dmgColor);
				shape.css("background-color", "rgba(" + bgc.r + ", " + bgc.g + ", " + bgc.b + ", " + (bgc.a || 1) + ")");
			}
			if ("barType" in v)
				shape.data("bartype", v.barType);
			break;
		case "circle":
			shape = addShape(new Circle());
			if ("bgColor" in v) {
				var bgc = validateColorObject(v.bgColor);
				shape.css("background-color", "rgba(" + bgc.r + ", " + bgc.g + ", " + bgc.b + ", " + (bgc.a || 1) + ")");
			}
			break;
	}
	if (v.left && v.top)
		shape.offset({left: (v.dockright ? (window.innerWidth - v.left) : v.left), top: (v.dockbottom ? window.innerHeight - v.top : v.top)});
	shape.width(v.width || 100);
	shape.height(v.height || 25);
	return shape;
}

function loadOld(code) {
	var jsonobj = $.parseJSON(code);
	$.each(jsonobj, function(k, v) {
		jsonObjToShape(v);
	});
}