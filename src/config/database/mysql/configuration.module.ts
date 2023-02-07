import { Module } from '@nestjs/common';
import configuration from './configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfigService } from './configuration.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] })],
  providers: [ConfigService, DatabaseConfigService],
  exports: [ConfigService, DatabaseConfigService],
})
export class DatabaseConfigModule {}
