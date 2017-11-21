function _writeMessage(a) {
	document.write(_getMessage(a))
}
function _getMessage(a) {
	return (chrome.i18n.getMessage(a))
}
function prevDef(ev){
	ev = ev || window.event;
	if (ev){
	ev.cancelBubble = true;
		if (ev.preventDefault){
			ev.preventDefault();
		}
		if (ev.stopPropagation){
			ev.stopPropagation();
		}
	}
	return false;
}
