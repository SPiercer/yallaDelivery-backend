import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  get connectionType(): string {
    return this.configService.get<string>('database.connection');
  }

  get host(): string {
    return this.configService.get<string>('database.host');
  }

  get username(): string {
    return this.configService.get<string>('database.username');
  }

  get password(): string {
    return this.configService.get<string>('database.password');
  }

  get database(): string {
    return this.configService.get<string>('database.database');
  }

  get port(): number {
    return Number(this.configService.get<number>('database.port'));
  }

  get synchronize(): boolean {
    return Boolean(this.configService.get<boolean>('database.synchronize'));
  }

  get logging(): boolean {
    return Boolean(this.configService.get<boolean>('database.logging'));
  }

  get entities(): string[] {
    return this.configService.get<string>('database.entities').split(',');
  }
}

