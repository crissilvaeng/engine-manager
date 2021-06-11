import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { EnginesModule } from './engines/engines.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeSlugify } from 'sequelize-slugify';
import { Sequelize } from 'sequelize-typescript';
import { Engine } from './engines/entities/engine.entity';

@Module({
  imports: [
    EnginesModule,
    HealthModule,
    MorganModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule.forRoot({ envFilePath: '.development.env', isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
    },
    {
      provide: 'SEQUELIZE',
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const sequelize = new Sequelize({
          dialect: config.get('database.dialect'),
          host: config.get('database.host'),
          port: config.get('database.port'),
          username: config.get('database.username'),
          password: config.get('database.password'),
          database: config.get('database.database'),
          repositoryMode: true,
        });
        sequelize.addModels([Engine]);
        await sequelize.sync();
        SequelizeSlugify.slugifyModel(Engine, {
          source: ['name'],
          suffixSource: ['timestamp'],
        });
        return sequelize;
      },
    },
  ],
})
export class AppModule {}
