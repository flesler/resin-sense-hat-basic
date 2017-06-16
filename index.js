/**
 * Use the joystick to move the dot
 * Press the joystick to cycle colors
 */

const senseJoystick = require('sense-joystick');
const leds = require('sense-hat-led').sync;

const SIZE = 8;

const X = [0, 255, 0];
const O = [0, 0, 255];
const DOT = [255, 0, 0];
const DIRS = {
	left: { axis: 'x', dir: -1 },
	right: { axis: 'x', dir: 1 },
	up: { axis: 'y', dir: -1 },
	down: { axis: 'y', dir: 1 },
};


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

const dot = { x: SIZE / 2, y: SIZE / 2 };
const control = { x: 0, y: 0 };
let timeout;

senseJoystick.getJoystick().then((joystick) => {
	joystick.on('press', (direction) => {
		const data = DIRS[direction];
		if (data && control[data.axis] !== data.dir) {
			control[data.axis] = data.dir;
			// Ensure even a quick press is not ignored
			updateDot();
		}
	});
	joystick.on('release', (direction) => {
		const data = DIRS[direction];
		if (data && control[data.axis] === data.dir) {
			control[data.axis] = 0;
		}
		if (direction === 'click') {
			swapBackground();
		}
	});
});

function updateDot() {
	if (control.x || control.y) {
		for (const axis in control) {
			let val = dot[axis] + control[axis];
			if (val < 0) val += SIZE;
			if (val >= SIZE) val = 0;
			dot[axis] = val;
		}
		draw();
	}
	clearTimeout(timeout);
	timeout = setTimeout(updateDot, 300);
}

function draw() {
	leds.setPixels(pixels);
	leds.setPixel(dot.x, dot.y, DOT);
}

function cycle(arr) {
	arr.push(arr.shift());
}

function swapBackground() {
	cycle(X);
	cycle(O);
	cycle(DOT);
	draw();
}

updateDot();
draw();
