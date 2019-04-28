const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename), 
    'data', 
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(p, (error, fileContent) => {
            let cart = {
                products: [],
                totalPrice: 0
            }
            // If the file exists then we need to grab any existing cart information
            if (!error) {
                cart = JSON.parse(fileContent);
            }

            // Find any existing products in the cart and increase quantity
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                updatedProduct = {
                    id: id,
                    qty: 1
                };
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + parseInt(productPrice);

            fs.writeFile(p, JSON.stringify(cart), (error) => {
                if (error) {
                    console.log(error);
                }
            })
        });
    }

    static deleteProduct(id, price) {
        fs.readFile(p, (error, fileContent) => {
            // No cart, nothing to delete!
            if (error) {
                return
            }

            const updatedCart = {...JSON.parse(fileContent)};

            const product = updatedCart.products.find(product => product.id === id);

            updatedCart.products = updatedCart.products.filter(product => product.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - (price * product.qty);

            fs.writeFile(p, JSON.stringify(updatedCart), (error) => {
                console.log(error);
            });
        });
    }

    static getCart(cb) {
        fs.readFile(p, (error, fileContent) => {
            if (error) {
                cb(null);
            }
            else {
                cb(JSON.parse(fileContent));
            }
        })
    }
}