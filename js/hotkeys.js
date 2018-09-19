if (!VK_SWITCHER_HOTKEY_JS_INSERTED) {
	var VK_SWITCHER_HOTKEY_JS_INSERTED = true;
	var vkswhotkeys = '';
	var vkswmessages = '';
	var vkswtimeout = '';
	chrome.extension.sendRequest({operation: 'hotkeys'}, function (response) {
		if (response) {
			if (response.hotkeys) {
				vkswhotkeys = JSON.parse(response.hotkeys);
				vkswmessages = JSON.parse(response.messages);
				var d = document.createElement('DIV');
				d.id = 'vkswitcherhotkeyresponser';
				d.style.position = 'absolute';
				d.style.margin = '0 25%';
				d.style.backgroundColor = '#F6F6F6';
				d.style.border = '5px solid #888888';
				d.style.top = '0';
				d.style.width = '50%';
				d.style.borderRadius = '20px';
				d.style.padding = '10px';
				d.style.textAlign = 'center';
				d.style.fontSize = '14pt';
				d.style.zIndex = 10000;
				d.style.display = 'none';
				document.body.appendChild(d);
			}
		}
	});
	document.addEventListener('keydown', event_handleKeyDownEvent, true);
	function responseHotkey(type, status, message) {
		var popup = '';
		if (status == 'OK') {
			if (type == 'pp' || type == 'np' || type == 'sp') {
				popup = vkswmessages[0] + ' "' + message + '"';
			}
			else if (type == 'pt' || type == 'np') {
				popup = vkswmessages[1] + ' "' + message + '"';
			}
			document.getElementById('vkswitcherhotkeyresponser').innerHTML = popup;
			document.getElementById('vkswitcherhotkeyresponser').style.display = 'block';
			if (vkswtimeout) {
				clearTimeout(vkswtimeout);
			}
			vkswtimeout = setTimeout(function () {
				document.getElementById('vkswitcherhotkeyresponser').style.display = 'none';
			}, 2000);
		}
	}

	function event_handleKeyDownEvent(e) {
		if (!vkswhotkeys) {
			return true;
		}
		if (!e.keyCode) {
			return true;
		}
		var c = 0;
		var a = 0;
		var s = 0;
		var k = e.keyCode;
		if (e.shiftKey) {
			s = 1;
		}
		if (e.altKey) {
			a = 1;
		}
		if (e.ctrlKey) {
			c = 1;
		}
		if (k == 27 && !c && !a && !s) {
			if (document.getElementById('vkswitcherhotkeyresponser').style.display != 'none') {
				document.getElementById('vkswitcherhotkeyresponser').style.display = 'none';
				e.preventDefault();
				e.cancelBubble = true;
				e.bubbles = false;
				return false;
			}
		}
		if (vkswhotkeys.selectProfile.c || vkswhotkeys.selectProfile.a || vkswhotkeys.selectProfile.s) {
			if (k > 48 && k < 58) {
				if (vkswhotkeys.selectProfile.c == c && vkswhotkeys.selectProfile.a == a && vkswhotkeys.selectProfile.s == s) {
					chrome.extension.sendRequest({operation: 'hotkey', key: 'sp', id: (k - 48)}, function (response) {
						responseHotkey('sp', response.status, response.message);
					});
					e.preventDefault();
					e.cancelBubble = true;
					e.bubbles = false;
					return false;
				}
			}
		}
		if (vkswhotkeys.switchPreviousTab.k && vkswhotkeys.switchPreviousTab.c == c && vkswhotkeys.switchPreviousTab.a == a && vkswhotkeys.switchPreviousTab.s == s && vkswhotkeys.switchPreviousTab.k == k) {
			chrome.extension.sendRequest({operation: 'hotkey', key: 'pt'}, function (response) {
				responseHotkey('pt', response.status, response.message);
			});
			e.preventDefault();
			e.cancelBubble = true;
			e.bubbles = false;
			return false;
		}
		if (vkswhotkeys.switchNextTab.k && vkswhotkeys.switchNextTab.c == c && vkswhotkeys.switchNextTab.a == a && vkswhotkeys.switchNextTab.s == s && vkswhotkeys.switchNextTab.k == k) {
			chrome.extension.sendRequest({operation: 'hotkey', key: 'nt'}, function (response) {
				responseHotkey('nt', response.status, response.message);
			});
			e.preventDefault();
			e.cancelBubble = true;
			e.bubbles = false;
			return false;
		}
		if (vkswhotkeys.prevProfile.k && vkswhotkeys.prevProfile.c == c && vkswhotkeys.prevProfile.a == a && vkswhotkeys.prevProfile.s == s && vkswhotkeys.prevProfile.k == k) {
			chrome.extension.sendRequest({operation: 'hotkey', key: 'pp'}, function (response) {
				responseHotkey('pp', response.status, response.message);
			});
			e.preventDefault();
			e.cancelBubble = true;
			e.bubbles = false;
			return false;
		}
		if (vkswhotkeys.nextProfile.k && vkswhotkeys.nextProfile.c == c && vkswhotkeys.nextProfile.a == a && vkswhotkeys.nextProfile.s == s && vkswhotkeys.nextProfile.k == k) {
			chrome.extension.sendRequest({operation: 'hotkey', key: 'np'}, function (response) {
				responseHotkey('np', response.status, response.message);
			});
			e.preventDefault();
			e.cancelBubble = true;
			e.bubbles = false;
			return false;
		}
	}
}
