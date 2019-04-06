const mongoose = require('mongoose');

const ResponderSchema = mongoose.Schema({
	name: String,
	email: String,
	phone: String,
	address: String,
	zip: String,
	city: String,
	country: String,
	state: String,
	video_url1: String,
	video_url2: String,
	video_url3: String,
	video_comments1: String,
	video_comments2: String,
	video_comments3: String,
	video_rating1: Number,
	video_rating2: Number,
	video_rating3: Number,
	code: String,
	code_time: Number,
	code_comments: String,
	code_rating: Number,
	flagged: Boolean,
	judged: Boolean
}, {
	timestamps: true
});

module.exports = mongoose.model('Responder', ResponderSchema);
