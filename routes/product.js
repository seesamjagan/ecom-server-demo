var express = require("express");
var router = express.Router();

let products = require("./db");

router.all("/:id", function(req, res, next) {
  let {id} = req.params;
  let product = products.find(pro=>pro.id == id);
  console.log(product, req.params);
  res.json({
    status: product ? true : false,
    data: product,
    message: product ? "" : "unable to find the product for the given id : " + id
  });
});

module.exports = router;
