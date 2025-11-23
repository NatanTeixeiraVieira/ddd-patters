import { Product } from '../entity/product.ts';
import { RepositoryInterface } from '../../@shared/repository/repository-interface.ts';

export interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
