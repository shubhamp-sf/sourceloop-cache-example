import {Constructor, Getter, inject} from '@loopback/core';
import {SequelizeCrudRepository} from '@loopback/sequelize';
import {CacheManager} from '@sourceloop/cache';
import {PgsqlDataSource, RedisDataSource} from '../datasources';
import {Product, ProductRelations} from '../models';

export class ProductRepository extends CacheManager.CacheRepositoryMixin<
  Product,
  typeof Product.prototype.id,
  ProductRelations,
  Constructor<
    SequelizeCrudRepository<
      Product,
      typeof Product.prototype.id,
      ProductRelations
    >
  >
>(SequelizeCrudRepository, {
  prefix: 'products',
  ttl: 60000, // 1 min
}) {
  constructor(
    @inject('datasources.pgsql') dataSource: PgsqlDataSource,
    @inject.getter('datasources.redis')
    public getCacheDataSource: Getter<RedisDataSource>,
  ) {
    super(Product, dataSource);
  }
}
