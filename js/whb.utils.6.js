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

function loadOld(code) {
	var jsonobj = $.parseJSON(code);
	$.each(jsonobj, function(k, v) {
		jsonObjToShape(v);
	});
}