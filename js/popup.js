var aprofiles = JSON.parse(localStorage.accs);
var pinuse = JSON.parse(localStorage.pinuse);
var tinuse = localStorage.tinuse;
var inuse = localStorage.inuse;
var profiles = aprofiles[tinuse];
var nets = JSON.parse(localStorage.nets);
function saveSettings() {
	pinuse[tinuse] = inuse;
	localStorage.inuse = inuse;
	localStorage.tinuse = tinuse;
	localStorage.pinuse = JSON.stringify(pinuse);
	aprofiles[tinuse] = profiles;
	localStorage.accs = JSON.stringify(aprofiles);
}
function switchTab(d) {
	document.getElementById(tinuse + '_tab').className = '';
	document.getElementById(d + '_tab').className = 'selected';
	tinuse = d;
	if (!aprofiles[tinuse]) {
		aprofiles[tinuse] = [];
	}
	profiles = aprofiles[tinuse];
	inuse = pinuse[tinuse];
	if (!profiles[inuse]) {
		inuse = -1;
	}
	if (inuse == -1) {
		mBadge('', 'gray', '');
	}
	else {
		mBadge(nets[tinuse]['title'] + (inuse * 1 + 1), nets[tinuse]['badge'], profiles[inuse]['title']);
	}
	saveSettings();
	initp();
}
function switchProfile(d) {
	if (profiles[d] != undefined && profiles[d] != null && d != inuse) {
		if (inuse >= 0) {
			document.getElementById('acci_' + inuse).style.fontWeight = 'normal';
		}
		var deleter = function (cii) {
			chrome.cookies.getAll({domain: nets[tinuse]['cookies'][cii]}, function (f) {
				deleteCookies(f);
				if (cii < (nets[tinuse]['cookies'].length - 1)) {
					cii++;
					deleter(cii);
				}
				else {
					restoreCookies(profiles[d].cookies);
					inuse = d;
					saveSettings();
					document.getElementById('acci_' + inuse).style.fontWeight = 'bold';
					mBadge(nets[tinuse]['title'] + (inuse * 1 + 1), nets[tinuse]['badge'], profiles[inuse]['title']);
				}
			});
		};
		deleter(0);
	}
}
function logoud() {
	inuse = -1;
	saveSettings();
	mBadge('', 'gray', '');
}
function editAccount(el) {
	var title = el.innerHTML;
	el.outerHTML = '<input type="text" id="' + el.id + '_edit" name="' + el.id + '" value="' + title + '" />';
	document.getElementById(el.id + '_edit').addEventListener('blur', function () {
		updateAccount(this);
	}, false);
	document.getElementById(el.id + '_edit').addEventListener('keydown', function (event) {
		updateAccount2(this, event);
	}, false);
	document.getElementById(el.id + '_edit').addEventListener('click', function (event) {
		prevDef(event);
		return false
	}, false);
	document.getElementById(el.id + '_edit').focus();
}
function updateAccount(el) {
	if (!el.value) {
		return;
	}
	var val = el.value;
	var p = el.parentNode;
	var eid = el.name;
	try {
		p.removeChild(el);
	}
	catch (e) {}
	p.innerHTML = '<span id="' + eid + '" style="word-wrap:break-word">' + val + '</span>';
	document.getElementById('accedit_' + eid).style.visibility = 'visible';
	profiles[eid]['title'] = val;
	if (eid == inuse) {
		mBadge(nets[tinuse]['title'] + (inuse * 1 + 1), nets[tinuse]['badge'], profiles[inuse]['title']);
	}
	saveSettings();
}
function updateAccount2(el, ev) {
	ev = ev || window.event;
	if (event.keyCode == 13) {
		updateAccount(el);
	}
}
function deleteProfile(d) {
	if (inuse == d) {
		logoud();
	}
	profiles.splice(d, 1);
	saveSettings();
	initp();
}
function deleteCookies(e) {
	for (var b = 0; b < e.length; b++) {
		try {
			var d = e[b];
			var a = ((d.secure) ? 'https://' : 'http://') + d.domain + d.path;
			deleteCookie(a, d.name, d.storeId);
		} catch (c) {}
	}
}
function deleteCookie(c, b, a) {
	chrome.cookies.remove({
		url: c,
		name: b,
		storeId: a
	});
}
function restoreCookies(e) {
	for (var a = 0; a < e.length; a++) {
		try {
			var d = e[a];
			var b = {};
			b.url = ((d.secure) ? 'https://' : 'http://') + d.domain;
			b.name = d.name;
			b.storeId = d.storeId;
			b.value = d.value;
			if (!d.hostOnly) {
				b.domain = d.domain;
			}
			b.path = d.path;
			b.secure = d.secure;
			b.httpOnly = d.httpOnly;
			//b.hostOnly = d.hostOnly;
			//b.session = d.session;
			if (!d.session) {
				b.expirationDate = d.expirationDate;
			}
			chrome.cookies.set(b);
		} catch (c) {}
	}
}
function mBadge(bText, bColor, bTitle) {
	if (bColor == 'gray') {
		bColor = [128, 128, 128, 255];
	}
	chrome.browserAction.setBadgeBackgroundColor({color: bColor});
	chrome.browserAction.setBadgeText({text: '' + bText});
	chrome.browserAction.setTitle({title: bTitle});
}
function asssize(param) {
	var size = 0;
	for (var name in param) {
		if (param[name]) {
			size++;
		}
	}
	return size;
}
function newAcc() {
	var list = document.getElementById('drag');
	if (list.innerHTML == _getMessage('popup_1')) {
		list.innerHTML = '<table id="accs" cellpadding="2" cellspacing="2"></table>';
	}
	var listt = document.getElementById('accs');
	var n = document.createElement('TR');
	var name = asssize(profiles);
	name = name * 1;
	n.id = 'acci_' + name;
	n.style.fontWeight = 'bold';
	n.innerHTML = '<td class="mark">' + (name * 1 + 1) + '.</td><td class="et" name="' + name + '" nowrap><span id="' + name + '">' + _getMessage('popup_2') + (name * 1 + 1) + '</span></td><td class="mark"><img src="img/ico_edit.gif" name="' + name + '" id="accedit_' + name + '" style="height:16px;border:0;cursor:pointer" /><img src="img/ico_del.gif" name="' + name + '" id="accedel_' + name + '" style="height:16px;border:0;cursor:pointer" />&nbsp;*nbsp;<img src="img/new.gif" name="' + name + '" id="accnew_' + name + '" style="height:16px;border:0;cursor:pointer" /></td>';
	var ii = 0;
	var initer = function (cii) {
		chrome.cookies.getAll({domain: nets[tinuse]['cookies'][cii]}, function (f) {
			var nc = asssize(profiles) - 1;
			profiles[nc].cookies = profiles[nc].cookies.concat(f);
			if (cii < (nets[tinuse]['cookies'].length - 1)) {
				cii++;
				initer(cii);
			}
			else {
				saveSettings();
				initp();
				document.getElementById('accedit_' + name).click();
			}
		});
	};

	chrome.cookies.getAll({domain: nets[tinuse]['cookies'][0]}, function (f) {
		var nc = asssize(profiles);
		profiles[nc] = {title: 'New profile ' + nc, cookies: f};
		if (inuse != (-1) && document.getElementById('acci_' + inuse)) {
			document.getElementById('acci_' + inuse).style.fontWeight = 'normal';
		}
		inuse = nc;
		mBadge(nets[tinuse]['title'] + (inuse * 1 + 1), nets[tinuse]['badge'], profiles[inuse]['title']);
		if (ii < (nets[tinuse]['cookies'].length - 1)) {
			ii++;
			initer(ii);
		}
		else {
			saveSettings();
			initp();
			document.getElementById('accedit_' + name).click();
		}
	});
	return false;
}
function initp() {
	var list = document.getElementById('drag');
	if (!asssize(profiles)) {
		list.innerHTML = _getMessage('popup_1');
	}
	else {
		var nh = '<table id="accs" cellpadding="2" cellspacing="2">';
		for (var name in profiles) {
			if (profiles[name]) {
				nh += '<tr id="acci_' + name + '" ' + (name == inuse ? 'style="font-weight:bold"' : '') + '><td class="mark">' + (name * 1 + 1) + '.</td><td class="et" name="' + name + '" ><div class="drag"><span id="' + name + '" style="word-wrap:break-word">' + profiles[name]['title'] + '</span></div></td><td class="mark"><img src="img/ico_edit.gif" title="' + _getMessage('popup_8') + '" name="' + name + '" id="accedit_' + name + '" style="height:18px;border:1px solid transparent;cursor:pointer;padding:2px;margin-top:-3px;margin-bottom:-3px;" /><img src="img/ico_del.gif" title="' + _getMessage('popup_9') + '" name="' + name + '" id="accedel_' + name + '" style="height:18px;border:1px solid transparent;cursor:pointer;padding:2px;margin-top:-3px;margin-bottom:-3px;" />&nbsp;&nbsp;<img src="img/new.gif" name="' + name + '" id="accnew_' + name + '" style="height:14px;border:1px solid transparent;cursor:pointer;padding:2px;margin-top:-3px;" title="' + _getMessage('popup_10') + '" /></td></tr>';
			}
		}
		nh += '</table>';
		list.innerHTML = nh;
		for (var name in profiles) {
			if (profiles[name]) {
				document.getElementById('acci_' + name).getElementsByClassName('et')[0].addEventListener('click', function () {
					switchProfile(this.getAttribute('name'));
				}, false);
				document.getElementById('accedit_' + name).addEventListener('click', function () {
					this.style.visibility = 'hidden';
					editAccount(document.getElementById(this.getAttribute('name')));
				}, false);
				document.getElementById('accedel_' + name).addEventListener('click', function () {
					deleteProfile(this.getAttribute('name'));
				}, false);
				document.getElementById('accnew_' + name).addEventListener('click', function () {
					openProfile(this.getAttribute('name'));
				}, false);

				document.getElementById('accedit_' + name).addEventListener('mouseover', function () {
					this.style.border = '1px solid #0000FF';
				}, false);
				document.getElementById('accedel_' + name).addEventListener('mouseover', function () {
					this.style.border = '1px solid #0000FF';
				}, false);
				document.getElementById('accnew_' + name).addEventListener('mouseover', function () {
					this.style.border = '1px solid #0000FF';
				}, false);
				document.getElementById('accedit_' + name).addEventListener('mouseout', function () {
					this.style.border = '1px solid transparent';
				}, false);
				document.getElementById('accedel_' + name).addEventListener('mouseout', function () {
					this.style.border = '1px solid transparent';
				}, false);
				document.getElementById('accnew_' + name).addEventListener('mouseout', function () {
					this.style.border = '1px solid transparent';
				}, false);
			}
		}
		REDIPS.drag.style.borderEnabled = 'none';
		REDIPS.drag.dropMode = 'switch';
		REDIPS.drag.init();
		REDIPS.drag.event.switched = function (ttt) {
			switchProfiles(REDIPS.drag.td.source, REDIPS.drag.td.target);
		}
	}
}
function switchProfiles(s, d) {
	s = s.getAttribute('name');
	d = d.getAttribute('name');
	if (inuse == s) {
		document.getElementById('acci_' + inuse).style.fontWeight = 'normal';
		mBadge(nets[tinuse]['title'] + (inuse * 1 + 1), nets[tinuse]['badge'], profiles[inuse]['title']);
		inuse = d;
		document.getElementById('acci_' + inuse).style.fontWeight = 'bold';
	}
	var a = profiles[s];
	profiles[s] = profiles[d];
	profiles[d] = a;
	saveSettings();
	initp();
}
function init() {
	document.getElementById('readmea').href = chrome.extension.getURL('help.html');
	document.getElementById('readmeb').href = chrome.extension.getURL('options.html');
	document.getElementById(tinuse + '_tab').className = 'selected';
	document.getElementById('readmea').title = _getMessage('popup_5');
	document.getElementById('readmeb').title = _getMessage('popup_7');
	document.getElementById('popup_6').title = _getMessage('popup_6');
	document.getElementById('popup_6').innerHTML = _getMessage('popup_4');
	document.getElementById('popup_3').innerHTML = _getMessage('popup_3');
	document.getElementById('popup_6').addEventListener('click', function (event) {
		newAcc();
		prevDef(event);
		return false;
	}, false);
	document.getElementById('vk_tab').addEventListener('click', function () {
		switchTab('vk');
	}, false);
	document.getElementById('fb_tab').addEventListener('click', function () {
		switchTab('fb');
	}, false);
	document.getElementById('tw_tab').addEventListener('click', function () {
		switchTab('tw');
	}, false);
	document.getElementById('fb_tab').addEventListener('click', function () {
		switchTab('fb');
	}, false);
	document.getElementById('mr_tab').addEventListener('click', function () {
		switchTab('mr');
	}, false);
	document.getElementById('ok_tab').addEventListener('click', function () {
		switchTab('ok');
	}, false);
	document.getElementById('gp_tab').addEventListener('click', function () {
		switchTab('gp');
	}, false);
	initp();
}
function openProfile(id) {
	if (id) {
		chrome.extension.getBackgroundPage().openProfile(id, nets[tinuse].url);
	}
}
document.addEventListener('DOMContentLoaded', init, false);
