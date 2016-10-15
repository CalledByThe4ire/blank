'use strict';

const UID = {
	current: 0,
	getNew() {
		this.current++;
		return this.current;
	}
};

export default HTMLElement.prototype.pseudoStyle = function (element, prop, value) {
	const self = this;
	const sheetId = 'pseudoStyles';
	const head = document.head || document.getElementsByTagName('head')[0];
	const sheet = document.getElementById(sheetId) || document.createElement('style');
	sheet.id = sheetId;
	const className = 'pseudoStyle' + UID.getNew();

	self.className += ' ' + className;

	sheet.innerHTML += ' .' + className + ':' + element + '{' + prop + ':' + value + '}';
	head.appendChild(sheet);
	return this;
};
