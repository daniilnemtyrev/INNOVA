import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TasksController } from './tasks.controller';
import { Tasks } from './tasks.model';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports:[
    SequelizeModule.forFeature([Tasks])
  ]
})
export class TasksModule {}
