import { Module } from '@nestjs/common';
import { CreateUserDto, RmqModule } from '@sohnandsol/shared-modules';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ORGANIZATIONS_SERVICE, USERS_SERVICE } from '../constants/services';

// To Do: Add Authentication via Federated Identity Providers such as Google, and AWS
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './env/.env.local',
      isGlobal: true,
    }),
    RmqModule.register(ORGANIZATIONS_SERVICE),
    RmqModule.register(USERS_SERVICE),
  ],
  controllers: [AppController],
  providers: [CreateUserDto],
})
export class AppModule {}
