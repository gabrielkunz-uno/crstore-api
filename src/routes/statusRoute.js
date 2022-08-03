import controller from '../controllers/statusController'

export default (app) => {
	app.post('/status/persist', controller.persist)
	app.post('/status/persist/:id', controller.persist)
	app.post('/status/destroy', controller.destroy)
	app.get('/status', controller.get)
	app.get('/status/:id', controller.get)
}