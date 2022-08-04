import controller from '../controllers/itemsController'

export default (app) => {
	app.post('/items/persist', controller.persist)
	app.post('/items/persist/:id', controller.persist)
	app.post('/items/destroy', controller.destroy)
	app.get('/items', controller.get)
	app.get('/items/:id', controller.get)
}