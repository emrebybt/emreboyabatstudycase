const Order = require("../models/order");

exports.postCreateOrder = (req, res) => {
  const { items, restaurantId, userId, userAddress } = req.body;
  const newOrder = new Order({
    items,
    restaurantId,
    userId,
    isComment : false,
    isRating : false,
    orderDate: new Date(),
    userAddress
  });
  newOrder
    .save()
    .then((order) => {
      res.json(order);
    })
    .catch((err) => {
      res.json("Sipariş oluşturulamadı", err);
    });
};
