import svg4everybody from 'svg4everybody';
import $ from 'jquery';
// http://jquery.malsup.com/cycle2/
import cycle from 'jquery.cycle2';
import pseudoStyle from './pseudoStyle';
import footer from '../blocks/footer/footer.js';
import slider from '../blocks/slider/slider.js';

$(() => {
	svg4everybody();
	cycle();
	pseudoStyle();
	slider();
	footer();
});
