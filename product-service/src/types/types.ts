// Product
export interface Product {
  id: String,
  author: String,
  title: String,
  description: String,
  genre: String,
  img: String,
  price: Number,
  count: Number
}

export type NewProductPayload = Omit<Product, 'id'>
export type ProductDynamoSchema= Omit<Product, 'count'>

//Stock
export interface Stock {
  productId: String,
  count: Number
}
