module.exports = (req, res) => {
	res
		.status(404)
		.json({ error: true, is404: true });
};