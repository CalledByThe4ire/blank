'use strict';

import $ from 'jquery';
import 'jquery.cycle2';
import utils from '../../scripts/utils';

export default window.addEventListener('DOMContentLoaded', () => {


	const mql = window.matchMedia('only screen and (max-width: 1019px)');

	const THROTTLE_TIMEOUT = 100;

	// переменная для записи значения data-атрибута
	// выбранного в данный момент слайда
	let clickedElemData = '0';

	const slider = document.querySelector('.slider__slides');
	const sliderCaption = document.querySelector('.slider__caption');
	const slidesList = document.querySelectorAll('.slide');
	const slideContainer = document.querySelector('.slide').nodeName.toLowerCase();
	const slideSwappingContent = slidesList[2].querySelectorAll('.slide__text');

	const cycle2Obj = {
		slides: slideContainer,
		fx: 'scrollHorz',
		delay: 0,
		speed: 1000,
		timeout: 1000
	};

	/**
	 * Задает смещение относительно x-координаты
	 * @param {Number} x
	 */
	const setXCoord = x => sliderCaption.pseudoStyle('after', 'left', x + '%');

	/**
	 * В зависимости от переданного параметра
	 * запускает функцию setXCoord c указанным значением
	 * @param {String} data
	 */
	const setMarkerPos = data => {
		switch (data) {
			case '0':
				setXCoord(0);
				break;

			case '1':
				setXCoord(20);
				break;

			case '2':
				setXCoord(50);
				break;

			case '3':
				setXCoord(100);
				break;
		}
	};

	/**
	 * Сохраняет значение data-атрибута целевого элемента в переменную,
	 * которая, в зависимости от условия, передается функции в качестве параметра
	 * @param evt
	 */
	const setMarker = evt => {
		clickedElemData = evt.target.parentElement.dataset.skillLevel;
		if (mql.matches) {
			setXCoord(0);
		}else {
			setMarkerPos(clickedElemData);
		}
	};

	Array.prototype.forEach.call(slidesList, elem => {
		elem.addEventListener('click', setMarker);
	});

	if (mql.matches) {
		setXCoord(0);

		// инициализирует слайдер Cycle2
		$(slider).cycle(cycle2Obj);

	}else {
		Array.prototype.forEach.call(slideSwappingContent, elem => {
			elem.classList.toggle('slide__text--invisible');
		});

		setMarkerPos(clickedElemData);
	}

	window.addEventListener('resize', utils.throttle( () => {
		if (mql.matches) {
			Array.prototype.forEach.call(slideSwappingContent, elem => {
				elem.classList.toggle('slide__text--invisible', !elem.classList.contains('slide__text--mobile'));
			});

			setXCoord(0);

			// инициализирует слайдер Cycle2 только в случае,
			// если он не был создан ранее
			if (!($(slider).data('cycle.opts'))) {
				$(slider).cycle(cycle2Obj);
			}

		}else {
			Array.prototype.forEach.call(slideSwappingContent, elem => {
				elem.classList.toggle('slide__text--invisible', !elem.classList.contains('slide__text--desktop'));
			});

			setMarkerPos(clickedElemData);

			if (($(slider).data('cycle.opts'))) {
				// удаляет слайдер Cycle2 только в случае,
				// если он был создан ранее
				$(slider).cycle('destroy');
			}
		}
	}, THROTTLE_TIMEOUT));
});
