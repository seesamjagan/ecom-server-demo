var express = require("express");
var router = express.Router();

let products = require("./db");

let cartMap = {};

/* GET producs listing. */
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

router.post("/add-to-cart", function(req, res, next) {
  let { userName, id } = req.body;
  let cart = cartMap[userName] || [];
  cart.push(id + "");
  cartMap[userName] = cart;

  res.json({ status: true, data: cart });
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

router.post("/get-cart", function(req, res, next) {
  let { userName } = req.body;
  let cart = cartMap[userName] || [];

  let items = products.filter(function(item) {
    return cart.indexOf(item.id + "") >= 0;
  });

  // TODO :: summarize the repeated items

  res.json({ status: true, data: items });
});


module.exports = router;
