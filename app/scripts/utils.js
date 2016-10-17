'use strict';

const utils = {
	/**
	* Записывает в св-во value элемента текущую дату
	* @param name
	*/
	setInputDate(name) {
		const elem = document.querySelector(name);
		const date = new Date();
		let day = date.getDate();
		let month = date.getMonth() + 1;
		const year = date.getFullYear();
		let formattedDate = '';

		if (day < 10) {
			day = '0' + day;
		}
		if (month < 10) {
			month = '0' + month;
		}

		formattedDate = year + '-' + month + '-' + day;

		elem.value = formattedDate;
	}
};

export default utils;
