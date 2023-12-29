const Restaurant = require("../models/restaurant");
const RestaurantAddress = require("../models/restaurantAddress");
const Menu = require("../models/menu");
const geolib = require("geolib");
const mongoose = require("mongoose");

exports.postRestaurant = (req, res) => {
  const { name, description, logoUrl, type, branchCode, rating } = req.body;
  const newRestaurant = new Restaurant({
    name,
    description,
    logoUrl,
    type,
    branchCode,
    rating,
  });
  newRestaurant
    .save()
    .then((newRestaurant) => {
      res.json(newRestaurant);
    })
    .catch((err) => {
      res.json({ error: "Restorant kaydı başarısız.", err });
    });
};

exports.postRestaurantAddress = (req, res) => {
  const { city, district, street, location } = req.body;
  const newAddress = new RestaurantAddress({
    city,
    district,
    street,
    location,
  });
  newAddress
    .save()
    .then((newAddress) => {
      res.json(newAddress);
    })
    .catch((err) => {
      res.json({ error: "Adres kaydı başarısız.", err });
    });
};

exports.getRestaurantByLocation = (req, res) => {
  const targetCoordinates = { latitude: 39.93, longitude: 32.85 };  //Hedef koordinatlar.

  Restaurant.find()
    .populate("address") 
    .then((restaurants) => {
      const formattedRestaurants = [];

      restaurants.forEach((restaurant) => {
        restaurant.address.forEach((address) => {
          const coords = address.location
            .split(",")
            .map((coord) => parseFloat(coord));   //Database'deki koordinat bilgilerini floata çevirme

          const distance = geolib.getDistance(targetCoordinates, {   
            latitude: coords[0],
            longitude: coords[1],
          });
            formattedRestaurants.push({ //Yeni listeye restoranı ekleme
              name: restaurant.name,
              distance: distance / 1000,
            });
          
        });
      });

      formattedRestaurants.sort((a, b) => a.distance - b.distance);

      const nearestRestaurants = formattedRestaurants.slice(0, 5);

      res.json(nearestRestaurants);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Restoranlar getirilirken bir hata oluştu.", err });
    });
};

exports.getRestaurantByTypeAndRating = (req, res) => {
  Restaurant.find({
    $and: [
      { rating: { $gte: 4 } },
      {
        $or: [
          { type: { $in: ["Fast Food", "Ev Yemekleri"] } },
          { description: { $regex: "fast", $options: "i" } },
        ],
      },
    ],
  })
    .select("name type description")
    .then((restaurans) => {
      res.json(restaurans);
    })
    .catch((err) => {
      res.json({ error: "Uygun restorant bulunamadı.", err });
    });
};

exports.postCreateMenu = (req, res) => {
  const { productName, productDescription, productPrice, productImageUrl } =
    req.body;

  newMenu = new Menu({
    productName,
    productDescription,
    productPrice,
    productImageUrl,
  });
  newMenu
    .save()
    .then((menu) => {
      res.json(menu);
    })
    .catch((err) => {
      res.json("Menü kayıt edilemedi.", err);
    });
};

exports.postAddMenu = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();   
  const menuItemsToAdd = [
    {
      productName: "Küçük boy peynirli pizza",
      productDescription: "Lezzetli küçük boy peynirli pizza",
      productPrice: 50,
      productImageUrl: "kucukpizza.jpg",
      restaurantId: "658df8a4fe2017876029e680",
    },
    {
      productName: "Orta boy mantarlı pizza",
      productDescription: "Lezzetli orta boy mantarlı pizza",
      productPrice: 100,
      productImageUrl: "ortapizza.jpg",
      restaurantId: "658df8a4fe2017876029e680",
    },
    {
      productName: "Hamburger",
      productDescription: "Lezzetli hamburger",
      productPrice: 120,
      productImageUrl: "hamburger.jpg",
      restaurantId: "658df8a4fe2017876029e680",
    },
  ];
  
  try {
    const opts = { session };
    

    await Menu.insertMany(menuItemsToAdd, opts);  //Ürünleri ekleme


    await session.commitTransaction();  //Transaction commit
    session.endSession();
    res.status(200).json("Ürünler menüye eklendi");
  } catch (error) {
    // Hata durumu
    await session.abortTransaction();
    session.endSession();
    res.status(304).json("Ürünler menüye eklenemedi");
    throw error;
  }
};

exports.getRestaurantList = (req, res) => {
  const { page = 1 } = req.query;

  Restaurant.find()
  .sort({rating : -1})
  .limit(5 * page)
  .then((value) => {
    res.json(value);
  })
  
}