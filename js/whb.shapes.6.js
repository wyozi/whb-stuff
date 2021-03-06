function Shape() {}

/*
'########::'########::'######::'########::::'###::::'##::: ##::'######:::'##:::::::'########:
 ##.... ##: ##.....::'##... ##:... ##..::::'## ##::: ###:: ##:'##... ##:: ##::::::: ##.....::
 ##:::: ##: ##::::::: ##:::..::::: ##:::::'##:. ##:: ####: ##: ##:::..::: ##::::::: ##:::::::
 ########:: ######::: ##:::::::::: ##::::'##:::. ##: ## ## ##: ##::'####: ##::::::: ######:::
 ##.. ##::: ##...:::: ##:::::::::: ##:::: #########: ##. ####: ##::: ##:: ##::::::: ##...::::
 ##::. ##:: ##::::::: ##::: ##:::: ##:::: ##.... ##: ##:. ###: ##::: ##:: ##::::::: ##:::::::
 ##:::. ##: ########:. ######::::: ##:::: ##:::: ##: ##::. ##:. ######::: ########: ########:
..:::::..::........:::......::::::..:::::..:::::..::..::::..:::......::::........::........::
*/

function Rect() {
	Shape.call(this);
}
Rect.prototype.createElement = function() {
	return $("<div></div>")
			.addClass("component")
			.addClass("comp_rect")
			.css("border-radius", "0");
}
Rect.prototype.createSettings = function(el, parent) {

	parent.append($("<span></span>").html("Border").addClass("settinglabel"));

	var clr = document.createElement("input");
	clr.setAttribute("type", "text");
	parent.append($(clr));
	$(clr).spectrum({
	    color: el.css("border-color"),
	    showAlpha: true,
		showInput: true,
		preferredFormat: "rgb",
	    change: function(color) {
		    el.css("border-color", color.toRgbString());
		}
	});

	parent.append($("<span></span>").html("Background").addClass("settinglabel"));

	var clr = document.createElement("input");
	clr.setAttribute("type", "text");
	parent.append($(clr));
	$(clr).spectrum({
	    color: el.css("background-color"),
	    showAlpha: true,
		showInput: true,
		showInitial: true,
		preferredFormat: "rgb",
	    change: function(color) {
		    el.css("background-color", color.toRgbString());
		}
	});

	var bgModText = $("<input></input>").css("width", "100px").val(el.data("bgmod")).on("change", function() {
		el.data("bgmod", $(this).val());
	}).tooltip({
		items: "*",
		content: function() {
			return "Use following tags for dynamic background color:<br><hr>" +
					"<b><img src=\"https://raw.github.com/garrynewman/garrysmod/master/garrysmod/gamemodes/base/icon24.png\">$team</b> <span>Team color</span><br>" +
					"<b><img src=\"https://raw.github.com/garrynewman/garrysmod/master/garrysmod/gamemodes/terrortown/icon24.png\">$tttrole</b> <span>Role color</span><br>"
		}
	});

	parent.append($("<span></span>").html("Dynamic Background").addClass("settinglabel"));

	parent.append(bgModText);

	parent.append($("<span></span>").html("Round Borders").addClass("settinglabel"));
	parent.append($("<div></div>").slider({
		max: 32,
		value: parseInt(el.css("border-top-right-radius").replace("px", "")),
		slide: function( event, ui ) {
			el.css("border-radius", ui.value + "px")
		}
	}).addClass("settingSlider").css("width", "100px").css("display", "inline-block"));

}
Rect.prototype.getJSONObject = function(el) {

	var boclr = extractRgbValues(el.css("border-color"));
	var bgclr = extractRgbValues(el.css("backgroundColor"));

	return {
		type: "rect",
		borderRadius: parseInt(el.css("border-top-right-radius").replace("px", "")),
		borderColor: boclr,
		bgColor: bgclr,
		bgmod: el.data("bgmod"),
		width: el.width(),
		height: el.height(),
	}
}
Rect.prototype.getStack = function() {
	return "#workspace .comp_rect";
}

/*
'####::'######:::'#######::'##::: ##:
. ##::'##... ##:'##.... ##: ###:: ##:
: ##:: ##:::..:: ##:::: ##: ####: ##:
: ##:: ##::::::: ##:::: ##: ## ## ##:
: ##:: ##::::::: ##:::: ##: ##. ####:
: ##:: ##::: ##: ##:::: ##: ##:. ###:
'####:. ######::. #######:: ##::. ##:
....:::......::::.......:::..::::..::
*/

function Icon() {
	Shape.call(this);
}
Icon.prototype.createElement = function() {
	var el = $("<div></div>")
			.addClass("component")
			.addClass("lightcomp")
			.addClass("comp_icon");
	return el;
}
Icon.prototype.createSettings = function(el, parent) {

	parent.append($("<span></span>").html("Icon").addClass("settinglabel"));

	var icondialog = $("#icon-selector-dialog");

	$("#icon-selector-dialog > img").click(function() {
		var src = $(this).attr("src")
		el.css("background-image", "url(" + src + ")");
		el.data("gmodpath", "icon16/" + src.substr(src.lastIndexOf("/") + 1))
		el.css("background-color", "transparent");
		icondialog.dialog("close");
	})

	parent.append($("<button></button>").button().text("Icon").click(function() {
		icondialog.dialog( "open" );
		icondialog.css("z-index", "99999");
	}));

}
Icon.prototype.getJSONObject = function(el) {

	var furl = el.css("background-image");
	furl = furl.replace("url(", "");
	furl = furl.substr(0, furl.length-1);

	return {
		type: "icon",
		icon: el.data("gmodpath") || "icon16/accept.png",
		fullurl: furl,
		width: el.width(),
		height: el.height(),
	}
}
Icon.prototype.getStack = function() {
	return "#workspace .lightcomp";
}

/*
'##::::'##:'####:'##::: ##:'####:'##::::'##::::'###::::'########::
 ###::'###:. ##:: ###:: ##:. ##:: ###::'###:::'## ##::: ##.... ##:
 ####'####:: ##:: ####: ##:: ##:: ####'####::'##:. ##:: ##:::: ##:
 ## ### ##:: ##:: ## ## ##:: ##:: ## ### ##:'##:::. ##: ########::
 ##. #: ##:: ##:: ##. ####:: ##:: ##. #: ##: #########: ##.....:::
 ##:.:: ##:: ##:: ##:. ###:: ##:: ##:.:: ##: ##.... ##: ##::::::::
 ##:::: ##:'####: ##::. ##:'####: ##:::: ##: ##:::: ##: ##::::::::
..:::::..::....::..::::..::....::..:::::..::..:::::..::..:::::::::
*/

function Minimap() {
	Shape.call(this);
}
Minimap.prototype.createElement = function() {
	return $("<div></div>")
			.addClass("component")
			.addClass("comp_minimap")
			.css("border-radius", "0");
}
Minimap.prototype.createSettings = function(el, parent) {

}
Minimap.prototype.getJSONObject = function(el) {

	return {
		type: "minimap",
		width: el.width(),
		height: el.height(),
	}
}
Minimap.prototype.getStack = function() {
	return "#workspace .comp_minimap";
}

/*
'####:'##::: ##:'########::'#######::'########:::::'###::::'########::
. ##:: ###:: ##: ##.....::'##.... ##: ##.... ##:::'## ##::: ##.... ##:
: ##:: ####: ##: ##::::::: ##:::: ##: ##:::: ##::'##:. ##:: ##:::: ##:
: ##:: ## ## ##: ######::: ##:::: ##: ########::'##:::. ##: ########::
: ##:: ##. ####: ##...:::: ##:::: ##: ##.... ##: #########: ##.. ##:::
: ##:: ##:. ###: ##::::::: ##:::: ##: ##:::: ##: ##.... ##: ##::. ##::
'####: ##::. ##: ##:::::::. #######:: ########:: ##:::: ##: ##:::. ##:
....::..::::..::..:::::::::.......:::........:::..:::::..::..:::::..::
*/

function InfoBar() {
	Shape.call(this);
}
InfoBar.prototype.createElement = function() {
	var el = $("<div></div>")
			.addClass("component")
			.addClass("comp_lightcomp")
			.addClass("comp_infobar")
			.css("background-color", "red")
			.css("border-radius", "0")
			.data("bartype", "health");

	el.append($("<div></div>")
				.css("background-color", "green")
				.css("width", "45%")
				.css("height", "100%")
				.css("position", "absolute")
				.css("bottom", "0px"))

	return el;
}
InfoBar.prototype.createSettings = function(el, parent) {

	parent.append($("<span></span>").html("Value Color").addClass("settinglabel"));

	var clr = document.createElement("input");
	clr.setAttribute("type", "text");
	parent.append($(clr));
	$(clr).spectrum({
	    color: $(el.children("div")[0]).css("background-color"),
	    showAlpha: true,
		showInput: true,
		preferredFormat: "rgb",
	    change: function(color) {
		    $(el.children("div")[0]).css("background-color", color.toRgbString());
		}
	});

	parent.append($("<span></span>").html("Bg Color").addClass("settinglabel"));

	var clr = document.createElement("input");
	clr.setAttribute("type", "text");
	parent.append($(clr));
	$(clr).spectrum({
	    color: el.css("background-color"),
	    showAlpha: true,
		showInput: true,
		preferredFormat: "rgb",
	    change: function(color) {
		    el.css("background-color", color.toRgbString());
		}
	});

	parent.append($("<span></span>").html("Type").addClass("settinglabel"));

	var bs = $("<span></span>").addClass("bartypeselector");

	var types = ["health", "ammo", "sprint"];

	for (var typekey in types) {
		var type = types[typekey];
		var radioel = $("<input></input>")
			.attr("type", "radio")
			.attr("id", "bartype_" + type)
			.attr("name", "bartype")
			.val(type);

		if (el.data("bartype") == type)
			radioel.attr("checked", "checked");

		bs.append(radioel);

		bs.append($("<label></label>").attr("for", "bartype_" + type).text(type));
	}

	bs.buttonset();
	bs.children("input").change(function(e){
		el.data("bartype", $(this).val());
	});

	parent.append(bs);

	parent.append($("<span></span>").html("Round Borders").addClass("settinglabel"));
	parent.append($("<div></div>").slider({
		max: 32,
		value: parseInt(el.css("border-top-right-radius").replace("px", "")),
		slide: function( event, ui ) {
			$(el.children("div")[0]).css("border-radius", ui.value + "px");
			el.css("border-radius", ui.value + "px");
		}
	}).addClass("settingSlider").css("width", "100px").css("display", "inline-block"));


	parent.append($("<span></span>").html("Rotation").addClass("settinglabel"));

	parent.append($("<label></label>").attr("for", "infobar-vert-cb").text("Vertical").prepend($("<input></input>").attr("type", "checkbox").prop("checked", el.data("vertical")).attr("id", "infobar-vert-cb").change(function() {
		var isEnabled = $(this).is(":checked");
		var owidth = el.width();
		var oheight = el.height();
		el.width(oheight).height(owidth);

		el.data("vertical", isEnabled);

		var div = $(el.children("div")[0]);
		if (isEnabled)
			div.width("100%").height("0").animate({
				height: "45%"
			})
		else
			div.height("100%").width("0").animate({
				width: "45%"
			})
	})));

}
InfoBar.prototype.getJSONObject = function(el) {

	var hpclr = extractRgbValues($(el.children("div")[0]).css("background-color"));
	var dmgclr = extractRgbValues(el.css("background-color"));
	return {
		type: "infobar",
		healthColor: hpclr,
		dmgColor: dmgclr,
		barType: el.data("bartype"),
		borderRadius: parseInt(el.css("border-top-right-radius").replace("px", "")),
		vertical: el.data("vertical") || false,
		width: el.width(),
		height: el.height(),
	}
}
InfoBar.prototype.getStack = function() {
	return "#workspace .lightcomp";
}

/*
'########:'########:'##::::'##:'########:
... ##..:: ##.....::. ##::'##::... ##..::
::: ##:::: ##::::::::. ##'##:::::: ##::::
::: ##:::: ######:::::. ###::::::: ##::::
::: ##:::: ##...:::::: ## ##:::::: ##::::
::: ##:::: ##:::::::: ##:. ##::::: ##::::
::: ##:::: ########: ##:::. ##:::: ##::::
:::..:::::........::..:::::..:::::..:::::
*/

function Text() {
	Shape.call(this);
}
Text.prototype.createElement = function() {
	var el = $("<div></div>")
			.addClass("component")
			.addClass("comp_text")
			.addClass("lightcomp")
			.css("font-family", fonts[0].Font)
			.data("gmodfont", fonts[0].GModFontId)
			.data("fontval", fonts[0].Name)
			.css("font-size", "18px")
			.css("font-weight", 200);

	var textComp = $("<span></span>").css("width", "100%").css("height", "100%").text("Some Text Here");
	el.append(textComp);

	return el;
}
Text.prototype.createSettings = function(el, parent) {

	var editText = $("<input></input>").val($(el.children("span")[0]).text()).on("change keyup", function() {
		$(el.children("span")[0]).html($(this).val());
	}).tooltip({
		items: "*",
		content: function() {
			return "Use following tags for dynamic content:<br><hr>" +
					"<b><img src=\"https://raw.github.com/garrynewman/garrysmod/master/garrysmod/gamemodes/base/icon24.png\">$health</b> <span>Current health as an integer</span><br>" +
					"<b><img src=\"https://raw.github.com/garrynewman/garrysmod/master/garrysmod/gamemodes/base/icon24.png\">$armor</b> <span>Current armor as an integer</span><br>" +
					"<b><img src=\"https://raw.github.com/garrynewman/garrysmod/master/garrysmod/gamemodes/base/icon24.png\">$weapon</b> <span>Active weapon's printname</span><br>" +
					"<b><img src=\"https://raw.github.com/garrynewman/garrysmod/master/garrysmod/gamemodes/base/icon24.png\">$ammoinv</b> <span>Ammo remaining</span><br>" +
					"<b><img src=\"https://raw.github.com/garrynewman/garrysmod/master/garrysmod/gamemodes/base/icon24.png\">$ammoclip</b> <span>Ammo remaining in clip</span><br>" +
					"<b><img src=\"https://raw.github.com/garrynewman/garrysmod/master/garrysmod/gamemodes/base/icon24.png\">$ammomax</b> <span>Maximum clipsize</span><br>" +
					"<b><img src=\"https://raw.github.com/garrynewman/garrysmod/master/garrysmod/gamemodes/base/icon24.png\">$team</b> <span>Team name (and color)</span><br>" +
					"<b><img src=\"https://raw.github.com/garrynewman/garrysmod/master/garrysmod/gamemodes/terrortown/icon24.png\">$tttrole</b> <span>Role in TTT (changes color)</span><br>" +
					"<b><img src=\"https://raw.github.com/garrynewman/garrysmod/master/garrysmod/gamemodes/terrortown/icon24.png\">$tttroleraw</b> <span>Role in TTT</span><br>" +
					"<b><img src=\"https://raw.github.com/garrynewman/garrysmod/master/garrysmod/gamemodes/terrortown/icon24.png\">$tttroundstate</b> <span>TTT Round state</span><br>" +
					"<b><img src=\"https://raw.github.com/garrynewman/garrysmod/master/garrysmod/gamemodes/terrortown/icon24.png\">$tttroundtimer</b> <span>TTT Round timer</span><br>" +
					"<b><img src=\"https://raw.github.com/FPtje/DarkRP/master/icon24.png\">$darkrpmoney</b> <span>Money in wallet</span><br>" +
					"<b><img src=\"https://raw.github.com/FPtje/DarkRP/master/icon24.png\">$darkrpjob</b> <span>Current job</span><br>" +
					"<b><img src=\"https://raw.github.com/FPtje/DarkRP/master/icon24.png\">$darkrpsalary</b> <span>Current salary</span><br>" + 
					"<b><img src=\"http://i.imgur.com/5iCxJ0s.png\">$sprint</b> <span>Advanced TTT Sprint percentage</span><br>";
		}
	});

	parent.append($("<span></span>").html("Text ").addClass("settinglabel"));

	parent.append(editText);

	el.dblclick(function() {
		editText.select();
	})

	parent.append($("<span></span>").html("Color").addClass("settinglabel"));

	var clr = document.createElement("input");
	clr.setAttribute("type", "text");
	parent.append($(clr));
	$(clr).spectrum({
	    color: el.css("color"),
		showInput: true,
	    change: function(color) {
		    el.css("color", color.toHexString());
		}
	});

	parent.append($("<span></span>").html("Font").addClass("settinglabel"));

	var fontdialog = $("#font-selector-dialog");
	fontdialog.empty();
	
	var usedFont = el.css("font-family");

	var fontSelect = $("<select size=\"6\">" + ($.map(fonts, function(k, el) {
		return (usedFont == k.Font ? "<option selected>" : "<option>") + k.Name + "</option>";
	}).join(", ")) + "</select>").change(function() {
		var font = fonts[$(this)[0].selectedIndex];
		if (font != undefined) {
			el.css("font-family", font.Font);
			el.data("gmodfont", font.GModFontId);
			el.data("fontval", font.Name);
		}
	}).css("width", "90%");
	fontdialog.append(fontSelect);

	parent.append($("<button></button>").button().text("Font").click(function() {
		//var fontFamily = el.css("font-family");
		fontSelect.val(el.data("fontval"));
		fontdialog.dialog( "open" );
	}));

	parent.append($("<span></span>").html("Size").addClass("settinglabel"));

	parent.append($("<div></div>").slider({
		min: 6,
		max: 72,
		value: parseInt(el.css("font-size")),
		step: 6,
		slide: function( event, ui ) {
			el.css("font-size", ui.value + "px")
		}
	}).addClass("settingSlider").css("width", "100px").css("display", "inline-block"));
}
Text.prototype.getJSONObject = function(el) {

	var clr = extractRgbValues(el.css("color"));
	return {
		type: "text",
		text: $(el.children("span")[0]).text(),
		font: el.data("gmodfont"),
		fontSize: parseInt(el.css("font-size").replace("px", "")),
		color: clr,
	}
}
Text.prototype.getStack = function() {
	return "#workspace .lightcomp";
}

/*
:'######::'####:'########:::'######::'##:::::::'########:
'##... ##:. ##:: ##.... ##:'##... ##: ##::::::: ##.....::
 ##:::..::: ##:: ##:::: ##: ##:::..:: ##::::::: ##:::::::
 ##:::::::: ##:: ########:: ##::::::: ##::::::: ######:::
 ##:::::::: ##:: ##.. ##::: ##::::::: ##::::::: ##...::::
 ##::: ##:: ##:: ##::. ##:: ##::: ##: ##::::::: ##:::::::
. ######::'####: ##:::. ##:. ######:: ########: ########:
:......:::....::..:::::..:::......:::........::........::
*/


function Circle() {
	Shape.call(this);
}
Circle.prototype.createElement = function() {
	return $("<div></div>")
			.addClass("component")
			.addClass("comp_circle")
			.addClass("lightcomp");
}
Circle.prototype.createSettings = function(el, parent) {

	parent.append($("<span></span>").html("Background").addClass("settinglabel"));

	var clr = document.createElement("input");
	clr.setAttribute("type", "text");
	parent.append($(clr));
	$(clr).spectrum({
	    color: el.css("background-color"),
	    showAlpha: true,
		showInput: true,
		showInitial: true,
		preferredFormat: "rgb",
	    change: function(color) {
		    el.css("background-color", color.toRgbString());
		}
	});

}
Circle.prototype.getJSONObject = function(el) {

	var bgclr = extractRgbValues(el.css("backgroundColor"));

	return {
		type: "circle",
		bgColor: bgclr,
		width: el.width(),
		height: el.height(),
	}
}
Circle.prototype.getStack = function() {
	return "#workspace .lightcomp";
}