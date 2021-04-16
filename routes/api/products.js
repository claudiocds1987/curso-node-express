const express = require('express');
const router = express.Router();
const ProductsService = require('../../services/products');

//  instancia de la clase
const productService = new ProductsService();

router.get("/", async function(req, res, next) {
    const { tags } = req.query;
  
    console.log("req", req.query);
  
    try {
      throw new Error('This is an error from the API');
      const products = await productService.getProducts({ tags });
  
      res.status(200).json({
        data: products,
        message: "products listed"
      });
    } catch (err) {
      next(err);
    }
  });
  
  router.get("/:productId", async function(req, res, next) {
    const { productId } = req.params;
  
    console.log("req", req.params);
  
    try {
      const product = await productService.getProduct({ productId });
  
      res.status(200).json({
        data: product,
        message: "product retrieved"
      });
    } catch (err) {
      next(err);
    }
  });
  
  router.post("/", async function(req, res, next) {
    const { body: product } = req;
  
    console.log("req", req.body);
  
    try {
      const createdProduct = await productService.createProduct({ product });
  
      res.status(201).json({
        data: createdProduct,
        message: "product created"
      });
    } catch (err) {
      next(err);
    }
  });
  
  router.put("/:productId", async function(req, res, next) {
    const { productId } = req.params;
    const { body: product } = req;
  
    console.log("req", req.params, req.body);
  
    try {
      const updatedProduct = await productService.updateProduct({
        productId,
        product
      });
      res.status(200).json({
        data: updatedProduct,
        message: "product updated"
      });
    } catch (err) {
      next(err);
    }
  });
  
  router.delete("/:productId", async function(req, res, next) {
    const { productId } = req.params;
  
    console.log("req", req.params);
  
    try {
      const deletedProduct = await productService.deleteProduct({ productId });
  
      res.status(200).json({
        data: deletedProduct,
        message: "product deleted"
      });
    } catch (err) {
      next(err);
    }
  });

// router.get('/', async function(req, res, next){

//     const { tags } = req.query;
//     console.log('req', req);

//     try{
//         const products = await productService.getProducts({ tags });
//         res.status(200).json({
//             data: products,
//             message: 'products listed'
//         });
//     } catch(err){
//         next(err);
//     }  
// });

// router.get('/:productId', async function(req, res, next){

//     const { productId } = req.params;
    
//     try{
//         const product = await productService.getProduct({ productId });
//         res.status(200).json({
//             data: product,
//             message: 'product retrieved'
//         });
//     } catch(err){
//         next(err);
//     }  
// });

// // Crear producto
// router.post('/', async function(req, res, next){

//     const { body: product } = req;
//     console.log('req', req);

//     try{
//         const createdProduct = await productService.createProduct({ product });
//         // status 201 es para el success cuando se creo algo.
//         res.status(201).json({
//             //productMocks se refiere a dato quemado que no viene de db.
//             data: createdProduct,
//             message: 'product created'
//         });
//     }catch(err){
//         next(err);
//     }
  
// });

// // Actualizar producto
// router.put('/:productId', async function(req, res, next){

//     const { productId } = req.params;
//     const { body: product } = req;
//     console.log('req.params', req.params);
//     console.log('req', req);

//     try{      
//         const updatedProduct = await productService.updateProduct({ productId, product });

//         res.status(200).json({
//             data: updatedProduct,
//             message: 'product updated'
//         });
//     }catch(err){
//         next(err);
//     }
   
// });

// // Eliminar producto
// router.delete('/:productId', async function(req, res, next){

//     const { productId } = req.params;
//      console.log('req', req.params);

//     try{    
//         const deletedProduct = await productService.deleteProduct({ productId });  
//         res.status(200).json({
//             data: deletedProduct,
//             message: 'product deleted'
//         });
//     } catch(err){
//         next(err);
//     }
// });


// exportacion de ruta
module.exports = router;