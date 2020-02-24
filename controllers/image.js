const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '268087aca1df4dae8c882ebb10883890' 
});

const handleApiCall = (req, res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(err).json('API Issue'))
};

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(err).json('Error Getting Entries'))
};

module.exports = {
	handleImage,
	handleApiCall
};