const util = require('./lib/util');
const joystick = require('./lib/joystick');
const canvas = require('./lib/canvas');
const accelerometer = require('./lib/accelerometer');

const RAINBOX_DELAY = 5000;
const JOYSTICK_POLL = 500;

const dot = { x: canvas.SIZE / 2, y: canvas.SIZE / 2 };
canvas.addDot(dot);

let timeout;

function tick() {
	if (!joystick.isStill()) {
		if (joystick.pressed) {
			canvas.cycle();
		}
		accelerometer.update();
		move('x');
		move('y');
	} else if (Date.now() - joystick.lastPress >= RAINBOX_DELAY) {
		// Increase FPS for an awesome rainbow
		schedule(1);
		return canvas.drawRainbow();
	}
	schedule(JOYSTICK_POLL);
}

function schedule(time) {
	clearTimeout(timeout);
	timeout = setTimeout(tick, time);
}

function move(axis) {
	const delta = joystick[axis] + accelerometer[axis];
	if (delta) {
		const n = dot[axis] + delta;
		dot[axis] = util.clamp(n, 0, canvas.SIZE - 1);
		canvas.draw();
	}
}

tick();
canvas.draw();
// Ensure even a quick press is not ignored
joystick.on('changed', tick);

