import Model from "models";

class ProductsModel extends Model<IProduct> {
  constructor() {
    super("/benirvingplt/products/products", "public-1");
  }
}

export default new ProductsModel();
