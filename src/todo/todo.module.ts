import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import configuration from '../config'
import { Todo } from './entity/todo.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration]
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => configService.get('mysqlOptions'),
            inject: [ConfigService]
        }),
        TypeOrmModule.forFeature([
            Todo
        ])
    ],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
