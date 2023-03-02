import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppVersion(): string {
    return process.env.APP_VERSION ?? "0.0.1";
  }
}
