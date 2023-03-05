export interface Book {
  id: String,
  author: String,
  title: String,
  description: String,
  price: number,
  genre: String,
  img: String
}

// Product
export interface Product {
  id: String
  title: String,
  description: String,
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
