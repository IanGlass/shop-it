const Product = require('../models/Product')
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            // Pass in the path which determines which header is currently active in main-layout.pug
            res.render('shop/products', {
                pageTitle: 'Shop', 
                path: req.originalUrl,
                prods: products
            });
        })
        .catch((error) => console.log(error))
}

exports.getProduct = (req, res, next) => {
    Product.findByPk(req.params.productID)
        .then((product) => {
            res.render('shop/product-details', {
                pageTitle: 'Product Details', 
                path: req.originalUrl,
                product: product
            });
        })
        .catch((error) => console.log(error))
}

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            // Pass in the path which determines which header is currently active
            res.render('shop/index', {
                pageTitle: 'Shop', 
                path: req.originalUrl,
                prods: products
            });
        })
        .catch((error) => console.log(error))
};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({
                        productData: product,
                        qty: cartProductData.qty
                    });
                }
            }
            res.render('shop/cart', {
                pageTitle: 'Your Cart', 
                path: req.originalUrl,
                cartProducts: cartProducts
            });
        })
    })
}

exports.postCart = (req, res, next) => {
    Product.getByID(req.body.productID, (product) => {
        Cart.addProduct(req.body.productID, product.price);
    });
    res.redirect('/');
}

exports.postCartDeleteProduct = (req, res, next) => {
    Product.getByID(req.body.productID, (product) => {
        Cart.deleteProduct(req.body.productID, product.price);
        res.redirect('/cart');
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Cart', 
        path: req.originalUrl
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'your Orders', 
        path: req.originalUrl
    });
}