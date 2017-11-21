var aprofiles = '';
var pinuse = '';
var tinuse = '';
var inuse = '';
var profiles = '';
var nets = '';
var autoswitch = false;
var pt = {
	vk: 'gp',
	fb: 'vk',
	tw: 'fb',
	mr: 'tw',
	ok: 'mr',
	gp: 'ok'
};
var nt = {
	vk: 'fb',
	fb: 'tw',
	tw: 'mr',
	mr: 'ok',
	ok: 'gp',
	gp: 'vk'
};
var hotkeys = '';
var tabs = {};
var nameTranslation = {
	expires: 'expirationDate',
	HttpOnly: 'httpOnly',
	HostOnly: 'hostOnly',
	Secure: 'secure'
};
function init() {
	if (!localStorage.inited) {
		localStorage.pinuse = JSON.stringify({
			vk: -1,
			fb: -1,
			tw: -1,
			mr: -1,
			ok: -1,
			gp: -1
		});
		localStorage.accs = JSON.stringify({
			vk: [],
			fb: [],
			tw: [],
			mr: [],
			ok: [],
			gp: []
		});
		localStorage.hotkeys = JSON.stringify({
			switchPreviousTab: {
				c: 0,
				a: 0,
				s: 0,
				k: 0
			},
			switchNextTab: {
				c: 0,
				a: 0,
				s: 0,
				k: 0
			},
			prevProfile: {
				c: 0,
				a: 0,
				s: 0,
				k: 0
			},
			nextProfile: {
				c: 0,
				a: 0,
				s: 0,
				k: 0
			},
			selectProfile: {
				c: 0,
				a: 0,
				s: 0,
				k: 0
			}
		});
		localStorage.tinuse = 'vk';
		localStorage.inuse = -1;
		localStorage.inited = true;
		chrome.tabs.create({url: chrome.extension.getURL('options.html')});
	}
	localStorage.nets = JSON.stringify({
		vk: {
			title: 'V',
			ltitle: 'Vkontakte',
			cookies: ['vk.com'],
			url: 'http://vk.com/',
			badge: [95, 125, 157, 255]
		},
		fb: {
			title: 'F',
			ltitle: 'Facebook',
			cookies: ['facebook.com', 'on.fb.me'],
			url: 'http://facebook.com/',
			badge: [59, 89, 152, 255]
		},
		tw: {
			title: 'T',
			ltitle: 'Twiter',
			cookies: ['twitter.com', 'api.twitter.com', 'scribe.twitter.com'],
			url: 'http://twitter.com/',
			badge: [1, 154, 210, 255]
		},
		mr: {
			title: '@',
			ltitle: 'Mail.ru',
			cookies: ['mail.ru'],
			url: 'http://my.mail.ru/',
			badge: [43, 96, 146, 255]
		},
		ok: {
			title: 'O',
			ltitle: 'Odnoklassniki',
			cookies: ['ok.ru'],
			url: 'http://ok.ru/',
			badge: [246, 133, 31, 255]
		},
		gp: {
			title: 'G',
			ltitle: 'Google',
			cookies: ['google.com', 'youtube.com', 'google.com.ua', 'google.ru'],
			url: 'http://plus.google.com/',
			badge: [221, 75, 57, 255]
		}
	});
	if (!localStorage.hotkeys) {
		localStorage.hotkeys = JSON.stringify({
			switchPreviousTab: {
				c: 0,
				a: 0,
				s: 0,
				k: 0
			},
			switchNextTab: {
				c: 0,
				a: 0,
				s: 0,
				k: 0
			},
			prevProfile: {
				c: 0,
				a: 0,
				s: 0,
				k: 0
			},
			nextProfile: {
				c: 0,
				a: 0,
				s: 0,
				k: 0
			},
			selectProfile: {
				c: 0,
				a: 0,
				s: 0,
				k: 0
			}
		});
	}
	aprofiles = JSON.parse(localStorage.accs);
	pinuse = JSON.parse(localStorage.pinuse);
	tinuse = localStorage.tinuse;
	inuse = localStorage.inuse;
	profiles = aprofiles[tinuse];
	nets = JSON.parse(localStorage.nets);
	autoswitch = localStorage.autoswitch;
	pt = {
		vk: 'gp',
		fb: 'vk',
		tw: 'fb',
		mr: 'tw',
		ok: 'mr',
		gp: 'ok'
	};
	nt = {
		vk: 'fb',
		fb: 'tw',
		tw: 'mr',
		mr: 'ok',
		ok: 'gp',
		gp: 'vk'
	};
	hotkeys = JSON.parse(localStorage.hotkeys);
	if (inuse == -1) {
		mBadge('', 'gray', '')
	}
	else {
		mBadge(nets[tinuse]['title'] + (inuse * 1 + 1), nets[tinuse]['badge'], profiles[inuse]['title']);
	}
	for (var i = 0; i < profiles.length; i++) {
		if (!profiles[i]) {
			profiles.splice(i, 1);
			i--;
		}
	}
	saveSettings();
	for (var name in aprofiles) {
		for (i = 0; i < aprofiles[name].length; i++) {
			if (!aprofiles[name][i]) {
				aprofiles[name].splice(i, 1);
				i--;
			}
		}
	}
	saveSettings();
}
function saveSettings() {
	pinuse[tinuse] = inuse;
	localStorage.inuse = inuse;
	localStorage.tinuse = tinuse;
	localStorage.pinuse = JSON.stringify(pinuse);
	aprofiles[tinuse] = profiles;
	localStorage.accs = JSON.stringify(aprofiles);
}
function loadSettings() {
	aprofiles = JSON.parse(localStorage.accs);
	pinuse = JSON.parse(localStorage.pinuse);
	tinuse = localStorage.tinuse;
	inuse = localStorage.inuse;
	profiles = aprofiles[tinuse];
	hotkeys = JSON.parse(localStorage.hotkeys);
	autoswitch = localStorage.autoswitch;
}
function switchTab(d) {
	tinuse = d;
	profiles = aprofiles[tinuse];
	inuse = pinuse[tinuse];
	if (inuse == -1) {
		mBadge('', 'gray', '')
	}
	else {
		mBadge(nets[tinuse]['title'] + (inuse * 1 + 1), nets[tinuse]['badge'], profiles[inuse]['title']);
	}
	saveSettings();
}
function switchProfile(d) {
	if (profiles[d] != undefined && profiles[d] != null && d != inuse) {
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
					mBadge(nets[tinuse]['title'] + (inuse * 1 + 1), nets[tinuse]['badge'], profiles[inuse]['title']);
				}
			});
		};
		deleter(0);
	}
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
	})
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
				b.domain = d.domain
			}
			b.path = d.path;
			b.secure = d.secure;
			b.httpOnly = d.httpOnly;
			if (!d.session) {
				b.expirationDate = d.expirationDate
			}
			chrome.cookies.set(b)
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
function openProfile(id, url) {
	url = url || 'http://vk.com/';
	if (url.indexOf('#') > -1) {
		url = url.substr(0, url.indexOf('#') + 1) + encodeURIComponent(url.substr(url.indexOf('#') + 1));
	}
	loadSettings();
	chrome.tabs.create({url: url}, function (r) {
		if (r) {
			tabs[r.id + ''] = [tinuse, id, aprofiles[tinuse][id].cookies.slice()];
		}
	});
}
chrome.webRequest.onBeforeSendHeaders.addListener(function (d) {
	if (d.tabId) {
		var td = d.tabId + '';
		if (tabs[td]) {
			td = tabs[td];
			var dm = d.url.match(/^https?\:\/\/([^\/]+)/);
			for (var i = 0; i < d.requestHeaders.length; i++) {
				if (d.requestHeaders[i].name == 'Cookie') {
					var cks = d.requestHeaders[i].value.split('; ');
					for (var k = 0; k < td[2].length; k++) {
						if (td[2][k].expirationDate && new Date(td[2][k].expirationDate * 1000) < new Date()) {
							td[2].splice(k, 1);
							k--;
						}
					}
					for (var j = 0; j < cks.length; j++) {
						cks[j] = cks[j].split('=');
						var f = false;
						for (k = 0; k < td[2].length; k++) {
							if (td[2][k].name == cks[j][0] && (td[2][k].domain == dm || (td[2][k].domain.substr(0, 1) == '.' && td[2][k].domain.indexOf(dm) > -1))) {
								cks[j][1] = td[2][k].value;
								f = true;
								break;
							}
						}
						cks[j] = cks[j].join('=');
						if (!f) {
							cks.splice(j, 1);
							j--;
						}
					}
					for (k = 0; k < td[2].length; k++) {
						f = false;
						for (j = 0; j < cks.length; j++) {
							cks[j] = cks[j].split('=');
							if (td[2][k].name == cks[j][0] && (td[2][k].domain == dm || (td[2][k].domain.substr(0, 1) == '.' && td[2][k].domain.indexOf(dm) > -1))) {
								cks[j] = cks[j].join('=');
								f = true;
								break;
							}
							cks[j] = cks[j].join('=');
						}
						if (!f) {
							cks.push(td[2][k].name + '=' + td[2][k].value);
						}
					}
					d.requestHeaders[i].value = cks.join('; ');
				}
			}
		}
	}
	return {requestHeaders: d.requestHeaders};
}, {
	urls: ['<all_urls>']
}, [
	'blocking',
	'requestHeaders'
]);
chrome.webRequest.onHeadersReceived.addListener(function (d) {
	if (d.tabId) {
		var td = d.tabId + '';
		if (tabs[td]) {
			td = tabs[td];
			var dm = d.url.match(/^https?\:\/\/([^\/]+)/);
			for (var i = 0; i < d.responseHeaders.length; i++) {
				if (d.responseHeaders[i].name == 'Set-Cookie') {
					var sk = d.responseHeaders[i].value.split('; ');
					sk[0] = sk[0].split('=');
					var ck = {name: sk[0][0], value: sk[0][1]};
					for (var j = 1; j < sk.length; j++) {
						sk[j] = sk[j].split('=');
						ck[(nameTranslation[sk[j][0]] || sk[j][0])] = sk[j][1];
					}
					if (ck.expirationDate) {
						ck.expirationDate = new Date(ck.expirationDate).valueOf() / 1000;
					}
					var f = false;
					for (var k = 0; k < td[2].length; k++) {
						if (td[2][k].name == ck.name && td[2][k].path == ck.path && (!td.domain || td[2][k].domain == ck.domain || td[2][k].domain.substr(1) == ck.domain || ck.domain.substr(1) == td[2][k].domain)) {
							if (ck.expirationDate && new Date(ck.expirationDate) < new Date()) {
								td[2].splice(k, 1);
								k--;
								f = true;
								break;
							}
							td[2][k].value = ck.value;
							td[2][k].expirationDate = ck.expirationDate;
							if (ck.domain && ck.domain.substr(0, 1) == '.') {
								td[2][k].domain = ck.domain;
							}
							f = true;
							break;
						}
					}
					if (!f) {
						td[2].push(ck);
					}
					d.responseHeaders.splice(i, 1);
					i--;
				}
			}
		}
	}
	return {responseHeaders: d.responseHeaders};
}, {
	urls: ['<all_urls>']
}, [
	'blocking',
	'responseHeaders'
]);
chrome.tabs.onCreated.addListener(function (tab) {
	if (tab.openerTabId) {
		if (tabs[tab.openerTabId + '']) {
			tabs[tab.id + ''] = tabs[tab.openerTabId + ''].slice();
		}
	}
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
	loadSettings();
	if (autoswitch) {
		chrome.tabs.get(tabId, function (tab) {
			if (tab.active) {
				if (changeInfo.url) {
					for (var name in nets) {
						for (var nname in nets[name]['cookies']) {
							if (changeInfo.url.indexOf(nets[name]['cookies'][nname]) > -1) {
								switchTab(name);
								return;
							}
						}
					}
				}
			}
		});
	}
});
chrome.tabs.onActiveChanged.addListener(function (tabId) {
	loadSettings();
	if (autoswitch) {
		chrome.tabs.get(tabId, function (tab) {
			for (var name in nets) {
				for (var nname in nets[name]['cookies']) {
					if (tab.url.indexOf(nets[name]['cookies'][nname]) > -1) {
						switchTab(name);
						return;
					}
				}
			}
		});
	}
});
chrome.tabs.onRemoved.addListener(function (tabId) {
	if (tabs[tabId]) {
		delete tabs[tabId];
	}
});
chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
	loadSettings();
	if (request.operation == 'hotkeys') {
		sendResponse({
			hotkeys: localStorage.hotkeys,
			messages: JSON.stringify([_getMessage('opts_36'), _getMessage('opts_37')])
		});
	}
	else if (request.operation == 'hotkey') {
		if (request.key == 'sp') {
			if (profiles[request.id * 1 - 1]) {
				switchProfile(request.id * 1 - 1);
				sendResponse({status: 'OK', message: profiles[request.id * 1 - 1]['title']});
			}
			else {
				sendResponse({status: 'error', message: ''});
			}
		}
		else if (request.key == 'pt') {
			switchTab(pt[tinuse]);
			sendResponse({status: 'OK', message: nets[tinuse]['ltitle']});
		}
		else if (request.key == 'nt') {
			switchTab(nt[tinuse]);
			sendResponse({status: 'OK', message: nets[tinuse]['ltitle']});
		}
		else if (request.key == 'pp') {
			if (!asssize(profiles)) {
				sendResponse({status: 'error', message: ''});
				return;
			}
			inuse = inuse * 1;
			while (!profiles[inuse - 1]) {
				inuse--;
				if (inuse <= 0) {
					inuse = (profiles.length);
				}
			}
			sendResponse({status: 'OK', message: profiles[inuse - 1]['title']});
			switchProfile(inuse - 1);
		}
		else if (request.key == 'np') {
			if (!asssize(profiles)) {
				sendResponse({status: 'error', message: ''});
				return;
			}
			inuse = inuse * 1;
			if (inuse == (profiles.length - 1)) {
				inuse = -1;
			}
			while (!profiles[inuse + 1]) {
				inuse++;
				if (inuse >= (profiles.length - 1)) {
					inuse = -1;
				}
			}
			sendResponse({status: 'OK', message: profiles[inuse + 1]['title']});
			switchProfile(inuse + 1);
		}
	}
	else {
		sendResponse({});
	}
});
document.addEventListener('DOMContentLoaded', init, false);
