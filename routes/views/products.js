const express = require('express');
const router = express.Router();
const ProductsService = require('../../services/products');

//  instancia de la clase
const productService = new ProductsService();

router.get("/", async function(req, res, next){
    const { tags } = req.query;
    
    try{
        throw new Error('this is an error');
        const products = await productService.getProducts({ tags });
        // aca hace un redirect (render) a view products.pug ?
        res.render("products", { products });
    }catch(err){
        next(err);
    }
});

module.exports = router;