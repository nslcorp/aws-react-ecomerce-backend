import { BOOKS_MOCK } from 'src/mock/books.mock';
import { getProducts } from 'src/services/DynamoDBService/handlers/getProducts';
import { getStocks } from 'src/services/DynamoDBService/handlers/getStocks';
import { v4 as uuidv4 } from 'uuid';
import { NewProductPayload, Product } from 'src/types/types';
import { createProduct } from './handlers/createProduct';
import { createStock } from './handlers/createStock';

class DynamoDBService {
  getAllProducts = async (): Promise<Product[]> => {

    const products = await getProducts();
    const stocks = await getStocks();

    const productsWithStock = products.map(productRecord => {
      const stockRecord = stocks.find(record => record.productId === productRecord.id)
      if (!stockRecord) {
        return ({...productRecord, count: 0});
      }
      return ({...productRecord, count: stockRecord.count});
    })

    return productsWithStock
  }

  createProduct = async (data: NewProductPayload) => {
    const productId = uuidv4();
    return await Promise.all([
      createProduct(data, productId),
      createStock(data, productId)
    ])
  }

  getProductByID = () => {
  }

  initialDataUpload = async () => {
    const data = await this.getAllProducts();
    if (data.length !== 0) {
      console.log("Error. database is not empty. Initial data upload could be complete only with empty DB")
      return;
    }
    try {
      await Promise.all(
        BOOKS_MOCK.map(record => this.createProduct(record))
      )
      console.log('[Initial DynamoDB upload]: success')

    } catch (error) {
      console.log('[DynamoDB Error]', error)

    }


  }


}

const mongodbService = new DynamoDBService();

export default mongodbService
