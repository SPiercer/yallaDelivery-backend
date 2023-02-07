import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_GUARD } from '@nestjs/core';
import { AppConfigModule } from './config/app/configuration.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { DBProviderModule } from './providers/database/mysql/provider.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AppConfigModule,
    DBProviderModule,
    AuthModule,
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
