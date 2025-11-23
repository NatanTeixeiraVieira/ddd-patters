import { Product } from './product.ts';

describe('Product unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const product = new Product('', 'Product 1', 100);
    }).toThrow(new Error('Id is required'));
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      const product = new Product('123', '', 100);
    }).toThrow(new Error('Name is required'));
  });

  it('should throw error when price is less tha zero', () => {
    expect(() => {
      const product = new Product('123', 'Product 1', -1);
    }).toThrow(new Error('Price must be greater than or equal to zero'));
  });

  it('should change name', () => {
    const product = new Product('123', 'Product 1', 100);
    product.changeName('New Product Name');
    expect(product.name).toBe('New Product Name');
  });

  it('should change price', () => {
    const product = new Product('123', 'Product 1', 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
