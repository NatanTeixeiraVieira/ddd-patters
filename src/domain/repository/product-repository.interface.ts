import { Product } from '../entity/product.ts';
import { RepositoryInterface } from './repository-interface.ts';

export interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
