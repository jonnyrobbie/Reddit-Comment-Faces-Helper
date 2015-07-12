// ==UserScript==
// @name		   Reddit comment faces helper
// @description	Allows you to easily add comment faces from those subreddits: r/awwnime, r/pantsu, r/Moescape, r/TwoDeeArt, r/Patchuu, r/visualnovels, r/kemonomimi, r/manga, r/anime, r/SuperSonico, r/KanMusu, r/KanMusuNights, r/SchoolIdolFestival, r/LoveLive ankd r/OneTrueIdol
// @namespace	  https://greasyfork.org/users/98-jonnyrobbie
// @author		 JonnyRobbie
// @include		http*://*.reddit.com/r/awwnime/*
// @include		http*://*.reddit.com/r/pantsu/*
// @include		http*://*.reddit.com/r/Moescape/*
// @include		http*://*.reddit.com/r/TwoDeeArt/*
// @include		http*://*.reddit.com/r/Patchuu/*
// @include		http*://*.reddit.com/r/anime/*
// @include		http*://*.reddit.com/r/visualnovels/*
// @include		http*://*.reddit.com/r/kemonomimi/*
// @include		http*://*.reddit.com/r/manga/*
// @include		http*://*.reddit.com/r/SuperSonico/*
// @include		http*://*.reddit.com/r/KanMusu/*
// @include		http*://*.reddit.com/r/KanMusuNights/*
// @include		http*://*.reddit.com/r/SchoolIdolFestival/*
// @include		http*://*.reddit.com/r/LoveLive/*
// @include		http*://*.reddit.com/r/OneTrueIdol/*
// @include		http*://*.reddit.com/r/fatestaynight/*
// @include		http*://*.reddit.com/r/saber/*
// @include		http*://*.reddit.com/r/Nisekoi/*
// @include		http*://*.reddit.com/r/OneTrueBiribiri/*
// @include		http*://*.reddit.com/r/gamindustri/*
// @grant		  none
// @version		1.22.1
// ==/UserScript==
		
var selectedFace = "";
var faceIdChar = "";
var thumbDialWidth = "150px";
var thumbDialHeight = "100px";
var divAlreadyShown = false;
var settingsAlreadyShown = false;
var bbCodeFunction = null;
var textBoxNr = 1;
var selectedText = {
	start: 0, lenghth: 0, boxIndex: 0
};
var loadingIcon = "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQACgABACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkEAAoAAgAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkEAAoAAwAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkEAAoABAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQACgAFACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQACgAGACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAAKAAcALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";
var settingsIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIxSURBVHjapFO5iiJRFL3l1iIq7hi4NIgKIjSCiqCgDYbm/oCYGhqq/2Bi2KGZgaHgDAqtKEhj5pooiLuRuE+dh8oMMx3Ng1t16t5zXt165xZXKBTom5XlI3PHufvzX0twvV4pGo0Sf8/yUQW+P2e+wVVw75i4fD7/fJvP56PhcEgajYbUajVptVq63W60Xq9ps9mwu81mo1ar9exKdLlc8BD2er2k0+lIqVQy4mKxYBgLGBtarVaSSCTk8Xio3W6H2Sdgg1gs9t7v92m/35NAIGBku91OYrGYBTByqIEDLjTQis7nM3uLQqGg+XxOer2eXl5eqNFoUL1eZ7VQKESBQIAOhwPrBlwsaAX8JVssFm9IoigUCtEe4kc6neYQwMih9tgAGmixQSYej5PRaCSz2UwikYi63S6lUqn3h1XAyKEGDrjQQCs6nU40mUz+8PbR4r9y4MMRBLAwGAxyg8EgghOfTqdkMBhILpfT5+dnxOFwfEBULperbrf7VSqVsu5weLVaDXOQY2eQSCS45XLJhLvdjtnlcrkilUrlhgBGDjVwwIUG2qcLOByTycQcmM1mzDZMGxbaRU4mk7ENYOPDBaHf76dms1l1Op2vGKbRaMTIvV6Pjscjs/br64tZiNb5T6HtdkulUinCT+nHYxJ/8jZFgMfjMXu7SqWi32dktVoRf1as/U6nwzTPSQyHw1n+noPfb29vnMVigffsZ0EAI4caOODeNcQlk8n/+p1/CTAASVxppUgA6l4AAAAASUVORK5CYII=";
//elements section

function initializeSettings() {
	if (!settingsAlreadyShown) buildSettingsDiv();
	textSett["awwSettingsHeight"].value = parseInt(awwFacedDialogObj.style.height, 10);
	textSett["awwSettingsWidth"].value = parseInt(awwFacedDialogObj.style.width, 10);
	textSett["awwSettingsTop"].value = parseInt(awwFacedDialogObj.style.top, 10);
	textSett["awwSettingsLeft"].value = parseInt(awwFacedDialogObj.style.left, 10);
	
	textSett["awwSettingsLeft"].style.color = "#000000";
	textSett["awwSettingsTop"].style.color = "#000000";
	textSett["awwSettingsHeight"].style.color = "#000000";
	textSett["awwSettingsWidth"].style.color = "#000000";
	window.settingsWrapper.style.display = "inline";
}

function addSettRow(description, elemName) {
	rowSett = document.createElement("tr");
	spanSettWr = document.createElement("td");
		spanSettWr.style.width = "180px";
	textSettWr = document.createElement("td");
		textSettWr.style.padding = "5px";
	spanSett = document.createElement("span");
		spanSett.innerHTML = description;
		textSett[elemName] = new Object();
		textSett[elemName] = document.createElement("input");
		textSett[elemName].type = "text";
		textSett[elemName].id = elemName;
		textSett[elemName].style.width = "100%";
		textSett[elemName].oninput = function(){settingTextChange(this);};
	spanSettWr.appendChild(spanSett);
	textSettWr.appendChild(textSett[elemName]);
	rowSett.appendChild(spanSettWr);
	rowSett.appendChild(textSettWr);
	return rowSett;
}

function isNormalInteger(str) {
	var n = ~~Number(str);
	return String(n) === str && n >= 0;
 }

function settingTextChange(txtBox){
	var throwErr = false;
	if (isNormalInteger(textSett["awwSettingsTop"].value) == false) {
		textSett["awwSettingsTop"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (parseInt(textSett["awwSettingsTop"].value, 10) <= 0) {
		textSett["awwSettingsTop"].style.color = "#FF0000";
		throwErr = true;
	}
	else {
		textSett["awwSettingsTop"].style.color = "#000000";
		textSett["awwSettingsTop"].value = parseInt(textSett["awwSettingsTop"].value, 10)
	}
	//check left
	if (isNormalInteger(textSett["awwSettingsLeft"].value, 10) == false) {
		textSett["awwSettingsLeft"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (parseInt(textSett["awwSettingsLeft"].value, 10) <= 0) {
		textSett["awwSettingsLeft"].style.color = "#FF0000";
		throwErr = true;
	}
	else {
		textSett["awwSettingsLeft"].style.color = "#000000";
	}
	//check Width
	if (isNormalInteger(textSett["awwSettingsWidth"].value, 10) == false) {
		textSett["awwSettingsWidth"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (parseInt(textSett["awwSettingsWidth"].value, 10) <= 0) {
		textSett["awwSettingsWidth"].style.color = "#FF0000";
		throwErr = true;
	}
	else {
		textSett["awwSettingsWidth"].style.color = "#000000";
	}
	//check　height
	if (isNormalInteger(textSett["awwSettingsHeight"].value, 10) == false) {
		textSett["awwSettingsHeight"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (parseInt(textSett["awwSettingsHeight"].value, 10) <= 0) {
		textSett["awwSettingsHeight"].style.color = "#FF0000";
		throwErr = true;
	}
	else {
		textSett["awwSettingsHeight"].style.color = "#000000";
	}
	
	if (parseInt(textSett["awwSettingsHeight"].value, 10) + parseInt(textSett["awwSettingsTop"].value, 10) > window.innerHeight) {
		textSett["awwSettingsHeight"].style.color = "#FF0000";
		textSett["awwSettingsTop"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (throwErr == false) {
		textSett["awwSettingsHeight"].style.color = "#000000";
		textSett["awwSettingsTop"].style.color = "#000000";
	}
	if (parseInt(textSett["awwSettingsWidth"].value, 10) + parseInt(textSett["awwSettingsLeft"].value, 10) > window.innerWidth) {
		textSett["awwSettingsWidth"].style.color = "#FF0000";
		textSett["awwSettingsLeft"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (throwErr == false) {
		textSett["awwSettingsWidth"].style.color = "#000000";
		textSett["awwSettingsLeft"].style.color = "#000000";
	}
	
	if (throwErr == false) {changeSize(parseInt(textSett["awwSettingsTop"].value, 10), parseInt(textSett["awwSettingsLeft"].value, 10), parseInt(textSett["awwSettingsWidth"].value, 10), parseInt(textSett["awwSettingsHeight"].value, 10));}
}

function buildSettingsDiv() {
		//settings window
		window.settingsWrapper = document.createElement("div");
			settingsWrapper.id = "settingsWrapper";
			settingsWrapper.style.display = "none";
			settingsWrapper.style.position = "fixed"
			settingsWrapper.style.zIndex = "201";
			settingsWrapper.style.width = "250px";
			settingsWrapper.style.height = "auto";
			settingsWrapper.style.backgroundColor = "#FFFFFF";
			settingsWrapper.style.boxShadow = "0px 0px 20px 2px #000000";
			settingsWrapper.style.top = window.innerHeight/2 - 85 + "px";
			settingsWrapper.style.left = window.innerWidth/2 - 125 + "px";
			settingsWrapper.style.padding = "10px";
		//generating table
		var settingsTable = document.createElement("table");
			settingsTable.id = "settingsTable";
			settingsTable.style.width = "100%";
		window.textSett = {};
		settingsTable.appendChild(addSettRow("Dialog width (px): ", "awwSettingsWidth"));
		settingsTable.appendChild(addSettRow("Dialog height (px): ", "awwSettingsHeight"));
		settingsTable.appendChild(addSettRow("Position form left (px): ", "awwSettingsLeft"));
		settingsTable.appendChild(addSettRow("Position from top (px): ", "awwSettingsTop"));
		var settingsButtonWrapper = document.createElement("div");
		
		var settingsOK = document.createElement("input");
			settingsOK.type = "button";
			settingsOK.value = "OK";
			settingsOK.style.margin = "5px";
			settingsOK.style.width = "70px";
			settingsOK.style.cssFloat = "right";
			settingsOK.onclick = function(){okchangeSize();}
		settingsButtonWrapper.appendChild(settingsOK);
		var settingsCancel = document.createElement("input");
			settingsCancel.type = "button";
			settingsCancel.value = "Cancel";
			settingsCancel.style.margin = "5px";
			settingsCancel.style.width = "70px";
			settingsCancel.style.cssFloat = "right";
			settingsCancel.onclick = function(){settingsWrapper.style.display = "none";}
		settingsButtonWrapper.appendChild(settingsCancel);
		settingsWrapper.appendChild(settingsTable);
		settingsWrapper.appendChild(settingsButtonWrapper);
		settingsAlreadyShown = true;
		document.body.appendChild(settingsWrapper);
}

function okchangeSize() {
	var errorMsg = "Error:\n";
	var throwErr = false;
	//check top
	if (isNormalInteger(textSett["awwSettingsTop"].value, 10) == false) {
		errorMsg = errorMsg + "Value in 'Top' is not a number.\n";
		textSett["awwSettingsTop"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (parseInt(textSett["awwSettingsTop"].value, 10) <= 0) {
		errorMsg = errorMsg + "Value in 'Top' has to be greater than 0.\n";
		textSett["awwSettingsTop"].style.color = "#FF0000";
		throwErr = true;
	}
	else {
		textSett["awwSettingsTop"].style.color = "#000000";
	}
	//check left
	if (isNormalInteger(textSett["awwSettingsLeft"].value, 10) == false) {
		errorMsg = errorMsg + "Value in 'Left' is not a number.\n";
		textSett["awwSettingsLeft"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (parseInt(textSett["awwSettingsLeft"].value, 10) <= 0) {
		errorMsg = errorMsg + "Value in 'Left' has to be greater than 0.\n";
		textSett["awwSettingsLeft"].style.color = "#FF0000";
		throwErr = true;
	}
	else {
		textSett["awwSettingsLeft"].style.color = "#000000";
	}
	//check Width
	if (isNormalInteger(textSett["awwSettingsWidth"].value, 10) == false) {
		errorMsg = errorMsg + "Value in 'Width' is not a number.\n";
		textSett["awwSettingsWidth"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (parseInt(textSett["awwSettingsWidth"].value, 10) <= 0) {
		errorMsg = errorMsg + "Value in 'Width' has to be greater than 0.\n";
		textSett["awwSettingsWidth"].style.color = "#FF0000";
		throwErr = true;
	}
	else {
		textSett["awwSettingsWidth"].style.color = "#000000";
	}
	//check　height
	if (isNormalInteger(textSett["awwSettingsHeight"].value, 10) == false) {
		errorMsg = errorMsg + "Value in 'Height' is not a number.\n";
		textSett["awwSettingsHeight"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (parseInt(textSett["awwSettingsHeight"].value, 10) <= 0) {
		errorMsg = errorMsg + "Value in 'Height' has to be greater than 0.\n";
		textSett["awwSettingsHeight"].style.color = "#FF0000";
		throwErr = true;
	}
	else {
		textSett["awwSettingsHeight"].style.color = "#000000";
	}
	if (parseInt(textSett["awwSettingsHeight"].value, 10) + parseInt(textSett["awwSettingsTop"].value, 10) > window.innerHeight) {
		errorMsg = errorMsg + "Dialog cannot be out of borders.\n";
		textSett["awwSettingsHeight"].style.color = "#FF0000";
		textSett["awwSettingsTop"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (throwErr == false) {
		textSett["awwSettingsHeight"].style.color = "#000000";
		textSett["awwSettingsTop"].style.color = "#000000";
	}
	if (parseInt(textSett["awwSettingsWidth"].value, 10) + parseInt(textSett["awwSettingsLeft"].value, 10) > window.innerWidth) {
		errorMsg = errorMsg + "Dialog cannot be out of borders.\n";
		textSett["awwSettingsWidth"].style.color = "#FF0000";
		textSett["awwSettingsLeft"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (throwErr == false) {
		textSett["awwSettingsWidth"].style.color = "#000000";
		textSett["awwSettingsLeft"].style.color = "#000000";
	}
	if (throwErr == false) {
		changeSize(parseInt(textSett["awwSettingsTop"].value, 10), parseInt(textSett["awwSettingsLeft"].value, 10), parseInt(textSett["awwSettingsWidth"].value, 10), parseInt(textSett["awwSettingsHeight"].value, 10));
		localStorage.setItem("aww2_width", parseInt(textSett["awwSettingsWidth"].value, 10));
		localStorage.setItem("aww2_height", parseInt(textSett["awwSettingsHeight"].value, 10));
		localStorage.setItem("aww2_top", parseInt(textSett["awwSettingsTop"].value, 10));
		localStorage.setItem("aww2_left", parseInt(textSett["awwSettingsLeft"].value, 10));
		settingsWrapper.style.display = "none";
	}
	else {
		alert(errorMsg);
	}
	
}

function changeSize(top, left, width, height){
	console.log("changing size...");
	if (width < 350) width = 350;
	if (height < 100) height = 100;
	width = Math.floor((parseInt(width, 10) - 37)/(parseInt(thumbDialWidth, 10)+10))*(parseInt(thumbDialWidth, 10)+10)+37;
	awwFacedDialogObj.style.top = top + "px";
	awwFacedDialogObj.style.left = left + "px";
	awwFacedDialogObj.style.width = width + "px";
	awwFacedDialogObj.style.height = height + "px";
	tableWrap.style.height = (height - 72) + "px";
	if (textBoxNr == 1) {
		titleFace.style.width = (width - 295) + "px";
	} else if (textBoxNr == 3) {
		titleFace.style.width = ((width - 291)/3)-12 + "px";
		upperCaption.style.width = ((width - 291)/3)-12 + "px";
		lowerCaption.style.width = ((width - 291)/3)-12 + "px";
		upperCaption.style.display = "inline";
		lowerCaption.style.display = "inline";
	}
}

function createFacesDiv() {
	console.log("AWWFACES");
	var objTo = document.body;
	window.awwFacedDialogObj = document.createElement("div");
	window.tableWrap = document.createElement("div");
	var controls = document.createElement("div");
	tableWrap.id = "awwFacesTableWrapper";
	tableWrap.style.overflowY = "scroll";
	tableWrap.style.margin = "10px 10px 5px 10px";
	tableWrap.style.padding = "10px 0px";
	awwFacedDialogObj.appendChild(tableWrap);
	
	window.titleFace = document.createElement("input");
	titleFace.type = "text";
	titleFace.id = "awwFaceId";
	titleFace.style.margin = "5px 5px 10px 10px";
	titleFace.placeholder = "Mouse-over text";
	titleFace.style.height = "20px";
	titleFace.style.paddingLeft = "3px";
	controls.appendChild(titleFace);
	
	window.upperCaption = document.createElement("input");
	upperCaption.type = "text";
	upperCaption.id = "upperCaption";
	upperCaption.style.margin = "5px 5px 10px 5px";
	upperCaption.placeholder = "Top caption";
	upperCaption.style.height = "20px";
	upperCaption.style.paddingLeft = "3px";
	upperCaption.style.display = "none";
	controls.appendChild(upperCaption);
	
	window.lowerCaption = document.createElement("input");
	lowerCaption.type = "text";
	lowerCaption.id = "lowerCaption";
	lowerCaption.style.margin = "5px 5px 10px 5px";
	lowerCaption.placeholder = "Bottom caption";
	lowerCaption.style.height = "20px";
	lowerCaption.style.paddingLeft = "3px";
	lowerCaption.style.display = "none";
	controls.appendChild(lowerCaption);
	
	var addFaceB = document.createElement("input");
	addFaceB.type = "button";
	addFaceB.value = "Add face"
	addFaceB.style.margin = "2px 5px 7px 5px";
	addFaceB.style.width = "80px";
	addFaceB.onclick = function(){addFace();return false;};
	addFaceB.style.padding = "2px";
	controls.appendChild(addFaceB);
	
	var cancel = document.createElement("input");
	cancel.type = "button";
	cancel.value = "Cancel"
	cancel.style.margin = "2px 5px 7px 5px";
	cancel.style.width = "80px";
	cancel.onclick = function(){hideSelect()};
	cancel.style.padding = "2px";
	controls.appendChild(cancel);
	
	window.wikiLink = document.createElement("a");
	wikiLink.href = "http://www.reddit.com/r/awwnime/wiki/commentfaces";
	wikiLink.innerHTML = "Faces wiki";
	wikiLink.style.margin = "9px 5px 14px 5px";
	controls.appendChild(wikiLink);
	
	var settings = document.createElement("img");
	settings.src = settingsIcon;
	settings.alt = "settings";
	settings.style.margin = "8px 10px 13px 5px";
	settings.style.position = "absolute";
	settings.title = "Settings...";
	settings.onclick = function(){initializeSettings();}
	controls.appendChild(settings);
	
	awwFacedDialogObj.appendChild(controls)
	objTo.appendChild(awwFacedDialogObj);
	awwFacedDialogObj.id = "awwFacesDialog";
	awwFacedDialogObj.style.position = "fixed";
	awwFacedDialogObj.style.top = "200px";
	awwFacedDialogObj.style.width = "835px";
	awwFacedDialogObj.style.backgroundColor = "#FFFFFF";
	awwFacedDialogObj.style.display = "none"; //diaply none
	awwFacedDialogObj.style.boxShadow = "0px 0px 20px 2px #000000";
	awwFacedDialogObj.style.zIndex = "200";
	appendFaces();
	divAlreadyShown = true;
}

function addFace() {
	var faceCode = "";
	var inputEvent = new Event('input');
	var title = document.getElementById("awwFaceId").value;
	var upperCapt = document.getElementById("upperCaption").value;
	var lowerCapt = document.getElementById("lowerCaption").value;
	if (selectedFace == "") {
		alert("You have not selected any face.");
		return;
	}
	document.getElementById("awwFaceId").value = "";
	document.getElementById("upperCaption").value = "";
	document.getElementById("lowerCaption").value = "";
	console.log("title reset");
	 //[](#name_of_face "Your text")
	var bbCode = ""
	var startText = document.getElementsByTagName("textarea")[selectedText.boxIndex].value;

	bbCode = bbCodeFunction(selectedFace, title, upperCapt, lowerCapt);
	console.log(bbCode);
	var endText = startText.substr(0, selectedText.start) + bbCode + startText.substring(selectedText.start + selectedText.length, startText.length);
	console.log(endText);
	document.getElementsByTagName("textarea")[selectedText.boxIndex].value = endText;
	awwFacedDialogObj.style.display = "none";
	document.getElementsByTagName("textarea")[selectedText.boxIndex].dispatchEvent(inputEvent);
}

function appendFaceThumb(name, new_width, new_height) {
	var col = document.createElement("div");
	var divtest = document.createElement("a");
	divtest.innerHTML = "";
	divtest.title = "[](" + faceIdChar + name + ")";
	divtest.href = faceIdChar + name;
	divtest.id = name;
	divtest.style.margin = "auto";
	divtest.style.display = "block";
	divtest.style.position = "absolute";
	divtest.style.top = "0px";
	divtest.style.left = "0px";
	divtest.style.right = "0px";
	divtest.style.bottom = "0px";
	if (new_width != "" && new_height != "") {
		divtest.style.setProperty("background-size", new_width + "px " + new_height + "px", "important");
		divtest.style.setProperty("height", new_height + "px", "important");
		divtest.style.setProperty("width", new_width + "px", "important");
	}
	divtest.onclick=function(){faceClick(divtest.id);return false;};
	divtest.ondblclick=function(){faceClick(divtest.id);addFace();return false;};
	var gifLoad = document.createElement("img");
	gifLoad.src = loadingIcon;
	gifLoad.style.position = "absolute";
	gifLoad.style.top = (Math.round((parseInt(thumbDialHeight.substr(0, thumbDialHeight.length-2), 10)/2)-8)) +"px";
	gifLoad.style.left = (Math.round((parseInt(thumbDialWidth.substr(0, thumbDialWidth.length-2), 10)/2)-8)) +"px";
	gifLoad.style.zIndex = "-1";
	col.appendChild(divtest);
	col.appendChild(gifLoad);
	col.style.width = thumbDialWidth;
	col.style.height = thumbDialHeight;
	col.style.position = "relative";
	col.style.margin = "5px";
	col.style.cssFloat = "left";
	return col;
}

function faceClick(faceId) {
	var allFaces = awwFacedDialogObj.getElementsByTagName("a");
	for (var i = 0; i < allFaces.length; i++) {
		allFaces[i].style.boxShadow = "";
	}
	document.getElementById(faceId).style.boxShadow = "0px 0px 20px 10px #F9401A";
	selectedFace = faceId;
	//alert(faceId);
}

function appendFaces() {
	var objTo = tableWrap;
	var regex = /https?:\/\/((www\.)?|(pay\.)?|(.{2}\.)?)reddit\.com\/r\/(\w+)\/.*/;
	var subreddit = document.URL.replace(regex, "$5").toLowerCase();
	if (subreddit == "awwnime") {
		faceIdChar = "#";
		wikiLink.href = "http://www.reddit.com/r/awwnime/wiki/commentfaces";
		thumbDialWidth = "150px";
		thumbDialHeight = "115px";
		bbCodeFunction = function(bbFace, bbTitle){
			if (bbTitle == "") {
				return "[](#" + bbFace + ")";
			} else {
				return "[](#" + bbFace + " \"" + bbTitle + "\")";
			}
		};
		objTo.appendChild(appendFaceThumb("grr"));
		objTo.appendChild(appendFaceThumb("o-o"));
		objTo.appendChild(appendFaceThumb("trollin"));
		objTo.appendChild(appendFaceThumb("oniichan"));
		objTo.appendChild(appendFaceThumb("waa"));
		objTo.appendChild(appendFaceThumb("thumbsup"));
		objTo.appendChild(appendFaceThumb("butwhat"));
		objTo.appendChild(appendFaceThumb("disapproval"));
		objTo.appendChild(appendFaceThumb("catsmile"));
		objTo.appendChild(appendFaceThumb("waow"));
		objTo.appendChild(appendFaceThumb("darksad"));
		objTo.appendChild(appendFaceThumb("hnng"));
		objTo.appendChild(appendFaceThumb("nosebleed"));
		objTo.appendChild(appendFaceThumb("awyeah"));
		objTo.appendChild(appendFaceThumb("blush"));
		objTo.appendChild(appendFaceThumb("somad"));
		objTo.appendChild(appendFaceThumb("hana"));
		objTo.appendChild(appendFaceThumb("tears"));
		objTo.appendChild(appendFaceThumb("megane"));
		objTo.appendChild(appendFaceThumb("cry"));
		objTo.appendChild(appendFaceThumb("squee"));
		objTo.appendChild(appendFaceThumb("sparkle"));
		objTo.appendChild(appendFaceThumb("yes"));
		objTo.appendChild(appendFaceThumb("therethere"));
		objTo.appendChild(appendFaceThumb("concentrate"));
		objTo.appendChild(appendFaceThumb("WAHAHAHA"));
		objTo.appendChild(appendFaceThumb("wink"));
		objTo.appendChild(appendFaceThumb("pleased"));
		objTo.appendChild(appendFaceThumb("shock"));
		objTo.appendChild(appendFaceThumb("facepalm"));
		objTo.appendChild(appendFaceThumb("itai"));
		objTo.appendChild(appendFaceThumb("airen"));
		objTo.appendChild(appendFaceThumb("laugh"));
		objTo.appendChild(appendFaceThumb("fwaa"));
		objTo.appendChild(appendFaceThumb("dealwithit"));
		objTo.appendChild(appendFaceThumb("pissed"));
		objTo.appendChild(appendFaceThumb("tsuntsun"));
		objTo.appendChild(appendFaceThumb("deredere"));
		objTo.appendChild(appendFaceThumb("bii"));
		objTo.appendChild(appendFaceThumb("impossibiru"));
		objTo.appendChild(appendFaceThumb("just-no"));
		objTo.appendChild(appendFaceThumb("superb"));
		objTo.appendChild(appendFaceThumb("contented"));
		objTo.appendChild(appendFaceThumb("Lewd"));
		objTo.appendChild(appendFaceThumb("go-on!"));
		objTo.appendChild(appendFaceThumb("happy"));
		objTo.appendChild(appendFaceThumb("pout"));
		objTo.appendChild(appendFaceThumb("RARR"));
		objTo.appendChild(appendFaceThumb("blushing"));
		objTo.appendChild(appendFaceThumb("headpat"));
		objTo.appendChild(appendFaceThumb("heyyou"));
		objTo.appendChild(appendFaceThumb("hug"));
		objTo.appendChild(appendFaceThumb("kyaa"));
		objTo.appendChild(appendFaceThumb("omnom"));
		objTo.appendChild(appendFaceThumb("peek"));
		objTo.appendChild(appendFaceThumb("sigh"));
		objTo.appendChild(appendFaceThumb("trynottopurr"));
		objTo.appendChild(appendFaceThumb("uguu"));
		objTo.appendChild(appendFaceThumb("baka"));
		objTo.appendChild(appendFaceThumb("shiny"));
		objTo.appendChild(appendFaceThumb("watchadoin"));
		objTo.appendChild(appendFaceThumb("curious"));
		objTo.appendChild(appendFaceThumb("clap"));
		objTo.appendChild(appendFaceThumb("Tiriniz"));
		objTo.appendChild(appendFaceThumb("silence"));
		objTo.appendChild(appendFaceThumb("doteyes"));
		objTo.appendChild(appendFaceThumb("oi!"));
		objTo.appendChild(appendFaceThumb("dontmesswithme"));
		objTo.appendChild(appendFaceThumb("nooo"));
		objTo.appendChild(appendFaceThumb("ah"));
		objTo.appendChild(appendFaceThumb("ehehe"));
		objTo.appendChild(appendFaceThumb("robot"));
		objTo.appendChild(appendFaceThumb("crying"));
		objTo.appendChild(appendFaceThumb("jumpforjoy"));
		objTo.appendChild(appendFaceThumb("funky"));
		objTo.appendChild(appendFaceThumb("grin"));
		objTo.appendChild(appendFaceThumb("SuperLewd", 78, 100)) //Two additional parametres force-resize the image. Try to fit it in 150px*100px
	}
	else if (subreddit == "pantsu") {
		faceIdChar = "#";
		wikiLink.href = "http://www.reddit.com/r/pantsu/comments/17bqzs/over_1000_readers_have_some_comment_faces/";
		thumbDialWidth = "170px";
		thumbDialHeight = "140px";
		bbCodeFunction = function(bbFace, bbTitle){
			if (bbTitle == "") {
				return "[](#" + bbFace + ")";
			} else {
				return "[](#" + bbFace + " \"" + bbTitle + "\")";
			}
		};
		objTo.appendChild(appendFaceThumb("lovemyhat"));
		objTo.appendChild(appendFaceThumb("blush"));
		objTo.appendChild(appendFaceThumb("shakedat"));
		objTo.appendChild(appendFaceThumb("nowai"));
		objTo.appendChild(appendFaceThumb("delight"));
		objTo.appendChild(appendFaceThumb("drool"));
		objTo.appendChild(appendFaceThumb("sparkle"));
		objTo.appendChild(appendFaceThumb("disapproval"));
		objTo.appendChild(appendFaceThumb("mmm"));
		objTo.appendChild(appendFaceThumb("nooo"));
	}
	else if (subreddit == "manga") {
		faceIdChar = "//#";
		wikiLink.href = "http://www.reddit.com/r/manga";
		thumbDialWidth = "200px";
		thumbDialHeight = "160px";
		bbCodeFunction = function(bbFace, bbTitle){
			if (bbTitle == "") {
					return "[](//#" + bbFace + ")";
			} else {
					return "[](//#" + bbFace + " \"" + bbTitle + "\")";
			}
		};
		objTo.appendChild(appendFaceThumb("lolwut"));
		objTo.appendChild(appendFaceThumb("yotsuba"));
		objTo.appendChild(appendFaceThumb("bossun"));
		objTo.appendChild(appendFaceThumb("wat"));
		objTo.appendChild(appendFaceThumb("hiramaru"));
		objTo.appendChild(appendFaceThumb("thumbsup"));
		objTo.appendChild(appendFaceThumb("kobato"));
		objTo.appendChild(appendFaceThumb("mashiro"));
		objTo.appendChild(appendFaceThumb("kamo"));
		objTo.appendChild(appendFaceThumb("nagi"));
		objTo.appendChild(appendFaceThumb("lewd"));
	}
	else if (subreddit == "moescape") {
		faceIdChar = "#";
		wikiLink.href = "http://www.reddit.com/r/awwnime/wiki/commentfaces";
		thumbDialWidth = "150px";
		thumbDialHeight = "115px";
		bbCodeFunction = function(bbFace, bbTitle){
			if (bbTitle == "") {
				return "[](#" + bbFace + ")";
			} else {
				return "[](#" + bbFace + " \"" + bbTitle + "\")";
			}
		};
		objTo.appendChild(appendFaceThumb("grr"));
		objTo.appendChild(appendFaceThumb("o-o"));
		objTo.appendChild(appendFaceThumb("trollin"));
		objTo.appendChild(appendFaceThumb("oniichan"));
		objTo.appendChild(appendFaceThumb("waa"));
		objTo.appendChild(appendFaceThumb("thumbsup"));
		objTo.appendChild(appendFaceThumb("butwhat"));
		objTo.appendChild(appendFaceThumb("disapproval"));
		objTo.appendChild(appendFaceThumb("catsmile"));
		objTo.appendChild(appendFaceThumb("waow"));
		objTo.appendChild(appendFaceThumb("darksad"));
		objTo.appendChild(appendFaceThumb("hnng"));
		objTo.appendChild(appendFaceThumb("nosebleed"));
		objTo.appendChild(appendFaceThumb("awyeah"));
		objTo.appendChild(appendFaceThumb("blush"));
		objTo.appendChild(appendFaceThumb("somad"));
		objTo.appendChild(appendFaceThumb("hana"));
		objTo.appendChild(appendFaceThumb("tears"));
		objTo.appendChild(appendFaceThumb("megane"));
		objTo.appendChild(appendFaceThumb("cry"));
		objTo.appendChild(appendFaceThumb("squee"));
		objTo.appendChild(appendFaceThumb("sparkle"));
		objTo.appendChild(appendFaceThumb("yes"));
		objTo.appendChild(appendFaceThumb("therethere"));
		objTo.appendChild(appendFaceThumb("concentrate"));
		objTo.appendChild(appendFaceThumb("WAHAHAHA"));
		objTo.appendChild(appendFaceThumb("wink"));
		objTo.appendChild(appendFaceThumb("pleased"));
		objTo.appendChild(appendFaceThumb("shock"));
		objTo.appendChild(appendFaceThumb("facepalm"));
		objTo.appendChild(appendFaceThumb("itai"));
		objTo.appendChild(appendFaceThumb("airen"));
		objTo.appendChild(appendFaceThumb("laugh"));
		objTo.appendChild(appendFaceThumb("fwaa"));
		objTo.appendChild(appendFaceThumb("dealwithit"));
		objTo.appendChild(appendFaceThumb("pissed"));
		objTo.appendChild(appendFaceThumb("tsuntsun"));
		objTo.appendChild(appendFaceThumb("deredere"));
		objTo.appendChild(appendFaceThumb("bii"));
		objTo.appendChild(appendFaceThumb("impossibiru"));
		objTo.appendChild(appendFaceThumb("just-no"));
		objTo.appendChild(appendFaceThumb("superb"));
		objTo.appendChild(appendFaceThumb("contented"));
		objTo.appendChild(appendFaceThumb("Lewd"));
		objTo.appendChild(appendFaceThumb("go-on!"));
		objTo.appendChild(appendFaceThumb("happy"));
		objTo.appendChild(appendFaceThumb("pout"));
		objTo.appendChild(appendFaceThumb("RARR"));
		objTo.appendChild(appendFaceThumb("blushing"));
		objTo.appendChild(appendFaceThumb("headpat"));
		objTo.appendChild(appendFaceThumb("heyyou"));
		objTo.appendChild(appendFaceThumb("hug"));
		objTo.appendChild(appendFaceThumb("kyaa"));
		objTo.appendChild(appendFaceThumb("omnom"));
		objTo.appendChild(appendFaceThumb("peek"));
		objTo.appendChild(appendFaceThumb("sigh"));
		objTo.appendChild(appendFaceThumb("trynottopurr"));
		objTo.appendChild(appendFaceThumb("uguu"));
		objTo.appendChild(appendFaceThumb("baka"));
		objTo.appendChild(appendFaceThumb("shiny"));
		objTo.appendChild(appendFaceThumb("watchadoin"));
		objTo.appendChild(appendFaceThumb("curious"));
		objTo.appendChild(appendFaceThumb("clap"));
		objTo.appendChild(appendFaceThumb("Tiriniz"));
		objTo.appendChild(appendFaceThumb("silence"));
		objTo.appendChild(appendFaceThumb("doteyes"));
		objTo.appendChild(appendFaceThumb("renge"));
		objTo.appendChild(appendFaceThumb("dontmesswithrenge"));
		objTo.appendChild(appendFaceThumb("asuka"));
		objTo.appendChild(appendFaceThumb("nooo"));
		objTo.appendChild(appendFaceThumb("ah"));
		objTo.appendChild(appendFaceThumb("ehehe"));
		objTo.appendChild(appendFaceThumb("robot"));
		objTo.appendChild(appendFaceThumb("shinobu"));
		objTo.appendChild(appendFaceThumb("oniichan_anim"));
		objTo.appendChild(appendFaceThumb("jumpforjoy"));
		objTo.appendChild(appendFaceThumb("doteyes"));
		objTo.appendChild(appendFaceThumb("funky"));
	}
	else if (subreddit == "twodeeart") {
		faceIdChar = "#";
		wikiLink.href = "http://www.reddit.com/r/awwnime/wiki/commentfaces";
		thumbDialWidth = "150px";
		thumbDialHeight = "115px";
		bbCodeFunction = function(bbFace, bbTitle){
			if (bbTitle == "") {
				return "[](#" + bbFace + ")";
			} else {
				return "[](#" + bbFace + " \"" + bbTitle + "\")";
			}
		};
		objTo.appendChild(appendFaceThumb("grr"));
		objTo.appendChild(appendFaceThumb("o-o"));
		objTo.appendChild(appendFaceThumb("trollin"));
		objTo.appendChild(appendFaceThumb("oniichan"));
		objTo.appendChild(appendFaceThumb("waa"));
		objTo.appendChild(appendFaceThumb("thumbsup"));
		objTo.appendChild(appendFaceThumb("butwhat"));
		objTo.appendChild(appendFaceThumb("disapproval"));
		objTo.appendChild(appendFaceThumb("catsmile"));
		objTo.appendChild(appendFaceThumb("waow"));
		objTo.appendChild(appendFaceThumb("darksad"));
		objTo.appendChild(appendFaceThumb("hnng"));
		objTo.appendChild(appendFaceThumb("nosebleed"));
		objTo.appendChild(appendFaceThumb("awyeah"));
		objTo.appendChild(appendFaceThumb("blush"));
		objTo.appendChild(appendFaceThumb("somad"));
		objTo.appendChild(appendFaceThumb("hana"));
		objTo.appendChild(appendFaceThumb("tears"));
		objTo.appendChild(appendFaceThumb("megane"));
		objTo.appendChild(appendFaceThumb("cry"));
		objTo.appendChild(appendFaceThumb("squee"));
		objTo.appendChild(appendFaceThumb("sparkle"));
		objTo.appendChild(appendFaceThumb("yes"));
		objTo.appendChild(appendFaceThumb("therethere"));
		objTo.appendChild(appendFaceThumb("concentrate"));
		objTo.appendChild(appendFaceThumb("WAHAHAHA"));
		objTo.appendChild(appendFaceThumb("wink"));
		objTo.appendChild(appendFaceThumb("pleased"));
		objTo.appendChild(appendFaceThumb("shock"));
		objTo.appendChild(appendFaceThumb("facepalm"));
		objTo.appendChild(appendFaceThumb("itai"));
		objTo.appendChild(appendFaceThumb("airen"));
		objTo.appendChild(appendFaceThumb("laugh"));
		objTo.appendChild(appendFaceThumb("fwaa"));
		objTo.appendChild(appendFaceThumb("dealwithit"));
		objTo.appendChild(appendFaceThumb("pissed"));
		objTo.appendChild(appendFaceThumb("tsuntsun"));
		objTo.appendChild(appendFaceThumb("deredere"));
		objTo.appendChild(appendFaceThumb("bii"));
		objTo.appendChild(appendFaceThumb("impossibiru"));
		objTo.appendChild(appendFaceThumb("just-no"));
		objTo.appendChild(appendFaceThumb("superb"));
		objTo.appendChild(appendFaceThumb("contented"));
		objTo.appendChild(appendFaceThumb("Lewd"));
		objTo.appendChild(appendFaceThumb("go-on!"));
		objTo.appendChild(appendFaceThumb("happy"));
		objTo.appendChild(appendFaceThumb("pout"));
		objTo.appendChild(appendFaceThumb("RARR"));
		objTo.appendChild(appendFaceThumb("blushing"));
		objTo.appendChild(appendFaceThumb("headpat"));
		objTo.appendChild(appendFaceThumb("heyyou"));
		objTo.appendChild(appendFaceThumb("hug"));
		objTo.appendChild(appendFaceThumb("kyaa"));
		objTo.appendChild(appendFaceThumb("omnom"));
		objTo.appendChild(appendFaceThumb("peek"));
		objTo.appendChild(appendFaceThumb("sigh"));
		objTo.appendChild(appendFaceThumb("trynottopurr"));
		objTo.appendChild(appendFaceThumb("uguu"));
		objTo.appendChild(appendFaceThumb("baka"));
		objTo.appendChild(appendFaceThumb("shiny"));
		objTo.appendChild(appendFaceThumb("watchadoin"));
		objTo.appendChild(appendFaceThumb("curious"));
		objTo.appendChild(appendFaceThumb("clap"));
		objTo.appendChild(appendFaceThumb("Tiriniz"));
		objTo.appendChild(appendFaceThumb("silence"));
		objTo.appendChild(appendFaceThumb("doteyes"));
		objTo.appendChild(appendFaceThumb("renge"));
		objTo.appendChild(appendFaceThumb("dontmesswithrenge"));
		objTo.appendChild(appendFaceThumb("asuka"));
		objTo.appendChild(appendFaceThumb("nooo"));
		objTo.appendChild(appendFaceThumb("ah"));
		objTo.appendChild(appendFaceThumb("ehehe"));
		objTo.appendChild(appendFaceThumb("robot"));
		objTo.appendChild(appendFaceThumb("shinobu"));
		objTo.appendChild(appendFaceThumb("oniichan_anim"));
		objTo.appendChild(appendFaceThumb("jumpforjoy"));
		objTo.appendChild(appendFaceThumb("doteyes"));
		objTo.appendChild(appendFaceThumb("funky"));
	}
	else if (subreddit == "patchuu") {
		faceIdChar = "#";
		wikiLink.href = "http://www.reddit.com/r/awwnime/wiki/commentfaces";
		thumbDialWidth = "150px";
		thumbDialHeight = "100px";
		bbCodeFunction = function(bbFace, bbTitle){
			if (bbTitle == "") {
				return "[](#" + bbFace + ")";
			} else {
				return "[](#" + bbFace + " \"" + bbTitle + "\")";
			}
		};
		objTo.appendChild(appendFaceThumb("grr"));
		objTo.appendChild(appendFaceThumb("o-o"));
		objTo.appendChild(appendFaceThumb("trollin"));
		objTo.appendChild(appendFaceThumb("oniichan"));
		objTo.appendChild(appendFaceThumb("waa"));
		objTo.appendChild(appendFaceThumb("thumbsup"));
		objTo.appendChild(appendFaceThumb("butwhat"));
		objTo.appendChild(appendFaceThumb("disapproval"));
		objTo.appendChild(appendFaceThumb("catsmile"));
		objTo.appendChild(appendFaceThumb("waow"));
		objTo.appendChild(appendFaceThumb("darksad"));
		objTo.appendChild(appendFaceThumb("hnng"));
		objTo.appendChild(appendFaceThumb("nosebleed"));
		objTo.appendChild(appendFaceThumb("awyeah"));
		objTo.appendChild(appendFaceThumb("blush"));
		objTo.appendChild(appendFaceThumb("somad"));
		objTo.appendChild(appendFaceThumb("hana"));
		objTo.appendChild(appendFaceThumb("tears"));
		objTo.appendChild(appendFaceThumb("megane"));
		objTo.appendChild(appendFaceThumb("cry"));
		objTo.appendChild(appendFaceThumb("squee"));
		objTo.appendChild(appendFaceThumb("sparkle"));
		objTo.appendChild(appendFaceThumb("yes"));
		objTo.appendChild(appendFaceThumb("therethere"));
		objTo.appendChild(appendFaceThumb("concentrate"));
		objTo.appendChild(appendFaceThumb("WAHAHAHA"));
		objTo.appendChild(appendFaceThumb("wink"));
		objTo.appendChild(appendFaceThumb("pleased"));
		objTo.appendChild(appendFaceThumb("shock"));
		objTo.appendChild(appendFaceThumb("facepalm"));
		objTo.appendChild(appendFaceThumb("itai"));
		objTo.appendChild(appendFaceThumb("airen"));
		objTo.appendChild(appendFaceThumb("laugh"));
		objTo.appendChild(appendFaceThumb("fwaa"));
		objTo.appendChild(appendFaceThumb("dealwithit"));
		objTo.appendChild(appendFaceThumb("pissed"));
		objTo.appendChild(appendFaceThumb("tsuntsun"));
		objTo.appendChild(appendFaceThumb("deredere"));
		objTo.appendChild(appendFaceThumb("bii"));
		objTo.appendChild(appendFaceThumb("impossibiru"));
		objTo.appendChild(appendFaceThumb("just-no"));
		objTo.appendChild(appendFaceThumb("superb"));
		objTo.appendChild(appendFaceThumb("contented"));
		objTo.appendChild(appendFaceThumb("Lewd"));
		objTo.appendChild(appendFaceThumb("go-on!"));
		objTo.appendChild(appendFaceThumb("happy"));
		objTo.appendChild(appendFaceThumb("pout"));
		objTo.appendChild(appendFaceThumb("RARR"));
		objTo.appendChild(appendFaceThumb("blushing"));
		objTo.appendChild(appendFaceThumb("headpat"));
		objTo.appendChild(appendFaceThumb("heyyou"));
		objTo.appendChild(appendFaceThumb("hug"));
		objTo.appendChild(appendFaceThumb("kyaa"));
		objTo.appendChild(appendFaceThumb("omnom"));
		objTo.appendChild(appendFaceThumb("peek"));
		objTo.appendChild(appendFaceThumb("sigh"));
		objTo.appendChild(appendFaceThumb("trynottopurr"));
		objTo.appendChild(appendFaceThumb("uguu"));
		objTo.appendChild(appendFaceThumb("silence"));
		objTo.appendChild(appendFaceThumb("doteyes"));
		objTo.appendChild(appendFaceThumb("SuperLewd", 78, 100)) //Two additional parametres force-resize the image. Try to fit it in 150px*100px
	} else if (subreddit == "anime") {
		faceIdChar = "#";
		textBoxNr = 3;
		wikiLink.href = "http://www.reddit.com/r/anime/comments/izxos/comment_faces_for_ranime/";
		thumbDialWidth = "195px";
		thumbDialHeight = "180px";
		bbCodeFunction = function(bbFace, bbTitle, bbUpper, bbLower){
			var bbHover = "";
			var bbCapt = "";
			if (bbTitle != "") {
				bbHover = " \"" + bbTitle + "\"";
			}
			if (bbLower != "") {
				bbCapt = "**" + bbLower + "**";
			}
			if (bbUpper != "") {
				bbCapt = bbCapt + bbUpper;
			}
			return "[" + bbCapt + "](#" + bbFace + bbHover + ")";
		};
		objTo.appendChild(appendFaceThumb("asuka-shouting"));
		objTo.appendChild(appendFaceThumb("chiyo-uhh"));
		objTo.appendChild(appendFaceThumb("she-ded"));
		objTo.appendChild(appendFaceThumb("deko-cry"));
		objTo.appendChild(appendFaceThumb("gendo-pls"));
		objTo.appendChild(appendFaceThumb("haruhi-annoyed"));
		objTo.appendChild(appendFaceThumb("k-on-hug"));
		objTo.appendChild(appendFaceThumb("lewd"));
		objTo.appendChild(appendFaceThumb("nanami-hug"));
		objTo.appendChild(appendFaceThumb("pika-dead"));
		objTo.appendChild(appendFaceThumb("super-happy"));
		objTo.appendChild(appendFaceThumb("yui-crying"));
		objTo.appendChild(appendFaceThumb("durr"));
		objTo.appendChild(appendFaceThumb("mugi-fish"));
		objTo.appendChild(appendFaceThumb("objection"));
		objTo.appendChild(appendFaceThumb("chaika"));
		objTo.appendChild(appendFaceThumb("chiho-wut"));
		objTo.appendChild(appendFaceThumb("disapproval"));
		objTo.appendChild(appendFaceThumb("grrrr"));
		objTo.appendChild(appendFaceThumb("im-listening"));
		objTo.appendChild(appendFaceThumb("om-nom"));
		objTo.appendChild(appendFaceThumb("stare"));
		objTo.appendChild(appendFaceThumb("u-wat-m8"));
		objTo.appendChild(appendFaceThumb("what"));
		objTo.appendChild(appendFaceThumb("wide-face"));
		objTo.appendChild(appendFaceThumb("ehehehe"));
		objTo.appendChild(appendFaceThumb("mandom"));
		objTo.appendChild(appendFaceThumb("pointandlaugh"));
		objTo.appendChild(appendFaceThumb("smug"));
		objTo.appendChild(appendFaceThumb("confused"));
		objTo.appendChild(appendFaceThumb("yunocaine"));
		objTo.appendChild(appendFaceThumb("konahappy"));
		objTo.appendChild(appendFaceThumb("konacat"));
		objTo.appendChild(appendFaceThumb("gununu"));
		objTo.appendChild(appendFaceThumb("cat1"));
		objTo.appendChild(appendFaceThumb("somad"));
		objTo.appendChild(appendFaceThumb("madcrycat2"));
		objTo.appendChild(appendFaceThumb("um"));
		objTo.appendChild(appendFaceThumb("facepalm"));
		objTo.appendChild(appendFaceThumb("wtfika"));
		objTo.appendChild(appendFaceThumb("kanie-disgust"));
		objTo.appendChild(appendFaceThumb("nerrr"));
		objTo.appendChild(appendFaceThumb("nico-heart"));
		objTo.appendChild(appendFaceThumb("sonico-wink"));
		objTo.appendChild(appendFaceThumb("sparkle-ika"));
		objTo.appendChild(appendFaceThumb("suave"));
		objTo.appendChild(appendFaceThumb("super-blush"));
		objTo.appendChild(appendFaceThumb("surprised-blush"));
		objTo.appendChild(appendFaceThumb("shocked"));
		objTo.appendChild(appendFaceThumb("thumbs-up"));
		objTo.appendChild(appendFaceThumb("u-dont-say"));
		objTo.appendChild(appendFaceThumb("ugh-peasants"));
		objTo.appendChild(appendFaceThumb("uhhh"));
		objTo.appendChild(appendFaceThumb("yay"));
		objTo.appendChild(appendFaceThumb("you-bore-me"));
		objTo.appendChild(appendFaceThumb("osaka"));
		objTo.appendChild(appendFaceThumb("kukuku"));
		objTo.appendChild(appendFaceThumb("toohappy"));
		objTo.appendChild(appendFaceThumb("chitoge-smile"));
		objTo.appendChild(appendFaceThumb("kininarimasu"));
		objTo.appendChild(appendFaceThumb("kotori"));
		objTo.appendChild(appendFaceThumb("kyon-facepalm"));
		objTo.appendChild(appendFaceThumb("araragi-1"));
		objTo.appendChild(appendFaceThumb("araragi-2"));
		objTo.appendChild(appendFaceThumb("blank-stare"));
		objTo.appendChild(appendFaceThumb("chaika-smile"));
		objTo.appendChild(appendFaceThumb("chitoge-pissed"));
		objTo.appendChild(appendFaceThumb("deadpan"));
		objTo.appendChild(appendFaceThumb("exuberant-shu"));
		objTo.appendChild(appendFaceThumb("dead-eyed-stare"));
		objTo.appendChild(appendFaceThumb("gamagori-hnng"));
		objTo.appendChild(appendFaceThumb("glasses-push"));
		objTo.appendChild(appendFaceThumb("head-tilt"));
		objTo.appendChild(appendFaceThumb("jiii"));
		objTo.appendChild(appendFaceThumb("manly-tears"));
		objTo.appendChild(appendFaceThumb("not-raining"));
		objTo.appendChild(appendFaceThumb("ohmygod"));
		objTo.appendChild(appendFaceThumb("shock"));
		objTo.appendChild(appendFaceThumb("heart-thumbs-up"));
		objTo.appendChild(appendFaceThumb("worried"));
		objTo.appendChild(appendFaceThumb("wow-really"));
		objTo.appendChild(appendFaceThumb("bot-chan"));
		objTo.appendChild(appendFaceThumb("urbansmile"));
		objTo.appendChild(appendFaceThumb("anko"));
		objTo.appendChild(appendFaceThumb("hyoukawink"));
		objTo.appendChild(appendFaceThumb("excitedyui"));
		objTo.appendChild(appendFaceThumb("banjo"));
		objTo.appendChild(appendFaceThumb("peasants"));
		objTo.appendChild(appendFaceThumb("nuilaugh"));
		objTo.appendChild(appendFaceThumb("badassmugi"));
		objTo.appendChild(appendFaceThumb("banjoisahellofadrug"));
		objTo.appendChild(appendFaceThumb("bearhug"));
		objTo.appendChild(appendFaceThumb("bearwithme"));
		objTo.appendChild(appendFaceThumb("biribiricat"));
		objTo.appendChild(appendFaceThumb("bishoujo"));
		objTo.appendChild(appendFaceThumb("bunnyisla"));
		objTo.appendChild(appendFaceThumb("csikon"));
		objTo.appendChild(appendFaceThumb("elsieqq"));
		objTo.appendChild(appendFaceThumb("eririmad"));
		objTo.appendChild(appendFaceThumb("haruhiisnotamused"));
		objTo.appendChild(appendFaceThumb("hinakonom"));
		objTo.appendChild(appendFaceThumb("hisokaclown"));
		objTo.appendChild(appendFaceThumb("definitelynotamused"));
		objTo.appendChild(appendFaceThumb("disgustedmichiru"));
		objTo.appendChild(appendFaceThumb("hanasakueurgh"));
		objTo.appendChild(appendFaceThumb("icanteven"));
		objTo.appendChild(appendFaceThumb("jibrilaww"));
		objTo.appendChild(appendFaceThumb("jibrilfetish"));
		objTo.appendChild(appendFaceThumb("jojosafari"));
		objTo.appendChild(appendFaceThumb("katoupls"));
		objTo.appendChild(appendFaceThumb("manlyschoolgirls"));
		objTo.appendChild(appendFaceThumb("massivecontempt"));
		objTo.appendChild(appendFaceThumb("mechablush"));
		objTo.appendChild(appendFaceThumb("miiahiss"));
		objTo.appendChild(appendFaceThumb("miiaembarassed"));
		objTo.appendChild(appendFaceThumb("miiatears"));
		objTo.appendChild(appendFaceThumb("misakiteehee"));
		objTo.appendChild(appendFaceThumb("misakiwink"));
		objTo.appendChild(appendFaceThumb("nononkek"));
		objTo.appendChild(appendFaceThumb("nozakishock"));
		objTo.appendChild(appendFaceThumb("ohgodwhathaveidone"));
		objTo.appendChild(appendFaceThumb("pissedmiia"));
		objTo.appendChild(appendFaceThumb("pissedtoge"));
		objTo.appendChild(appendFaceThumb("saltymichiru"));
		objTo.appendChild(appendFaceThumb("shocklulushock"));
		objTo.appendChild(appendFaceThumb("smugpoint"));
		objTo.appendChild(appendFaceThumb("smugshinobu"));
		objTo.appendChild(appendFaceThumb("sparklyisla"));
		objTo.appendChild(appendFaceThumb("SPORTS"));
		objTo.appendChild(appendFaceThumb("stunnedryou"));
		objTo.appendChild(appendFaceThumb("takeoeyesparkle"));
		objTo.appendChild(appendFaceThumb("takeofiredup"));
		objTo.appendChild(appendFaceThumb("takeoniceubodi"));
		objTo.appendChild(appendFaceThumb("takeostubtoe"));
		objTo.appendChild(appendFaceThumb("typicalyuuko"));
		objTo.appendChild(appendFaceThumb("vampirickirin"));
		objTo.appendChild(appendFaceThumb("wankoface"));
		objTo.appendChild(appendFaceThumb("whowouldathunkit"));
		objTo.appendChild(appendFaceThumb("yamadashock"));
		objTo.appendChild(appendFaceThumb("yandereyuno"));
		objTo.appendChild(appendFaceThumb("orly"));
		objTo.appendChild(appendFaceThumb("cup2"));
		objTo.appendChild(appendFaceThumb("annoyedkirito"));
		objTo.appendChild(appendFaceThumb("bestiathumbsup"));
		objTo.appendChild(appendFaceThumb("flclawe"));
		objTo.appendChild(appendFaceThumb("crazedlaugh"));
		objTo.appendChild(appendFaceThumb("cup1"));
		objTo.appendChild(appendFaceThumb("sunglasses"));
		objTo.appendChild(appendFaceThumb("eririmadblush"));
		objTo.appendChild(appendFaceThumb("eriripout"));
		objTo.appendChild(appendFaceThumb("flclgrit"));
		objTo.appendChild(appendFaceThumb("gintamashock"));
		objTo.appendChild(appendFaceThumb("gintamaspillage"));
		objTo.appendChild(appendFaceThumb("hunchedover"));
		objTo.appendChild(appendFaceThumb("hypeoverload"));
		objTo.appendChild(appendFaceThumb("infernocopu"));
		objTo.appendChild(appendFaceThumb("kaorihappy"));
		objTo.appendChild(appendFaceThumb("michirutilt"));
		objTo.appendChild(appendFaceThumb("momjitonguepoke"));
		objTo.appendChild(appendFaceThumb("niatilt"));
		objTo.appendChild(appendFaceThumb("nosepick"));
		objTo.appendChild(appendFaceThumb("selfishbestia"));
		objTo.appendChild(appendFaceThumb("takeotears"));
		objTo.appendChild(appendFaceThumb("uwannadie"));
		objTo.appendChild(appendFaceThumb("yuyuyudisapprove"));
		objTo.appendChild(appendFaceThumb("mug1"));
		objTo.appendChild(appendFaceThumb("mug3"));
		objTo.appendChild(appendFaceThumb("evenhappierdera"));
		objTo.appendChild(appendFaceThumb("abashedbestia"));
		objTo.appendChild(appendFaceThumb("akyuusqueel"));
		objTo.appendChild(appendFaceThumb("amagamiplayfulbite"));
		objTo.appendChild(appendFaceThumb("arakawascream"));
		objTo.appendChild(appendFaceThumb("asunanotamused"));
		objTo.appendChild(appendFaceThumb("bakaa"));
		objTo.appendChild(appendFaceThumb("barakamonnotcool"));
		objTo.appendChild(appendFaceThumb("bestiablehh"));
		objTo.appendChild(appendFaceThumb("bestiacheckyourprivilage"));
		objTo.appendChild(appendFaceThumb("charlming"));
		objTo.appendChild(appendFaceThumb("charlpumped"));
		objTo.appendChild(appendFaceThumb("charlstunned"));
		objTo.appendChild(appendFaceThumb("chiyomad"));
		objTo.appendChild(appendFaceThumb("comewithmeifyouwanttobebestgirl"));
		objTo.appendChild(appendFaceThumb("containrage"));
		objTo.appendChild(appendFaceThumb("crazyhatgirl"));
		objTo.appendChild(appendFaceThumb("crazyhatgirlexcited"));
		objTo.appendChild(appendFaceThumb("disbelief"));
		objTo.appendChild(appendFaceThumb("dontdometh"));
		objTo.appendChild(appendFaceThumb("duckhue"));
		objTo.appendChild(appendFaceThumb("embarassedisla"));
		objTo.appendChild(appendFaceThumb("eriribathblush"));
		objTo.appendChild(appendFaceThumb("erirismile"));
		objTo.appendChild(appendFaceThumb("eririwot"));
		objTo.appendChild(appendFaceThumb("erunahuh"));
		objTo.appendChild(appendFaceThumb("etotamadunno"));
		objTo.appendChild(appendFaceThumb("eyebleed"));
		objTo.appendChild(appendFaceThumb("flclcatface"));
		objTo.appendChild(appendFaceThumb("ginkoehh"));
		objTo.appendChild(appendFaceThumb("gintamacrushed"));
		objTo.appendChild(appendFaceThumb("gintamadead"));
		objTo.appendChild(appendFaceThumb("gintamaghost"));
		objTo.appendChild(appendFaceThumb("gintamaphoneshock"));
		objTo.appendChild(appendFaceThumb("gintamasunlight"));
		objTo.appendChild(appendFaceThumb("gintamathispleasesme"));
		objTo.appendChild(appendFaceThumb("happycharl"));
		objTo.appendChild(appendFaceThumb("happypoi"));
		objTo.appendChild(appendFaceThumb("insolentkek"));
		objTo.appendChild(appendFaceThumb("islaforcedsmile"));
		objTo.appendChild(appendFaceThumb("izananotthisshitagain"));
		objTo.appendChild(appendFaceThumb("josephcrying"));
		objTo.appendChild(appendFaceThumb("katoupout"));
		objTo.appendChild(appendFaceThumb("katoutilt"));
		objTo.appendChild(appendFaceThumb("nocomment"));
		objTo.appendChild(appendFaceThumb("kumikouninterested"));
		objTo.appendChild(appendFaceThumb("kurousagitears"));
		objTo.appendChild(appendFaceThumb("kyonfacepalm"));
		objTo.appendChild(appendFaceThumb("maidshock"));
		objTo.appendChild(appendFaceThumb("mariawut"));
		objTo.appendChild(appendFaceThumb("marikalewd"));
		objTo.appendChild(appendFaceThumb("masaodidnothingwrong"));
		objTo.appendChild(appendFaceThumb("mekakucitytaunt"));
		objTo.appendChild(appendFaceThumb("michiruyeahk"));
		objTo.appendChild(appendFaceThumb("mug2"));
		objTo.appendChild(appendFaceThumb("nichijouqq"));
		objTo.appendChild(appendFaceThumb("pissedinaba"));
		objTo.appendChild(appendFaceThumb("pissedkaiji"));
		objTo.appendChild(appendFaceThumb("psychoshock"));
		objTo.appendChild(appendFaceThumb("racoonwot"));
		objTo.appendChild(appendFaceThumb("reinastunned"));
		objTo.appendChild(appendFaceThumb("rengehype"));
		objTo.appendChild(appendFaceThumb("rickastatic"));
		objTo.appendChild(appendFaceThumb("sayhwatagain"));
		objTo.appendChild(appendFaceThumb("scaredmio"));
		objTo.appendChild(appendFaceThumb("scarycharl"));
		objTo.appendChild(appendFaceThumb("sheerdisgust"));
		objTo.appendChild(appendFaceThumb("smugflowers"));
		objTo.appendChild(appendFaceThumb("smugillya"));
		objTo.appendChild(appendFaceThumb("smuglancer"));
		objTo.appendChild(appendFaceThumb("smugshinoa"));
		objTo.appendChild(appendFaceThumb("soumadisdain"));
		objTo.appendChild(appendFaceThumb("stonedzack"));
		objTo.appendChild(appendFaceThumb("surprisedandimpressed"));
		objTo.appendChild(appendFaceThumb("surprisedwot"));
		objTo.appendChild(appendFaceThumb("takeolightning"));
		objTo.appendChild(appendFaceThumb("takeowut"));
		objTo.appendChild(appendFaceThumb("thoughtful"));
		objTo.appendChild(appendFaceThumb("tougouwotmagic"));
		objTo.appendChild(appendFaceThumb("traumatiseddog"));
		objTo.appendChild(appendFaceThumb("trollarcher"));
		objTo.appendChild(appendFaceThumb("uglycry"));
		objTo.appendChild(appendFaceThumb("umiface"));
		objTo.appendChild(appendFaceThumb("utahagottrolled"));
		objTo.appendChild(appendFaceThumb("vashheadscratch"));
		objTo.appendChild(appendFaceThumb("WRYYY"));
		objTo.appendChild(appendFaceThumb("yuitriggered"));
		objTo.appendChild(appendFaceThumb("yuyuyukek"));
		objTo.appendChild(appendFaceThumb("yuruyuriapprove"));
		objTo.appendChild(appendFaceThumb("happydera"));
		objTo.appendChild(appendFaceThumb("holdme"));
		objTo.appendChild(appendFaceThumb("misakaheh"));
		objTo.appendChild(appendFaceThumb("ohnoudidnt"));
		objTo.appendChild(appendFaceThumb("onoderahi"));
		objTo.appendChild(appendFaceThumb("onoderastartled"));
		objTo.appendChild(appendFaceThumb("onoderasupriseblush"));
		objTo.appendChild(appendFaceThumb("teehee"));
		objTo.appendChild(appendFaceThumb("tiredfate"));
		objTo.appendChild(appendFaceThumb("breakingnews"));
		objTo.appendChild(appendFaceThumb("brofist"));
		objTo.appendChild(appendFaceThumb("cokemasterrace"));
		objTo.appendChild(appendFaceThumb("curious"));
		objTo.appendChild(appendFaceThumb("dealwithit"));
		objTo.appendChild(appendFaceThumb("evilgrin"));
		objTo.appendChild(appendFaceThumb("fedup"));
		objTo.appendChild(appendFaceThumb("flattered"));
		objTo.appendChild(appendFaceThumb("flyingbunsofdoom"));
		objTo.appendChild(appendFaceThumb("forgotkeys"));
		objTo.appendChild(appendFaceThumb("garlock"));
		objTo.appendChild(appendFaceThumb("giveuponlife"));
		objTo.appendChild(appendFaceThumb("helmetbro"));
		objTo.appendChild(appendFaceThumb("idoruwinkdesu"));
		objTo.appendChild(appendFaceThumb("justno"));
		objTo.appendChild(appendFaceThumb("missedthepoint"));
		objTo.appendChild(appendFaceThumb("deranosebleed"));
		objTo.appendChild(appendFaceThumb("notalolicon"));
		objTo.appendChild(appendFaceThumb("nuidideverythingright"));
		objTo.appendChild(appendFaceThumb("plz"));
		objTo.appendChild(appendFaceThumb("rerorero"));
		objTo.appendChild(appendFaceThumb("scrumptiouslymoe"));
		objTo.appendChild(appendFaceThumb("slapbet"));
		objTo.appendChild(appendFaceThumb("prelenny"));
		objTo.appendChild(appendFaceThumb("dekotableflip"));
		objTo.appendChild(appendFaceThumb("volibearQ"));
		objTo.appendChild(appendFaceThumb("mywaifumadeyouasandwich"));
		objTo.appendChild(appendFaceThumb("slightoverreaction"));
		objTo.appendChild(appendFaceThumb("torrentialdownpour"));
		objTo.appendChild(appendFaceThumb("watchadoin"));
	}
	else if (subreddit == "kemonomimi") {
		faceIdChar = "#";
		wikiLink.href = "http://www.reddit.com/r/kemonomimi/wiki/commentfaces";
		thumbDialWidth = "180px";
		thumbDialHeight = "160px";
		bbCodeFunction = function(bbFace, bbTitle){
			if (bbTitle == "") {
				return "[](#" + bbFace + ")";
			} else {
				return "[](#" + bbFace + " \"" + bbTitle + "\")";
			}
		};
		objTo.appendChild(appendFaceThumb("catsmile"));
		objTo.appendChild(appendFaceThumb("cry"));
		objTo.appendChild(appendFaceThumb("embarrassed"));
		objTo.appendChild(appendFaceThumb("yes!"));
		objTo.appendChild(appendFaceThumb("grin"));
		objTo.appendChild(appendFaceThumb("content"));
		objTo.appendChild(appendFaceThumb("blush"));
		objTo.appendChild(appendFaceThumb("bored"));
		objTo.appendChild(appendFaceThumb("happy"));
		objTo.appendChild(appendFaceThumb("nyaa"));
		objTo.appendChild(appendFaceThumb("notpleased"));
		objTo.appendChild(appendFaceThumb("pleased"));
		objTo.appendChild(appendFaceThumb("ohmy"));
		objTo.appendChild(appendFaceThumb("excited"));
		objTo.appendChild(appendFaceThumb("sunglasses"));
		objTo.appendChild(appendFaceThumb("surprised"));
		objTo.appendChild(appendFaceThumb("dontstare"));
		objTo.appendChild(appendFaceThumb("waaa"));
		objTo.appendChild(appendFaceThumb("deredere"));
		objTo.appendChild(appendFaceThumb("blushing"));
		objTo.appendChild(appendFaceThumb("smile"));
		objTo.appendChild(appendFaceThumb("nosebleed"));
		objTo.appendChild(appendFaceThumb("nuu"));
		objTo.appendChild(appendFaceThumb("sleepy"));
		objTo.appendChild(appendFaceThumb("pout"));
		objTo.appendChild(appendFaceThumb("poke"));
		objTo.appendChild(appendFaceThumb("lick"));
		objTo.appendChild(appendFaceThumb("pet"));
		objTo.appendChild(appendFaceThumb("headpat"));
		objTo.appendChild(appendFaceThumb("giggle"));
		objTo.appendChild(appendFaceThumb("chuu"));
		objTo.appendChild(appendFaceThumb("frustrated"));
		objTo.appendChild(appendFaceThumb("glassespush"));
	}
	else if (subreddit == "visualnovels") {
		faceIdChar = "#";
		wikiLink.href = "http://www.reddit.com/r/visualnovels/wiki/commentfaces";
		thumbDialWidth = "150px";
		thumbDialHeight = "110px";
		bbCodeFunction = function(bbFace, bbTitle){
			if (bbTitle == "") {
				return "[](#" + bbFace + ")";
			} else {
				return "[](#" + bbFace + " \"" + bbTitle + "\")";
			}
		};
		objTo.appendChild(appendFaceThumb("ballin"));
		objTo.appendChild(appendFaceThumb("hnng"));
		objTo.appendChild(appendFaceThumb("lewd"));
		objTo.appendChild(appendFaceThumb("omnom"));
		objTo.appendChild(appendFaceThumb("oniichan"));
		objTo.appendChild(appendFaceThumb("somad"));
		objTo.appendChild(appendFaceThumb("trollin"));
		objTo.appendChild(appendFaceThumb("uguu"));
		objTo.appendChild(appendFaceThumb("WAHAHAHA"));
		objTo.appendChild(appendFaceThumb("yandere"));
	}
	else if (subreddit == "supersonico") {
		faceIdChar = "#";
		wikiLink.href = "http://www.reddit.com/r/SuperSonico/wiki/commentfaces";
		thumbDialWidth = "140px";
		thumbDialHeight = "140px";
		bbCodeFunction = function(bbFace, bbTitle){
			if (bbTitle == "") {
				return "[](#" + bbFace + ")";
			} else {
				return "[](#" + bbFace + " \"" + bbTitle + "\")";
			}
		};
		objTo.appendChild(appendFaceThumb("happy"));
		objTo.appendChild(appendFaceThumb("kungfu"));
		objTo.appendChild(appendFaceThumb("nekomimi"));
		objTo.appendChild(appendFaceThumb("fancywink"));
		objTo.appendChild(appendFaceThumb("blush"));
		objTo.appendChild(appendFaceThumb("wink"));
		objTo.appendChild(appendFaceThumb("sleepy"));
		objTo.appendChild(appendFaceThumb("nom"));
		objTo.appendChild(appendFaceThumb("huh"));
		objTo.appendChild(appendFaceThumb("hmm"));
		objTo.appendChild(appendFaceThumb("drool"));
		objTo.appendChild(appendFaceThumb("wat"));
		objTo.appendChild(appendFaceThumb("excited"));
		objTo.appendChild(appendFaceThumb("suzuhappy"));
		objTo.appendChild(appendFaceThumb("angry"));
		objTo.appendChild(appendFaceThumb("smirk"));
		objTo.appendChild(appendFaceThumb("manager"));
		objTo.appendChild(appendFaceThumb("blush_1"));
		objTo.appendChild(appendFaceThumb("exhausted"));
		objTo.appendChild(appendFaceThumb("blush_2"));
		objTo.appendChild(appendFaceThumb("blush_3"));
		objTo.appendChild(appendFaceThumb("blush_4"));
		objTo.appendChild(appendFaceThumb("blush_5"));
		objTo.appendChild(appendFaceThumb("blush_6"));
		objTo.appendChild(appendFaceThumb("blush_7"));
		objTo.appendChild(appendFaceThumb("yes"));
		objTo.appendChild(appendFaceThumb("blush_8"));
		objTo.appendChild(appendFaceThumb("blush_9"));
		objTo.appendChild(appendFaceThumb("blush_10"));
		objTo.appendChild(appendFaceThumb("tihi"));
		objTo.appendChild(appendFaceThumb("worried"));
		objTo.appendChild(appendFaceThumb("smile"));
		objTo.appendChild(appendFaceThumb("car"));
		objTo.appendChild(appendFaceThumb("cheese"));
		objTo.appendChild(appendFaceThumb("blush_11"));
		objTo.appendChild(appendFaceThumb("blush_12"));
		objTo.appendChild(appendFaceThumb("surprise"));
		objTo.appendChild(appendFaceThumb("give"));
		objTo.appendChild(appendFaceThumb("really"));
		objTo.appendChild(appendFaceThumb("sleep"));
		objTo.appendChild(appendFaceThumb("alarm_cats"));
		objTo.appendChild(appendFaceThumb("cats"));
		objTo.appendChild(appendFaceThumb("cheer"));
		objTo.appendChild(appendFaceThumb("drowzy"));
		objTo.appendChild(appendFaceThumb("megane"));
		objTo.appendChild(appendFaceThumb("lurk"));
		objTo.appendChild(appendFaceThumb("what"));
		objTo.appendChild(appendFaceThumb("peek"));
		objTo.appendChild(appendFaceThumb("lurk_shock"));
		objTo.appendChild(appendFaceThumb("shock"));
		objTo.appendChild(appendFaceThumb("blush_13"));
		objTo.appendChild(appendFaceThumb("blush_14"));
		objTo.appendChild(appendFaceThumb("blush_15"));
		objTo.appendChild(appendFaceThumb("blush_16"));
		objTo.appendChild(appendFaceThumb("cheerful"));
		objTo.appendChild(appendFaceThumb("ohh"));
		objTo.appendChild(appendFaceThumb("peace"));
		objTo.appendChild(appendFaceThumb("clap"));
		objTo.appendChild(appendFaceThumb("scared"));
		objTo.appendChild(appendFaceThumb("drown"));
		objTo.appendChild(appendFaceThumb("zombie"));
		objTo.appendChild(appendFaceThumb("camera"));
		objTo.appendChild(appendFaceThumb("oldman"));
		objTo.appendChild(appendFaceThumb("oldman2"));
		objTo.appendChild(appendFaceThumb("f_scared"));
		objTo.appendChild(appendFaceThumb("f_okashi"));
		objTo.appendChild(appendFaceThumb("f_smile"));
		objTo.appendChild(appendFaceThumb("f_hug"));
		objTo.appendChild(appendFaceThumb("f_surprise"));
		objTo.appendChild(appendFaceThumb("f_peek"));
		objTo.appendChild(appendFaceThumb("f_drool"));
		objTo.appendChild(appendFaceThumb("f_grin"));
		objTo.appendChild(appendFaceThumb("f_excited"));
		objTo.appendChild(appendFaceThumb("f_peace"));
		objTo.appendChild(appendFaceThumb("f_clap"));
		objTo.appendChild(appendFaceThumb("f_cry"));
		objTo.appendChild(appendFaceThumb("f_pocky"));
		objTo.appendChild(appendFaceThumb("f_huh"));
		objTo.appendChild(appendFaceThumb("f_drown"));
		objTo.appendChild(appendFaceThumb("k_grin"));
		objTo.appendChild(appendFaceThumb("lewd"));
		objTo.appendChild(appendFaceThumb("k_mad"));
		objTo.appendChild(appendFaceThumb("k_cool"));
		objTo.appendChild(appendFaceThumb("g_wasabi"));
		objTo.appendChild(appendFaceThumb("g_cats"));
		objTo.appendChild(appendFaceThumb("o_what"));
		objTo.appendChild(appendFaceThumb("o_really"));
		objTo.appendChild(appendFaceThumb("o_chuu2"));
		objTo.appendChild(appendFaceThumb("o_tired"));
		objTo.appendChild(appendFaceThumb("o_smile"));
		objTo.appendChild(appendFaceThumb("o_sparkle"));
		objTo.appendChild(appendFaceThumb("o_tada"));
		objTo.appendChild(appendFaceThumb("o_small"));
		objTo.appendChild(appendFaceThumb("senpai2"));
		objTo.appendChild(appendFaceThumb("senpai3"));
		objTo.appendChild(appendFaceThumb("s_hmm"));
		objTo.appendChild(appendFaceThumb("s_kick"));
		objTo.appendChild(appendFaceThumb("s_ponder"));
		objTo.appendChild(appendFaceThumb("s_grin"));
		objTo.appendChild(appendFaceThumb("s_heh"));
		objTo.appendChild(appendFaceThumb("s_really"));
		objTo.appendChild(appendFaceThumb("s_no"));
		objTo.appendChild(appendFaceThumb("s_cross"));
		objTo.appendChild(appendFaceThumb("s_wink"));
		objTo.appendChild(appendFaceThumb("s_shock"));
		objTo.appendChild(appendFaceThumb("s_eh"));
		objTo.appendChild(appendFaceThumb("s_what"));
		objTo.appendChild(appendFaceThumb("s_drown"));
	}
	else if (subreddit == "kanmusu") {
		faceIdChar = "#";
		wikiLink.href = "http://www.reddit.com/r/kanmusu/wiki/commentfaces";
		thumbDialWidth = "180px";
		thumbDialHeight = "180px";
		bbCodeFunction = function(bbFace, bbTitle){
			if (bbFace == "source" || bbFace == "album" || bbFace == "sourcensfw" || bbFace == "albumnsfw" || bbFace == "BBSource" || bbFace == "BBAlbum" || bbFace == "BBNSFW" || bbFace == "BBNSFWAlbum" || bbFace == "CASource" || bbFace == "CAAlbum" || bbFace == "CANSFW" || bbFace == "CANSFWAlbum" || bbFace == "CLSource" || bbFace == "CLAlbum" || bbFace == "CLNSFW" || bbFace == "CLNSFWAlbum" || bbFace == "CVSource" || bbFace == "CVAlbum" || bbFace == "CVNSFW" || bbFace == "CVNSFWAlbum" || bbFace == "DDSource" || bbFace == "DDAlbum" || bbFace == "DDNSFW" || bbFace == "DDNSFWAlbum" || bbFace == "AVSource" || bbFace == "AVAlbum" || bbFace == "AVNSFW" || bbFace == "AVNSFWAlbum" || bbFace == "SSSource" || bbFace == "SSAlbum" || bbFace == "SSNSFW" || bbFace == "SSNSFWAlbum" || bbFace == "OtherSource" || bbFace == "OtherAlbum" || bbFace == "OtherNSFW" || bbFace == "OtherNSFWAlbum") {
				return "[Source](" + bbTitle + "#" + bbFace + ")";
			}
			else {
				if (bbTitle == "") {
					return "[](#" + bbFace + ")";
				} else {
					return "[](#" + bbFace + " \"" + bbTitle + "\")";
				}
			}
		};
		objTo.appendChild(appendFaceThumb("happy"));
		objTo.appendChild(appendFaceThumb("shock"));
		objTo.appendChild(appendFaceThumb("yosh"));
		objTo.appendChild(appendFaceThumb("facepalm"));
		objTo.appendChild(appendFaceThumb("wat"));
		objTo.appendChild(appendFaceThumb("itai"));
		objTo.appendChild(appendFaceThumb("smug"));
		objTo.appendChild(appendFaceThumb("yes"));
		objTo.appendChild(appendFaceThumb("naka"));
		objTo.appendChild(appendFaceThumb("upgrade"));
		objTo.appendChild(appendFaceThumb("megane"));
		objTo.appendChild(appendFaceThumb("wink"));
		objTo.appendChild(appendFaceThumb("kongou"));
		objTo.appendChild(appendFaceThumb("damage"));
		objTo.appendChild(appendFaceThumb("tears"));
		objTo.appendChild(appendFaceThumb("nooo"));
		objTo.appendChild(appendFaceThumb("oh"));
		objTo.appendChild(appendFaceThumb("ah"));
		objTo.appendChild(appendFaceThumb("smile"));
		objTo.appendChild(appendFaceThumb("pyon"));
		objTo.appendChild(appendFaceThumb("uwaa"));
		objTo.appendChild(appendFaceThumb("sad"));
		objTo.appendChild(appendFaceThumb("blush"));
		objTo.appendChild(appendFaceThumb("found"));
		objTo.appendChild(appendFaceThumb("laugh"));
		objTo.appendChild(appendFaceThumb("hontou"));
		objTo.appendChild(appendFaceThumb("hmmm"));
		objTo.appendChild(appendFaceThumb("pleased"));
		objTo.appendChild(appendFaceThumb("why"));
		objTo.appendChild(appendFaceThumb("contented"));
		objTo.appendChild(appendFaceThumb("bii"));
		objTo.appendChild(appendFaceThumb("huh"));
		objTo.appendChild(appendFaceThumb("evil"));
		objTo.appendChild(appendFaceThumb("thoughtful"));
		objTo.appendChild(appendFaceThumb("ohhh"));
		objTo.appendChild(appendFaceThumb("eh"));
		objTo.appendChild(appendFaceThumb("renblush"));
		objTo.appendChild(appendFaceThumb("relax"));
		objTo.appendChild(appendFaceThumb("wistful"));
		objTo.appendChild(appendFaceThumb("renshock"));
		objTo.appendChild(appendFaceThumb("rencontent"));
		objTo.appendChild(appendFaceThumb("renchan"));
		objTo.appendChild(appendFaceThumb("pain"));
		objTo.appendChild(appendFaceThumb("smirk"));
		objTo.appendChild(appendFaceThumb("raburabu"));
		objTo.appendChild(appendFaceThumb("kunsad"));
		objTo.appendChild(appendFaceThumb("tear"));
		objTo.appendChild(appendFaceThumb("renkun"));
		objTo.appendChild(appendFaceThumb("akagi"));
		objTo.appendChild(appendFaceThumb("fire"));
		objTo.appendChild(appendFaceThumb("excited"));
		objTo.appendChild(appendFaceThumb("akatsuki"));
		objTo.appendChild(appendFaceThumb("running"));
		objTo.appendChild(appendFaceThumb("kyun"));
		objTo.appendChild(appendFaceThumb("dancing"));
		objTo.appendChild(appendFaceThumb("cheer"));
		objTo.appendChild(appendFaceThumb("bonk"));
		objTo.appendChild(appendFaceThumb("fall"));
		objTo.appendChild(appendFaceThumb("dance"));
		objTo.appendChild(appendFaceThumb("swing"));
		objTo.appendChild(appendFaceThumb("blink"));
		objTo.appendChild(appendFaceThumb("blink2"));
		//SOURCES
		objTo.appendChild(appendFaceThumb("source"));
		objTo.appendChild(appendFaceThumb("album"));
		objTo.appendChild(appendFaceThumb("sourcensfw"));
		objTo.appendChild(appendFaceThumb("albumnsfw"));
		//SIMPLE SOURCE
		objTo.appendChild(appendFaceThumb("BBSource"));
		objTo.appendChild(appendFaceThumb("CASource"));
		objTo.appendChild(appendFaceThumb("CLSource"));
		objTo.appendChild(appendFaceThumb("CVSource"));
		objTo.appendChild(appendFaceThumb("DDSource"));
		objTo.appendChild(appendFaceThumb("AVSource"));
		objTo.appendChild(appendFaceThumb("SSSource"));
		objTo.appendChild(appendFaceThumb("OtherSource"));
		//ALBUM SOURCE
		objTo.appendChild(appendFaceThumb("BBAlbum"));
		objTo.appendChild(appendFaceThumb("CAAlbum"));
		objTo.appendChild(appendFaceThumb("CLAlbum"));
		objTo.appendChild(appendFaceThumb("CVAlbum"));
		objTo.appendChild(appendFaceThumb("DDAlbum"));
		objTo.appendChild(appendFaceThumb("AVAlbum"));
		objTo.appendChild(appendFaceThumb("SSAlbum"));
		objTo.appendChild(appendFaceThumb("OtherAlbum"));
		//NSFW SOURCE
		objTo.appendChild(appendFaceThumb("BBNSFW"));
		objTo.appendChild(appendFaceThumb("CANSFW"));
		objTo.appendChild(appendFaceThumb("CLNSFW"));
		objTo.appendChild(appendFaceThumb("CVNSFW"));
		objTo.appendChild(appendFaceThumb("DDNSFW"));
		objTo.appendChild(appendFaceThumb("AVNSFW"));
		objTo.appendChild(appendFaceThumb("SSNSFW"));
		objTo.appendChild(appendFaceThumb("OtherNSFW"));
		//NSFW ALBUM
		objTo.appendChild(appendFaceThumb("BBNSFWAlbum"));
		objTo.appendChild(appendFaceThumb("CANSFWAlbum"));
		objTo.appendChild(appendFaceThumb("CLNSFWAlbum"));
		objTo.appendChild(appendFaceThumb("CVNSFWAlbum"));
		objTo.appendChild(appendFaceThumb("DDNSFWAlbum"));
		objTo.appendChild(appendFaceThumb("AVNSFWAlbum"));
		objTo.appendChild(appendFaceThumb("SSNSFWAlbum"));
		objTo.appendChild(appendFaceThumb("OtherNSFWAlbum"));
	}
	else if (subreddit == "kanmusunights") {
		faceIdChar = "#";
		wikiLink.href = "http://www.reddit.com/r/kanmusu/wiki/commentfaces";
		thumbDialWidth = "180px";
		thumbDialHeight = "180px";
		bbCodeFunction = function(bbFace, bbTitle){
			if (bbFace == "source" || bbFace == "album" || bbFace == "sourcensfw" || bbFace == "albumnsfw" || bbFace == "BBSource" || bbFace == "BBAlbum" || bbFace == "BBNSFW" || bbFace == "BBNSFWAlbum" || bbFace == "CASource" || bbFace == "CAAlbum" || bbFace == "CANSFW" || bbFace == "CANSFWAlbum" || bbFace == "CLSource" || bbFace == "CLAlbum" || bbFace == "CLNSFW" || bbFace == "CLNSFWAlbum" || bbFace == "CVSource" || bbFace == "CVAlbum" || bbFace == "CVNSFW" || bbFace == "CVNSFWAlbum" || bbFace == "DDSource" || bbFace == "DDAlbum" || bbFace == "DDNSFW" || bbFace == "DDNSFWAlbum" || bbFace == "AVSource" || bbFace == "AVAlbum" || bbFace == "AVNSFW" || bbFace == "AVNSFWAlbum" || bbFace == "SSSource" || bbFace == "SSAlbum" || bbFace == "SSNSFW" || bbFace == "SSNSFWAlbum" || bbFace == "OtherSource" || bbFace == "OtherAlbum" || bbFace == "OtherNSFW" || bbFace == "OtherNSFWAlbum") {
				return "[Source](" + bbTitle + "#" + bbFace + ")";
			}
			else {
				if (bbTitle == "") {
					return "[](#" + bbFace + ")";
				} else {
					return "[](#" + bbFace + " \"" + bbTitle + "\")";
				}
			}
		};
		objTo.appendChild(appendFaceThumb("happy"));
		objTo.appendChild(appendFaceThumb("shock"));
		objTo.appendChild(appendFaceThumb("yosh"));
		objTo.appendChild(appendFaceThumb("facepalm"));
		objTo.appendChild(appendFaceThumb("wat"));
		objTo.appendChild(appendFaceThumb("itai"));
		objTo.appendChild(appendFaceThumb("smug"));
		objTo.appendChild(appendFaceThumb("yes"));
		objTo.appendChild(appendFaceThumb("naka"));
		objTo.appendChild(appendFaceThumb("upgrade"));
		objTo.appendChild(appendFaceThumb("megane"));
		objTo.appendChild(appendFaceThumb("wink"));
		objTo.appendChild(appendFaceThumb("kongou"));
		objTo.appendChild(appendFaceThumb("damage"));
		objTo.appendChild(appendFaceThumb("tears"));
		objTo.appendChild(appendFaceThumb("nooo"));
		objTo.appendChild(appendFaceThumb("oh"));
		objTo.appendChild(appendFaceThumb("ah"));
		objTo.appendChild(appendFaceThumb("smile"));
		objTo.appendChild(appendFaceThumb("pyon"));
		objTo.appendChild(appendFaceThumb("uwaa"));
		objTo.appendChild(appendFaceThumb("sad"));
		objTo.appendChild(appendFaceThumb("blush"));
		objTo.appendChild(appendFaceThumb("found"));
		objTo.appendChild(appendFaceThumb("laugh"));
		objTo.appendChild(appendFaceThumb("hontou"));
		objTo.appendChild(appendFaceThumb("hmmm"));
		objTo.appendChild(appendFaceThumb("pleased"));
		objTo.appendChild(appendFaceThumb("why"));
		objTo.appendChild(appendFaceThumb("contented"));
		objTo.appendChild(appendFaceThumb("bii"));
		objTo.appendChild(appendFaceThumb("huh"));
		objTo.appendChild(appendFaceThumb("evil"));
		objTo.appendChild(appendFaceThumb("thoughtful"));
		objTo.appendChild(appendFaceThumb("ohhh"));
		objTo.appendChild(appendFaceThumb("eh"));
		objTo.appendChild(appendFaceThumb("renblush"));
		objTo.appendChild(appendFaceThumb("relax"));
		objTo.appendChild(appendFaceThumb("wistful"));
		objTo.appendChild(appendFaceThumb("renshock"));
		objTo.appendChild(appendFaceThumb("rencontent"));
		objTo.appendChild(appendFaceThumb("renchan"));
		objTo.appendChild(appendFaceThumb("pain"));
		objTo.appendChild(appendFaceThumb("smirk"));
		objTo.appendChild(appendFaceThumb("raburabu"));
		objTo.appendChild(appendFaceThumb("kunsad"));
		objTo.appendChild(appendFaceThumb("tear"));
		objTo.appendChild(appendFaceThumb("renkun"));
		objTo.appendChild(appendFaceThumb("akagi"));
		objTo.appendChild(appendFaceThumb("fire"));
		objTo.appendChild(appendFaceThumb("excited"));
		objTo.appendChild(appendFaceThumb("akatsuki"));
		objTo.appendChild(appendFaceThumb("running"));
		objTo.appendChild(appendFaceThumb("kyun"));
		objTo.appendChild(appendFaceThumb("dancing"));
		objTo.appendChild(appendFaceThumb("cheer"));
		objTo.appendChild(appendFaceThumb("bonk"));
		objTo.appendChild(appendFaceThumb("fall"));
		objTo.appendChild(appendFaceThumb("dance"));
		objTo.appendChild(appendFaceThumb("swing"));
		objTo.appendChild(appendFaceThumb("blink"));
		objTo.appendChild(appendFaceThumb("blink2"));
		//SOURCES
		objTo.appendChild(appendFaceThumb("source"));
		objTo.appendChild(appendFaceThumb("album"));
		objTo.appendChild(appendFaceThumb("sourcensfw"));
		objTo.appendChild(appendFaceThumb("albumnsfw"));
				
		//SIMPLE SOURCE
		objTo.appendChild(appendFaceThumb("BBSource"));
		objTo.appendChild(appendFaceThumb("CASource"));
		objTo.appendChild(appendFaceThumb("CLSource"));
		objTo.appendChild(appendFaceThumb("CVSource"));
		objTo.appendChild(appendFaceThumb("DDSource"));
		objTo.appendChild(appendFaceThumb("AVSource"));
		objTo.appendChild(appendFaceThumb("SSSource"));
		objTo.appendChild(appendFaceThumb("OtherSource"));
		//ALBUM SOURCE
		objTo.appendChild(appendFaceThumb("BBAlbum"));
		objTo.appendChild(appendFaceThumb("CAAlbum"));
		objTo.appendChild(appendFaceThumb("CLAlbum"));
		objTo.appendChild(appendFaceThumb("CVAlbum"));
		objTo.appendChild(appendFaceThumb("DDAlbum"));
		objTo.appendChild(appendFaceThumb("AVAlbum"));
		objTo.appendChild(appendFaceThumb("SSAlbum"));
		objTo.appendChild(appendFaceThumb("OtherAlbum"));
		//NSFW SOURCE
		objTo.appendChild(appendFaceThumb("BBNSFW"));
		objTo.appendChild(appendFaceThumb("CANSFW"));
		objTo.appendChild(appendFaceThumb("CLNSFW"));
		objTo.appendChild(appendFaceThumb("CVNSFW"));
		objTo.appendChild(appendFaceThumb("DDNSFW"));
		objTo.appendChild(appendFaceThumb("AVNSFW"));
		objTo.appendChild(appendFaceThumb("SSNSFW"));
		objTo.appendChild(appendFaceThumb("OtherNSFW"));
		//NSFW ALBUM
		objTo.appendChild(appendFaceThumb("BBNSFWAlbum"));
		objTo.appendChild(appendFaceThumb("CANSFWAlbum"));
		objTo.appendChild(appendFaceThumb("CLNSFWAlbum"));
		objTo.appendChild(appendFaceThumb("CVNSFWAlbum"));
		objTo.appendChild(appendFaceThumb("DDNSFWAlbum"));
		objTo.appendChild(appendFaceThumb("AVNSFWAlbum"));
		objTo.appendChild(appendFaceThumb("SSNSFWAlbum"));
		objTo.appendChild(appendFaceThumb("OtherNSFWAlbum"));
	}
	else if (subreddit == "schoolidolfestival") {
		faceIdChar = "#";
		wikiLink.href = "http://www.reddit.com/r/SchoolIdolFestival/wiki/commentfaces";
		thumbDialWidth = "240px";
		thumbDialHeight = "150px";
		bbCodeFunction = function(bbFace, bbTitle){
			if (bbTitle == "") {
				return "[](#" + bbFace + ")";
			} else {
				return "[](#" + bbFace + " \"" + bbTitle + "\")";
			}
		};
		objTo.appendChild(appendFaceThumb("umida"));
		objTo.appendChild(appendFaceThumb("iyada"));
		objTo.appendChild(appendFaceThumb("tsun"));
		objTo.appendChild(appendFaceThumb("headpat"));
		objTo.appendChild(appendFaceThumb("kawaii"));
		objTo.appendChild(appendFaceThumb("rekt"));
		objTo.appendChild(appendFaceThumb("wink"));
		objTo.appendChild(appendFaceThumb("niconi"));
		objTo.appendChild(appendFaceThumb("rinya"));
		objTo.appendChild(appendFaceThumb("nope"));
		objTo.appendChild(appendFaceThumb("baka"));
		objTo.appendChild(appendFaceThumb("haa"));
		objTo.appendChild(appendFaceThumb("flick"));
		objTo.appendChild(appendFaceThumb("nrekt"));
		objTo.appendChild(appendFaceThumb("dere"));
		objTo.appendChild(appendFaceThumb("ikinya"));
		objTo.appendChild(appendFaceThumb("pillow"));
		objTo.appendChild(appendFaceThumb("fine"));
		objTo.appendChild(appendFaceThumb("clap"));
		objTo.appendChild(appendFaceThumb("pengi"));
		objTo.appendChild(appendFaceThumb("waa"));
		objTo.appendChild(appendFaceThumb("huhu"));
	}
		else if (subreddit == "lovelive") {
		faceIdChar = "#";
		wikiLink.href = "http://www.reddit.com/r/LoveLive/wiki/index";
		thumbDialWidth = "190px";
		thumbDialHeight = "115px";
		bbCodeFunction = function(bbFace, bbTitle){
			if (bbTitle == "") {
				return "[](#" + bbFace + ")";
			} else {
				return "[](#" + bbFace + " \"" + bbTitle + "\")";
			}
		};
		objTo.appendChild(appendFaceThumb("harasho"));
		objTo.appendChild(appendFaceThumb("weird"));
		objTo.appendChild(appendFaceThumb("strange"));
		objTo.appendChild(appendFaceThumb("rinwink"));
		objTo.appendChild(appendFaceThumb("predictable"));
		objTo.appendChild(appendFaceThumb("snack"));
		objTo.appendChild(appendFaceThumb("bang"));
		objTo.appendChild(appendFaceThumb("niconii"));
		objTo.appendChild(appendFaceThumb("washi"));
		objTo.appendChild(appendFaceThumb("rice"));
	}
		else if (subreddit == "onetrueidol") {
		faceIdChar = "#";
		wikiLink.href = "http://www.reddit.com/r/LoveLive/wiki/index";
		thumbDialWidth = "260px";
		thumbDialHeight = "155px";
		bbCodeFunction = function(bbFace, bbTitle){
			if (bbTitle == "") {
				return "[](#" + bbFace + ")";
			} else {
				return "[](#" + bbFace + " \"" + bbTitle + "\")";
			}
		};
		objTo.appendChild(appendFaceThumb("makibday"));
		objTo.appendChild(appendFaceThumb("makigif"));
		objTo.appendChild(appendFaceThumb("bang"));
		objTo.appendChild(appendFaceThumb("makilove"));
		objTo.appendChild(appendFaceThumb("makipout"));
	}
		else if (subreddit == "fatestaynight") {
		faceIdChar = "#";
		textBoxNr = 3;
		wikiLink.href = "http://www.reddit.com/r/fatestaynight/comments/2vuwdc/comment_faces_guide_v2/";
		thumbDialWidth = "160px";
		thumbDialHeight = "160px";
		bbCodeFunction = function(bbFace, bbTitle, bbUpper, bbLower){
			var bbHover = "";
			var bbCapt = "";
			if (bbTitle != "") {
				bbHover = " \"" + bbTitle + "\"";
			}
			if (bbLower != "") {
				bbCapt = "**" + bbLower + "**";
			}
			if (bbUpper != "") {
				bbCapt = bbCapt + bbUpper;
			}
			return "[" + bbCapt + "](#" + bbFace + bbHover + ")";
		};
		objTo.appendChild(appendFaceThumb("lmao"));
		objTo.appendChild(appendFaceThumb("fistpump"));
		objTo.appendChild(appendFaceThumb("smirk"));
		objTo.appendChild(appendFaceThumb("skeptical"));
		objTo.appendChild(appendFaceThumb("engarde"));
		objTo.appendChild(appendFaceThumb("armorengarde"));
		objTo.appendChild(appendFaceThumb("hmm"));
		objTo.appendChild(appendFaceThumb("hurt"));
		objTo.appendChild(appendFaceThumb("notamused"));
		objTo.appendChild(appendFaceThumb("angry"));
		objTo.appendChild(appendFaceThumb("bored"));
		objTo.appendChild(appendFaceThumb("roar"));
		objTo.appendChild(appendFaceThumb("raspberry"));
		objTo.appendChild(appendFaceThumb("infodump"));
		objTo.appendChild(appendFaceThumb("senpainoticedme"));
		objTo.appendChild(appendFaceThumb("smile"));
		objTo.appendChild(appendFaceThumb("seriously"));
		objTo.appendChild(appendFaceThumb("crying"));
		objTo.appendChild(appendFaceThumb("rejoice"));
		objTo.appendChild(appendFaceThumb("yorokobe"));
		objTo.appendChild(appendFaceThumb("trouble"));
		objTo.appendChild(appendFaceThumb("tooearly"));
		objTo.appendChild(appendFaceThumb("pleased"));
		objTo.appendChild(appendFaceThumb("lol"));
		objTo.appendChild(appendFaceThumb("scared"));
		objTo.appendChild(appendFaceThumb("facepalm"));
		objTo.appendChild(appendFaceThumb("meanie"));
		objTo.appendChild(appendFaceThumb("shocked"));
		objTo.appendChild(appendFaceThumb("coat"));
		objTo.appendChild(appendFaceThumb("cough"));
		objTo.appendChild(appendFaceThumb("pray"));
		objTo.appendChild(appendFaceThumb("blush"));
		objTo.appendChild(appendFaceThumb("denied"));
		objTo.appendChild(appendFaceThumb("eyyy"));
		objTo.appendChild(appendFaceThumb("haha"));
		objTo.appendChild(appendFaceThumb("hug"));
		objTo.appendChild(appendFaceThumb("ohoho"));
		objTo.appendChild(appendFaceThumb("please"));
		objTo.appendChild(appendFaceThumb("realization"));
		objTo.appendChild(appendFaceThumb("tch"));
		objTo.appendChild(appendFaceThumb("baka"));
		objTo.appendChild(appendFaceThumb("sigh"));
		objTo.appendChild(appendFaceThumb("success"));
		objTo.appendChild(appendFaceThumb("andmyaxe"));
		objTo.appendChild(appendFaceThumb("messyeater"));
		objTo.appendChild(appendFaceThumb("surpriseblush"));
		objTo.appendChild(appendFaceThumb("wink"));
		objTo.appendChild(appendFaceThumb("moar"));
		objTo.appendChild(appendFaceThumb("sly"));
		objTo.appendChild(appendFaceThumb("tickmark"));
		objTo.appendChild(appendFaceThumb("ugh"));
		objTo.appendChild(appendFaceThumb("rip"));
		objTo.appendChild(appendFaceThumb("scary"));
	}
		else if (subreddit == "saber") {
		faceIdChar = "#";
		textBoxNr = 3;
		wikiLink.href = "http://www.reddit.com/r/Saber/comments/2w1g5n/rejoice_you_can_now_have_text_on_sabers_lovely/";
		thumbDialWidth = "160px";
		thumbDialHeight = "160px";
		bbCodeFunction = function(bbFace, bbTitle, bbUpper, bbLower){
			var bbHover = "";
			var bbCapt = "";
			if (bbTitle != "") {
				bbHover = " \"" + bbTitle + "\"";
			}
			if (bbLower != "") {
				bbCapt = "**" + bbLower + "**";
			}
			if (bbUpper != "") {
				bbCapt = bbCapt + bbUpper;
			}
			return "[" + bbCapt + "](#" + bbFace + bbHover + ")";
		};
		objTo.appendChild(appendFaceThumb("saber"));
		objTo.appendChild(appendFaceThumb("hidden"));
		objTo.appendChild(appendFaceThumb("sad"));
		objTo.appendChild(appendFaceThumb("surprised"));
		objTo.appendChild(appendFaceThumb("annoyed"));
		objTo.appendChild(appendFaceThumb("sigh"));
		objTo.appendChild(appendFaceThumb("blush"));
		objTo.appendChild(appendFaceThumb("sweat"));
		objTo.appendChild(appendFaceThumb("struggle"));
		objTo.appendChild(appendFaceThumb("no"));
		objTo.appendChild(appendFaceThumb("embarrassed"));
		objTo.appendChild(appendFaceThumb("angry"));
		objTo.appendChild(appendFaceThumb("smile"));
		objTo.appendChild(appendFaceThumb("lecture"));
		objTo.appendChild(appendFaceThumb("shocked"));
		objTo.appendChild(appendFaceThumb("worried"));
		objTo.appendChild(appendFaceThumb("casual"));
		objTo.appendChild(appendFaceThumb("bashful"));
		objTo.appendChild(appendFaceThumb("smile2"));
		objTo.appendChild(appendFaceThumb("dayum"));
		objTo.appendChild(appendFaceThumb("flustered"));
		objTo.appendChild(appendFaceThumb("graceful"));
		objTo.appendChild(appendFaceThumb("uninterested"));
		objTo.appendChild(appendFaceThumb("irritated"));
		objTo.appendChild(appendFaceThumb("disappointed"));
		objTo.appendChild(appendFaceThumb("moar"));
		objTo.appendChild(appendFaceThumb("cry"));
		objTo.appendChild(appendFaceThumb("wink"));
		objTo.appendChild(appendFaceThumb("furious"));
		objTo.appendChild(appendFaceThumb("hurt"));
		objTo.appendChild(appendFaceThumb("anxious"));
		objTo.appendChild(appendFaceThumb("ashamed"));
		objTo.appendChild(appendFaceThumb("hmm"));
		objTo.appendChild(appendFaceThumb("speechless"));
		objTo.appendChild(appendFaceThumb("engarde"));
		objTo.appendChild(appendFaceThumb("skeptical"));
		objTo.appendChild(appendFaceThumb("ehehe"));
		objTo.appendChild(appendFaceThumb("wary"));
		objTo.appendChild(appendFaceThumb("sad2"));
		objTo.appendChild(appendFaceThumb("saber2"));
		objTo.appendChild(appendFaceThumb("solemn"));
		objTo.appendChild(appendFaceThumb("shocked2"));
		objTo.appendChild(appendFaceThumb("irked"));
		objTo.appendChild(appendFaceThumb("angry2"));
		objTo.appendChild(appendFaceThumb("annoyed2"));
		objTo.appendChild(appendFaceThumb("lecture2"));
		objTo.appendChild(appendFaceThumb("worried2"));
		objTo.appendChild(appendFaceThumb("irritated2"));
		objTo.appendChild(appendFaceThumb("sweat2"));
		objTo.appendChild(appendFaceThumb("smirk"));
		objTo.appendChild(appendFaceThumb("alter"));
		objTo.appendChild(appendFaceThumb("unamused"));
		objTo.appendChild(appendFaceThumb("yesplease"));
	} else if (subreddit == "nisekoi") {
		faceIdChar = "#";
				textBoxNr = 1;
		wikiLink.href = "http://www.reddit.com/r/Saber/comments/2w1g5n/rejoice_you_can_now_have_text_on_sabers_lovely/";
		thumbDialWidth = "180px";
		thumbDialHeight = "230px";
		bbCodeFunction = function(bbFace, bbTitle){
			if (bbTitle == "") {
				return "[](#" + bbFace + ")";
			} else {
				return "[](#" + bbFace + " \"" + bbTitle + "\")";
			}
		};
		objTo.appendChild(appendFaceThumb("cute"));
		objTo.appendChild(appendFaceThumb("blaze"));
		objTo.appendChild(appendFaceThumb("nono"));
		objTo.appendChild(appendFaceThumb("blushing"));
		objTo.appendChild(appendFaceThumb("pff"));
		objTo.appendChild(appendFaceThumb("eh"));
		objTo.appendChild(appendFaceThumb("smirk"));
		objTo.appendChild(appendFaceThumb("rain"));
		objTo.appendChild(appendFaceThumb("misunderstood"));
		objTo.appendChild(appendFaceThumb("flustered"));
		objTo.appendChild(appendFaceThumb("embarrassed"));
		objTo.appendChild(appendFaceThumb("alright"));
		objTo.appendChild(appendFaceThumb("stutter"));
		objTo.appendChild(appendFaceThumb("moping"));
		objTo.appendChild(appendFaceThumb("mmmm"));
		objTo.appendChild(appendFaceThumb("kawaii"));
		objTo.appendChild(appendFaceThumb("couch"));
		objTo.appendChild(appendFaceThumb("ohmy"));
		objTo.appendChild(appendFaceThumb("chibi"));
		objTo.appendChild(appendFaceThumb("ontheway"));
		objTo.appendChild(appendFaceThumb("tooembarrassed"));
		objTo.appendChild(appendFaceThumb("turnaround"));
		objTo.appendChild(appendFaceThumb("shush"));
		objTo.appendChild(appendFaceThumb("outofit"));
		objTo.appendChild(appendFaceThumb("smile"));
		objTo.appendChild(appendFaceThumb("thumbsup"));
		objTo.appendChild(appendFaceThumb("grin"));
		objTo.appendChild(appendFaceThumb("yougotthis"));
		objTo.appendChild(appendFaceThumb("ah"));
		objTo.appendChild(appendFaceThumb("yay"));
	} else if (subreddit == "onetruebiribiri") {
		faceIdChar = "#";
		textBoxNr = 1;
		wikiLink.href = "http://www.reddit.com/r/OneTrueBiribiri/comments/2eyml8/110_subscribers_yay_comment_faces_and_spoiler/";
		thumbDialWidth = "125px";
		thumbDialHeight = "90px";
		bbCodeFunction = function(bbFace, bbTitle){
			if (bbTitle == "") {
				return "[](#" + bbFace + ")";
			} else {
				return "[](#" + bbFace + " \"" + bbTitle + "\")";
			}
		};
			objTo.appendChild(appendFaceThumb("angry"));
			objTo.appendChild(appendFaceThumb("crying"));
			objTo.appendChild(appendFaceThumb("curious"));
			objTo.appendChild(appendFaceThumb("eh?"));
			objTo.appendChild(appendFaceThumb("electricity"));
			objTo.appendChild(appendFaceThumb("flower-blush"));
			objTo.appendChild(appendFaceThumb("not-amused"));
			objTo.appendChild(appendFaceThumb("railgun"));
			objTo.appendChild(appendFaceThumb("right"));
			objTo.appendChild(appendFaceThumb("worried"));
	} else if (subreddit == "gamindustri") {
		faceIdChar = "#";
		textBoxNr = 3;
		wikiLink.href = "http://www.reddit.com/r/gamindustri/comments/2xhh07/comment_face_guide/";
		thumbDialWidth = "160px";
		thumbDialHeight = "160px";
		bbCodeFunction = function(bbFace, bbTitle, bbUpper, bbLower){
			var bbHover = "";
			var bbCapt = "";
			if (bbTitle != "") {
				bbHover = " \"" + bbTitle + "\"";
			}
			if (bbLower != "") {
				bbCapt = "**" + bbLower + "**";
			}
			if (bbUpper != "") {
				bbCapt = bbCapt + bbUpper;
			}
			return "[" + bbCapt + "](#" + bbFace + bbHover + ")";
		};
		objTo.appendChild(appendFaceThumb("trollface"));
		objTo.appendChild(appendFaceThumb("disappointed"));
		objTo.appendChild(appendFaceThumb("oooh"));
		objTo.appendChild(appendFaceThumb("sad"));
		objTo.appendChild(appendFaceThumb("shock"));
		objTo.appendChild(appendFaceThumb("smile"));
		objTo.appendChild(appendFaceThumb("smirk"));
		objTo.appendChild(appendFaceThumb("wink"));
	}
}

function hideSelect() {
	awwFacedDialogObj.style.display = "none";
}

function showSelect(thisLink) {
	var inputTextFields = document.getElementsByTagName("textarea");
	for (var i = 0; i < inputTextFields.length; i++) {
		if (thisLink.parentNode.previousSibling.firstChild == inputTextFields[i]) selectedText.boxIndex = i;
	}
	selectedText.start = inputTextFields[selectedText.boxIndex].selectionStart;
	selectedText.length = inputTextFields[selectedText.boxIndex].selectionEnd - inputTextFields[selectedText.boxIndex].selectionStart;
	console.log("Box index: " + selectedText.boxIndex + ", selection start: " + selectedText.start + ", selection length: " + selectedText.length);
	if (divAlreadyShown == false) createFacesDiv();
	if (localStorage.getItem("aww2_top") == null || localStorage.getItem("aww2_left") == null || localStorage.getItem("aww2_width") == null || localStorage.getItem("aww2_height") == null) {
		localStorage.setItem("aww2_width", 842);
		localStorage.setItem("aww2_height", 500);
		localStorage.setItem("aww2_top", Math.round((window.innerHeight-500)/2));
		localStorage.setItem("aww2_left", Math.round((window.innerWidth-842)/2));
		changeSize(localStorage.getItem("aww2_top"), localStorage.getItem("aww2_left"), localStorage.getItem("aww2_width"), localStorage.getItem("aww2_height"));
	}
	else if (((parseInt(localStorage.getItem("aww2_top"), 10) + parseInt(localStorage.getItem("aww2_height"), 10)) < window.innerHeight) && ((parseInt(localStorage.getItem("aww2_left"), 10) + parseInt(localStorage.getItem("aww2_width"), 10)) < window.innerWidth)) {
		changeSize(localStorage.getItem("aww2_top"), localStorage.getItem("aww2_left"), localStorage.getItem("aww2_width"), localStorage.getItem("aww2_height"));
	}
	else {
		console.log("Faces dialog cannot fit into the browser window. Temporarily sizing and moving the dialog...");
		changeSize((window.innerHeight-350)/2, (window.innerWidth-692)/2, "692", "350");
	}
	console.log("Window width: " + window.innerWidth + "px");
	awwFacedDialogObj.style.display = "block";
}

function main() {
	//if user changed dialog properties...
	console.log("Awwfaces begin")
	var bottomArea = document.getElementsByClassName("bottom-area");
	console.log("bottom area: " + bottomArea.length);
	for (var i = 0; i < bottomArea.length; i++) {
		var showDialogLink = document.createElement("a");
		showDialogLink.innerHTML = "Add a comment face";
		showDialogLink.style.cursor = "pointer";
		showDialogLink.className = "addFaceLink reddiquette";
		bottomArea[i].insertBefore(showDialogLink, bottomArea[i].childNodes[3]);
	}
	appendListenerToLink();
	appendListenerToReply();
}

var showSelectFunction = function(){showSelect(this);};

function appendListenerToLink() {
	console.log("Appending listener to 'Add Faces' links");
	var links = document.getElementsByClassName("addFaceLink");
	console.log("Found " + links.length + "'add' link(s)");
	for (var i = 0; i < links.length; i++) {
		links[i].addEventListener("click", showSelectFunction);
	}
}
function appendListenerToReply() {
	console.log("Appending listener to 'reply' links");
	var links = document.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		if (links[i].innerHTML == "reply") {
			console.log("appending listener to reply...")
			links[i].addEventListener("click", function(){appendListenerToLink();});
		}
	}
}

main();