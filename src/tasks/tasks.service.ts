import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaskDto } from './dto/create-task-dto';
import { DeleteTaskDto } from './dto/delete-task-dto';
import { EditTaskDto } from './dto/edit-task-dto';
import { Tasks } from './tasks.model';

@Injectable()
export class TasksService {

    constructor(@InjectModel(Tasks) private taskRepository:typeof Tasks ){}

async createTask(dto:  CreateTaskDto){
    const task = await this.taskRepository.create(dto)
    return task 
}

  async deleteTaskById(id: number) {
    await this.taskRepository.destroy({ where: { id } });
  }

async getTasksByProjectId(dto:number){
      const tasks = await this.taskRepository.findAll({
      where: { projectId: dto },
    });
    return tasks;
  }

async getAllTasks(){
     const tasks = await this.taskRepository.findAll();
    return tasks;
}
}



