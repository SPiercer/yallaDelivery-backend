import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DatabaseConfigModule } from '../../../config/database/mysql/configuration.module';
import { DatabaseConfigService } from '../../../config/database/mysql/configuration.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      inject: [DatabaseConfigService],
      useFactory: async (db: DatabaseConfigService) => ({
        type: db.connectionType as DatabaseType,
        port: db.port,
        host: db.host,
        username: db.username,
        password: db.password,
        database: db.database,
        entities:
          process.env.NODE_ENV == 'test' ? ['src/**/*.entity.ts'] : db.entities,
        synchronize: db.synchronize,
      }),
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class DBProviderModule {}
