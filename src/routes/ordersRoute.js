import controller from '../controllers/ordersController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.post('/orders/create', Authenticate, controller.create)
  app.get('/orders', Authenticate, controller.get)
  app.get('/orders/:id', Authenticate, controller.get)
}