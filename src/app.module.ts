import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_GUARD } from '@nestjs/core';
import { AppConfigModule } from './config/app/configuration.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { DBProviderModule } from './providers/database/mysql/provider.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './models/order/order.module';
import { AdminModule } from './models/admin/admin.module';
import { CategoryModule } from './models/category/category.module';
import { ProductModule } from './models/product/product.module';
import { VendorModule } from './models/vendor/vendor.module';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    AppConfigModule,
    DBProviderModule,
    AuthModule,
    OrderModule,
    ProductModule,
    CategoryModule,
    AdminModule,
    VendorModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
