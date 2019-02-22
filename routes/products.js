var express = require("express");
var router = express.Router();

let cartMap = {}

/* GET users listing. */
router.all("/", function(req, res, next) {
  //res.send('respond with a resource');
  res.json({ status: true, data: products });
});

router.post("/add-to-cart", function (req, res, next) {
    let {userName, id} = req.body;
    let cart = cartMap[userName] || [];
    cart.push(id+"");
    cartMap[userName] = cart;

    res.json({status: true, data: cart});
});

router.post("/get-cart", function (req, res, next) {
    let {userName} = req.body;
    let cart = cartMap[userName] || [];

    let items = products.filter(function(item){
        return cart.indexOf(item.id+"") >= 0
    });

    // TODO :: summarize the repeated items

    res.json({status: true, data: items});
});

let products = [];

for (let i = 0; i < 100; i++) {
  products.push({
    id: i,
    name: `Product ${i + 1}`,
    desc: `This is "Product ${i + 1}" description`,
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
