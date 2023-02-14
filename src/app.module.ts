import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_GUARD } from '@nestjs/core';
import { AppConfigModule } from './config/app/configuration.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { DBProviderModule } from './providers/database/mysql/provider.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './models/order/order.module';
import { ModelsModule } from './product/models/models.module';
import { CartModule } from './models/cart/cart.module';
import { ProductModule } from './models/product/product.module';
import { ModelsModule } from './product/models/models.module';

@Module({
  imports: [
    AppConfigModule,
    DBProviderModule,
    AuthModule,
    OrderModule,
    ModelsModule,
    ProductModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
