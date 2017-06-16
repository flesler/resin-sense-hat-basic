const senseJoystick = require('sense-joystick');
const EventEmitter = require('events').EventEmitter;

module.exports = exports = new EventEmitter();

const DIRS = {
	left: { axis: 'x', dir: -1 },
	right: { axis: 'x', dir: 1 },
	up: { axis: 'y', dir: -1 },
	down: { axis: 'y', dir: 1 },
};

senseJoystick.getJoystick().then((joystick) => {
	joystick.on('press', (direction) => {
		const data = DIRS[direction];
		if (data && exports[data.axis] !== data.dir) {
			exports[data.axis] = data.dir;
		} else if (direction === 'click') {
			exports.pressed = true;
		} else {
			return;
		}
		exports.emit('changed');
	});
	joystick.on('release', (direction) => {
		const data = DIRS[direction];
		if (data && exports[data.axis] === data.dir) {
			exports[data.axis] = 0;
		} else if (direction === 'click') {
			exports.pressed = false;
		}
	});
});

exports.x = 0;
exports.y = 0;
exports.pressed = false;
