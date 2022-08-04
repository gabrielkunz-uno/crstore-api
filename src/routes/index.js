import usersRoute from "./usersRoute";
import categoriesRoute from "./categoriesRoute";
import statusRoute from "./statusRoute"
import addressesRoute from "./addressesRoute";
import paymentMethodsRoute from "./paymentMethodsRoute";
import shippingOptionsRoute from "./shippingOptionsRoute";
import ordersRoute from "./ordersRoute";
import itemsRoute from "./itemsRoute";

function Routes(app) {
	usersRoute(app);
	categoriesRoute(app);
	statusRoute(app);
	addressesRoute(app);
	paymentMethodsRoute(app);
	shippingOptionsRoute(app);
	ordersRoute(app);
	itemsRoute(app);
}

export default Routes;