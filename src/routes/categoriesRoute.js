import controller from '../controllers/categoriesController'

export default (app) => {
	app.post('/categories/persist', controller.persist)
	app.post('/categories/persist/:id', controller.persist)
	app.post('/categories/destroy', controller.destroy)
	app.get('/categories', controller.get)
	app.get('/categories/:id', controller.get)
}