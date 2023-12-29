const Comment = require("../models/comment");
const Order = require("../models/order");

exports.postComment = (req, res) => {
  const { textContent, rating, restaurant, orderId, commentUser } = req.body;
  const newComment = new Comment({
    textContent,
    rating,
    order: orderId,
    restaurant,
    commentUser,
  });

  //İsteğin body'sinden gelen sipariş id'sine göre siparişi çekiyor.
  Order.findById(orderId).then((foundOrder) => {
    console.log(foundOrder);
    if (!foundOrder.isComment) {  //Eğer siparişe yorum yapılmamışsa.
      newComment
        .save()
        .then((comment) => {  //Yorumu database'ye kayıt etme.
          Order.updateOne(
            { _id: foundOrder._id },
            {
              $set: {
                isComment: true,
              },
            }
          ).then(() => {    //Siparişi güncelleyip yorumu geri döndürme.
            res.status(200).json(comment);
          });
        })
        .catch((err) => { //Hata durumu
          res
            .status(500)
            .json({ error: "Yorum gönderme başarısız.", details: err });
        });
    } else {  //Siparişe daha önce yorum yapıldıysa.
      res.status(409).json("Bu siparişe zaten yorum yapılmış.");
    }
  });
};

exports.getLastCommentsByGender = (req, res) => {
  const { page = 1 } = req.query;
  const skip = (page - 1) * 20;

  Comment.aggregate([
    {
      $lookup: {
        from: "users",  //2. collection
        localField: "commentUser",
        foreignField: "_id",
        as: "commentUser",  //Sonuçların gösterileceği başlık
      },
    },
    {
      $unwind: "$commentUser",  //İlişkili tablodaki verileri çekiyor.
    },
    {
      $match: {
        "commentUser.gender": "Erkek",  //Sadece erkek yorumları
      },
    },
    {
      $sort: {
        "commentUser.age": 1,   //Yaşa göre sıralama.
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: 20,
    },
  ]).then((data) => {
    res.status(200).json(data);
  });
};
