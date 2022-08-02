import controller from '../controllers/usersController'
import Authenticate from '../utils/Authenticate'

export default (app) => {
	app.get('/users', Authenticate, controller.getAll)
	app.post('/users/register', controller.register)
	app.post('/users/login', controller.login)
	app.get('/users/recovery', controller.recovery)
}