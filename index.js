const util = require('./lib/util');
const joystick = require('./lib/joystick');
const canvas = require('./lib/canvas');
const accelerometer = require('./lib/accelerometer');

const dot = { x: canvas.SIZE / 2, y: canvas.SIZE / 2 };
canvas.addDot(dot);

let timeout;
let holding;

function tick() {
	if (joystick.pressed) {
		if (holding) {
			// Increase FPS for an awesome rainbow
			schedule(1);
			return canvas.drawRainbow();
		}
		canvas.cycle();
		holding = true;
	} else if (holding) {
		canvas.draw();
		holding = false;
	}
	accelerometer.update();
	move('x');
	move('y');
	schedule(300);
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
