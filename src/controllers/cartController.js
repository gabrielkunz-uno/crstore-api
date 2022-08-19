import Cart from "../models/Cart";
import usersController from "./usersController"

const get = async (req, res) => {
  try {
    let user = await usersController.getUserByToken(req.headers.authorization);

    if (!user) {
      return res.send({
        type: 'error',
        message: 'Não foi possível recuperar os seus dados',
        data: []
      });
    };

    let cart = await Cart.findAll({
      where: {
        userId: user.id
      },
      include: ['item']
    });

    return res.send({
      type: 'success',
      message: 'Itens do carrinho recuperados com sucesso!',
      data: cart
    })
  } catch (error) {
    return res.send({
      type: 'error',
      message: 'Ops! Deu b.o.',
      data: []
    });
  }
}

const add = async (req, res) => {
  try {
    let user = await usersController.getUserByToken(req.headers.authorization);

    if (!user) {
      return res.send({
        type: 'error',
        message: 'Não foi possível recuperar os seus dados',
        data: []
      });
    };

    let { itemId, amount } = req.body;

    let itemExistsOnCart = await Cart.findOne({
      where: { itemId, userId: user.id },
    });

    if (itemExistsOnCart) {
      let item = await itemExistsOnCart.toJSON();
      item.amount = (Number(item.amount) + Number(amount)).toFixed(4);
      itemExistsOnCart.amount = item.amount;
      await itemExistsOnCart.save()
      return res.send({
        type: 'success',
        message: 'Item atualizado no carrinho',
        data: []
      })
    }

    await Cart.create({
      userId: user.id,
      itemId,
      amount
    });

    return res.send({
      type: 'success',
      message: 'Item adicionado ao carrinho',
      data: []
    });
  } catch (error) {
    return res.send({
      type: 'error',
      message: 'Ops! Deu b.o.',
      data: []
    });
  }
}

const remove = async (req, res) => {
  try {
    let user = await usersController.getUserByToken(req.headers.authorization);

    if (!user) {
      return res.send({
        type: 'error',
        message: 'Não foi possível recuperar os seus dados',
        data: []
      });
    };

    let { itemId, amount } = req.body;

    let itemExistsOnCart = await Cart.findOne({
      where: { itemId, userId: user.id },
    });

    if (!itemExistsOnCart) {
      return res.send({
        type: 'error',
        message: 'Esse item não foi encontrado no seu carrinho',
        data: []
      });
    }
    if (Number(itemExistsOnCart.amount) > Number(amount)) {
      let item = await itemExistsOnCart.toJSON();
      item.amount = (Number(item.amount) - Number(amount)).toFixed(4);
      itemExistsOnCart.amount = item.amount;
      await itemExistsOnCart.save()
      return res.send({
        type: 'success',
        message: 'Item atualizado no carrinho',
        data: []
      })
    }

    await itemExistsOnCart.destroy();
    return res.send({
      type: 'success',
      message: 'Item removido do carrinho',
      data: []
    })
  } catch (error) {
    return res.send({
      type: 'error',
      message: 'Ops! Deu b.o.',
      data: []
    });
  }
}

export default {
  get,
  add,
  remove
}