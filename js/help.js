function initp() {
	var m = document.getElementsByClassName('mopts');
	for (var i = 0; i < m.length; i++) {
		m[i].innerHTML = _getMessage(m[i].getAttribute('mid')) + m[i].innerHTML;
	}
	document.getElementsByTagName('ul')[0].addEventListener('mouseover', function () {
		showHelp('2');
	}, false);
	document.getElementsByTagName('ul')[0].addEventListener('mouseout', function () {
		showHelp('');
	}, false);
	document.getElementById('popup_6').addEventListener('mouseover', function () {
		showHelp('3');
	}, false);
	document.getElementById('popup_6').addEventListener('mouseout', function () {
		showHelp('');
	}, false);
	m = document.getElementsByTagName('td');
	for (i = 0; i < m.length / 3; i++) {
		m[3 * i].addEventListener('mouseover', function () {
			showHelp('4');
		}, false);
		m[3 * i].addEventListener('mouseout', function () {
			showHelp('');
		}, false);
		m[3 * i + 1].addEventListener('mouseover', function () {
			showHelp('5');
		}, false);
		m[3 * i + 1].addEventListener('mouseout', function () {
			showHelp('');
		}, false);
	}
	m = document.getElementsByTagName('img');
	for (i = 6; i < m.length / 2; i++) {
		m[2 * i].addEventListener('mouseover', function () {
			showHelp('6');
		}, false);
		m[2 * i].addEventListener('mouseout', function () {
			showHelp('');
		}, false);
		m[2 * i + 1].addEventListener('mouseover', function () {
			showHelp('7');
		}, false);
		m[2 * i + 1].addEventListener('mouseout', function () {
			showHelp('');
		}, false);
	}
	m = document.getElementsByTagName('a');
	m[1].addEventListener('mouseover', function () {
		showHelp('8');
	}, false);
	m[1].addEventListener('mouseout', function () {
		showHelp('');
	}, false);
	m[2].addEventListener('mouseover', function () {
		showHelp('9');
	}, false);
	m[2].addEventListener('mouseout', function () {
		showHelp('');
	}, false);
}
function showHelp(id) {
	document.getElementById('descr').innerHTML = _getMessage('help_' + id);
}
document.addEventListener('DOMContentLoaded', initp, false);
