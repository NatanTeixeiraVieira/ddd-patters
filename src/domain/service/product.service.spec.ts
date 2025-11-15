import { Product } from '../entity/product.ts';
import { ProductService } from './product.service.ts';

describe('Product service unit tests', () => {
  it('should change the prices of all products', () => {
    const product1 = new Product('Product1', 'Product 1', 10);
    const product2 = new Product('Product2', 'Product 2', 20);
    const products = [product1, product2];

    ProductService.increatePrice(products, 100);

    expect(product1.price).toBe(20);
    expect(product2.price).toBe(40);
  });
});
