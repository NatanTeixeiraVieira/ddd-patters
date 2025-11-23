import { ProductB } from '../entity/product-b.ts';
import { Product } from '../entity/product.ts';

export class ProductFactory {
  static create(type: string, name: string, price: number) {
    switch (type) {
      case 'a':
        return new Product(crypto.randomUUID(), name, price);
      case 'b':
        return new ProductB(crypto.randomUUID(), name, price);
      default:
        throw new Error('Product type not supported');
    }
  }
}
