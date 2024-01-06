import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('POSTGRES_URI'),
        autoLoadEntities: true,
        // TO DO: Use migrations instead of the synchronize true option as it may lose data
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class PostgresDBModule {}
