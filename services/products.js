const productMocks = require("../utils/mocks/products");
const MongoLib = require("../lib/mongo");

class ProductsService {
  constructor() {
    this.collection = "products";
    this.mongoDB = new MongoLib();
  }
  // async para que sea asyncrono, porque devuelve una promesa
  async getProducts({ tags }) {
    // return Promise.resolve(productMocks);
    // Mongo tiene sus propias querys
    // $in es una prop. de Mongo, con esto entiende que debe buscar lo que hay en tags
    const query = tags && { tags: { $in: tags } };
    const products = await this.mongoDB.getAll(this.collection, query);
    // "|| []"" significa que si no hay productos guardados que devuelva un array vacio
    return products || [];
  }

  async getProduct({ productId }) {
    const product = await this.mongoDB.get(this.collection, productId);
    return product || {};
  }

  async createProduct({ product }) {
    const createProductId = await this.mongoDB.create(this.collection, product);

    return createProductId;
  }

  async updateProduct({ productId, product }) {
    const updateProductId = await this.mongoDB.update(
      this.collection,
      productId,
      product
    );

    return updateProductId;
  }

  async deleteProduct({ productId }) {
    const deletedProductId = await this.mongoDB.delete(
      this.collection,
      productId
    );

    return deletedProductId;
  }
}

// exporto la clase para poder ser consumida en otros archivos
module.exports = ProductsService;
