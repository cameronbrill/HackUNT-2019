module.exports = (app) => {
	const responders = require('../controllers/responder.controller.js');

	// Create a new Responder
	app.post('/responders', responders.create);

	// Retreive all Responders
	app.get('/responders', responders.findAll);

	// Retrieve a single Responder with responderId
	app.get('/responders/:responderId', responders.findOne);

	// Update an Responder with responderId
	app.post('/update/:responderId', responders.update);

	// Delete an Responder with responderId
	app.post('/delete/:responderId', responders.delete);
}
