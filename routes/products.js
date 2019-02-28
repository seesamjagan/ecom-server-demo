var express = require("express");
var router = express.Router();

let cartMap = {};

/* GET users listing. */
router.all("/", function(req, res, next) {
  let { page = 1, size = products.length } = req.body;
  let start = (page - 1) * size;
  let end = start + size;
  res.json({
    status: true,
    data: products.slice(start, end),
    total: products.length,
    page
  });
});

router.all("/:page/:size", function(req, res, next) {
  let { page = 1, size = products.length } = req.params;
  let start = (Number(page) - 1) * Number(size);
  let end = start + Number(size);
  res.json({
    status: true,
    data: products.slice(start, end),
    total: products.length,
    page,
    size
  });
});

router.post("/add-to-cart", function(req, res, next) {
  let { userName, id } = req.body;
  let cart = cartMap[userName] || [];
  cart.push(id + "");
  cartMap[userName] = cart;

  res.json({ status: true, data: cart });
});

router.all("/product/:id", function(req, res, next) {
  let {id} = req.params;
  let product = products.find(pro=>pro.id == id);
  res.json({
    status: product ? true : false,
    data: product,
    message: product ? "" : "unable to find the product for the given id : " + id
  });
});


router.post("/get-cart", function(req, res, next) {
  let { userName } = req.body;
  let cart = cartMap[userName] || [];

  let items = products.filter(function(item) {
    return cart.indexOf(item.id + "") >= 0;
  });

  // TODO :: summarize the repeated items

  res.json({ status: true, data: items });
});

let pNames = [
  "hen",
  "arrow",
  "peacock",
  "bulb",
  "fan",
  "laptop",
  "desktop",
  "mobile phone",
  "cell phone",
  "charger",
  "raspburry pi",
  "light",
  "toys",
  "gun",
  "bomb",
  "tanker",
  "rpg",
  "granide",
  "ump 9",
  "sun glass"
];
let cos = ["kumaran", "kandan", "velan", "murugan"];
let products = [];

let pnl = pNames.length;
let cl = cos.length;
let name;
for (let i = 0; i < 100; i++) {
  name = cos[i % cl] + " " + pNames[i % pnl];
  products.push({
    id: i,
    name: name,
    desc: `This is "Product ${name}"'s description`,
    unitPrice: Number((Math.random() * 2500 + 500).toFixed(2)),
    stock: Number((Math.random() * 90 + 10).toFixed(0)),
    url: [
      "https://picsum.photos/150?image=" + i,
      "https://picsum.photos/150?blur&image=" + i,
      "https://picsum.photos/150?gravity=east&image=" + i
    ]
  });
}

module.exports = router;
