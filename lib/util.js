exports.clamp = (n, min, max) => Math.min(max, Math.max(min, n));

exports.rad2Deg = rad => (rad * 180) / Math.PI;

exports.direction = n => Math.floor(n / Math.abs(n || 1));
