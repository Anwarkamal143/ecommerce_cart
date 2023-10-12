import ProductModel from "models/products";
export const ApiModels = {
  Products: "products",
} as const;

export const ApiModelMapping = {
  [ApiModels.Products]: {
    model: ProductModel,
  },
} as const;
export const ThreePAppSubModelMapping = {
  // [ThreePAppSubModels.ThreePAppConnection]: {
  //   model: ThreePAppConnectionModel,
  // },
};
export type ApiModelDataTypes = {
  [ApiModels.Products]: IProduct;
};
export type RequestOptions = {
  query?: Record<string, any>;
  path?: string | undefined;
};
