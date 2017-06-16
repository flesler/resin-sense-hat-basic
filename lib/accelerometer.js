const imu = require('nodeimu');

const IMU = new imu.IMU();

const accum = { x: 0, y: 0 };

exports.update = () => {
	/*
	const gyro = IMU.getValueSync().gyro;
	accum.x -= gyro.y;
	accum.y += gyro.x;
	exports.x = util.direction(accum.x);
	exports.y = util.direction(accum.y);
	*/
};

exports.x = 0;
exports.y = 0;
