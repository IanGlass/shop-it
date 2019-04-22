const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('../helpers/path');

const products = [];

router.get('/add-product', (req, res, next) => {
  res.render('add-product', {pageTitle: 'Add Product'});
});

router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  products.push({title: req.body.title, docTitle: 'Shop'});
  res.redirect('/');
});

exports.routes = router;
exports.products = products;
