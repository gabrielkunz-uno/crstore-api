import controller from '../controllers/shippingOptionsController'

export default (app) => {
	app.post('/shipping-options/persist', controller.persist)
	app.post('/shipping-options/persist/:id', controller.persist)
	app.post('/shipping-options/destroy', controller.destroy)
	app.get('/shipping-options', controller.get)
	app.get('/shipping-options/:id', controller.get)
}