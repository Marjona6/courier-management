module.exports = app => {
	require('./src/routes/shipments')(app);
	require('./src/routes/bundles')(app);
	require('./src/routes/couriers')(app);
	require('./src/routes/login')(app);

	// 404 for anything else
	app.get('*', require('./src/routes/404')); 
}
