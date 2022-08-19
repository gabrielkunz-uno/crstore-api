import cartController from "../controllers/cartController"

export default (app) => {
  app.get('/cart', cartController.get)
  app.post('/cart/add', cartController.add)
  app.post('/cart/remove', cartController.remove)
}