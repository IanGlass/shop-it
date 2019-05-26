const Product = require('../models/Product')

exports.getAddProduct = (req, res, next) => {
    // Pass in the path which determines which header is currently active in main-layout.pug
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: req.originalUrl,
        editMode: false
    });
}

exports.postAddProduct = (req, res, next) => {
    Product.create({
        title: req.body.title,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        description: req.body.description
    })
    .then(() => {
        res.redirect('/admin/products');
    })
    .catch((error) => console.log(error))
}

// add-product and edit-product share the same view
exports.getEditProduct = (req, res, next) => {
    Product.findByPk(req.params.productID)
        .then((product) => {
            if (!product) {
                return res.redirect('/');
            }

            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: req.originalUrl,
                editMode: true,
                product: product
            });
        })
        .catch((error) => console.log(error))
}

exports.postEditProduct = (req, res, next) => {
    Product.findByPk(req.body.productID)
        .then((product) => {
            // Add the new value of body to the fetched product
            product.title = req.body.title;
            product.price = req.body.price;
            product.imageUrl = req.body.imageUrl;
            product.description = req.body.description;
            // Update the old product
            product.save();
        })
        .catch((error) => console.log(error))
        // Called after product.save()
        .then(() => {
            res.redirect('/admin/products');
        })
}

exports.postDeleteProduct = (req, res, next) => {
    Product.findByPk(req.body.productID)
        .then((product) => {
            return product.destroy();
        })
        .catch((error) => console.log(error))
        .then(() => {
            res.redirect('/admin/products')
        })
}

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            // Pass in the path which determines which header is currently active in main-layout.pug
            res.render('admin/products', {
                pageTitle: 'Admin Products', 
                path: req.originalUrl,
                prods: products
            });
        })
        .catch((error) => console.log(error))
}

