import { v4 as uuidv4 } from 'uuid';
import { NewProductPayload } from '../../types/types';
import { createProduct } from './handlers/createProduct';
import { createStock } from './handlers/createStock';

class MongoDBService {
  getAllProducts = () => {}

  createProduct = async (data: NewProductPayload) => {
    const productId = uuidv4();
    return await Promise.all([
      createProduct(data, productId),
      createStock(data, productId)
    ])
  }

  getProductByID = () => {}
}

const mongodbService = new MongoDBService();

export default mongodbService
