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
	},
	/**
	 * Выполняет функцию fn не чаще одного раза в указанный в параметре delay период,
	 * даже если она будет вызвана неоднократно в течение указанного периода
	 * @param {Function} fn
	 * @param {Number} delay
	 * @return {Function}
	 */
	throttle(fn, delay) {
		let thisMoment = 0;
		return function () {
			if (Date.now() - thisMoment > delay) {
				fn();
				thisMoment = Date.now();
			}
		};
	},
	/**
	 * Выполняет глубокое копирование объекта
	 * и возвращает его клон
	 * @param {Object} obj
	 * @return {*}
	 */
	cloneObj(obj) {
		return JSON.parse(JSON.stringify(obj));
	}
};

export default utils;
