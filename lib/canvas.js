const leds = require('sense-hat-led').sync;

const X = [0, 255, 0];
const O = [0, 0, 255];
const DOT = [255, 0, 0];
const dots = [];

const pixels = [
	O, O, O, X, X, O, O, O,
	O, O, X, O, O, X, O, O,
	O, O, O, O, O, X, O, O,
	O, O, O, O, X, O, O, O,
	O, O, O, X, O, O, O, O,
	O, O, O, X, O, O, O, O,
	O, O, O, O, O, O, O, O,
	O, O, O, X, O, O, O, O,
];

exports.addDot = (dot) => {
	dots.push(dot);
};

exports.draw = () => {
	leds.setPixels(pixels);
	dots.forEach((dot) => {
		leds.setPixel(dot.x, dot.y, DOT);
	});
};

exports.cycle = () => {
	[X, O, DOT].forEach((rgb) => {
		rgb.push(rgb.shift());
	});
	exports.draw();
};

exports.SIZE = Math.sqrt(pixels.length);
