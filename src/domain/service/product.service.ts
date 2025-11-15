import { Product } from '../entity/product.ts';

export class ProductService {
  static increatePrice(products: Product[], percentage: number): Product[] {
    products.forEach((product) => {
      product.changePrice(product.price + (product.price * percentage) / 100);
    });

    return products;
  }
}
