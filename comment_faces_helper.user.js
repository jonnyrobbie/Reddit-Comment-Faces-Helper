// ==UserScript==
// @name		   Reddit comment faces helper
// @description	Allows you to easily add comment faces from those subreddits: r/minecraft,
// @namespace	  https://greasyfork.org/users/98-jonnyrobbie
// @author		 JonnyRobbie
// @include		http*://*.reddit.com/r/minecraft/*
// @grant		  none
// @version		1.23.7
// ==/UserScript==
		
var selectedFace = "";
var faceIdChar = "";
var thumbDialWidth = "150px";
var thumbDialHeight = "100px";
var divAlreadyShown = false;
var settingsAlreadyShown = false;
var showSearch = false;
var bbCodeFunction = null;
var textBoxNr = 1;
var selectedText = {
	start: 0, lenghth: 0, boxIndex: 0
};

var storageSettings = {
	top: Math.round((window.innerHeight-500)/2),
	left: Math.round((window.innerWidth-842)/2),
	width: 842,
	height: 500,
	bg: "white",
	text: "#31363B",
	high: "#F9401A",
	colA: "#EFF0F1",
	colB: "gray"
};
var loadingIcon = "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQACgABACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkEAAoAAgAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkEAAoAAwAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkEAAoABAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQACgAFACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQACgAGACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAAKAAcALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";
var settingsIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIxSURBVHjapFO5iiJRFL3l1iIq7hi4NIgKIjSCiqCgDYbm/oCYGhqq/2Bi2KGZgaHgDAqtKEhj5pooiLuRuE+dh8oMMx3Ng1t16t5zXt165xZXKBTom5XlI3PHufvzX0twvV4pGo0Sf8/yUQW+P2e+wVVw75i4fD7/fJvP56PhcEgajYbUajVptVq63W60Xq9ps9mwu81mo1ar9exKdLlc8BD2er2k0+lIqVQy4mKxYBgLGBtarVaSSCTk8Xio3W6H2Sdgg1gs9t7v92m/35NAIGBku91OYrGYBTByqIEDLjTQis7nM3uLQqGg+XxOer2eXl5eqNFoUL1eZ7VQKESBQIAOhwPrBlwsaAX8JVssFm9IoigUCtEe4kc6neYQwMih9tgAGmixQSYej5PRaCSz2UwikYi63S6lUqn3h1XAyKEGDrjQQCs6nU40mUz+8PbR4r9y4MMRBLAwGAxyg8EgghOfTqdkMBhILpfT5+dnxOFwfEBULperbrf7VSqVsu5weLVaDXOQY2eQSCS45XLJhLvdjtnlcrkilUrlhgBGDjVwwIUG2qcLOByTycQcmM1mzDZMGxbaRU4mk7ENYOPDBaHf76dms1l1Op2vGKbRaMTIvV6Pjscjs/br64tZiNb5T6HtdkulUinCT+nHYxJ/8jZFgMfjMXu7SqWi32dktVoRf1as/U6nwzTPSQyHw1n+noPfb29vnMVigffsZ0EAI4caOODeNcQlk8n/+p1/CTAASVxppUgA6l4AAAAASUVORK5CYII=";
var searchIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAsJJREFUeNqMk8tPE1EUxu+dmU6n04dDKVAaQBowBYq0RDAQGkOC0QRjoujCx14TV8Z/gLB0Z8CNunGJJhJdGd8pkKALSdVoIIISiOE1JWPbofO6cz2jYKR1wUm+nJm53/nlnjvnYkopcmJkZEKCdB10BpRAf+ID6DHo1vDwkIL+E9gBQHHSMQYqA1VH+9rUrvZwFYMxmv2yJk+9+uhRc6rsgAGSKQWwGHdIAEm39bZJxwcS3vqw3yu6GcyxGAUl0ROLH+Tymo3ktexQOj13v7+/VfsXwJimdsMX8oWi0TqfQahtWNQqGralgXSTmvButiebAi6BCzne0h0wur59vqalUdFMuq2bdhYK5YJG5FyRyADaBMCGSehGJNa47nhLARwhRmsR+3Nyzlx0u7DOscTEmGVZBiGLUKKZtqVqNkuFQMTxlgEMYxvxbqysyHqGYVDeK3gE6F90sZiFdcMmNLe6ZWxvbqmd4G0qAxQKyiKmP4nbJa0GRK4AB4i8AsvzHGZMixKT2Hq15EKzk59Nx1t2Boqy/vrTi5d1VUHGV1vB03AF7zkgsrUenmkOiGykRuLFoMd2Z5fnjjneMkAmM3V7ZX4+J8tfLzCsVQmFHvheD3L6rbd0vWJ8Yuxa12lZTFx+23f1Lk7uGSSnjXi8+2IslrgZaYr6U6dOLCSboiyPsHdy5v369Jt0ezH4UGg8rLnODp5DT54/UNezq6k7V2jm7yRijH2hULgnmUxd8vulXvgHLc4iIWQun1dmvjOPBlq7aUNHp4AGTzagp8+W1c2s9huCd+8CQDhIdaAQyLezwwJIrj2CUmI1utccR0JHN0Y9KRa9myaqotAUt9sLgCxISzvae2EwlmsSSFhAaEw3qADDhiKHRG/R0KY5tI8AeAEg487zCkAMzRZ+rGrIz9Nv+wKUQmDERtUcWfJxaPSXAAMAqY5Ou20jwNAAAAAASUVORK5CYII=";
//elements section

function initializeSettings() {
	if (!settingsAlreadyShown) buildSettingsDiv();
	textSett["awwSettingsHeight"].value = parseInt(awwFacedDialogObj.style.height, 10);
	textSett["awwSettingsWidth"].value = parseInt(awwFacedDialogObj.style.width, 10);
	textSett["awwSettingsTop"].value = parseInt(awwFacedDialogObj.style.top, 10);
	textSett["awwSettingsLeft"].value = parseInt(awwFacedDialogObj.style.left, 10);
	
	textSett["awwSettingsLeft"].style.color = "#31363B";
	textSett["awwSettingsTop"].style.color = "#31363B";
	textSett["awwSettingsHeight"].style.color = "#31363B";
	textSett["awwSettingsWidth"].style.color = "#31363B";
	
	textSett["awwSettingsBGCol"].value = storageSettings.bg;
	textSett["awwSettingsTextCol"].value = storageSettings.text;
	textSett["awwSettingsHighCol"].value = storageSettings.high;
	textSett["awwSettingsACol"].value = storageSettings.colA;
	textSett["awwSettingsBCol"].value = storageSettings.colB;
	window.settingsWrapper.style.display = "inline";
}

function addSettRow(description, elemName) {
	rowSett = document.createElement("tr");
	spanSettWr = document.createElement("td");
		spanSettWr.style.width = "170px";
	textSettWr = document.createElement("td");
		textSettWr.style.padding = "5px";
	spanSett = document.createElement("span");
		spanSett.innerHTML = description;
		textSett[elemName] = new Object();
		textSett[elemName] = document.createElement("input");
		textSett[elemName].type = "text";
		textSett[elemName].id = elemName;
		textSett[elemName].style.border = "1px solid lightgray";
		textSett[elemName].style.height = "20px";
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
		textSett["awwSettingsTop"].style.color = "storageSettings.text";
		throwErr = true;
	}
	else {
		textSett["awwSettingsTop"].style.color = "#31363B";
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
		textSett["awwSettingsLeft"].style.color = "#31363B";
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
		textSett["awwSettingsWidth"].style.color = "#31363B";
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
		textSett["awwSettingsHeight"].style.color = "#31363B";
	}
	
	if (parseInt(textSett["awwSettingsHeight"].value, 10) + parseInt(textSett["awwSettingsTop"].value, 10) > window.innerHeight) {
		textSett["awwSettingsHeight"].style.color = "#FF0000";
		textSett["awwSettingsTop"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (throwErr == false) {
		textSett["awwSettingsHeight"].style.color = "#31363B";
		textSett["awwSettingsTop"].style.color = "#31363B";
	}
	if (parseInt(textSett["awwSettingsWidth"].value, 10) + parseInt(textSett["awwSettingsLeft"].value, 10) > window.innerWidth) {
		textSett["awwSettingsWidth"].style.color = "#FF0000";
		textSett["awwSettingsLeft"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (throwErr == false) {
		textSett["awwSettingsWidth"].style.color = "#31363B";
		textSett["awwSettingsLeft"].style.color = "#31363B";
	}
	
	if (throwErr == false) {
		storageSettings.bg = textSett["awwSettingsBGCol"].value;
		storageSettings.text = textSett["awwSettingsTextCol"].value;
		storageSettings.high = textSett["awwSettingsHighCol"].value;
		storageSettings.colA = textSett["awwSettingsACol"].value;
		storageSettings.colB = textSett["awwSettingsBCol"].value;
		changeSize(parseInt(textSett["awwSettingsTop"].value, 10), parseInt(textSett["awwSettingsLeft"].value, 10), parseInt(textSett["awwSettingsWidth"].value, 10), parseInt(textSett["awwSettingsHeight"].value, 10));
	}
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
			settingsWrapper.style.top = window.innerHeight/2 - 173 + "px";
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
		settingsTable.appendChild(addSettRow("Background color: ", "awwSettingsBGCol"));
		settingsTable.appendChild(addSettRow("Text color: ", "awwSettingsTextCol"));
		settingsTable.appendChild(addSettRow("Highlight color: ", "awwSettingsHighCol"));
		settingsTable.appendChild(addSettRow("Button color: ", "awwSettingsACol"));
		settingsTable.appendChild(addSettRow("Border color: ", "awwSettingsBCol"));
		var settingsButtonWrapper = document.createElement("div");
		
		var settingsCancel = document.createElement("input");
			settingsCancel.type = "button";
			settingsCancel.value = "Cancel";
			settingsCancel.style.margin = "5px";
			settingsCancel.style.width = "70px";
			settingsCancel.style.height = "28px";
			settingsCancel.style.border = "1px solid gray";
			settingsCancel.style.cssFloat = "right";
			settingsCancel.onclick = function(){settingsWrapper.style.display = "none";}
		settingsButtonWrapper.appendChild(settingsCancel);
		
		var settingsOK = document.createElement("input");
			settingsOK.type = "button";
			settingsOK.value = "OK";
			settingsOK.style.margin = "5px";
			settingsOK.style.width = "70px";
			settingsOK.style.height = "28px";
			settingsOK.style.border = "1px solid gray";
			settingsOK.style.cssFloat = "right";
			settingsOK.onclick = function(){okchangeSize();}
		settingsButtonWrapper.appendChild(settingsOK);
		
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
		textSett["awwSettingsTop"].style.color = "#31363B";
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
		textSett["awwSettingsLeft"].style.color = "#31363B";
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
		textSett["awwSettingsWidth"].style.color = "#31363B";
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
		textSett["awwSettingsHeight"].style.color = "#31363B";
	}
	if (parseInt(textSett["awwSettingsHeight"].value, 10) + parseInt(textSett["awwSettingsTop"].value, 10) > window.innerHeight) {
		errorMsg = errorMsg + "Dialog cannot be out of borders.\n";
		textSett["awwSettingsHeight"].style.color = "#FF0000";
		textSett["awwSettingsTop"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (throwErr == false) {
		textSett["awwSettingsHeight"].style.color = "#31363B";
		textSett["awwSettingsTop"].style.color = "#31363B";
	}
	if (parseInt(textSett["awwSettingsWidth"].value, 10) + parseInt(textSett["awwSettingsLeft"].value, 10) > window.innerWidth) {
		errorMsg = errorMsg + "Dialog cannot be out of borders.\n";
		textSett["awwSettingsWidth"].style.color = "#FF0000";
		textSett["awwSettingsLeft"].style.color = "#FF0000";
		throwErr = true;
	}
	else if (throwErr == false) {
		textSett["awwSettingsWidth"].style.color = "#31363B";
		textSett["awwSettingsLeft"].style.color = "#31363B";
	}
	if (throwErr == false) {
		changeSize(parseInt(textSett["awwSettingsTop"].value, 10), parseInt(textSett["awwSettingsLeft"].value, 10), parseInt(textSett["awwSettingsWidth"].value, 10), parseInt(textSett["awwSettingsHeight"].value, 10), textSett["awwSettingsBGCol"].value, textSett["awwSettingsTextCol"].value, textSett["awwSettingsHighCol"].value, textSett["awwSettingsACol"].value, textSett["awwSettingsBCol"].value);
		//SET
		setStorage("width", parseInt(textSett["awwSettingsWidth"].value, 10));
		setStorage("height", parseInt(textSett["awwSettingsHeight"].value, 10));
		setStorage("top", parseInt(textSett["awwSettingsTop"].value, 10));
		setStorage("left", parseInt(textSett["awwSettingsLeft"].value, 10));
		
		setStorage("bg", textSett["awwSettingsBGCol"].value);
		setStorage("text", textSett["awwSettingsTextCol"].value);
		setStorage("high", textSett["awwSettingsHighCol"].value);
		setStorage("colA", textSett["awwSettingsACol"].value);
		setStorage("colB", textSett["awwSettingsBCol"].value);
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
	width = Math.floor((parseInt(width, 10) - (20+getScrollBarWidth()))/(parseInt(thumbDialWidth, 10)+10))*(parseInt(thumbDialWidth, 10)+10)+40;
	awwFacedDialogObj.style.top = top + "px";
	awwFacedDialogObj.style.left = left + "px";
	awwFacedDialogObj.style.width = width + "px";
	awwFacedDialogObj.style.height = height + "px";
	tableWrap.style.height = (height - (82+(showSearch*22))) + "px";
	searchWrap.style.display = showSearch ? "block" : "none";
	if (textBoxNr == 1) {
		titleFace.style.width = (width - 323) + "px";
	} else if (textBoxNr == 3) {
		titleFace.style.width = ((width - 318)/3)-12 + "px";
		upperCaption.style.width = ((width - 318)/3)-12 + "px";
		lowerCaption.style.width = ((width - 318)/3)-12 + "px";
		upperCaption.style.display = "inline";
		lowerCaption.style.display = "inline";
	}
	awwFacedDialogObj.style.backgroundColor = storageSettings.bg;
	titleFace.style.backgroundColor = storageSettings.bg;
	upperCaption.style.backgroundColor = storageSettings.bg;
	lowerCaption.style.backgroundColor = storageSettings.bg;
	searchBox.style.backgroundColor = storageSettings.bg;
	
	titleFace.style.color = storageSettings.text;
	upperCaption.style.color = storageSettings.text;
	lowerCaption.style.color = storageSettings.text;
	searchBox.style.color = storageSettings.text;
	addFaceB.style.color = storageSettings.text;
	cancel.style.color = storageSettings.text;
	
	addFaceB.style.backgroundColor = storageSettings.colA;
	cancel.style.backgroundColor = storageSettings.colA;
	
	titleFace.style.borderColor = storageSettings.colB;
	upperCaption.style.borderColor = storageSettings.colB;
	lowerCaption.style.borderColor = storageSettings.colB;
	searchBox.style.borderColor = storageSettings.colB;
	addFaceB.style.borderColor = storageSettings.colB;
	cancel.style.borderColor = storageSettings.colB;
	wikiLink.style.color = storageSettings.colB;
	
	//textSett.style.backgroundColor = storageSettings.bg;
}

function getScrollBarWidth() {
	//http://www.alexandre-gomes.com/?p=115
  var inner = document.createElement('p');
  inner.style.width = "100%";
  inner.style.height = "200px";

  var outer = document.createElement('div');
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild (inner);

  document.body.appendChild (outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;
  if (w1 == w2) w2 = outer.clientWidth;

  document.body.removeChild (outer);

  return (w1 - w2);
}

function createFacesDiv() {
	console.log("AWWFACES");
	var objTo = document.body;
	window.awwFacedDialogObj = document.createElement("div");
	window.tableWrap = document.createElement("div");
	var controls = document.createElement("div");
	controls.style.margin = "10px";
	controls.style.cssFloat = "left";
	window.searchWrap = document.createElement("div");
	searchWrap.style.margin = "0px 10px";
	searchWrap.style.cssFloat = "right";
	tableWrap.id = "awwFacesTableWrapper";
	tableWrap.style.overflowY = "scroll";
	tableWrap.style.margin = "10px";
	tableWrap.style.padding = "10px 0px";
	awwFacedDialogObj.appendChild(tableWrap);
	
	window.searchBox = document.createElement("input");
	searchBox.type = "text";
	searchBox.id = "searchBoxId";
	searchBox.style.margin = "0px";
	searchBox.placeholder = "Search face...";
	searchBox.style.height = "20px";
	searchBox.style.width = "200px";
	searchBox.style.paddingLeft = "3px";
	searchBox.style.border = "1px solid lightgray";
	searchBox.style.cssFloat = "right";
	searchBox.oninput = function(){searchFilter(this);};
	searchWrap.appendChild(searchBox);
	awwFacedDialogObj.appendChild(searchWrap);
	
	window.titleFace = document.createElement("input");
	titleFace.type = "text";
	titleFace.id = "awwFaceId";
	titleFace.style.margin = "0px 5px 0px 0px";
	titleFace.placeholder = "Mouse-over text";
	titleFace.style.height = "20px";
	titleFace.style.paddingLeft = "3px";
	titleFace.style.border = "1px solid lightgray";
	titleFace.style.cssFloat = "left";
	controls.appendChild(titleFace);
	
	window.upperCaption = document.createElement("input");
	upperCaption.type = "text";
	upperCaption.id = "upperCaption";
	upperCaption.style.margin = "0px 5px 0px 5px";
	upperCaption.placeholder = "Top caption";
	upperCaption.style.height = "20px";
	upperCaption.style.paddingLeft = "3px";
	upperCaption.style.border = "1px solid lightgray";
	upperCaption.style.cssFloat = "left";
	upperCaption.style.display = "none";
	controls.appendChild(upperCaption);
	
	window.lowerCaption = document.createElement("input");
	lowerCaption.type = "text";
	lowerCaption.id = "lowerCaption";
	lowerCaption.style.margin = "0px 5px 0px 5px";
	lowerCaption.placeholder = "Bottom caption";
	lowerCaption.style.height = "20px";
	lowerCaption.style.paddingLeft = "3px";
	lowerCaption.style.border = "1px solid lightgray";
	lowerCaption.style.cssFloat = "left";
	lowerCaption.style.display = "none";
	controls.appendChild(lowerCaption);
	
	window.addFaceB = document.createElement("input");
	addFaceB.type = "button";
	addFaceB.value = "Add flair"
	addFaceB.style.margin = "-3px 5px";
	addFaceB.style.border = "1px solid gray";
	addFaceB.style.height = "28px";
	addFaceB.style.cssFloat = "left";
	addFaceB.style.width = "80px";
	addFaceB.onclick = function(){addFace();return false;};
	addFaceB.style.padding = "2px";
	controls.appendChild(addFaceB);
	
	window.cancel = document.createElement("input");
	cancel.type = "button";
	cancel.value = "Cancel"
	cancel.style.margin = "-3px 5px";
	cancel.style.border = "1px solid gray";
	cancel.style.height = "28px";
	cancel.style.cssFloat = "left";
	cancel.style.width = "80px";
	cancel.onclick = function(){hideSelect()};
	cancel.style.padding = "2px";
	controls.appendChild(cancel);
	
	window.wikiLink = document.createElement("a");
	wikiLink.href = "http://www.reddit.com/r/awwnime/wiki/commentfaces";
	wikiLink.innerHTML = "Faces wiki";
	wikiLink.style.margin = "5px 5px";
	wikiLink.style.height = "12px";
	wikiLink.style.width = "55px";
	wikiLink.style.cssFloat = "left";
	controls.appendChild(wikiLink);
	
	var search = document.createElement("img");
	search.src = searchIcon;
	search.alt = "search";
	search.style.margin = "3px 5px";
	search.style.cssFloat = "left";
	search.style.cursor = "pointer";
	//search.style.position = "absolute";
	search.title = "Search faces...";
	search.onclick = function(){toggleSearch();}
	controls.appendChild(search);
	
	var settings = document.createElement("img");
	settings.src = settingsIcon;
	settings.alt = "settings";
	settings.style.margin = "3px 0px 3px 5px";
	settings.style.cssFloat = "left";
	settings.style.cursor = "pointer";
	//settings.style.position = "absolute";
	settings.title = "Settings...";
	settings.onclick = function(){initializeSettings();}
	controls.appendChild(settings);
	buildSettingsDiv();
	
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
	console.log("scrollbar width: " + getScrollBarWidth());
	divAlreadyShown = true;
}

function toggleSearch() {
	showSearch = !showSearch;
	searchBox.value = "";
	searchFilter(searchBox);
	//GET
	changeSize(getStorage("top"), getStorage("left"), getStorage("width"), getStorage("height"));
}

function searchFilter(box) {
	searchThumbs = tableWrap.getElementsByTagName("div");
	for (i=0; i<searchThumbs.length; i++) {
		console.log(box.value);
		if (searchThumbs[i].getElementsByTagName("a")[0].id.toLowerCase().search(box.value.toLowerCase()) == -1) {
			searchThumbs[i].style.display = "none";
		} else {
			searchThumbs[i].style.display = "block";
		}
	}
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
	document.getElementById(faceId).style.boxShadow = "0px 0px 20px 10px " + storageSettings.high;
	selectedFace = faceId;
	//alert(faceId);
}

function appendFaces() {
	var objTo = tableWrap;
	var regex = /https?:\/\/((www\.)?|(pay\.)?|(.{2}\.)?)reddit\.com\/r\/(\w+)\/.*/;
	var subreddit = document.URL.replace(regex, "$5").toLowerCase();
	if (subreddit == "minecraft") {
		faceIdChar = "#";
		wikiLink.href = "http://www.reddit.com/r/awwnime/wiki/commentfaces";
		thumbDialWidth = "165px";
		thumbDialHeight = "115px";
		bbCodeFunction = function(bbFace, bbTitle){
			if (bbTitle == "") {
				return "[](#" + bbFace + ")";
			} else {
				return "[](#" + bbFace + " \"" + bbTitle + "\")";
			}
		};
		objTo.appendChild(appendFaceThumb("face-wink"));
	}
}

function hideSelect() {
	awwFacedDialogObj.style.display = "none";
}

function getStorage(key) {
	if (localStorage.getItem("commentfaces_settings") == null) {
		localStorage.setItem("commentfaces_settings", JSON.stringify(storageSettings));
	}
	storageSettings = JSON.parse(localStorage.getItem("commentfaces_settings"));
	return storageSettings[key];
}

function setStorage(key, value) {
	if (localStorage.getItem("commentfaces_settings") == null) {
		localStorage.setItem("commentfaces_settings", JSON.stringify(storageSettings));
	}
	storageSettings = JSON.parse(localStorage.getItem("commentfaces_settings"));
	storageSettings[key] = value;
	localStorage.setItem("commentfaces_settings", JSON.stringify(storageSettings));
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
	/*if (localStorage.getItem("aww2_top") == null || localStorage.getItem("aww2_left") == null || localStorage.getItem("aww2_width") == null || localStorage.getItem("aww2_height") == null) {
		localStorage.setItem("aww2_width", 842);
		localStorage.setItem("aww2_height", 500);
		localStorage.setItem("aww2_top", Math.round((window.innerHeight-500)/2));
		localStorage.setItem("aww2_left", Math.round((window.innerWidth-842)/2));
		changeSize(localStorage.getItem("aww2_top"), localStorage.getItem("aww2_left"), localStorage.getItem("aww2_width"), localStorage.getItem("aww2_height"));
	}*/
	if (((getStorage("top") + getStorage("height")) < window.innerHeight) && ((getStorage("left") + getStorage("width")) < window.innerWidth)) {
		changeSize(getStorage("top"), getStorage("left"), getStorage("width"), getStorage("height"));
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
		showDialogLink.innerHTML = "Add a comment flair";
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
	console.log("Found " + links.length + " 'add' link(s)");
	for (var i = 0; i < links.length; i++) {
		links[i].addEventListener("click", showSelectFunction);
	}
}

function appendListenerToReply() {
	console.log("Appending listener to 'reply' links");
	var links = document.getElementsByClassName("reply-button");
	console.log("reply-button length: " + links.length);
	for (var i = 0; i < links.length; i++) {
		console.log("appending listener to reply...")
		links[i].childNodes[0].addEventListener("click", function(){appendListenerToLink();});
	}
}

main();
