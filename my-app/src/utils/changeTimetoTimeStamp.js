

// const dayjs = require('dayjs');
function hoursToTimestamp(originalDate,hours) {
	// Chuyển số phút thành timestamp (milliseconds)

	const newDate = new Date(originalDate.getTime() + hours * 60 * 60 * 1000)
	return newDate.getTime();
}
function minutesToTimestamp(minute) {
	// Chuyển số phút thành timestamp (milliseconds)
	return minute * 60 * 1000;
}

export {
	minutesToTimestamp,hoursToTimestamp
}