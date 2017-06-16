/**
 * Use the joystick to move the dot
 * Press the joystick to cycle colors
 */

const joystick = require('./lib/joystick');
const canvas = require('./lib/canvas');

const dot = { x: canvas.SIZE / 2, y: canvas.SIZE / 2 };
canvas.addDot(dot);

let timeout;

function tick() {
	if (joystick.pressed) {
		canvas.cycle();
	}
	move('x');
	move('y');

	clearTimeout(timeout);
	timeout = setTimeout(tick, 300);
}

function move(axis) {
	if (joystick[axis]) {
		let n = dot[axis] + joystick[axis];
		if (n < 0) n += canvas.SIZE;
		if (n >= canvas.SIZE) n = 0;
		dot[axis] = n;
		canvas.draw();
	}
}

tick();
canvas.draw();
// Ensure even a quick press is not ignored
joystick.on('changed', tick);
