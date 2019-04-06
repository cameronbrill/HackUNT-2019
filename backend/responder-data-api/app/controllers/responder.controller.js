const Responder = require('../models/responder.model.js');

// Create and Save a new Responder
exports.create = (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	
	// Validate request
	if(!req.body.name) {
		return res.status(400).send({
			message: "Responder cannot be nameless"
		});
	}
	
	// Create an Responder
	const responder = new Responder({
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		address: req.body.address,
		zip: req.body.zip,
		city: req.body.city,
		country: req.body.country,
		state: req.body.state,
		video_url1: req.body.video_url1,
		video_url2: req.body.video_url2,
		video_url3: req.body.video_url3,
		video_comments1: req.body.video_comments1,
		video_comments2: req.body.video_comments2,
		video_comments3: req.body.video_comments3,
		video_rating1: req.body.video_rating1 || 0,
		video_rating2: req.body.video_rating2 || 0,
		video_rating3: req.body.video_rating3 || 0,
		code: req.body.code,
		code_time: req.body.code_time,
		code_comments: req.body.code_comments,
		code_rating: req.body.code_rating || 0,
		flagged: req.body.flagged,
		judged: req.body.judged
	});

	// Save Responder in the database
	responder.save()
	.then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Some error occured while creating the Responder."
		});
	});
};

// Retrieve and return all responders from the database.
exports.findAll = (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	Responder.find()
	.then(responders => {
		res.send(responders);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Some error occurred while retrieving responders."
		});
	});
};

// Find a single responders with a noteId
exports.findOne = (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	Responder.findById(req.params.responderId)
	.then(responder => {
		if(!responder) {
			return res.status(404).send({
				message: "Responder not found with id " + req.params.responderId
			});
		}
		res.send(responder);
	}).catch(err => {
		if(err.kind == 'ObjectId') {
			return res.status(404).send({
				message: "Responder not found with id " + req.params.responderId
			});
		}
		return res.status(500).send({
			message: "Error retrieving responder with id " + req.params.responderId
		});
	});
};

// Update an responder identified by the responderId in the request
exports.update = (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	// Validate Request
	if(!req.body.name) {
		return res.status(400).send({
			message: "Responder cannot be nameless"
		});
	}

	// Find responder and update it with the request body
	Responder.findByIdAndUpdate(req.params.responderId, {
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
		address: req.body.address,
		zip: req.body.zip,
		city: req.body.city,
		country: req.body.country,
		state: req.body.state,
		video_url1: req.body.video_url1,
		video_url2: req.body.video_url2,
		video_url3: req.body.video_url3,
		video_comments1: req.body.video_comments1,
		video_comments2: req.body.video_comments2,
		video_comments3: req.body.video_comments3,
		video_rating1: req.body.video_rating1 || 0,
		video_rating2: req.body.video_rating2 || 0,
		video_rating3: req.body.video_rating3 || 0,
		code: req.body.code,
		code_time: req.body.code_time,
		code_comments: req.body.code_comments,
		code_rating: req.body.code_rating || 0,
		flagged: req.body.flagged,
		judged: req.body.judged
	}, {new: true})
	.then(responder => {
		if(!responder) {
			return res.status(404).send({
				message: "Responder not found with id " + req.params.responderId
			});
		}
		res.send(responder);
	}).catch(err => {
		if(err.kind === 'ObjectId') {
			return res.status(404).send({
				message: "Responder not found with id " + req.params.responderId
			});
		}
		return res.status(500).send({
			message: "Error updating responder with id " + req.params.responderId
		});
	});
};

// Delete an responder with the specified responderId in the request
exports.delete = (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	Responder.findByIdAndRemove(req.params.responderId)
	.then(responder => {
		if(!responder) {
			return res.status(404).send({
				message: "Responder not found with id " + req.params.responderId
			});
		}
		res.send({message: "Responder deleted successfully!"});
	}).catch(err => {
		if(err.kind === 'ObjectId' || err.name === 'NotFound') {
			return res.status(404).send({
				message: "Responder not found with id " + req.params.responderId
			});
		}
		return res.status(500).send({
			message: "Could not delete responder with id " + req.params.responderId
		});
	});
};
