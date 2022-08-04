import Item from '../models/Item';
import Order from '../models/Order';
import OrderItem from '../models/OrderItems';
import usersController from './usersController';

const get = async (req, res) => {
  try {
    let id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    let user = await usersController.getUserByToken(req.headers.authorization);

    if (!user) {
      return res.status(200).send({
        type: 'error',
        message: 'Ocorreu um erro ao recuperar os seus dados'
      })
    }

    if (!id) {
      let orders = await Order.findAll({ where: { userId: user.id } });
      let response = [];
      for (let order of orders) {
        let orderItems = await order.getItems();
        order = order.toJSON();
        order.items = orderItems;
        response.push(order);
      }

      return res.status(200).send({
        type: 'success',
        message: 'Registros carregados com sucesso',
        data: response 
      });
    };
    
    let response = await Order.findOne({ where: { id, userId: user.id } });
    
    if (!response) {
      return res.status(200).send({
        type: 'error',
        message: `Nenhum registro com id ${id}`,
        data: [] 
      });
    }

    let orderItems = await response.getItems();
    response = response.toJSON();
    response.items = orderItems;

    return res.status(200).send({
      type: 'success',
      message: 'Registro carregado com sucesso',
      data: response 
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: `Ops! Ocorreu um erro`,
      error: error.message 
    });
  }
}

const create = async (req, res) => {
  try {
    let user = await usersController.getUserByToken(req.headers.authorization);

    if (!user) {
      return res.status(200).send({
        type: 'error',
        message: 'Ocorreu um erro ao recuperar os seus dados'
      })
    }

    let { paymentMethodId, shippingOptionId, statusId, addressId, items, additionalInfo } = req.body;

    let response = await Order.create({
      userId: user.id,
      total: 0.00,
      paymentMethodId,
      shippingOptionId,
      statusId,
      addressId,
      additionalInfo
    });

    let total = 0;

    for (const item of items) {

      let entity = await Item.findOne({
        where: {
          id: item.itemId
        }
      });

      if (!entity) {
        await response.destroy();
        return res.status(200).send({
          type: 'error',
          message: `Ops! Parece que um dos itens do pedido não está mais disponível`,
          data: []
        });
      }

      let price = entity.promotional ? Number(entity.promotionalPrice) : Number(entity.price); 

      let orderItem = await OrderItem.create({
        orderId: response.id,
        itemId: item.itemId,
        price: price,
        amount: Number(item.amount),
        total: Number(item.amount * price).toFixed(2)
      });

      total = Number(total) + Number(orderItem.total);
    }

    response.total = total;
    response.save();
    let orderItems = await response.getItems();
    let order = response.toJSON();
    order.items = orderItems;

    return res.status(200).send({
      type: 'success',
      message: `Cadastro realizado com sucesso`,
      data: order 
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: `Ops! Ocorreu um erro`,
      error: error
    });
  }
}

const destroy = async (req, res) => {
  try {
    let id = req.body.id ? req.body.id.toString().replace(/\D/g, '') : null;

    let user = await usersController.getUserByToken(req.headers.authorization);

    if (!user) {
      return res.status(200).send({
        type: 'error',
        message: 'Ocorreu um erro ao recuperar os seus dados'
      })
    }

    if (!id) {
      return res.status(200).send({
        type: 'error',
        message: `Informe um id para deletar o registro`,
        data: [] 
      });
    }

    let response = await Order.findOne({ where: { id, userId: user.id } });

    if (!response) {
      return res.status(200).send({
        type: 'error',
        message: `Nenhum registro com id ${id} para deletar`,
        data: [] 
      });
    }

    await response.destroy();
    return res.status(200).send({
      type: 'success',
      message: `Registro id ${id} deletado com sucesso`,
      data: [] 
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: `Ops! Ocorreu um erro`,
      error: error.message 
    });
  }
}

export default {
  get,
  create,
  destroy
}