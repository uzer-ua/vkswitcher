function mBadge(bText, bColor, bTitle) {
	if (bColor == 'gray') {
		bColor = [128, 128, 128, 255];
	}
	chrome.browserAction.setBadgeBackgroundColor({color: bColor});
	chrome.browserAction.setBadgeText({text: '' + bText});
	chrome.browserAction.setTitle({title: bTitle});
}
Array.prototype.in_array = function (_value) {
	for (var i = 0, l = this.length; i < l; i++) {
		if (this[i] == _value) {
			return i;
		}
	}
	return undefined;
};
var keycodes = ['', '', '', '', '', '', '', '', '', 'Tab', '', '', '', 'Enter', '', '', '', '', '', '', '', '', '', '', '', '', '', 'Escape', '', '', '', '', 'Space', 'Page Up', 'Page Down', 'End', 'Home', 'Left', 'Up', 'Right', 'Down', '', '', '', '', 'Insert', 'Delete', '', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '', '', '', '', '', '', '', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'MainM Left', 'MainM Right', 'Menu', '', '', 'NumPad 0', 'NumPad 1', 'NumPad 2', 'NumPad 3', 'NumPad 4', 'NumPad 5', 'NumPad 6', 'NumPad 7', 'NumPad 8', 'NumPad 9', 'NumPad *', 'NumPad +', '', 'NumPad -', 'NumPad ,', 'NumPad /', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '=', '', '-', '', '', '~', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '\\'];
var hotkeys = JSON.parse(localStorage.hotkeys);
initt = function () {
	document.getElementById('switchPreviousTab_c').checked = (hotkeys['switchPreviousTab']['c'] ? true : false);
	document.getElementById('switchPreviousTab_a').checked = (hotkeys['switchPreviousTab']['a'] ? true : false);
	document.getElementById('switchPreviousTab_s').checked = (hotkeys['switchPreviousTab']['s'] ? true : false);
	document.getElementById('switchPreviousTab_k').value = keycodes[hotkeys['switchPreviousTab']['k']];
	document.getElementById('switchNextTab_c').checked = (hotkeys['switchNextTab']['c'] ? true : false);
	document.getElementById('switchNextTab_a').checked = (hotkeys['switchNextTab']['a'] ? true : false);
	document.getElementById('switchNextTab_s').checked = (hotkeys['switchNextTab']['s'] ? true : false);
	document.getElementById('switchNextTab_k').value = keycodes[hotkeys['switchNextTab']['k']];
	document.getElementById('prevProfile_c').checked = (hotkeys['prevProfile']['c'] ? true : false);
	document.getElementById('prevProfile_a').checked = (hotkeys['prevProfile']['a'] ? true : false);
	document.getElementById('prevProfile_s').checked = (hotkeys['prevProfile']['s'] ? true : false);
	document.getElementById('prevProfile_k').value = keycodes[hotkeys['prevProfile']['k']];
	document.getElementById('nextProfile_c').checked = (hotkeys['nextProfile']['c'] ? true : false);
	document.getElementById('nextProfile_a').checked = (hotkeys['nextProfile']['a'] ? true : false);
	document.getElementById('nextProfile_s').checked = (hotkeys['nextProfile']['s'] ? true : false);
	document.getElementById('nextProfile_k').value = keycodes[hotkeys['nextProfile']['k']];
	document.getElementById('selectProfile_c').checked = (hotkeys['selectProfile']['c'] ? true : false);
	document.getElementById('selectProfile_a').checked = (hotkeys['selectProfile']['a'] ? true : false);
	document.getElementById('selectProfile_s').checked = (hotkeys['selectProfile']['s'] ? true : false);
	document.getElementById('tte7').title = _getMessage('opts_29');
	document.getElementById('tte8').title = _getMessage('opts_30');
	document.getElementById('tte77').title = _getMessage('opts_29');
	document.getElementById('tte88').title = _getMessage('opts_30');
	document.getElementById('autoswitch').title = _getMessage('opts_39');
	document.getElementById('autoswitch').nextSibling.title = _getMessage('opts_39');
	document.getElementById('autoswitch').nextSibling.nextSibling.title = _getMessage('opts_39');
	document.getElementById('autoswitch').checked = (localStorage.autoswitch ? true : false);
	var m = document.getElementsByClassName('mopts');
	for (var i = 0; i < m.length; i++) {
		m[i].innerHTML = _getMessage(m[i].getAttribute('mid'));
	}
	m = document.getElementsByTagName('li');
	for (i = 0; i < m.length; i++) {
		m[i].addEventListener('click', function () {
			switchTab(this);
		}, false);
	}
	document.getElementById('autoswitch').addEventListener('change', function () {
		localStorage.autoswitch = (this.checked ? 1 : '');
	}, false);
	m = document.querySelectorAll('input[type=text]');
	for (i = 0; i < m.length; i++) {
		m[i].addEventListener('keydown', function (event) {
			this.value = (keycodes[event.keyCode] ? keycodes[event.keyCode] : '');
			prevDef(event);
			return false;
		}, false);
	}
	m = document.getElementsByTagName('button');
	m[0].addEventListener('click', function () {
		saveh(this);
	}, false);
	m[1].addEventListener('click', function () {
		performExport(this);
		this.parentNode.nextSibling.nextSibling.style.display = 'block';
		this.parentNode.style.display = 'none';
	}, false);
	m[2].addEventListener('click', function () {
		document.getElementsByTagName('textarea')[0].focus();
		document.getElementsByTagName('textarea')[0].select();
		document.execCommand('Copy');
		document.getElementsByTagName('textarea')[0].value += ' ';
		document.getElementsByTagName('textarea')[0].value = document.getElementsByTagName('textarea')[0].value.slice(0, -1);
		document.getElementsByTagName('textarea')[0].blur();
	}, false);
	m[3].addEventListener('click', function () {
		performImport(this);
	}, false);
};
saveh = function () {
	document.getElementById('result_switchPreviousTab').parentNode.getElementsByTagName('img')[0].style.display = 'none';
	document.getElementById('result_switchNextTab').parentNode.getElementsByTagName('img')[0].style.display = 'none';
	document.getElementById('result_prevProfile').parentNode.getElementsByTagName('img')[0].style.display = 'none';
	document.getElementById('result_nextProfile').parentNode.getElementsByTagName('img')[0].style.display = 'none';
	document.getElementById('result_selectProfile').parentNode.getElementsByTagName('img')[0].style.display = 'none';
	document.getElementById('result_switchPreviousTab').parentNode.getElementsByTagName('img')[1].style.display = 'none';
	document.getElementById('result_switchNextTab').parentNode.getElementsByTagName('img')[1].style.display = 'none';
	document.getElementById('result_prevProfile').parentNode.getElementsByTagName('img')[1].style.display = 'none';
	document.getElementById('result_nextProfile').parentNode.getElementsByTagName('img')[1].style.display = 'none';
	document.getElementById('result_selectProfile').parentNode.getElementsByTagName('img')[1].style.display = 'none';
	document.getElementById('result_switchPreviousTab').innerHTML = '&nbsp;';
	document.getElementById('result_switchNextTab').innerHTML = '&nbsp;';
	document.getElementById('result_prevProfile').innerHTML = '&nbsp;';
	document.getElementById('result_nextProfile').innerHTML = '&nbsp;';
	document.getElementById('result_selectProfile').innerHTML = '&nbsp;';

	var pt = [
		document.getElementById('switchPreviousTab_c'),
		document.getElementById('switchPreviousTab_a'),
		document.getElementById('switchPreviousTab_s'),
		document.getElementById('switchPreviousTab_k')
	];
	var nt = [
		document.getElementById('switchNextTab_c'),
		document.getElementById('switchNextTab_a'),
		document.getElementById('switchNextTab_s'),
		document.getElementById('switchNextTab_k')
	];
	var pp = [
		document.getElementById('prevProfile_c'),
		document.getElementById('prevProfile_a'),
		document.getElementById('prevProfile_s'),
		document.getElementById('prevProfile_k')
	];
	var np = [
		document.getElementById('nextProfile_c'),
		document.getElementById('nextProfile_a'),
		document.getElementById('nextProfile_s'),
		document.getElementById('nextProfile_k')
	];
	var sp = [
		document.getElementById('selectProfile_c'),
		document.getElementById('selectProfile_a'),
		document.getElementById('selectProfile_s')
	];
	if ((!pt[0].checked && !pt[1].checked && !pt[2].checked) || !pt[3].value) {
		if (pt[0].checked || pt[1].checked || pt[2].checked || pt[3].value) {
			document.getElementById('result_switchPreviousTab').innerHTML = _getMessage('opts_12');
			document.getElementById('result_switchPreviousTab').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
		}
		pt = undefined;
	}
	if ((!nt[0].checked && !nt[1].checked && !nt[2].checked) || !nt[3].value) {
		if (nt[0].checked || nt[1].checked || nt[2].checked || nt[3].value) {
			document.getElementById('result_switchNextTab').innerHTML = _getMessage('opts_12');
			document.getElementById('result_switchNextTab').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
		}
		nt = undefined;
	}
	if ((!pp[0].checked && !pp[1].checked && !pp[2].checked) || !pp[3].value) {
		if (pp[0].checked || pp[1].checked || pp[2].checked || pp[3].value) {
			document.getElementById('result_prevProfile').innerHTML = _getMessage('opts_12');
			document.getElementById('result_prevProfile').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
		}
		pp = undefined;
	}
	if ((!np[0].checked && !np[1].checked && !np[2].checked) || !np[3].value) {
		if (np[0].checked || np[1].checked || np[2].checked || np[3].value) {
			document.getElementById('result_nextProfile').innerHTML = _getMessage('opts_12');
			document.getElementById('result_nextProfile').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
		}
		np = undefined;
	}
	if (!sp[0].checked && !sp[1].checked && !sp[2].checked) {
		sp = undefined;
	}

	if (sp) {
		if (pt && sp) {
			if (sp[0].checked == pt[0].checked && sp[1].checked == pt[1].checked && sp[2].checked == pt[2].checked && pt[3].value * 1 > 0 && pt[3].value * 1 <= 9) {
				document.getElementById('result_switchPreviousTab').innerHTML = _getMessage('opts_11');
				document.getElementById('result_switchPreviousTab').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
				document.getElementById('result_selectProfile').innerHTML = _getMessage('opts_11');
				document.getElementById('result_selectProfile').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
				sp = undefined;
				pt = undefined;
			}
		}
		if (nt && sp) {
			if (sp[0].checked == nt[0].checked && sp[1].checked == nt[1].checked && sp[2].checked == nt[2].checked && nt[3].value * 1 > 0 && nt[3].value * 1 <= 9) {
				document.getElementById('result_switchNextTab').innerHTML = _getMessage('opts_11');
				document.getElementById('result_switchNextTab').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
				document.getElementById('result_selectProfile').innerHTML = _getMessage('opts_11');
				document.getElementById('result_selectProfile').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
				sp = undefined;
				pt = undefined;
			}
		}
		if (pp && sp) {
			if (sp[0].checked == pp[0].checked && sp[1].checked == pp[1].checked && sp[2].checked == pp[2].checked && pp[3].value * 1 > 0 && pp[3].value * 1 <= 9) {
				document.getElementById('result_prevProfile').innerHTML = _getMessage('opts_11');
				document.getElementById('result_prefProfile').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
				document.getElementById('result_selectProfile').innerHTML = _getMessage('opts_11');
				document.getElementById('result_selectProfile').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
				sp = undefined;
				pp = undefined;
			}
		}
		if (np && sp) {
			if (sp[0].checked == np[0].checked && sp[1].checked == np[1].checked && sp[2].checked == np[2].checked && np[3].value * 1 > 0 && np[3].value * 1 <= 9) {
				document.getElementById('result_nextProfile').innerHTML = _getMessage('opts_11');
				document.getElementById('result_nextProfile').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
				document.getElementById('result_selectProfile').innerHTML = _getMessage('opts_11');
				document.getElementById('result_selectProfile').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
				sp = undefined;
				np = undefined;
			}
		}
	}

	if (pt) {
		if (nt && pt) {
			if (pt[0].checked == nt[0].checked && pt[1].checked == nt[1].checked && pt[2].checked == nt[2].checked && pt[3].value == nt[3].value) {
				document.getElementById('result_switchPreviousTab').innerHTML = _getMessage('opts_11');
				document.getElementById('result_switchPreviousTab').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
				document.getElementById('result_switchNextTab').innerHTML = _getMessage('opts_11');
				document.getElementById('result_switchnextTab').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
				pt = undefined;
				nt = undefined;
			}
		}
		if (pp && pt) {
			if (pt[0].checked == pp[0].checked && pt[1].checked == pp[1].checked && pt[2].checked == pp[2].checked && pt[3].value == pp[3].value) {
				document.getElementById('result_switchPreviousTab').innerHTML = _getMessage('opts_11');
				document.getElementById('result_switchPreviousTab').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
				document.getElementById('result_prevProfile').innerHTML = _getMessage('opts_11');
				document.getElementById('result_prefProfile').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
				pt = undefined;
				pp = undefined;
			}
		}
		if (np && pt) {
			if (pt[0].checked == np[0].checked && pt[1].checked == np[1].checked && pt[2].checked == np[2].checked && pt[3].value == np[3].value) {
				document.getElementById('result_switchPreviousTab').innerHTML = _getMessage('opts_11');
				document.getElementById('result_switchPreviousTab').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
				document.getElementById('result_nextProfile').innerHTML = _getMessage('opts_11');
				document.getElementById('result_nextProfile').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
				pt = undefined;
				np = undefined;
			}
		}
	}
	if (nt) {
		if (pp && nt) {
			if (nt[0].checked == pp[0].checked && nt[1].checked == pp[1].checked && nt[2].checked == pp[2].checked && nt[3].value == pp[3].value) {
				document.getElementById('result_switchNextTab').innerHTML = _getMessage('opts_11');
				document.getElementById('result_switchNextTab').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
				document.getElementById('result_prevProfile').innerHTML = _getMessage('opts_11');
				document.getElementById('result_prevProfile').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
				nt = undefined;
				pp = undefined;
			}
		}
		if (np && nt) {
			if (nt[0].checked == np[0].checked && nt[1].checked == np[1].checked && nt[2].checked == np[2].checked && nt[3].value == np[3].value) {
				document.getElementById('result_switchNextTab').innerHTML = _getMessage('opts_11');
				document.getElementById('result_switchNextTab').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
				document.getElementById('result_nextProfile').innerHTML = _getMessage('opts_11');
				document.getElementById('result_nextProfile').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
				nt = undefined;
				np = undefined;
			}
		}
	}
	if (pp) {
		if (pp && np) {
			if (np[0].checked == pp[0].checked && np[1].checked == pp[1].checked && np[2].checked == pp[2].checked && np[3].value == pp[3].value) {
				document.getElementById('result_prevProfile').innerHTML = _getMessage('opts_11');
				document.getElementById('result_prefProfile').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
				document.getElementById('result_nextProfile').innerHTML = _getMessage('opts_11');
				document.getElementById('result_nextProfile').parentNode.getElementsByTagName('img')[0].style.display = 'inline';
				np = undefined;
				pp = undefined;
			}
		}
	}
	if (pt) {
		document.getElementById('result_switchPreviousTab').parentNode.getElementsByTagName('img')[1].style.display = 'inline';
	}
	if (nt) {
		document.getElementById('result_switchNextTab').parentNode.getElementsByTagName('img')[1].style.display = 'inline';
	}
	if (pp) {
		document.getElementById('result_prevProfile').parentNode.getElementsByTagName('img')[1].style.display = 'inline';
	}
	if (np) {
		document.getElementById('result_nextProfile').parentNode.getElementsByTagName('img')[1].style.display = 'inline';
	}
	if (sp) {
		document.getElementById('result_selectProfile').parentNode.getElementsByTagName('img')[1].style.display = 'inline';
	}
	hotkeys['switchPreviousTab']['c'] = (document.getElementById('switchPreviousTab_c').checked ? 1 : 0);
	hotkeys['switchPreviousTab']['a'] = (document.getElementById('switchPreviousTab_a').checked ? 1 : 0);
	hotkeys['switchPreviousTab']['s'] = (document.getElementById('switchPreviousTab_s').checked ? 1 : 0);
	localStorage.hotkeys = JSON.stringify({
		switchPreviousTab: {
			c: (document.getElementById('switchPreviousTab_c').checked ? 1 : 0),
			a: (document.getElementById('switchPreviousTab_a').checked ? 1 : 0),
			s: (document.getElementById('switchPreviousTab_s').checked ? 1 : 0),
			k: keycodes.in_array(document.getElementById('switchPreviousTab_k').value)
		},
		switchNextTab: {
			c: (document.getElementById('switchNextTab_c').checked ? 1 : 0),
			a: (document.getElementById('switchNextTab_a').checked ? 1 : 0),
			s: (document.getElementById('switchNextTab_s').checked ? 1 : 0),
			k: keycodes.in_array(document.getElementById('switchNextTab_k').value)
		},
		prevProfile: {
			c: (document.getElementById('prevProfile_c').checked ? 1 : 0),
			a: (document.getElementById('prevProfile_a').checked ? 1 : 0),
			s: (document.getElementById('prevProfile_s').checked ? 1 : 0),
			k: keycodes.in_array(document.getElementById('prevProfile_k').value)
		},
		nextProfile: {
			c: (document.getElementById('nextProfile_c').checked ? 1 : 0),
			a: (document.getElementById('nextProfile_a').checked ? 1 : 0),
			s: (document.getElementById('nextProfile_s').checked ? 1 : 0),
			k: keycodes.in_array(document.getElementById('nextProfile_k').value)
		},
		selectProfile: {
			c: (document.getElementById('selectProfile_c').checked ? 1 : 0),
			a: (document.getElementById('selectProfile_a').checked ? 1 : 0),
			s: (document.getElementById('selectProfile_s').checked ? 1 : 0),
			k: 0
		}
	});
};
performExport = function () {
	var t1 = document.getElementById('tte1');
	var t2 = document.getElementById('tte2');
	var ex = '';
	if (t1.checked) {
		ex = JSON.stringify({
			accs: JSON.parse(localStorage.accs),
			hotkeys: JSON.parse(localStorage.hotkeys)
		});
	}
	else if (t2.checked) {
		ex = JSON.stringify({
			accs: JSON.parse(localStorage.accs)
		});
	}
	else {
		ex = JSON.stringify({
			hotkeys: JSON.parse(localStorage.hotkeys)
		});
	}
	var exx = '';
	for (var i = 0; i < ex.length; i++) {
		exx += leadingZero(ex.charCodeAt(i));
	}
	document.getElementsByTagName('textarea')[0].value = exx;
};
leadingZero = function (t) {
	t = t + '';
	while (t.length < 4) {
		t = '0' + t;
	}
	return t;
};
performImport = function (el) {
	document.getElementById('import_result').innerHTML = '';
	var t = document.getElementsByTagName('textarea')[1];
	if (!t.value) {
		document.getElementById('import_result').innerHTML = _getMessage('opts_32');
		return;
	}
	var dd = t.value;
	var ex = '';
	for (var i = 0; i < dd.length / 4; i++) {
		ex += String.fromCharCode(parseInt(dd.substr(i * 4, 4)));
	}
	if (!JSON.parse(ex)) {
		document.getElementById('import_result').innerHTML = _getMessage('opts_33');
		return;
	}
	var d = JSON.parse(ex);
	var t4 = document.getElementById('tte4');
	var t5 = document.getElementById('tte5');
	var t6 = document.getElementById('tte6');
	var t7 = document.getElementById('tte7');
	if (t5.checked && !d.accs) {
		document.getElementById('import_result').innerHTML = _getMessage('opts_34');
		return;
	}
	if (t6.checked && !d.hotkeys) {
		document.getElementById('import_result').innerHTML = _getMessage('opts_34');
		return;
	}
	if (d.accs && (t4.checked || t5.checked)) {
		if (t7.checked) {
			var aaa = ['vk', 'fb', 'tw', 'mr', 'ok'];
			var accs = JSON.parse(localStorage.accs);
			for (i = 0; i < aaa.length; i++) {
				if (d.accs[aaa[i]].length) {
					for (var j = 0; j < d.accs[aaa[i]].length; j++) {
						accs[aaa[i]][accs[aaa[i]].length] = d.accs[aaa[i]][j];
					}
				}
			}
			localStorage.accs = JSON.stringify(accs);
		}
		else {
			localStorage.accs = JSON.stringify(d.accs);
			localStorage.pinuse = JSON.stringify({
				vk: -1,
				fb: -1,
				tw: -1,
				mr: -1,
				ok: -1,
				gp: -1
			});
			localStorage.inuse = -1;
			mBadge('', 'gray', '')
		}
	}
	if (d.hotkeys && (t4.checked || t6.checked)) {
		localStorage.hotkeys = JSON.stringify(d.hotkeys);
	}
	document.getElementById('import_result').innerHTML = _getMessage('opts_35');
	el.outerHTML = '';
};
switchTab = function (el) {
	var tt = document.getElementsByClassName('tabs');
	var td = document.getElementsByClassName('tabdivs');
	for (var i = 0; i < tt.length; i++) {
		tt[i].className = 'tabs';
	}
	for (i = 0; i < td.length; i++) {
		td[i].style.display = 'none';
	}
	el.className = 'tabs selected';
	document.getElementById(el.getAttribute('name')).style.display = 'block';
};
document.addEventListener('DOMContentLoaded', initt, false);
